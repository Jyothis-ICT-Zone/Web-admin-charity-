"use client";

import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import { usePathname, useRouter } from "next/navigation";
import { adminNav } from "@/lib/routes";

const AUTH_KEY = "charity-admin-auth";

/** Figma: Playfair Display 600, 20px, line-height 100%, #3C2720; box 62×27 */
const adminWordmark = Playfair_Display({
  subsets: ["latin"],
  weight: "600",
});

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const logout = () => {
    window.sessionStorage.removeItem(AUTH_KEY);
    router.replace("/login");
  };

  return (
    <header className="rounded-2xl border border-[#23712780] bg-white px-4 py-3 shadow-sm">
      <div className="flex items-center gap-4">
        <p
          className={`${adminWordmark.className} inline-flex h-[27px] min-w-[62px] shrink-0 items-center text-[20px] leading-none tracking-normal text-[#3C2720]`}
        >
          Admin
        </p>

        <nav className="flex flex-1 items-center gap-2">
          {adminNav
            .filter((item) => item.href !== "/login")
            .map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "bg-[#268257] text-white"
                      : "text-zinc-700 hover:bg-zinc-100"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="grid h-[33px] w-[56px] shrink-0 place-items-center text-zinc-700 hover:bg-zinc-100"
            aria-label="Notifications"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/picture/notification.svg"
              alt=""
              className="h-[33px] w-[56px] object-contain object-center"
            />
          </button>
          <Link
            href="/settings"
            className={`grid h-[31px] w-[31px] shrink-0 place-items-center rounded-full transition-colors ${
              pathname === "/settings"
                ? "bg-[#268257] hover:bg-[#216844]"
                : "text-zinc-700 hover:bg-zinc-100"
            }`}
            aria-label="Settings"
            aria-current={pathname === "/settings" ? "page" : undefined}
          >
            {/* eslint-disable-next-line @next/next/no-img-element — Figma: gear 15×15 */}
            <img
              src="/picture/setting.svg"
              alt=""
              className={`h-[15px] w-[15px] object-contain object-center ${
                pathname === "/settings" ? "brightness-0 invert" : ""
              }`}
            />
          </Link>
          <button
            type="button"
            onClick={logout}
            className="grid h-[33px] w-[55px] shrink-0 place-items-center text-red-600 hover:bg-red-50"
            aria-label="Logout"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/picture/logout.svg"
              alt=""
              className="h-[33px] w-[55px] object-contain object-center"
            />
          </button>
        </div>
      </div>
    </header>
  );
}
