import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Sumber desain, bukan kode aplikasi: `support.js` adalah runtime
    // bawaan kanvas Claude Design dan tidak pernah ikut ter-build.
    "design/**",
    // Skrip build Node (CommonJS) — dijalankan manual, tidak masuk bundel.
    "scripts/**",
  ]),
]);

export default eslintConfig;
