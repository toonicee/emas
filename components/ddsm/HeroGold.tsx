"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Lingkaran emas hero yang "hidup": permukaan bergelombang pelan seperti emas
 * cair, kilau cahaya yang menyapu, dan riak yang mengikuti kursor — dirender
 * dengan Three.js di atas gambar statisnya.
 *
 * Ini peningkatan progresif, bukan pengganti:
 *  - Gambar statis (children — <Image> yang dirender server) tetap tampil
 *    lebih dulu dan tetap menjadi elemen LCP. Kanvas WebGL bukan kandidat
 *    LCP, jadi memasangnya belakangan tidak memundurkan LCP.
 *  - Three.js dimuat lewat import() SETELAH hidrasi, sebagai chunk terpisah —
 *    bukan bagian First Load JS.
 *  - Tidak dimuat sama sekali bila prefers-reduced-motion atau Save-Data
 *    aktif, atau bila WebGL tidak tersedia. Dalam semua kasus itu yang
 *    terlihat tetap gambar statisnya, persis seperti tanpa JavaScript.
 *  - Tekstur memakai URL yang SUDAH dimuat <img> (currentSrc): tidak ada
 *    unduhan tambahan.
 *  - Loop render berhenti saat hero keluar layar atau tab disembunyikan.
 *  - Tidak ada listener scroll. Posisi kursor hanya dicatat di handler dan
 *    dibaca oleh loop, jadi handler-nya tidak memberatkan INP.
 */

/* Geometri lingkaran di dalam gambar, dari ellipse.svg: kanvas 940×880,
   lingkaran r=470 berpusat di (470, 410) dari atas — 60px atasnya terpotong.
   Dalam UV (y dari bawah): pusat (0.5, 1 − 410/880), jari-jari (0.5, 470/880). */
const CIRCLE = [0.5, 1 - 410 / 880, 0.5, 470 / 880] as const;

const VERT = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}`;

const FRAG = /* glsl */ `
precision highp float;
uniform sampler2D uMap;
uniform float uTime;
uniform vec2 uPointer;
uniform float uHover;
uniform float uAspect;
uniform vec4 uCircle; // cx, cy, rx, ry
varying vec2 vUv;

void main() {
  // Jarak ternormalisasi ke tepi lingkaran: 0 di pusat, 1 di tepi. Distorsi
  // diredam menjelang tepi supaya sampel tidak jatuh ke area transparan di
  // luar lingkaran — kalau jatuh, muncul pinggiran gelap.
  float nd = length((vUv - uCircle.xy) / uCircle.zw);
  float inner = 1.0 - smoothstep(0.82, 0.97, nd);

  float t = uTime;
  vec2 wave = vec2(
    sin(vUv.y * 9.0 + t * 0.45) + 0.5 * sin(vUv.y * 17.0 - t * 0.32),
    cos(vUv.x * 8.0 - t * 0.38) + 0.5 * cos(vUv.x * 15.0 + t * 0.26)
  ) * 0.0028;

  vec2 d = (vUv - uPointer) * vec2(uAspect, 1.0);
  float dist = length(d);
  vec2 dir = dist > 1e-4 ? d / dist : vec2(0.0);
  float ripple = sin(dist * 46.0 - t * 3.0) * exp(-dist * 6.5) * 0.010 * uHover;

  vec2 uv = vUv + (wave + dir * ripple / vec2(uAspect, 1.0)) * inner;
  vec4 col = texture2D(uMap, uv);

  // Kilau: pita diagonal lembut yang menyapu kira-kira tiap 14 detik, plus
  // cahaya hangat di sekitar kursor.
  float s = fract(t * 0.07) * 2.6 - 0.8;
  float band = smoothstep(0.16, 0.0, abs(vUv.x + vUv.y * 0.55 - s));
  float glow = exp(-dist * 4.5) * 0.16 * uHover;
  col.rgb += (band * 0.09 + glow) * vec3(1.0, 0.87, 0.56);

  // Siluet selalu dari alpha ASLI (tanpa distorsi): tepinya tetap tajam dan
  // identik dengan gambar statis di bawahnya.
  gl_FragColor = vec4(col.rgb, texture2D(uMap, vUv).a);
}`;

export function HeroGold({ className, children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = ref.current;
    const img = host?.querySelector("img");
    if (!host || !img) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
      ?.saveData;
    if (reduceMotion || saveData) return;

    let disposed = false;
    let cleanup = () => {};

    const start = async () => {
      if (!img.complete) {
        await new Promise<void>((done) => {
          img.addEventListener("load", () => done(), { once: true });
          img.addEventListener("error", () => done(), { once: true });
        });
      }
      if (disposed || img.naturalWidth === 0) return;

      const THREE = await import("three");
      if (disposed) return;

      const renderer = (() => {
        try {
          return new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: "low-power" });
        } catch {
          return null; // tanpa WebGL: gambar statis tetap tampil
        }
      })();
      if (!renderer) return;

      let texture: InstanceType<typeof THREE.Texture>;
      try {
        texture = await new THREE.TextureLoader().loadAsync(img.currentSrc || img.src);
      } catch {
        renderer.dispose();
        return;
      }
      if (disposed) {
        texture.dispose();
        renderer.dispose();
        return;
      }

      renderer.setClearColor(0x000000, 0);
      const canvas = renderer.domElement;
      canvas.setAttribute("aria-hidden", "true");
      /* Mulai tak terlihat dan baru muncul setelah frame pertama selesai
         digambar — tidak ada kilatan kosong. Karena kanvas saat diam hampir
         identik dengan gambarnya, peralihannya nyaris tak kasatmata. */
      canvas.style.cssText =
        "position:absolute;inset:0;width:100%;height:100%;pointer-events:none;opacity:0;transition:opacity .7s ease";

      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      const geometry = new THREE.PlaneGeometry(2, 2);
      const uniforms = {
        uMap: { value: texture },
        uTime: { value: 0 },
        uPointer: { value: new THREE.Vector2(0.5, 0.5) },
        uHover: { value: 0 },
        uAspect: { value: 1 },
        uCircle: { value: new THREE.Vector4(...CIRCLE) },
      };
      const material = new THREE.ShaderMaterial({
        uniforms,
        vertexShader: VERT,
        fragmentShader: FRAG,
        transparent: true,
        depthTest: false,
        depthWrite: false,
      });
      scene.add(new THREE.Mesh(geometry, material));
      host.appendChild(canvas);

      const resize = () => {
        const { width, height } = host.getBoundingClientRect();
        if (!width || !height) return;
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(width, height, false);
        uniforms.uAspect.value = width / height;
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(host);

      /* Pointer didengarkan di <section> hero, bukan di kanvas: kanvas dan
         pembungkusnya pointer-events:none supaya judul dan tombol di atasnya
         tetap bisa diklik. */
      const section = host.parentElement ?? host;
      const target = new THREE.Vector2(0.5, 0.5);
      let hoverTarget = 0;
      const onMove = (e: PointerEvent) => {
        const r = host.getBoundingClientRect();
        target.set((e.clientX - r.left) / r.width, 1 - (e.clientY - r.top) / r.height);
        hoverTarget = 1;
      };
      const onLeave = () => {
        hoverTarget = 0;
      };
      section.addEventListener("pointermove", onMove, { passive: true });
      section.addEventListener("pointerleave", onLeave);

      let raf = 0;
      let running = false;
      let last = 0;
      let shown = false;
      const loop = (now: number) => {
        const dt = Math.min((now - last) / 1000, 0.05);
        last = now;
        uniforms.uTime.value += dt;
        // pengejaran eksponensial yang tidak bergantung frame rate
        uniforms.uPointer.value.lerp(target, 1 - Math.pow(0.001, dt));
        uniforms.uHover.value += (hoverTarget - uniforms.uHover.value) * (1 - Math.pow(0.02, dt));
        renderer.render(scene, camera);
        if (!shown) {
          shown = true;
          canvas.style.opacity = "1";
        }
        raf = running ? requestAnimationFrame(loop) : 0;
      };
      const setRunning = (on: boolean) => {
        if (on === running) return;
        running = on;
        if (on) {
          last = performance.now();
          raf = requestAnimationFrame(loop);
        } else if (raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      };

      let inView = true;
      const update = () => setRunning(inView && !document.hidden);
      const io = new IntersectionObserver(([entry]) => {
        inView = entry.isIntersecting;
        update();
      });
      io.observe(host);
      document.addEventListener("visibilitychange", update);

      cleanup = () => {
        setRunning(false);
        io.disconnect();
        ro.disconnect();
        document.removeEventListener("visibilitychange", update);
        section.removeEventListener("pointermove", onMove);
        section.removeEventListener("pointerleave", onLeave);
        geometry.dispose();
        material.dispose();
        texture.dispose();
        renderer.dispose();
        canvas.remove();
      };

      /* GPU bisa mencabut konteks WebGL (driver reset, tab latar terlalu
         lama). Kanvas dilepas dan gambar statis kembali tampil. */
      canvas.addEventListener(
        "webglcontextlost",
        (e) => {
          e.preventDefault();
          cleanup();
        },
        { once: true },
      );

      update();
    };

    start();
    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
