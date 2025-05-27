import Image from "next/image";

const Hero = ({children}) => {
  return (
    <div className="relative w-screen h-screen z-0">
      <Image
        src="/img/KMS402.png"
        alt="KMS402"
        fill
        style={{ objectFit: "cover" }}
      />
      {children}
    </div>
  );
};

export default Hero;