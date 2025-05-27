import Image from "next/image";

const Hero = () => {
  return (
    <div className="relative w-screen h-screen">
      <Image
        src="/img/KMS402.png"
        alt="KMS402"
        fill
        style={{ objectFit: "cover" }}
      />
    </div>
  );
};

export default Hero;