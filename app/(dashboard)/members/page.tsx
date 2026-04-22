"use client";

import { useEffect, useMemo, useState } from "react";
import { dispatchCharityDataUpdated } from "@/lib/charity-sync";

type MemberCard = {
  id: number;
  name: string;
  role: string;
};

const CARDS_PER_PAGE = 10;
const MEMBERS_STORAGE_KEY = "charity-admin-members-v1";

const defaultMembers: MemberCard[] = Array.from({ length: 27 }, (_, index) => ({
  id: index + 1,
  name: "திரு. கணேசன்",
  role: "தலைவர் (President)",
}));

export default function AdminMembersPage() {
  const [items, setItems] = useState<MemberCard[]>(defaultMembers);
  const [hasLoadedItems, setHasLoadedItems] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSaveConfirmOpen, setIsSaveConfirmOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState<number | null>(null);
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const [nameValue, setNameValue] = useState("");
  const [roleValue, setRoleValue] = useState("");

  const filteredItems = useMemo(() => {
    const q = searchQuery.trim();
    if (!q) return items;
    return items.filter((m) => m.name.includes(q) || m.role.includes(q));
  }, [items, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / CARDS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const visibleCards = useMemo(
    () =>
      filteredItems.slice(
        (safeCurrentPage - 1) * CARDS_PER_PAGE,
        safeCurrentPage * CARDS_PER_PAGE,
      ),
    [filteredItems, safeCurrentPage],
  );

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(MEMBERS_STORAGE_KEY);
      if (raw !== null) {
        const parsed = JSON.parse(raw) as MemberCard[];
        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      }
    } catch {
      // Ignore malformed storage.
    } finally {
      setHasLoadedItems(true);
    }
  }, []);

  useEffect(() => {
    if (!hasLoadedItems) return;
    try {
      window.localStorage.setItem(MEMBERS_STORAGE_KEY, JSON.stringify(items));
      dispatchCharityDataUpdated();
    } catch {
      // Ignore storage write failures.
    }
  }, [items, hasLoadedItems]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const closeFormModal = () => {
    setIsFormOpen(false);
    setIsSaveConfirmOpen(false);
    setEditingItemId(null);
    setNameValue("");
    setRoleValue("");
  };

  const openAddModal = () => {
    setIsSaveConfirmOpen(false);
    setEditingItemId(null);
    setNameValue("");
    setRoleValue("");
    setIsFormOpen(true);
  };

  const openEditModal = (card: MemberCard) => {
    setIsSaveConfirmOpen(false);
    const latest = items.find((item) => item.id === card.id) ?? card;
    setEditingItemId(latest.id);
    setNameValue(latest.name);
    setRoleValue(latest.role);
    setIsFormOpen(true);
  };

  const handleFormSubmit = () => {
    const name = nameValue.trim();
    const role = roleValue.trim();
    if (!name || !role) return;
    setIsSaveConfirmOpen(true);
  };

  const confirmSave = () => {
    const name = nameValue.trim();
    const role = roleValue.trim();
    if (!name || !role) return;

    if (editingItemId !== null) {
      setItems((prev) =>
        prev.map((item) =>
          item.id === editingItemId ? { ...item, name, role } : item,
        ),
      );
    } else {
      const nextId = items.length ? Math.max(...items.map((item) => item.id)) + 1 : 1;
      setItems((prev) => [...prev, { id: nextId, name, role }]);
    }

    setIsSaveConfirmOpen(false);
    closeFormModal();
  };

  const confirmDeleteCard = () => {
    if (deleteItemId === null) return;
    setItems((prev) => prev.filter((item) => item.id !== deleteItemId));
    setDeleteItemId(null);
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
        <button
          type="button"
          onClick={openAddModal}
          className="h-[40px] rounded-full bg-[#268257] px-5 text-sm font-medium text-white"
        >
          Add
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {visibleCards.map((card) => (
          <article
            key={card.id}
            className="mx-auto flex h-[169px] w-full max-w-[260px] flex-col overflow-hidden rounded-[26px] border border-zinc-300 bg-white px-3 py-[10px] shadow-sm"
          >
            <div className="flex h-[98px] flex-col items-center justify-center px-1 text-center">
              <h3 className="text-[17px] font-semibold leading-tight text-[#1f4f2c]">{card.name}</h3>
              <p className="mt-1 text-[14px] font-normal leading-tight text-[#2d8a62]">{card.role}</p>
            </div>

            <div className="mt-2 flex items-center gap-[8px]">
              <button
                type="button"
                onClick={() => openEditModal(card)}
                className="flex h-[36px] flex-1 items-center justify-center gap-2 rounded-full border border-[#2E835E] bg-[#F9F5F0] text-[11px] font-medium text-[#2E835E]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/picture/edit.svg" alt="" className="h-[12px] w-[12px]" />
                Edit
              </button>
              <button
                type="button"
                onClick={() => setDeleteItemId(card.id)}
                className="grid h-[36px] w-[50px] place-items-center rounded-[16px] border border-red-400 bg-[#F9F5F0]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/picture/delete.svg" alt="Delete" className="h-[15px] w-[15px]" />
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          disabled={safeCurrentPage === 1}
          className="grid h-8 w-8 place-items-center rounded-md bg-white text-zinc-600 disabled:opacity-40"
        >
          ‹
        </button>
        {Array.from({ length: totalPages }, (_, index) => {
          const pageNumber = index + 1;
          const active = pageNumber === safeCurrentPage;
          return (
            <button
              key={pageNumber}
              type="button"
              onClick={() => setCurrentPage(pageNumber)}
              className={`h-8 rounded-md px-4 text-sm ${
                active ? "bg-[#268257] font-medium text-white" : "bg-white text-zinc-700"
              }`}
            >
              {pageNumber}
            </button>
          );
        })}
        <button
          type="button"
          onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
          disabled={safeCurrentPage === totalPages}
          className="grid h-8 w-8 place-items-center rounded-md bg-white text-zinc-600 disabled:opacity-40"
        >
          ›
        </button>
      </div>

      {isFormOpen ? (
        <div className="fixed inset-0 z-40 grid place-items-center bg-black/45 px-4 backdrop-blur-[2px]">
          <div className="w-full max-w-[612px] rounded-[28px] border border-black/[0.06] bg-[#F9F5F0] px-8 py-7 shadow-xl">
            <div className="mb-5 flex items-start justify-between">
              <h2 className="text-[26px] font-semibold leading-none text-[#268257]">
                {editingItemId !== null ? "Edit" : "Add"}
              </h2>
              <button
                type="button"
                onClick={closeFormModal}
                className="grid h-9 w-9 place-items-center rounded-full border border-zinc-300 bg-white/80 text-lg leading-none text-zinc-600"
                aria-label="Close form"
              >
                ×
              </button>
            </div>

            <div className="space-y-4" key={editingItemId === null ? "add" : `edit-${editingItemId}`}>
              <div className="space-y-2">
                <label className="block text-[14px] font-medium text-[#268257]">Name</label>
                <input
                  type="text"
                  value={nameValue}
                  onChange={(e) => setNameValue(e.target.value)}
                  placeholder="Type here..."
                  className="h-[42px] w-full rounded-full border border-[#23712780] bg-white px-5 text-[13px] text-zinc-800 outline-none placeholder:text-zinc-400"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-[14px] font-medium text-[#268257]">Position</label>
                <input
                  type="text"
                  value={roleValue}
                  onChange={(e) => setRoleValue(e.target.value)}
                  placeholder="Type here..."
                  className="h-[42px] w-full rounded-full border border-[#23712780] bg-white px-5 text-[13px] text-zinc-800 outline-none placeholder:text-zinc-400"
                />
              </div>

              <button
                type="button"
                onClick={handleFormSubmit}
                className="mt-2 h-[42px] w-full rounded-full bg-[#268257] text-[14px] font-medium text-white shadow-sm transition hover:bg-[#206f4a]"
              >
                {editingItemId !== null ? "Save" : "Add"}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {isSaveConfirmOpen ? (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-black/50 px-4 backdrop-blur-[2px]">
          <div className="w-full max-w-[430px] rounded-[20px] border border-black/[0.06] bg-[#F9F5F0] px-7 py-6 shadow-xl">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[#268257] text-[22px] font-semibold leading-none text-white">
              ✓
            </div>
            <p className="mx-auto mt-5 max-w-[320px] text-center text-[15px] font-medium leading-[1.45] text-[#1a3d31]">
              Confirm save. This action will
              <br />
              permanently update the record.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setIsSaveConfirmOpen(false)}
                className="h-[40px] min-w-[108px] rounded-full bg-white px-6 text-[15px] font-medium leading-none text-[#1a3d31] shadow-sm ring-1 ring-zinc-200/80"
              >
                No
              </button>
              <button
                type="button"
                onClick={confirmSave}
                className="h-[40px] min-w-[108px] rounded-full bg-[#268257] px-6 text-[15px] font-medium leading-none text-white shadow-sm"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {deleteItemId !== null ? (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-black/50 px-4 backdrop-blur-[2px]">
          <div className="w-full max-w-[430px] rounded-[20px] border border-black/[0.06] bg-[#F9F5F0] px-7 py-6 shadow-xl">
            <div className="mx-auto flex h-12 w-12 items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/picture/delete-form.svg" alt="" className="h-10 w-10" />
            </div>
            <p className="mx-auto mt-5 max-w-[300px] text-center text-[15px] font-medium leading-[1.45] text-[#1a3d31]">
              This will permanently delete the item.
              <br />
              You can&apos;t recover it later.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setDeleteItemId(null)}
                className="h-[40px] min-w-[108px] rounded-full bg-white px-6 text-[15px] font-medium leading-none text-[#1a3d31] shadow-sm ring-1 ring-zinc-200/80"
              >
                No
              </button>
              <button
                type="button"
                onClick={confirmDeleteCard}
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
