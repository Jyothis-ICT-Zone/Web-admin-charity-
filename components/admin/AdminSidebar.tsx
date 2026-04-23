"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import { usePathname, useRouter } from "next/navigation";
import { adminNav } from "@/lib/routes";
import { clearAdminSession } from "@/lib/auth/session";
import { getContactNotifications, markContactNotificationsRead, type ContactDto } from "@/lib/api/contact";

/** Figma: Playfair Display 600, 20px, line-height 100%, #3C2720; box 62×27 */
const adminWordmark = Playfair_Display({
  subsets: ["latin"],
  weight: "600",
});

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState<ContactDto[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchNotifications = () => {
    getContactNotifications()
      .then((res) => {
        setNotifications(res.data || []);
        setUnreadCount(res.unreadCount || 0);
      })
      .catch(() => {
        setNotifications([]);
        setUnreadCount(0);
      });
  };

  useEffect(() => {
    fetchNotifications();
    const timer = window.setInterval(fetchNotifications, 15000);
    return () => window.clearInterval(timer);
  }, []);

  const logout = () => {
    clearAdminSession();
    router.replace("/login");
  };

  const openNotifications = () => {
    setIsNotificationOpen((prev) => !prev);
    if (!isNotificationOpen) fetchNotifications();
  };

  const closeNotifications = () => {
    setIsNotificationOpen(false);
  };

  const openContactPageFromNotification = async () => {
    try {
      await markContactNotificationsRead();
    } catch {
      // ignore mark-as-read error
    }
    setUnreadCount(0);
    setNotifications([]);
    setIsNotificationOpen(false);
    router.push("/contact");
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
          <div className="relative">
            <button
              type="button"
              onClick={openNotifications}
              className="relative grid h-[33px] w-[33px] shrink-0 place-items-center rounded-full text-zinc-700 hover:bg-zinc-100"
              aria-label="Notifications"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-[20px] w-[20px]"
                aria-hidden
              >
                <path d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 1 0-12 0v3.2a2 2 0 0 1-.6 1.4L4 17h5" />
                <path d="M9.5 17a2.5 2.5 0 0 0 5 0" />
              </svg>
              {unreadCount > 0 ? (
                <span className="absolute -right-1 -top-1 min-w-[18px] rounded-full bg-red-500 px-1 text-center text-[10px] font-semibold leading-[18px] text-white">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              ) : null}
            </button>

            {isNotificationOpen ? (
              <div className="absolute right-0 z-80 mt-2 w-[320px] rounded-xl border border-[#23712780] bg-white p-2 shadow-xl">
                <div className="mb-1 flex items-center justify-between px-2 py-1">
                  <p className="text-sm font-semibold text-[#1f4f2c]">Notifications</p>
                  <div className="flex items-center gap-2">
                    {notifications.length > 0 ? (
                      <button
                        type="button"
                        onClick={openContactPageFromNotification}
                        className="text-[11px] font-medium text-[#268257] hover:underline"
                      >
                        View all
                      </button>
                    ) : null}
                    <button
                      type="button"
                      onClick={closeNotifications}
                      className="grid h-5 w-5 place-items-center rounded-md text-sm leading-none text-zinc-500 hover:bg-zinc-100"
                      aria-label="Close notifications"
                    >
                      ×
                    </button>
                  </div>
                </div>

                {notifications.length === 0 ? (
                  <p className="px-2 py-5 text-center text-xs text-zinc-500">No new notifications</p>
                ) : (
                  <div className="max-h-[260px] space-y-1 overflow-y-auto">
                    {notifications.map((item) => (
                      <button
                        key={item._id}
                        type="button"
                        onClick={openContactPageFromNotification}
                        className="block w-full rounded-lg border border-zinc-200 px-3 py-2 text-left hover:bg-zinc-50"
                      >
                        <p className="truncate text-xs font-semibold text-[#1f4f2c]">{item.fullName}</p>
                        <p className="truncate text-[11px] text-zinc-600">{item.message}</p>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : null}
          </div>
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
            {/* eslint-disable-next-line @next/next/no-img-element */}
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
