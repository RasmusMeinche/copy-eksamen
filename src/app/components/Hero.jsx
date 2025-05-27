"use client";

import Image from "next/image";

const Hero = ({children}) => {

  const scroll = () => {
    window.scrollBy({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative w-screen h-screen z-0">
      <Image
        src="/img/KMS402.png"
        alt="KMS402"
        fill
        style={{ objectFit: "cover" }}
      />
      {children}
      <div className="absolute top-40 w-[70%] h-[70%] basis-[60%] border-t-8 border-b-8 border-r-8 border-white p-8 gap-4 justify-between z-10 text-white">
        <div className="py-10 px-10">
          <h1 className="text-5xl font-bold mb-4">Kommende events af SMK</h1>
          <h2 className="text-4xl font-thin mb-[25%]">I hele Danmark</h2>
          <button
            onClick={scroll}
            type="submit"
            className="text-3xl grid place-items-start items-end w-1/4 h-[60px] px-2 py-1.5 border hover:bg-white hover:border-0 hover:text-cyan-900 cursor-pointer">
            Se Events
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;