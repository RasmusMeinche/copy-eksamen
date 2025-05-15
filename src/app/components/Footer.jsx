"use client";

import { SignInButton, SignUpButton } from "@clerk/nextjs";

const Footer = () => {
  return (
    <section className="bg-[#252525] text-[#8F8997] flex flex-row justify-between gap-10 px-20 py-10 w-full">
      <div>
        <h1 className="text-[#F5F5F5] text-3xl mb-5">KONTAKTINFORMATION</h1>
        <h2 className="text-[#F5F5F5] text-2xl mb-5">ADRESSE</h2>
        <p>Sølvgade</p>
        <p>1307 København K</p>
        <p className="mb-5">Danmark</p>
        <h2 className="text-[#F5F5F5] text-2xl mb-5">TELEFON</h2>
        <p className="mb-5">+45 33 74 84 94</p>
        <h2 className="text-[#F5F5F5] text-2xl mb-5">EMAIL</h2>
        <p>billetter@smk.dk</p>
      </div>
      <div>
        <h1 className="text-[#F5F5F5] text-3xl mb-5">LOGIN</h1>
        <SignInButton>
          <p className="cursor-pointer">Kurator Login</p>
        </SignInButton>
      </div>
      <div>
        <h1 className="text-[#F5F5F5] text-3xl mb-5">ÅBNINGSTIDER</h1>
        <p className="mb-2">Tirsdag-Søndag: 10 - 18</p>
        <p className="mb-2">Onsdag: 10 - 20</p>
        <p className="mb-2">Mandag: Lukket</p>
      </div>
    </section>
  );
};

export default Footer;
