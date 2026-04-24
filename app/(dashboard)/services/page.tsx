"use client";

import { ChangeEvent, MouseEvent as ReactMouseEvent, useEffect, useRef, useState } from "react";
import { createService, deleteService, listServices, updateService } from "@/lib/api/services";

function cropImageWithArea(
  source: string,
  cropX: number,
  cropY: number,
  cropSize: number,
  onDone: (result: string) => void,
) {
  const image = new Image();
  image.onload = () => {
    const sx = Math.max(0, Math.min(cropX, image.naturalWidth - cropSize));
    const sy = Math.max(0, Math.min(cropY, image.naturalHeight - cropSize));
    const side = Math.max(1, Math.min(cropSize, image.naturalWidth, image.naturalHeight));

    const canvas = document.createElement("canvas");
    canvas.width = side;
    canvas.height = side;
    const context = canvas.getContext("2d");
    if (!context) return;

    context.drawImage(image, sx, sy, side, side, 0, 0, side, side);
    onDone(canvas.toDataURL("image/png"));
  };
  image.src = source;
}

type CropMode = "drag" | "resize" | null;
type CropTarget = "cover" | "gallery";
type ServiceItem = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  coverImage: string;
  galleryImages: string[];
  instagramLink?: string;
  facebookLink?: string;
  youtubeLink?: string;
};

const PREVIEW_SIZE = 360;
const CARDS_PER_PAGE = 10;
const DEFAULT_ITEMS: ServiceItem[] = Array.from({ length: 10 }, (_, index) => ({
  id: `fallback-${index + 1}`,
  title: "கல்வி உதவித்தொகை",
  subtitle: "அமரர் சின்னத்துரை அவர்களின் ......",
  description:
    "அமரர் சின்னத்துரை அவர்களின் நினைவாக கல்வித் திட்டம்: 500+ மாணவர்களுக்கு முழு கல்வி உதவி, மாதாந்திர வழிகாட்டுதல், கணினி ஆய்வகங்கள்.",
  coverImage: "/picture/project.jpg",
  galleryImages: ["/picture/view image.png", "/picture/view image.png", "/picture/view image.png", "/picture/view image.png"],
}));

export default function AdminServicesPage() {
  const [items, setItems] = useState<ServiceItem[]>(DEFAULT_ITEMS);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addStep, setAddStep] = useState<1 | 2>(1);
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);
  const [coverImageRaw, setCoverImageRaw] = useState<string | null>(null);
  const [coverImageCropped, setCoverImageCropped] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [titleValue, setTitleValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [instagramLink, setInstagramLink] = useState("");
  const [facebookLink, setFacebookLink] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isSaveConfirmOpen, setIsSaveConfirmOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);
  const [cropTarget, setCropTarget] = useState<CropTarget>("cover");
  const [coverImageWidth, setCoverImageWidth] = useState(1000);
  const [coverImageHeight, setCoverImageHeight] = useState(1000);
  const [cropX, setCropX] = useState(0);
  const [cropY, setCropY] = useState(0);
  const [cropSize, setCropSize] = useState(500);
  const [cropMode, setCropMode] = useState<CropMode>(null);
  const coverFileInputRef = useRef<HTMLInputElement | null>(null);
  const galleryFileInputRef = useRef<HTMLInputElement | null>(null);
  const dragStartRef = useRef({
    mouseX: 0,
    mouseY: 0,
    cropX: 0,
    cropY: 0,
    cropSize: 0,
  });
  const selectedItem = items.find((item) => item.id === selectedItemId) ?? null;
  const totalPages = Math.max(1, Math.ceil(items.length / CARDS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedItems = items.slice(
    (safeCurrentPage - 1) * CARDS_PER_PAGE,
    safeCurrentPage * CARDS_PER_PAGE,
  );

  const imageScale = Math.min(PREVIEW_SIZE / coverImageWidth, PREVIEW_SIZE / coverImageHeight);
  const displayWidth = coverImageWidth * imageScale;
  const displayHeight = coverImageHeight * imageScale;
  const offsetX = (PREVIEW_SIZE - displayWidth) / 2;
  const offsetY = (PREVIEW_SIZE - displayHeight) / 2;
  const cropLeft = offsetX + cropX * imageScale;
  const cropTop = offsetY + cropY * imageScale;
  const cropDisplaySize = cropSize * imageScale;

  const openFilePicker = () => {
    setCropTarget("cover");
    coverFileInputRef.current?.click();
  };

  const openGalleryPicker = () => {
    setCropTarget("gallery");
    galleryFileInputRef.current?.click();
  };

  const onCoverChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileReader = new FileReader();
    fileReader.onload = () => {
      const result = String(fileReader.result);
      setCoverImageRaw(result);

      const probe = new Image();
      probe.onload = () => {
        const width = probe.naturalWidth;
        const height = probe.naturalHeight;
        const initialSize = Math.floor(Math.min(width, height) * 0.7);
        setCoverImageWidth(width);
        setCoverImageHeight(height);
        setCropSize(initialSize);
        setCropX(Math.floor((width - initialSize) / 2));
        setCropY(Math.floor((height - initialSize) / 2));
        setIsCropModalOpen(true);
      };
      probe.src = result;
    };
    fileReader.readAsDataURL(file);
    event.target.value = "";
  };

  const onGalleryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileReader = new FileReader();
    fileReader.onload = () => {
      const result = String(fileReader.result);
      setCoverImageRaw(result);
      setCropTarget("gallery");

      const probe = new Image();
      probe.onload = () => {
        const width = probe.naturalWidth;
        const height = probe.naturalHeight;
        const initialSize = Math.floor(Math.min(width, height) * 0.7);
        setCoverImageWidth(width);
        setCoverImageHeight(height);
        setCropSize(initialSize);
        setCropX(Math.floor((width - initialSize) / 2));
        setCropY(Math.floor((height - initialSize) / 2));
        setIsCropModalOpen(true);
      };
      probe.src = result;
    };
    fileReader.readAsDataURL(file);
    event.target.value = "";
  };

  const applyCrop = () => {
    if (!coverImageRaw) return;
    cropImageWithArea(coverImageRaw, cropX, cropY, cropSize, (result) => {
      if (cropTarget === "cover") {
        setCoverImageCropped(result);
      } else {
        setGalleryImages((prev) => [...prev, result]);
      }
      setIsCropModalOpen(false);
    });
  };

  const removeGalleryImage = (indexToRemove: number) => {
    setGalleryImages((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const isStepOneValid =
    coverImageCropped !== null &&
    titleValue.trim().length > 0 &&
    descriptionValue.trim().length > 0 &&
    galleryImages.length > 0;

  const closeAllAddModals = () => {
    setIsPreviewOpen(false);
    setIsSaveConfirmOpen(false);
    setIsAddModalOpen(false);
    setAddStep(1);
  };

  const askDelete = (id: string) => {
    setDeleteItemId(id);
  };

  const refreshServices = () => {
    return listServices().then((res) => {
      setItems(
        (res.data || []).map((x) => ({
          id: x._id,
          title: x.title,
          subtitle: `${(x.description || "").slice(0, 42)}${(x.description || "").length > 42 ? "..." : ""}`,
          description: x.description || "",
          coverImage: x.coverImage || "/picture/project.jpg",
          galleryImages: x.galleryImages?.length ? x.galleryImages : ["/picture/view image.png"],
          instagramLink: (x.socialPostLinks || []).find((k) => (k.label || "").toLowerCase() === "instagram")?.url || "",
          facebookLink: (x.socialPostLinks || []).find((k) => (k.label || "").toLowerCase() === "facebook")?.url || "",
          youtubeLink: (x.socialPostLinks || []).find((k) => (k.label || "").toLowerCase() === "youtube")?.url || "",
        })),
      );
    });
  };

  const confirmDelete = async () => {
    if (deleteItemId === null) return;
    if (deleteItemId.startsWith("fallback-")) {
      setItems((prev) => prev.filter((item) => item.id !== deleteItemId));
    } else {
      try {
        await deleteService(deleteItemId);
        await refreshServices();
      } catch {
        // ignore API delete failure
      }
    }
    if (selectedItemId === deleteItemId) {
      setSelectedItemId(null);
    }
    if (editingItemId === deleteItemId) {
      resetAddForm();
      closeAllAddModals();
    }
    setDeleteItemId(null);
  };

  const resetAddForm = () => {
    setEditingItemId(null);
    setTitleValue("");
    setDescriptionValue("");
    setCoverImageCropped(null);
    setGalleryImages([]);
    setInstagramLink("");
    setFacebookLink("");
    setYoutubeLink("");
    setCoverImageRaw(null);
    setIsPreviewOpen(false);
    setIsCropModalOpen(false);
    setCropMode(null);
  };

  const startEditingItem = (item: ServiceItem) => {
    setSelectedItemId(null);
    setIsSaveConfirmOpen(false);
    setIsCropModalOpen(false);
    setIsPreviewOpen(false);
    setEditingItemId(item.id);
    setTitleValue(item.title);
    setDescriptionValue(item.description);
    setCoverImageCropped(item.coverImage);
    setGalleryImages(item.galleryImages ?? []);
    setInstagramLink(item.instagramLink ?? "");
    setFacebookLink(item.facebookLink ?? "");
    setYoutubeLink(item.youtubeLink ?? "");
    setAddStep(1);
    setIsAddModalOpen(true);
  };

  const handleSaveConfirmed = async () => {
    const normalizedDescription = descriptionValue.trim();
    const payload = {
      title: titleValue.trim(),
      description: normalizedDescription,
      coverImage: coverImageCropped ?? "/picture/project.jpg",
      galleryImages: galleryImages.length > 0 ? galleryImages : ["/picture/view image.png"],
      socialPostLinks: [
        ...(instagramLink.trim() ? [{ label: "Instagram", url: instagramLink.trim() }] : []),
        ...(facebookLink.trim() ? [{ label: "Facebook", url: facebookLink.trim() }] : []),
        ...(youtubeLink.trim() ? [{ label: "YouTube", url: youtubeLink.trim() }] : []),
      ],
    };

    try {
      if (editingItemId !== null && !editingItemId.startsWith("fallback-")) {
        await updateService(editingItemId, payload);
      } else {
        await createService(payload);
      }
      await refreshServices();
      closeAllAddModals();
      resetAddForm();
    } catch {
      // ignore API save failure
    }
  };

  useEffect(() => {
    refreshServices()
      .catch(() => {
        // keep fallback data
      })
      .finally(() => {});
  }, []);

  const startCropDrag = (event: ReactMouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setCropMode("drag");
    dragStartRef.current = {
      mouseX: event.clientX,
      mouseY: event.clientY,
      cropX,
      cropY,
      cropSize,
    };
  };

  const startCropResize = (event: ReactMouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setCropMode("resize");
    dragStartRef.current = {
      mouseX: event.clientX,
      mouseY: event.clientY,
      cropX,
      cropY,
      cropSize,
    };
  };

  useEffect(() => {
    if (!isCropModalOpen || !cropMode) return;

    const onMouseMove = (event: MouseEvent) => {
      const deltaX = (event.clientX - dragStartRef.current.mouseX) / imageScale;
      const deltaY = (event.clientY - dragStartRef.current.mouseY) / imageScale;

      if (cropMode === "drag") {
        const nextX = Math.round(dragStartRef.current.cropX + deltaX);
        const nextY = Math.round(dragStartRef.current.cropY + deltaY);
        const maxX = Math.max(0, coverImageWidth - cropSize);
        const maxY = Math.max(0, coverImageHeight - cropSize);
        setCropX(Math.max(0, Math.min(nextX, maxX)));
        setCropY(Math.max(0, Math.min(nextY, maxY)));
        return;
      }

      const resizeDelta = Math.max(deltaX, deltaY);
      const minSize = 80;
      const maxSize = Math.min(
        coverImageWidth - dragStartRef.current.cropX,
        coverImageHeight - dragStartRef.current.cropY,
      );
      const nextSize = Math.round(dragStartRef.current.cropSize + resizeDelta);
      setCropSize(Math.max(minSize, Math.min(nextSize, maxSize)));
    };

    const onMouseUp = () => {
      setCropMode(null);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [cropMode, isCropModalOpen, imageScale, coverImageWidth, coverImageHeight, cropSize]);

  return (
    <>
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
            onClick={() => {
              setSelectedItemId(null);
              setIsCropModalOpen(false);
              setIsPreviewOpen(false);
              setEditingItemId(null);
              setAddStep(1);
              setIsAddModalOpen(true);
            }}
            className="h-[40px] rounded-full bg-[#268257] px-5 text-sm font-medium text-white"
          >
            Add
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {paginatedItems.map((item) => (
            <article
              key={item.id}
              onClick={() => {
                setIsAddModalOpen(false);
                setIsCropModalOpen(false);
                setSelectedItemId(item.id);
              }}
              className="mx-auto h-[231px] w-full max-w-[260px] cursor-pointer overflow-hidden rounded-[24px] border border-zinc-300 bg-white shadow-[0_3px_12px_rgba(0,0,0,0.08)]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.coverImage}
                alt={item.title}
                className="h-[132px] w-full object-cover"
              />
              <div className="space-y-1 p-3">
                <h3 className="w-[174px] truncate text-[17px] font-semibold leading-[17px] text-[#1f4f2c]">
                  {item.title}
                </h3>
                <p className="w-[240px] truncate text-[15px] leading-[15px] text-[#2E835E]">
                  {item.subtitle}
                </p>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      startEditingItem(item);
                    }}
                    className="flex h-[28px] w-[196px] items-center justify-center gap-2 rounded-full border border-[#2E835E] bg-[#F9F5F0] text-[16px] font-medium leading-none text-[#2E835E]"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/picture/edit.svg" alt="" className="h-[14px] w-[14px]" />
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      askDelete(item.id);
                    }}
                    className="grid h-[28px] w-[38px] place-items-center rounded-[10px] border border-red-400 bg-[#F9F5F0]"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/picture/delete.svg" alt="Delete" className="h-[16px] w-[16px]" />
                  </button>
                </div>
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
      </section>

      {isAddModalOpen && !isCropModalOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4"
          onClick={() => {
            closeAllAddModals();
          }}
        >
          <div
            className={`w-full rounded-[22px] bg-white px-6 py-5 shadow-2xl ${
              addStep === 2
                ? "h-[458px] max-w-[610px] overflow-hidden"
                : "h-[690px] max-w-[620px] overflow-y-auto"
            }`}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-2 flex items-center justify-between">
              <div className="w-full max-w-[430px]">
                <p className="text-[10px] text-zinc-600">Step {addStep} of 2</p>
                <div className="mt-1 h-1.5 rounded-full bg-zinc-200">
                  <div className={`h-1.5 rounded-full bg-[#268257] ${addStep === 1 ? "w-1/2" : "w-full"}`} />
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  closeAllAddModals();
                }}
                className="grid h-7 w-7 place-items-center rounded-lg bg-[#f5f5f5] text-lg leading-none text-[#1f4f2c]"
              >
                ×
              </button>
            </div>

            {addStep === 1 ? (
              <div key="add-step-1">
                <h2 className="text-[24px] font-semibold leading-[24px] text-[#1f4f2c]">
                  {editingItemId !== null ? "Edit" : "Add"}
                </h2>
                <p className="mt-1.5 text-[13px] text-zinc-700">Cover Image (crop & edit available)</p>
                <input
                  ref={coverFileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={onCoverChange}
                  className="hidden"
                />
                <input
                  ref={galleryFileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={onGalleryChange}
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={openFilePicker}
                  className="mt-1.5 flex h-[44px] w-full items-center justify-center rounded-full border border-dashed border-[#23712780] text-[13px] text-zinc-500"
                >
                  Upload cover image here
                </button>
            {coverImageCropped ? (
              <div className="mt-1.5 flex items-center gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={coverImageCropped} alt="Cover" className="h-[54px] w-[54px] rounded-lg object-cover" />
                <button
                  type="button"
                  onClick={openFilePicker}
                  className="flex h-[22px] items-center justify-center gap-1 rounded-[8px] border border-[#2E835E] bg-[#F9F5F0] px-3 text-[11px] text-[#2E835E]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/picture/edit.svg" alt="" className="h-3 w-3" />
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => setCoverImageCropped(null)}
                  className="grid h-[22px] w-[22px] place-items-center rounded-[8px] border border-red-400 bg-[#F9F5F0]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/picture/delete.svg" alt="Delete cover" className="h-3 w-3" />
                </button>
              </div>
            ) : null}

                <label className="mt-3 block text-[13px] text-zinc-800">Title</label>
                <input
                  type="text"
                  value={titleValue}
                  onChange={(event) => setTitleValue(event.target.value)}
                  placeholder="Type here...."
                  className="mt-1 h-[38px] w-full rounded-full border border-[#23712780] px-4 text-[13px] text-zinc-700 outline-none"
                />

                <label className="mt-3 block text-[13px] text-zinc-800">Description</label>
                <textarea
                  value={descriptionValue}
                  onChange={(event) => setDescriptionValue(event.target.value)}
                  placeholder="Type here..."
                  rows={3}
                  className="mt-1 w-full rounded-[16px] border border-[#23712780] px-4 py-2.5 text-[13px] text-zinc-700 outline-none"
                />

                <p className="mt-3 text-[13px] text-zinc-800">Gallery Images (multiple, edit/delete each)</p>
                <button
                  type="button"
                  onClick={openGalleryPicker}
                  className="mt-1.5 flex h-[44px] w-full items-center justify-center rounded-full border border-dashed border-[#23712780] text-[13px] text-zinc-500"
                >
                  Add gallery image here
                </button>

                {galleryImages.length > 0 ? (
                  <div className="mt-1.5 flex flex-wrap gap-2">
                    {galleryImages.map((image, index) => (
                      <div key={`${image}-${index}`} className="relative">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={image} alt={`Gallery ${index + 1}`} className="h-[54px] w-[54px] rounded-lg object-cover" />
                        <button
                          type="button"
                          onClick={() => removeGalleryImage(index)}
                          className="absolute -right-1 -top-1 grid h-[13px] w-[13px] place-items-center rounded-full bg-red-500 text-[9px] leading-none text-white"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                ) : null}

                <button
                  type="button"
                  disabled={!isStepOneValid}
                  onClick={() => setAddStep(2)}
                  className={`mt-4 h-[38px] w-full rounded-full text-[14px] font-medium text-white ${
                    isStepOneValid ? "bg-[#268257]" : "cursor-not-allowed bg-zinc-300"
                  }`}
                >
                  Next
                </button>
              </div>
            ) : (
              <div key="add-step-2">
                <h2 className="text-[33px] font-semibold leading-none text-[#1f4f2c]">Social media links</h2>

                <label className="mt-3 block text-[11px] font-medium text-zinc-800">Instagram links</label>
                <input
                  type="text"
                  value={instagramLink}
                  onChange={(event) => setInstagramLink(event.target.value)}
                  placeholder="Add link here"
                  className="mt-1 h-[30px] w-full rounded-full border border-[#23712780] px-4 text-[11px] text-zinc-700 outline-none placeholder:text-[11px]"
                />

                <label className="mt-3 block text-[11px] font-medium text-zinc-800">Facebook links</label>
                <input
                  type="text"
                  value={facebookLink}
                  onChange={(event) => setFacebookLink(event.target.value)}
                  placeholder="Add link here"
                  className="mt-1 h-[30px] w-full rounded-full border border-[#23712780] px-4 text-[11px] text-zinc-700 outline-none placeholder:text-[11px]"
                />

                <label className="mt-3 block text-[11px] font-medium text-zinc-800">YouTube links</label>
                <input
                  type="text"
                  value={youtubeLink}
                  onChange={(event) => setYoutubeLink(event.target.value)}
                  placeholder="Add link here"
                  className="mt-1 h-[30px] w-full rounded-full border border-[#23712780] px-4 text-[11px] text-zinc-700 outline-none placeholder:text-[11px]"
                />

                <div className="mt-5 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setAddStep(1)}
                    className="h-[31px] flex-1 rounded-full bg-zinc-100 text-[11px] font-medium text-zinc-600"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsPreviewOpen(true)}
                    className="h-[31px] flex-1 rounded-full border border-[#268257] bg-[#F9F5F0] text-[11px] font-medium text-[#268257]"
                  >
                    Preview
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsPreviewOpen(false);
                      setIsSaveConfirmOpen(true);
                    }}
                    className="h-[31px] flex-1 rounded-full bg-[#268257] text-[11px] font-medium text-white"
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : null}

      {isPreviewOpen ? (
        <div className="fixed inset-0 z-[65] flex items-center justify-center bg-black/55 p-4">
          <div className="w-full max-w-[450px] rounded-[24px] bg-white p-5 shadow-2xl">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="text-[12px] text-zinc-500">User side preview</p>
                <h3 className="text-[18px] font-semibold text-[#1f4f2c]">Before save preview</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsPreviewOpen(false)}
                className="grid h-8 w-8 place-items-center rounded-lg bg-[#f5f5f5] text-xl leading-none text-[#1f4f2c]"
              >
                ×
              </button>
            </div>

            <article className="overflow-hidden rounded-[24px] bg-white shadow-md ring-1 ring-black/[0.08]">
              <div className="h-[180px] w-full overflow-hidden rounded-t-[24px] bg-emerald-100/40">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={coverImageCropped ?? "/picture/project.jpg"}
                  alt={titleValue || "Service preview"}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="space-y-2 p-4">
                <h4 className="break-words text-[17px] font-bold leading-[1.4] text-[#1A2F21]">
                  {titleValue.trim() || "Service title preview"}
                </h4>
                <p className="line-clamp-6 break-words text-sm leading-[1.65] text-[#265239]">
                  {descriptionValue.trim() || "Service description preview will appear here once you type it."}
                </p>
              </div>
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
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/55 p-4">
          <div className="h-[228px] w-[458px] rounded-[30px] bg-white px-8 py-6 text-center opacity-100 shadow-2xl">
            <div className="mx-auto grid h-[64px] w-[64px] place-items-center rounded-full bg-[#268257] text-[40px] text-white">
              ✓
            </div>
            <p className="mx-auto mt-5 max-w-[378px] text-[17px] leading-[1.2] text-[#1f4f2c]">
              Confirm save. This action will permanently update the record.
            </p>
            <div className="mx-auto mt-5 flex w-[378px] items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => setIsSaveConfirmOpen(false)}
                className="h-[48px] w-[180px] rounded-full bg-zinc-100 text-[15px] font-medium leading-[15px] text-[#1f4f2c]"
              >
                No
              </button>
              <button
                type="button"
                onClick={handleSaveConfirmed}
                className="h-[48px] w-[180px] rounded-full bg-[#268257] text-[15px] font-medium leading-[15px] text-white"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {deleteItemId !== null ? (
        <div className="fixed inset-0 z-[75] flex items-center justify-center bg-black/55 p-4">
          <div className="w-full max-w-[520px] rounded-[22px] bg-white px-8 py-7 text-center shadow-2xl">
            <div className="mx-auto grid h-[64px] w-[64px] place-items-center rounded-full text-[36px] text-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/picture/delete-form.svg" alt="Delete" className="h-[53px] w-[53px]" />
            </div>
            <p className="mx-auto mt-4 max-w-[380px] text-[16px] leading-[1.35] text-[#1f4f2c]">
              This will permanently delete the item. You can&apos;t recover it later.
            </p>
            <div className="mx-auto mt-5 flex w-full max-w-[360px] items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => setDeleteItemId(null)}
                className="h-[40px] w-[170px] rounded-full bg-zinc-100 text-[13px] font-medium text-[#1f4f2c]"
              >
                No
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="h-[40px] w-[170px] rounded-full bg-red-500 text-[13px] font-medium text-white"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {isCropModalOpen && coverImageRaw ? (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/55 p-4">
          <div className="w-full max-w-[620px] rounded-[22px] bg-white p-6 shadow-2xl">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-[14px] text-[#1f4f2c]">
                {cropTarget === "cover" ? "Crop cover image" : "Crop gallery image"}
              </p>
              <button
                type="button"
                onClick={() => setIsCropModalOpen(false)}
                className="grid h-8 w-8 place-items-center rounded-xl bg-[#f5f5f5] text-xl leading-none text-[#1f4f2c]"
              >
                ×
              </button>
            </div>

            <div className="relative mx-auto h-[360px] w-[360px] overflow-hidden rounded-[24px] bg-[linear-gradient(45deg,#d8d8d8_25%,#bdbdbd_25%,#bdbdbd_50%,#d8d8d8_50%,#d8d8d8_75%,#bdbdbd_75%,#bdbdbd_100%)] bg-[length:28px_28px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={coverImageRaw}
                alt="Crop preview"
                className="h-full w-full object-contain"
              />
              <div
                className="pointer-events-none absolute border-2 border-blue-500/90 shadow-[0_0_0_9999px_rgba(0,0,0,0.35)]"
                style={{
                  left: `${cropLeft}px`,
                  top: `${cropTop}px`,
                  width: `${cropDisplaySize}px`,
                  height: `${cropDisplaySize}px`,
                }}
              />
              <div
                className="absolute border-2 border-blue-500/90"
                style={{
                  left: `${cropLeft}px`,
                  top: `${cropTop}px`,
                  width: `${cropDisplaySize}px`,
                  height: `${cropDisplaySize}px`,
                  cursor: "move",
                }}
                onMouseDown={startCropDrag}
              >
                <button
                  type="button"
                  onMouseDown={startCropResize}
                  className="absolute -bottom-2 -right-2 h-4 w-4 rounded-sm border border-white bg-blue-500"
                  aria-label="Resize crop"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={applyCrop}
              className="mt-4 h-[42px] w-full rounded-full bg-[#268257] text-[16px] font-medium text-white"
            >
              Apply crop
            </button>
          </div>
        </div>
      ) : null}

      {selectedItem ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4"
          onClick={() => setSelectedItemId(null)}
        >
          <div
            className="h-[659px] w-full max-w-[660px] overflow-hidden rounded-[34px] bg-white px-7 py-7 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-start justify-between">
              <h2 className="whitespace-nowrap pt-1 text-[16px] font-semibold leading-none text-[#1f4f2c]">
                {selectedItem.title}
              </h2>
              <button
                type="button"
                onClick={() => setSelectedItemId(null)}
                className="grid h-[42px] w-[42px] place-items-center rounded-xl bg-[#f5f5f5] text-[34px] leading-none text-[#1f4f2c]"
              >
                ×
              </button>
            </div>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={selectedItem.coverImage}
              alt={selectedItem.title}
              className="h-[217px] w-[580px] rounded-[24px] object-cover"
            />

            <p className="mt-4 h-[136px] w-[580px] overflow-hidden text-[12.5px] leading-[1.45] text-[#2E835E]">
            {selectedItem.description}
            </p>

            <div className="mt-4 flex h-[99px] w-[498px] gap-[10px]">
              {selectedItem.galleryImages.slice(0, 4).map((image, index) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={index}
                  src={image}
                  alt=""
                  className="h-[99px] w-[117px] rounded-[16px] object-cover"
                />
              ))}
            </div>

            <div className="mt-5 flex h-[28px] w-[580px] items-center gap-2">
              <button
                type="button"
                onClick={() => startEditingItem(selectedItem)}
                className="flex h-[28px] flex-1 items-center justify-center gap-2 rounded-full border border-[#2E835E] bg-[#F9F5F0] text-[20px] font-medium leading-none text-[#2E835E]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/picture/edit.svg" alt="" className="h-[14px] w-[14px]" />
                Edit
              </button>
              <button
                type="button"
                onClick={() => askDelete(selectedItem.id)}
                className="grid h-[28px] w-[82px] place-items-center rounded-[10px] border border-red-400 bg-[#F9F5F0]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/picture/delete.svg" alt="Delete" className="h-[14px] w-[14px]" />
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
