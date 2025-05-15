"use client";
import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#800000]">
      <div className="bg-white p-10 rounded shadow">
        <SignIn />
      </div>
    </div>
  );
}
