"use client";
import { useState } from "react";
import Image from "next/image";
import { IoSearchOutline } from "react-icons/io5";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = ({ title, bgColor = "#800000" }) => {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  return (
    <section
      className={`${isHome ? "absolute z-10" : "relative"} top-0 left-0 right-0 flex justify-between items-center text-white p-4 px-8`}
      style={{ backgroundColor: isHome ? "transparent" : bgColor }}>
      <div className="flex items-center gap-4">
        <Link href="/">
          <Image
            src="/img/SMK_MiniLogo_White.png"
            alt="Logo"
            width={240}
            height={82}
          />
        </Link>
        <h1 className="text-8xl font-thin">{title}</h1>
      </div>
      <div className="flex items-center gap-6">
        <div className="w-auto min-w-[300px]">
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
              onClick={toggleSearch}
            >
              <IoSearchOutline className="scale-150" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
