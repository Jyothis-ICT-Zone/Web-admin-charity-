"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { loginAdmin } from "@/lib/api/auth";
import { isAdminLoggedIn, setAdminSession } from "@/lib/auth/session";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const alreadyLoggedIn = isAdminLoggedIn();
    if (alreadyLoggedIn) {
      router.replace("/services");
    }
  }, [router]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setError("");
      const res = await loginAdmin(email.trim().toLowerCase(), password);
      setAdminSession(res.token);
      router.replace("/services");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid email or password.");
    }
  };

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden bg-[#1D7D67] bg-cover bg-center"
      style={{ backgroundImage: "url('/picture/login-bg.jpg')" }}
    >
      <div className="relative flex min-h-screen items-center justify-center px-6 py-10">
        <div className="min-h-[430px] w-full max-w-[610px] rounded-[36px] border border-white/35 bg-white/20 px-10 py-12 backdrop-blur-[2px]">
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
              <div className="relative w-full max-w-[530px]">
                <input
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="******"
                  className="h-[39px] w-full rounded-full border border-white/90 bg-white px-5 pr-12 text-[17px] leading-[17px] text-zinc-700 outline-none placeholder:text-[17px] placeholder:leading-[17px] placeholder:text-zinc-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 transition hover:text-zinc-700"
                >
                  {showPassword ? (
                    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
                      <path
                        d="M3 3L21 21M10.58 10.58C10.21 10.95 10 11.46 10 12C10 13.1 10.9 14 12 14C12.54 14 13.05 13.79 13.42 13.42M9.88 5.09C10.56 4.86 11.27 4.75 12 4.75C16.5 4.75 20.31 8.06 21.25 12C20.86 13.63 19.98 15.08 18.74 16.17M14.12 18.91C13.44 19.14 12.73 19.25 12 19.25C7.5 19.25 3.69 15.94 2.75 12C3.14 10.37 4.02 8.92 5.26 7.83"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
                      <path
                        d="M2.75 12C3.69 8.06 7.5 4.75 12 4.75C16.5 4.75 20.31 8.06 21.25 12C20.31 15.94 16.5 19.25 12 19.25C7.5 19.25 3.69 15.94 2.75 12Z"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle cx="12" cy="12" r="3.25" stroke="currentColor" strokeWidth="1.8" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="min-h-[52px]">
              {error ? (
                <p className="rounded-xl bg-red-100/90 px-4 py-2 text-base text-red-700">{error}</p>
              ) : null}
            </div>

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
