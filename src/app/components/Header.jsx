"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdLogout } from "react-icons/md";
import { SignedIn, SignedOut, useClerk } from "@clerk/nextjs";

const Header = ({ title, bgColor = "#800000" }) => {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { signOut } = useClerk();

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

        {/* Titel ændres baseret på login-status */}
        <SignedOut>
          <h1 className="font-thin text-[11cqw] sm:text-[3.8cqw] md:text-[5.2cqw] lg:text-[6.5cqw] xl:text-[7cqw] 2xl:text-[7.3cqw] leading-none relative sm:top-[-2px] md:top-[-2px] lg:top-[-5px] top-[-2px]">
            {title}
          </h1>
        </SignedOut>
        <SignedIn>
          <h1 className="font-thin text-3xl sm:text-3xl md:text-4xl lg:text-7xl xl:text-[7cqw] 2xl:text-[7.3cqw] leading-none relative sm:top-[-2px] md:top-[-2px] lg:top-[-5px] top-[-2px]">
            KURATOR
          </h1>
        </SignedIn>
      </div>

      {/* Log ud-knap (vises efter login) */}
      <SignedIn>
        <div className="mt-4 md:mt-0 flex items-center gap-4">
          <button
            onClick={() => signOut()}
            className="flex items-center gap-2 border border-white px-3 py-1 rounded hover:bg-white hover:text-[#800000] transition-colors"
          >
            <MdLogout className="text-xl" />
            Log ud
          </button>
        </div>
      </SignedIn>
    </section>
  );
};

export default Header;
