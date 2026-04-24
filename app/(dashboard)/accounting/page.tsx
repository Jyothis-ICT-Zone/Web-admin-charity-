"use client";

import { useEffect, useMemo, useState } from "react";
import { createAccounting, deleteAccounting, listAccounting, updateAccounting } from "@/lib/api/accounting";

type AccountingCard = {
  id: string;
  year: string;
  /** Shown in form preview after upload / when editing */
  pdfFileName?: string;
  /** Base64 data URL for user site iframe (same origin). */
  pdfDataUrl?: string | null;
};

const CARDS_PER_PAGE = 10;

const defaultCards: AccountingCard[] = Array.from({ length: 27 }, (_, index) => ({
  id: `fallback-${index + 1}`,
  year: "2020",
}));

export default function AdminAccountingPage() {
  const [items, setItems] = useState<AccountingCard[]>(defaultCards);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isSaveConfirmOpen, setIsSaveConfirmOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);
  /** When set, form is editing this card; when null, form is add mode */
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [titleValue, setTitleValue] = useState("");
  const [pdfName, setPdfName] = useState("");
  const [pdfDataUrl, setPdfDataUrl] = useState<string | null>(null);
  const [uploadInputKey, setUploadInputKey] = useState(0);

  const totalPages = Math.max(1, Math.ceil(items.length / CARDS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const visibleCards = useMemo(
    () =>
      items.slice(
        (safeCurrentPage - 1) * CARDS_PER_PAGE,
        safeCurrentPage * CARDS_PER_PAGE,
      ),
    [items, safeCurrentPage],
  );

  const refreshAccounting = () => {
    return listAccounting().then((res) => {
      setItems(
        (res.data || []).map((x) => ({
          id: x._id,
          year: x.title,
          pdfFileName: x.pdf ? "report.pdf" : undefined,
          pdfDataUrl: x.pdf || null,
        })),
      );
    });
  };

  useEffect(() => {
    refreshAccounting()
      .catch(() => {
        // keep fallback data
      })
      .finally(() => {});
  }, []);

  const closeAddModal = () => {
    setIsAddModalOpen(false);
    setIsPreviewOpen(false);
    setIsSaveConfirmOpen(false);
    setEditingItemId(null);
    setTitleValue("");
    setPdfName("");
    setPdfDataUrl(null);
    setUploadInputKey((prev) => prev + 1);
  };

  const openAddModal = () => {
    setIsPreviewOpen(false);
    setIsSaveConfirmOpen(false);
    setEditingItemId(null);
    setTitleValue("");
    setPdfName("");
    setPdfDataUrl(null);
    setUploadInputKey((prev) => prev + 1);
    setIsAddModalOpen(true);
  };

  const openEditModal = (card: AccountingCard) => {
    setIsPreviewOpen(false);
    setIsSaveConfirmOpen(false);
    const latest = items.find((item) => item.id === card.id) ?? card;
    setEditingItemId(latest.id);
    setTitleValue(latest.year);
    setPdfName(latest.pdfFileName ?? "");
    setPdfDataUrl(latest.pdfDataUrl ?? null);
    setUploadInputKey((prev) => prev + 1);
    setIsAddModalOpen(true);
  };

  const handleFormSubmit = () => {
    const trimmedTitle = titleValue.trim();
    if (!trimmedTitle) return;
    setIsPreviewOpen(false);
    setIsSaveConfirmOpen(true);
  };

  const confirmSave = async () => {
    const trimmedTitle = titleValue.trim();
    if (!trimmedTitle) return;

    const payload = {
      title: trimmedTitle,
      pdf: pdfDataUrl || "",
    };

    try {
      if (editingItemId !== null && !editingItemId.startsWith("fallback-")) {
        await updateAccounting(editingItemId, payload);
      } else {
        await createAccounting(payload);
      }
      await refreshAccounting();
      setIsSaveConfirmOpen(false);
      closeAddModal();
    } catch {
      // ignore API save failure
    }
  };

  const confirmDeleteCard = async () => {
    if (deleteItemId === null) return;
    if (deleteItemId.startsWith("fallback-")) {
      setItems((prev) => prev.filter((item) => item.id !== deleteItemId));
      setDeleteItemId(null);
      return;
    }
    try {
      await deleteAccounting(deleteItemId);
      await refreshAccounting();
      setDeleteItemId(null);
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
            className="mx-auto h-[169px] w-full max-w-[260px] overflow-hidden rounded-[28px] border border-zinc-300 bg-white p-3 shadow-sm"
          >
            <div className="flex h-[102px] flex-col items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/picture/accounting.svg" alt="Accounting PDF" className="h-[58px] w-[58px]" />
              <p className="mt-2 text-[15px] font-semibold leading-none text-[#1f4f2c]">{card.year}</p>
            </div>

            <div className="mt-2 flex items-center gap-[10px]">
              <button
                type="button"
                onClick={() => openEditModal(card)}
                className="flex h-[30px] flex-1 items-center justify-center gap-2 rounded-full border border-[#2E835E] bg-[#F9F5F0] text-[12px] font-medium text-[#2E835E]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/picture/edit.svg" alt="" className="h-[13px] w-[13px]" />
                Edit
              </button>
              <button
                type="button"
                onClick={() => setDeleteItemId(card.id)}
                className="grid h-[30px] w-[40px] place-items-center rounded-[14px] border border-red-400 bg-[#F9F5F0]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/picture/delete.svg" alt="Delete" className="h-[14px] w-[14px]" />
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

      {isAddModalOpen ? (
        <div className="fixed inset-0 z-40 grid place-items-center bg-black/45 px-4">
          <div className="w-full max-w-[612px] rounded-[24px] bg-white px-6 py-5 shadow-xl">
            <div className="mb-3 flex items-start justify-between">
              <h2 className="text-[24px] font-semibold leading-none text-[#268257]">
                {editingItemId !== null ? "Edit" : "Add"}
              </h2>
              <button
                type="button"
                onClick={closeAddModal}
                className="grid h-8 w-8 place-items-center rounded-md border border-zinc-200 text-zinc-600"
                aria-label="Close add form"
              >
                ×
              </button>
            </div>

            <div
              className="space-y-3"
              key={editingItemId === null ? "add" : `edit-${editingItemId}`}
            >
              <div className="space-y-2">
                <label className="block text-[14px] font-medium text-[#0f3b2f]">PDF</label>
                <label
                  htmlFor="accounting-pdf-upload"
                  className="flex h-[39px] w-full cursor-pointer items-center justify-center rounded-[40px] border border-dashed border-[#66B58F] px-5 text-[#7a7a7a]"
                >
                  <span className="text-[14px] leading-none">{pdfName || "Upload pdf here"}</span>
                  <input
                    key={uploadInputKey}
                    id="accounting-pdf-upload"
                    type="file"
                    accept="application/pdf"
                    className="hidden"
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (!file) {
                        setPdfName("");
                        setPdfDataUrl(null);
                        return;
                      }
                      setPdfName(file.name);
                      const reader = new FileReader();
                      reader.onload = () => {
                        const r = reader.result;
                        setPdfDataUrl(typeof r === "string" ? r : null);
                      };
                      reader.readAsDataURL(file);
                    }}
                  />
                </label>
              </div>

              {pdfName ? (
                <div className="flex items-start gap-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/picture/accounting.svg" alt="Selected PDF" className="h-[48px] w-[48px]" />
                  <div className="flex items-center gap-2">
                    <label
                      htmlFor="accounting-pdf-upload"
                      className="flex h-[21px] cursor-pointer items-center justify-center gap-1 rounded-[7px] border border-[#2E835E] bg-[#F9F5F0] px-3 text-[10px] font-medium text-[#2E835E]"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/picture/edit.svg" alt="" className="h-[9px] w-[9px]" />
                      Edit
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setPdfName("");
                        setPdfDataUrl(null);
                        setUploadInputKey((prev) => prev + 1);
                      }}
                      className="grid h-[21px] w-[21px] place-items-center rounded-[7px] border border-red-400 bg-[#F9F5F0]"
                      aria-label="Remove selected PDF"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/picture/delete.svg" alt="" className="h-[9px] w-[9px]" />
                    </button>
                  </div>
                </div>
              ) : null}

              <div className="space-y-1">
                <label className="block text-[13px] font-medium text-zinc-700">Title</label>
                <input
                  type="text"
                  value={titleValue}
                  onChange={(event) => setTitleValue(event.target.value)}
                  placeholder="Type here...."
                  className="h-[38px] w-full rounded-full border border-[#23712780] px-4 text-[12px] text-zinc-700 outline-none placeholder:text-zinc-400"
                />
              </div>

              <div className="mt-1 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsPreviewOpen(true)}
                  className="h-[38px] w-full rounded-full border border-[#268257] bg-[#F9F5F0] text-[13px] font-medium text-[#268257]"
                >
                  Preview
                </button>
                <button
                  type="button"
                  onClick={handleFormSubmit}
                  className="h-[38px] w-full rounded-full bg-[#268257] text-[13px] font-medium text-white"
                >
                  {editingItemId !== null ? "Save" : "Add"}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {isPreviewOpen ? (
        <div className="fixed inset-0 z-[45] grid place-items-center bg-black/45 px-4">
          <div className="w-full max-w-[430px] rounded-[24px] bg-white px-6 py-5 shadow-xl">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="text-[12px] text-zinc-500">User side preview</p>
                <h3 className="text-[18px] font-semibold text-[#1f4f2c]">Before save preview</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsPreviewOpen(false)}
                className="grid h-8 w-8 place-items-center rounded-md border border-zinc-200 text-zinc-600"
              >
                ×
              </button>
            </div>

            <article className="mx-auto h-[169px] w-full max-w-[260px] overflow-hidden rounded-[28px] border border-zinc-300 bg-white p-3 shadow-sm">
              <div className="flex h-[102px] flex-col items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/picture/accounting.svg" alt="Accounting PDF" className="h-[58px] w-[58px]" />
                <p className="mt-2 text-[15px] font-semibold leading-none text-[#1f4f2c]">
                  {titleValue.trim() || "Year preview"}
                </p>
              </div>
              <p className="truncate text-center text-[12px] text-[#2d8a62]">
                {pdfName || "PDF not selected"}
              </p>
            </article>

            <button
              type="button"
              onClick={() => setIsPreviewOpen(false)}
              className="mt-4 h-[38px] w-full rounded-full bg-[#268257] text-[13px] font-medium text-white"
            >
              Back to edit
            </button>
          </div>
        </div>
      ) : null}

      {isSaveConfirmOpen ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/45 px-4">
          <div className="w-full max-w-[430px] rounded-[24px] bg-white px-6 py-5 shadow-xl">
            <div className="mx-auto grid h-[36px] w-[36px] place-items-center rounded-full bg-[#268257] text-[20px] font-semibold leading-none text-white">
              ✓
            </div>
            <p className="mx-auto mt-4 max-w-[360px] text-center text-[16px] font-medium leading-[1.35] text-[#1a3d31]">
              Confirm save. This action will
              <br />
              permanently update the record.
            </p>
            <div className="mt-5 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setIsSaveConfirmOpen(false)}
                className="h-[38px] w-[108px] rounded-full bg-white text-[15px] font-medium leading-none text-[#1a3d31] ring-1 ring-zinc-200"
              >
                No
              </button>
              <button
                type="button"
                onClick={confirmSave}
                className="h-[38px] w-[108px] rounded-full bg-[#268257] text-[15px] font-medium leading-none text-white"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {deleteItemId !== null ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/45 px-4">
          <div className="w-full max-w-[430px] rounded-[24px] bg-white px-6 py-5 shadow-xl">
            <div className="mx-auto grid h-[36px] w-[36px] place-items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/picture/delete-form.svg" alt="" className="h-[30px] w-[30px]" />
            </div>
            <p className="mx-auto mt-4 max-w-[300px] text-center text-[16px] font-medium leading-[1.35] text-[#1a3d31]">
              This will permanently delete the item.
              <br />
              You can&apos;t recover it later.
            </p>
            <div className="mt-5 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setDeleteItemId(null)}
                className="h-[38px] w-[108px] rounded-full bg-white text-[15px] font-medium leading-none text-[#1a3d31] ring-1 ring-zinc-200"
              >
                No
              </button>
              <button
                type="button"
                onClick={confirmDeleteCard}
                className="h-[38px] w-[108px] rounded-full bg-[#ff0000] text-[15px] font-medium leading-none text-white"
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
