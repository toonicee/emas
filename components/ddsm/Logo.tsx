import Image from "next/image";

const SRC_WIDTH = 900;
const SRC_HEIGHT = 299;

export function Logo({
  height,
  className,
  eager = false,
}: {
  height: number;
  className?: string;
  eager?: boolean;
}) {
  return (
    <Image
      src="/images/ddsm/logo-gold.png"
      alt="DDSM — Duta Dana Sukses Makmur"
      width={Math.round((height * SRC_WIDTH) / SRC_HEIGHT)}
      height={height}
      loading={eager ? "eager" : "lazy"}
      className={className}
    />
  );
}
