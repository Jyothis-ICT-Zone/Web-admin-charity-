"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { deleteContact, listContacts } from "@/lib/api/contact";

type ContactRow = {
  id: string;
  fullname: string;
  email: string;
  phone: string;
  message: string;
};

const ROWS_PER_PAGE = 10;

/** Strip trailing ellipsis (… or ... or ....) so the view modal shows clean full text. */
function stripTrailingEllipsis(text: string): string {
  return text
    .replace(/\u2026\s*$/u, "")
    .replace(/\.{3,}\s*$/u, "")
    .trimEnd();
}

const sampleMessage =
  "We're looking for a comprehensive CRM solution that can integrate with our existing ERP system. Our main pain points are lead tracking and customer communication management. We need something scalable that can grow with our business.";

/** Demo data — same row content as design (ids differ for keys / delete). */
const defaultRows: ContactRow[] = Array.from({ length: 27 }, (_, index) => ({
  id: `fallback-${index + 1}`,
  fullname: "Kishana Aloe",
  email: "example@gmail.com",
  phone: "07775512445",
  message: sampleMessage,
}));

function EyeIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function AtIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden>
      <circle cx="12" cy="12" r="4" />
      <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function ChatIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

/** View modal design tokens (match screenshot) */
const VIEW_BG = "#fcfaf7";
const VIEW_GREEN = "#2d5a3f";
const VIEW_MINT_ICON = "#e8f5f0";
/** Green outline ~50% opacity (#268257 + 80 alpha) — inline style fallback if Tailwind arbitrary misses */
const VIEW_BORDER_STYLE = { borderColor: "#26825780" as const };

function DetailCard({
  icon,
  label,
  children,
  multiline,
  className,
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
  multiline?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[30px] border border-solid bg-white px-5 py-5 shadow-[0_1px_3px_rgba(45,90,63,0.06)] ${className ?? ""}`}
      style={VIEW_BORDER_STYLE}
    >
      <div className="flex items-start gap-4">
        <div
          className="grid h-11 w-11 shrink-0 place-items-center rounded-xl [&>svg]:h-[22px] [&>svg]:w-[22px]"
          style={{ backgroundColor: VIEW_MINT_ICON, color: VIEW_GREEN }}
        >
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-bold text-zinc-900">{label}</p>
          {multiline ? (
            <p className="mt-2 max-w-full break-words whitespace-pre-wrap text-[13px] font-normal leading-relaxed text-zinc-600">
              {children}
            </p>
          ) : (
            <p className="mt-2 text-[14px] font-normal text-zinc-600">{children}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdminContactPage() {
  const [rows, setRows] = useState<ContactRow[]>(defaultRows);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewRow, setViewRow] = useState<ContactRow | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter(
      (r) =>
        r.fullname.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q) ||
        r.phone.includes(q) ||
        r.message.toLowerCase().includes(q),
    );
  }, [rows, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ROWS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);

  const pageRows = useMemo(
    () =>
      filtered.slice((safePage - 1) * ROWS_PER_PAGE, safePage * ROWS_PER_PAGE),
    [filtered, safePage],
  );

  const refreshContacts = () => {
    return listContacts().then((res) => {
      setRows(
        (res.data || []).map((x) => ({
          id: x._id,
          fullname: x.fullName,
          email: x.email,
          phone: x.phone || "",
          message: x.message,
        })),
      );
    });
  };

  useEffect(() => {
    refreshContacts()
      .catch(() => {
        // keep fallback data
      })
      .finally(() => {});
  }, []);

  const confirmDelete = async () => {
    if (deleteId === null) return;
    if (deleteId.startsWith("fallback-")) {
      setRows((prev) => prev.filter((r) => r.id !== deleteId));
      if (viewRow?.id === deleteId) setViewRow(null);
      setDeleteId(null);
      return;
    }
    try {
      await deleteContact(deleteId);
      await refreshContacts();
      if (viewRow?.id === deleteId) setViewRow(null);
      setDeleteId(null);
    } catch {
      // ignore API delete failure
    }
  };

  return (
    <section className="space-y-5">
      <div className="flex items-center gap-2">
        <div className="flex h-[40px] flex-1 items-center rounded-full border border-[#23712780] bg-transparent px-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/picture/search.svg" alt="" className="h-4 w-4" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search"
            className="ml-2 w-full bg-transparent text-sm text-zinc-700 outline-none placeholder:text-zinc-500"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-[30px] border border-[#26825780] bg-zinc-50/80 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-transparent">
                <th className="whitespace-nowrap border-b border-[#26825780] px-5 py-3.5 text-[13px] font-medium text-zinc-500 first:border-l last:border-r">
                  Fullname
                </th>
                <th className="whitespace-nowrap border-b border-[#26825780] px-5 py-3.5 text-[13px] font-medium text-zinc-500 first:border-l last:border-r">
                  Email
                </th>
                <th className="whitespace-nowrap border-b border-[#26825780] px-5 py-3.5 text-[13px] font-medium text-zinc-500 first:border-l last:border-r">
                  Phone number
                </th>
                <th className="min-w-[220px] border-b border-[#26825780] px-5 py-3.5 text-[13px] font-medium text-zinc-500 first:border-l last:border-r">
                  Message
                </th>
                <th className="whitespace-nowrap border-b border-[#26825780] px-5 py-3.5 text-right text-[13px] font-medium text-zinc-500 first:border-l last:border-r">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {pageRows.map((row) => (
                <tr key={row.id}>
                  <td className="border-b border-[#26825780] px-5 py-3.5 text-[13px] text-zinc-800 first:border-l last:border-r">
                    {row.fullname}
                  </td>
                  <td className="border-b border-[#26825780] px-5 py-3.5 text-[13px] text-zinc-700 first:border-l last:border-r">
                    {row.email}
                  </td>
                  <td className="border-b border-[#26825780] px-5 py-3.5 text-[13px] text-zinc-800 first:border-l last:border-r">
                    {row.phone}
                  </td>
                  <td className="max-w-[min(360px,50vw)] border-b border-[#26825780] px-5 py-3.5 text-[13px] text-zinc-700 first:border-l last:border-r">
                    <span className="block truncate">{row.message}</span>
                  </td>
                  <td className="border-b border-[#26825780] px-5 py-3.5 first:border-l last:border-r">
                    <div className="flex items-center justify-end gap-2.5">
                      <button
                        type="button"
                        onClick={() => setViewRow(row)}
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] border-2 border-[#1f4f2c] bg-[#F9F5F0] text-[#1f4f2c] shadow-sm"
                        aria-label="View message"
                      >
                        <EyeIcon className="h-[17px] w-[17px]" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteId(row.id)}
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] border-2 border-[#ef4444] bg-[#F9F5F0] shadow-sm"
                        aria-label="Delete"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/picture/delete.svg" alt="" className="h-[15px] w-[15px]" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {pageRows.length === 0 ? (
          <p className="px-4 py-8 text-center text-sm text-zinc-500">No results.</p>
        ) : null}
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={safePage === 1}
          className="grid h-8 w-8 place-items-center rounded-md border border-zinc-200 bg-white text-zinc-600 disabled:opacity-40"
        >
          ‹
        </button>
        {Array.from({ length: totalPages }, (_, i) => {
          const n = i + 1;
          const active = n === safePage;
          return (
            <button
              key={n}
              type="button"
              onClick={() => setCurrentPage(n)}
              className={`h-8 min-w-[2rem] rounded-md px-3 text-sm ${
                active
                  ? "bg-[#268257] font-medium text-white"
                  : "border border-zinc-200 bg-white text-zinc-700"
              }`}
            >
              {n}
            </button>
          );
        })}
        <button
          type="button"
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={safePage === totalPages}
          className="grid h-8 w-8 place-items-center rounded-md border border-zinc-200 bg-white text-zinc-600 disabled:opacity-40"
        >
          ›
        </button>
      </div>

      {viewRow ? (
        <div className="fixed inset-0 z-[60] overflow-y-auto overflow-x-hidden bg-black/45 px-4 py-8 backdrop-blur-[2px] sm:py-10">
          <div className="mx-auto w-full max-w-2xl pb-8">
            <div
              className="overflow-hidden border border-solid shadow-xl"
              style={{
                backgroundColor: VIEW_BG,
                borderRadius: "30px",
                ...VIEW_BORDER_STYLE,
                borderWidth: 1,
              }}
            >
              <div
                className="flex items-center justify-between gap-3 px-6 py-5"
                style={{
                  backgroundColor: VIEW_BG,
                  borderBottom: "1px solid #26825780",
                }}
              >
                <h2
                  className="font-serif text-2xl font-bold tracking-tight"
                  style={{ color: VIEW_GREEN }}
                >
                  Message
                </h2>
                <button
                  type="button"
                  onClick={() => setViewRow(null)}
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-md border border-solid bg-white text-lg leading-none text-zinc-600 shadow-sm"
                  style={VIEW_BORDER_STYLE}
                  aria-label="Close"
                >
                  ×
                </button>
              </div>
              <div className="space-y-4 p-6 pb-8" style={{ backgroundColor: VIEW_BG }}>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <DetailCard icon={<UserIcon />} label="Fullname">
                    {viewRow.fullname}
                  </DetailCard>
                  <DetailCard icon={<AtIcon />} label="Email">
                    {viewRow.email}
                  </DetailCard>
                  <DetailCard icon={<PhoneIcon />} label="Phone number">
                    {viewRow.phone}
                  </DetailCard>
                </div>
                <DetailCard icon={<ChatIcon />} label="Message" multiline>
                  {stripTrailingEllipsis(viewRow.message)}
                </DetailCard>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {deleteId !== null ? (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-black/50 px-4 backdrop-blur-[2px]">
          <div className="w-full max-w-[430px] rounded-[20px] border border-black/[0.06] bg-[#F9F5F0] px-7 py-6 shadow-xl">
            <div className="mx-auto flex h-12 w-12 items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/picture/delete-form.svg" alt="" className="h-10 w-10" />
            </div>
            <p className="mx-auto mt-5 max-w-[300px] text-center text-[15px] font-medium leading-[1.45] text-[#1a3d31]">
              This will permanently delete the item. You can’t recover it later.
             
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setDeleteId(null)}
                className="h-[40px] min-w-[108px] rounded-full bg-white px-6 text-[15px] font-medium leading-none text-[#1a3d31] shadow-sm ring-1 ring-zinc-200/80"
              >
                No
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="h-[40px] min-w-[108px] rounded-full bg-[#ef4444] px-6 text-[15px] font-medium leading-none text-white shadow-sm"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
