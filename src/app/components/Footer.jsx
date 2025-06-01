"use client";

import { SignInButton } from "@clerk/nextjs";

const Footer = () => {
  return (
    <section className="bg-[#252525] text-[#8F8997] flex flex-col lg:flex-row justify-between gap-10 px-6 sm:px-10 lg:px-20 py-10 w-full text-center lg:text-left">
      <div className="flex-1 mb-10 lg:mb-0">
        <h1 className="text-[#F5F5F5] text-3xl mb-5">KONTAKT</h1>
        <h2 className="text-[#F5F5F5] text-2xl mb-2">ADRESSE</h2>
        <p>Sølvgade</p>
        <p>1307 København K</p>
        <p className="mb-5">Danmark</p>
        <h2 className="text-[#F5F5F5] text-2xl mb-2">TELEFON</h2>
        <p className="mb-5">+45 33 74 84 94</p>
        <h2 className="text-[#F5F5F5] text-2xl mb-2">EMAIL</h2>
        <p>billetter@smk.dk</p>
      </div>

      <div className="flex-1 mb-10 lg:mb-0">
        <h1 className="text-[#F5F5F5] text-3xl mb-5">LOGIN</h1>
        <SignInButton>
          <p className="cursor-pointer underline hover:text-white transition-colors duration-200">
            Kurator Login
          </p>
        </SignInButton>
      </div>

      <div className="flex-1">
        <h1 className="text-[#F5F5F5] text-3xl mb-5">ÅBNINGSTIDER</h1>
        <p className="mb-2">Tirsdag-Søndag: 10 - 18</p>
        <p className="mb-2">Onsdag: 10 - 20</p>
        <p className="mb-2">Mandag: Lukket</p>
      </div>
    </section>
  );
};

export default Footer;
