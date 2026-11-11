import Image from "next/image";

function Logo({
  width = 70,
  height = 60,
}: {
  width?: number;
  height?: number;
}) {
  return (
    <Image
      src="/logo.png"
      alt="Yaravaliha Logo"
      width={width}
      height={height}
    />
  );
}

export default Logo;
