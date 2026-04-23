"use client";

import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
} from "react";
import { createSettings, listSettings, updateSettings } from "@/lib/api/settings";

const SETTINGS_CHANGED_EVENT = "charity-settings-changed";

type SettingsTab = "header" | "contact";

/** Cards: white fill; inputs: #FCF9F8 fill, thin gray border */
const contactFieldClass =
  "mt-1.5 h-[40px] w-full rounded-full border border-zinc-300 bg-[#FCF9F8] px-4 text-[13px] text-zinc-800 outline-none placeholder:text-zinc-400 focus:border-[#1B734C]/45 focus:ring-1 focus:ring-[#1B734C]/20";

const contactCardClass =
  "flex flex-col rounded-3xl border border-zinc-200/90 bg-white p-6 shadow-sm";

const contactTitleClass = "text-lg font-semibold text-[#1B734C]";

/** Social + Contact field labels (Instagram…Location) */
const fieldLabelClass = "block text-[13px] font-semibold text-[#1A3D1C]";

const contactSaveClass =
  "mt-8 w-full rounded-full bg-[#1B734C] py-3 text-sm font-semibold text-white transition hover:bg-[#155a3d]";
const COVER_ASPECT_RATIO = 4.5;
const COVER_EXPORT_WIDTH = 1800;
const COVER_EXPORT_HEIGHT = Math.round(COVER_EXPORT_WIDTH / COVER_ASPECT_RATIO);

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const loadImage = (src: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = src;
  });

export default function AdminSettingsPage() {
  const [tab, setTab] = useState<SettingsTab>("header");
  const [headerCover, setHeaderCover] = useState<string | null>(null);
  const [headerTitle, setHeaderTitle] = useState("");
  const [headerDescription, setHeaderDescription] = useState("");
  const [socialInstagram, setSocialInstagram] = useState("");
  const [socialFacebook, setSocialFacebook] = useState("");
  const [socialYoutube, setSocialYoutube] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactLocation, setContactLocation] = useState("");
  const [hasLoaded, setHasLoaded] = useState(false);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const [settingsId, setSettingsId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const [coverCropSource, setCoverCropSource] = useState<string | null>(null);
  const [coverCropX, setCoverCropX] = useState(50);
  const [coverCropY, setCoverCropY] = useState(50);
  const [coverCropZoom, setCoverCropZoom] = useState(100);

  useEffect(() => {
    listSettings()
      .then((res) => {
        const item = (res.data || [])[0];
        if (!item) return;
        setSettingsId(item._id);
        const links = new Map((item.socialLinks || []).map((x) => [x.label, x.url || ""]));
        setHeaderCover(item.header?.logoUrl || null);
        setHeaderTitle(item.header?.siteName || "");
        setHeaderDescription(item.header?.tagline || "");
        setSocialInstagram(links.get("Instagram") || "");
        setSocialFacebook(links.get("Facebook") || "");
        setSocialYoutube(links.get("YouTube") || "");
        setContactPhone(item.contactDetails?.phone || "");
        setContactEmail(item.contactDetails?.email || "");
        setContactLocation(item.contactDetails?.address || "");
      })
      .catch(() => {
        // keep defaults
      })
      .finally(() => setHasLoaded(true));
  }, []);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = window.setTimeout(() => {
      setToastMessage(null);
    }, 2500);
    return () => window.clearTimeout(timer);
  }, [toastMessage]);

  const toPayload = () => ({
    header: {
      siteName: headerTitle,
      tagline: headerDescription,
      logoUrl: headerCover || "",
    },
    socialLinks: [
      { label: "Instagram", url: socialInstagram },
      { label: "Facebook", url: socialFacebook },
      { label: "YouTube", url: socialYoutube },
    ],
    contactDetails: {
      phone: contactPhone,
      email: contactEmail,
      address: contactLocation,
    },
  });

  const saveAll = async () => {
    try {
      const payload = toPayload();
      if (settingsId) {
        await updateSettings(settingsId, payload);
      } else {
        const created = await createSettings(payload);
        const createdId = created?.data?._id;
        if (createdId) setSettingsId(createdId);
      }
      window.dispatchEvent(new Event(SETTINGS_CHANGED_EVENT));
      setToastType("success");
      setToastMessage("Saved successfully.");
    } catch {
      setToastType("error");
      setToastMessage("Save failed. Please try again.");
    }
  };

  const applyCoverCrop = async () => {
    if (!coverCropSource) return;
    try {
      const img = await loadImage(coverCropSource);
      const imageAspect = img.width / img.height;
      const baseCropWidth =
        imageAspect > COVER_ASPECT_RATIO ? img.height * COVER_ASPECT_RATIO : img.width;
      const baseCropHeight = baseCropWidth / COVER_ASPECT_RATIO;

      const zoomFactor = clamp(coverCropZoom / 100, 1, 2.5);
      const cropWidth = baseCropWidth / zoomFactor;
      const cropHeight = baseCropHeight / zoomFactor;
      const maxX = Math.max(0, img.width - cropWidth);
      const maxY = Math.max(0, img.height - cropHeight);
      const sourceX = (maxX * coverCropX) / 100;
      const sourceY = (maxY * coverCropY) / 100;

      const canvas = document.createElement("canvas");
      canvas.width = COVER_EXPORT_WIDTH;
      canvas.height = COVER_EXPORT_HEIGHT;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas context unavailable");
      ctx.drawImage(
        img,
        sourceX,
        sourceY,
        cropWidth,
        cropHeight,
        0,
        0,
        COVER_EXPORT_WIDTH,
        COVER_EXPORT_HEIGHT
      );

      setHeaderCover(canvas.toDataURL("image/jpeg", 0.92));
      setToastType("success");
      setToastMessage("Crop applied. Save to publish changes.");
    } catch {
      setToastType("error");
      setToastMessage("Unable to crop image. Please try again.");
    }
  };

  const onCoverChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = typeof reader.result === "string" ? reader.result : null;
      if (dataUrl) {
        setCoverCropSource(dataUrl);
        setCoverCropX(50);
        setCoverCropY(50);
        setCoverCropZoom(100);
        setHeaderCover(dataUrl);
      }
    };
    reader.readAsDataURL(file);
    event.target.value = "";
  };

  const saveHeader = () => {
    void saveAll();
  };

  const saveSocial = () => {
    void saveAll();
  };

  const saveContactDetails = () => {
    void saveAll();
  };

  if (!hasLoaded) {
    return (
      <div className="rounded-2xl border border-[#23712780] bg-white px-6 py-10 text-sm text-zinc-600 shadow-sm">
        Loading…
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {toastMessage ? (
        <div
          role="status"
          aria-live="polite"
          className={`fixed left-1/2 top-1/2 z-50 w-[92%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl px-6 py-4 text-center text-base font-semibold shadow-xl ${
            toastType === "success"
              ? "border border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border border-red-200 bg-red-50 text-red-700"
          }`}
        >
          {toastMessage}
        </div>
      ) : null}
      <nav
        className="box-border flex h-[53px] w-[236px] shrink-0 items-center justify-between rounded-[20px] border border-[#1B734C]/35 bg-white p-[10px] shadow-sm"
        aria-label="Settings sections"
      >
        <button
          type="button"
          onClick={() => setTab("header")}
          className="flex h-[33px] w-[82px] shrink-0 items-center justify-center rounded-full border-0 bg-transparent p-0 text-xs font-medium outline-none ring-[#1B734C]/30 focus-visible:ring-2"
        >
          {tab === "header" ? (
            <span className="box-border flex h-[33px] w-[82px] shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-[#1B734C] text-[11px] leading-none text-white">
              Header
            </span>
          ) : (
            <span className="box-border flex h-[33px] w-[82px] shrink-0 items-center justify-center whitespace-nowrap text-[11px] leading-none text-[#1A3D1C]">
              Header
            </span>
          )}
        </button>
        <button
          type="button"
          onClick={() => setTab("contact")}
          className="flex h-[33px] w-[126px] shrink-0 items-center justify-center rounded-full border-0 bg-transparent p-0 text-xs font-medium outline-none ring-[#1B734C]/30 focus-visible:ring-2"
        >
          {tab === "contact" ? (
            <span className="box-border flex h-[33px] w-[126px] shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-[#1B734C] text-[11px] leading-none text-white">
              Contact details
            </span>
          ) : (
            <span className="box-border flex h-[33px] w-[126px] shrink-0 items-center justify-center whitespace-nowrap text-[11px] leading-none text-[#1A3D1C]">
              Contact details
            </span>
          )}
        </button>
      </nav>

      {tab === "header" ? (
        <div className="rounded-[24px] border border-[#23712780] bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-[#1f4f2c]">Add Header</h2>

          <input
            ref={coverInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onCoverChange}
          />

          <p className="mt-4 text-[13px] text-zinc-700">
            Cover image (crop &amp; edit available)
          </p>
          <button
            type="button"
            onClick={() => coverInputRef.current?.click()}
            className="mt-1.5 flex h-[44px] w-full items-center justify-center rounded-full border border-dashed border-[#23712780] bg-[#FCF9F8] text-[13px] text-zinc-500"
          >
            Upload cover image here
          </button>

          {headerCover ? (
            <div className="mt-3 flex flex-col gap-3">
              {coverCropSource ? (
                <div className="overflow-hidden rounded-xl border border-[#23712780] bg-[#FCF9F8] p-3">
                  <p className="mb-2 text-[12px] font-medium text-[#1f4f2c]">
                    Crop cover preview
                  </p>
                  <div className="relative w-full overflow-hidden rounded-lg border border-zinc-300 bg-zinc-900/20">
                    <div
                      className="aspect-[4.5/1] w-full bg-no-repeat"
                      style={{
                        backgroundImage: `url(${coverCropSource})`,
                        backgroundPosition: `${coverCropX}% ${coverCropY}%`,
                        backgroundSize: `${coverCropZoom}% auto`,
                      }}
                    />
                  </div>
                  <div className="mt-3 grid gap-2">
                    <label className="text-[11px] text-zinc-700">
                      Horizontal: {coverCropX}%
                    </label>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={coverCropX}
                      onChange={(e) => setCoverCropX(Number(e.target.value))}
                    />
                    <label className="text-[11px] text-zinc-700">
                      Vertical: {coverCropY}%
                    </label>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={coverCropY}
                      onChange={(e) => setCoverCropY(Number(e.target.value))}
                    />
                    <label className="text-[11px] text-zinc-700">
                      Zoom: {coverCropZoom}%
                    </label>
                    <input
                      type="range"
                      min={100}
                      max={250}
                      value={coverCropZoom}
                      onChange={(e) => setCoverCropZoom(Number(e.target.value))}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        void applyCoverCrop();
                      }}
                      className="mt-1 rounded-lg border border-[#2E835E] px-3 py-1.5 text-[12px] font-medium text-[#2E835E]"
                    >
                      Apply crop
                    </button>
                  </div>
                </div>
              ) : null}

              <div className="flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={headerCover}
                alt="Cover preview"
                className="h-[54px] w-[54px] rounded-lg object-cover"
              />
              <button
                type="button"
                onClick={() => coverInputRef.current?.click()}
                className="flex h-[22px] items-center justify-center gap-1 rounded-[8px] border border-[#2E835E] px-3 text-[11px] text-[#2E835E]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/picture/edit.svg" alt="" className="h-3 w-3" />
                Edit
              </button>
              <button
                type="button"
                onClick={() => {
                  setHeaderCover(null);
                  setCoverCropSource(null);
                }}
                className="grid h-[22px] w-[22px] place-items-center rounded-[8px] border border-red-400"
                aria-label="Remove cover"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/picture/delete.svg" alt="" className="h-3 w-3" />
              </button>
              </div>
            </div>
          ) : null}

          <label className="mt-4 block text-[13px] font-medium text-zinc-800">
            Title
          </label>
          <input
            type="text"
            value={headerTitle}
            onChange={(e) => setHeaderTitle(e.target.value)}
            placeholder="Type here..."
            className="mt-1 h-[38px] w-full rounded-full border border-[#23712780] bg-[#FCF9F8] px-4 text-[13px] text-zinc-700 outline-none placeholder:text-zinc-400"
          />

          <label className="mt-4 block text-[13px] font-medium text-zinc-800">
            Description
          </label>
          <textarea
            value={headerDescription}
            onChange={(e) => setHeaderDescription(e.target.value)}
            placeholder="Type here..."
            rows={4}
            className="mt-1 w-full rounded-[16px] border border-[#23712780] bg-[#FCF9F8] px-4 py-2.5 text-[13px] text-zinc-700 outline-none placeholder:text-zinc-400"
          />

          <button
            type="button"
            onClick={saveHeader}
            className="mt-6 w-full rounded-full bg-[#268257] py-3 text-sm font-semibold text-white transition hover:bg-[#216844]"
          >
            Save
          </button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          <div className={contactCardClass}>
            <h2 className={contactTitleClass}>Social media links</h2>

            <label className={`mt-5 ${fieldLabelClass}`}>
              Instagram links
            </label>
            <input
              type="url"
              value={socialInstagram}
              onChange={(e) => setSocialInstagram(e.target.value)}
              placeholder="Add link here"
              className={contactFieldClass}
            />

            <label className={`mt-4 ${fieldLabelClass}`}>
              Facebook links
            </label>
            <input
              type="url"
              value={socialFacebook}
              onChange={(e) => setSocialFacebook(e.target.value)}
              placeholder="Add link here"
              className={contactFieldClass}
            />

            <label className={`mt-4 ${fieldLabelClass}`}>
              YouTube links
            </label>
            <input
              type="url"
              value={socialYoutube}
              onChange={(e) => setSocialYoutube(e.target.value)}
              placeholder="Add link here"
              className={contactFieldClass}
            />

            <button type="button" onClick={saveSocial} className={contactSaveClass}>
              Save
            </button>
          </div>

          <div className={contactCardClass}>
            <h2 className={contactTitleClass}>Contact details</h2>

            <label className={`mt-5 ${fieldLabelClass}`}>
              Phone number
            </label>
            <input
              type="tel"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              placeholder="123 456 789"
              className={contactFieldClass}
            />

            <label className={`mt-4 ${fieldLabelClass}`}>
              Email
            </label>
            <input
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              placeholder="example@gmail.com"
              className={contactFieldClass}
            />

            <label className={`mt-4 ${fieldLabelClass}`}>
              Location
            </label>
            <input
              type="text"
              value={contactLocation}
              onChange={(e) => setContactLocation(e.target.value)}
              placeholder="eg: Jaffna"
              className={contactFieldClass}
            />

            <button
              type="button"
              onClick={saveContactDetails}
              className={contactSaveClass}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
