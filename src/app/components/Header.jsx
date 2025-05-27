"use client";
import Image from "next/image";
import { IoSearchOutline } from "react-icons/io5";
import Link from "next/link";

const Header = ({
  title,
  bgColor = "#800000",
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <section
      className="relative flex flex-col md:flex-row justify-between items-center text-white p-4 px-4 md:px-8"
      style={{ backgroundColor: bgColor }}
    >
      {/* Logo + Titel container */}
      <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 w-full md:w-auto mb-4 md:mb-0">
        <Link href="/">
          <Image
            src="/img/SMK_MiniLogo_White.png"
            alt="Logo"
            width={240}
            height={82}
            priority
          />
        </Link>
        <h1
          className="font-thin whitespace-nowrap text-white
          text-[70px] leading-[60px] md:text-[115px] md:leading-[115px]"
        >
          {title}
        </h1>
      </div>

      {/* Søgefelt */}
      <div className="w-full md:w-auto min-w-[0] md:min-w-[300px]">
        <div className="relative">
          <input
            className="w-full bg-transparent placeholder:text-white focus:placeholder-transparent text-white text-sm border-2 border-slate-200 pl-3 pr-12 py-2 transition duration-300 ease focus:outline-none shadow-sm"
            placeholder="Søg i events og værker..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="button"
            className="absolute top-1 right-1 bottom-1 w-10 flex items-center justify-center rounded text-white text-sm hover:scale-105"
          >
            <IoSearchOutline className="scale-150" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Header;
