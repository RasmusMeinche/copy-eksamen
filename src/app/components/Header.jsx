"use client";
import React, { useState } from "react";
import Image from "next/image";
import { IoSearchOutline } from "react-icons/io5";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = ({ title, bgColor = "#800000" }) => {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [searchQuery, setSearchQuery] = useState("");

  return (
    <section
      className={`${
        isHome ? "absolute z-10" : "relative"
      } top-0 left-0 right-0 flex flex-col md:flex-row justify-between items-center text-white p-4 px-4 md:px-8 @container`}
      style={{ backgroundColor: isHome ? "transparent" : bgColor }}
    >
      {/* Logo + Title */}
      <div className="flex md:flex-row items-center gap-2 md:gap-4 md:mb-0 overflow-hidden h-[10cqw] relative">
        <Link href="/">
          <Image
            src="/img/SMK_MiniLogo_White.png"
            alt="Logo"
            width={240}
            height={82}
            priority
            className="flex w-auto h-[22px] sm:h-[22px] md:h-[32px] lg:h-[52px] xl:h-[72px] 2xl:h-[82px] max-h-[82px]"
          />
        </Link>
        <h1
          className="font-thin text-[11cqw] sm:text-[3.8cqw] md:text-[5.2cqw] lg:text-[6.5cqw] xl:text-[7cqw] 2xl:text-[7.3cqw] leading-none relative sm:top-[-2px] md:top-[-2px] lg:top-[-5px] top-[-2px]"
        >
          {title}
        </h1>
      </div>

      {/* Search Field */}
      <div className="w-full md:w-auto min-w-[0] md:min-w-[300px] mt-4 md:mt-0 relative">
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
    </section>
  );
};

export default Header;
