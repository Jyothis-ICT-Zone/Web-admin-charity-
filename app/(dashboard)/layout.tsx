"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

const AUTH_KEY = "charity-admin-auth";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const loggedIn = window.sessionStorage.getItem(AUTH_KEY) === "true";
    if (!loggedIn) {
      router.replace("/login");
      return;
    }
    setReady(true);
  }, [router]);

  if (!ready) {
    return (
      <div className="flex min-h-full flex-1 items-center justify-center bg-white text-sm text-zinc-600">
        Checking authentication...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f1f1f1] p-6">
      <AdminSidebar />
      <main className="mt-5">
        {children}
      </main>
    </div>
  );
}
