"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ADMIN_EMAIL = "admin@charity.org";
const ADMIN_PASSWORD = "Admin@123";
const AUTH_KEY = "charity-admin-auth";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const alreadyLoggedIn = window.sessionStorage.getItem(AUTH_KEY) === "true";
    if (alreadyLoggedIn) {
      router.replace("/services");
    }
  }, [router]);

  
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validEmail = email.trim().toLowerCase() === ADMIN_EMAIL;
    const validPassword = password === ADMIN_PASSWORD;

    if (!validEmail || !validPassword) {
      setError("Invalid email or password.");
      return;
    }

    window.sessionStorage.setItem(AUTH_KEY, "true");
    router.replace("/services");
  };

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden bg-[#1D7D67] bg-cover bg-center"
      style={{ backgroundImage: "url('/picture/login-bg.jpg')" }}
    >
      <div className="relative flex min-h-screen items-center justify-center px-6 py-10">
        <div className="h-[379px] w-full max-w-[610px] rounded-[36px] border border-white/35 bg-white/20 px-10 py-12 backdrop-blur-[2px]">
          <h1 className="text-center font-serif text-[30px] font-semibold leading-[40px] text-[#174637]">
            Admin Login
          </h1>

          <form onSubmit={handleSubmit} className="mx-auto mt-7 w-full space-y-5">
            <div>
              <label className="mb-2 block text-[28px] font-medium leading-[19px] text-[#2A3E37]">
                Email
              </label>
              <input
                type="email"
                autoComplete="username"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="example@gmail.com"
                className="h-[39px] w-full max-w-[530px] rounded-full border border-white/90 bg-white px-5 text-[17px] leading-[17px] text-zinc-700 outline-none placeholder:text-[17px] placeholder:leading-[17px] placeholder:text-zinc-400"
              />
            </div>
            <div>
              <label className="mb-2 block text-[28px] font-medium leading-[19px] text-[#2A3E37]">
                Password
              </label>
              <input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="******"
                className="h-[39px] w-full max-w-[530px] rounded-full border border-white/90 bg-white px-5 text-[17px] leading-[17px] text-zinc-700 outline-none placeholder:text-[17px] placeholder:leading-[17px] placeholder:text-zinc-400"
              />
            </div>

            {error ? (
              <p className="rounded-xl bg-red-100/90 px-4 py-2 text-base text-red-700">{error}</p>
            ) : null}

            <button
              type="submit"
              className="h-[39px] w-full max-w-[530px] rounded-full bg-[#268257] text-[19px] font-medium leading-[19px] text-white transition hover:bg-[#206f4a]"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
