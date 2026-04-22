"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
} from "react";

const STORAGE_KEY = "charity-admin-settings-v1";

/** Same as user `SITE_SETTINGS_CHANGED_EVENT` — notifies same-origin listeners after save */
const SETTINGS_CHANGED_EVENT = "charity-settings-changed";

type SettingsTab = "header" | "contact";

type StoredSettings = {
  headerCover: string | null;
  headerTitle: string;
  headerDescription: string;
  socialInstagram: string;
  socialFacebook: string;
  socialYoutube: string;
  contactPhone: string;
  contactEmail: string;
  contactLocation: string;
};

const defaultStored: StoredSettings = {
  headerCover: null,
  headerTitle: "",
  headerDescription: "",
  socialInstagram: "",
  socialFacebook: "",
  socialYoutube: "",
  contactPhone: "",
  contactEmail: "",
  contactLocation: "",
};

function loadStored(): StoredSettings {
  if (typeof window === "undefined") return defaultStored;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultStored;
    const parsed = JSON.parse(raw) as Partial<StoredSettings> & {
      contactAddress?: string;
    };
    return {
      ...defaultStored,
      ...parsed,
      contactLocation:
        parsed.contactLocation ?? parsed.contactAddress ?? "",
    };
  } catch {
    return defaultStored;
  }
}

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

  useEffect(() => {
    const s = loadStored();
    setHeaderCover(s.headerCover);
    setHeaderTitle(s.headerTitle);
    setHeaderDescription(s.headerDescription);
    setSocialInstagram(s.socialInstagram);
    setSocialFacebook(s.socialFacebook);
    setSocialYoutube(s.socialYoutube);
    setContactPhone(s.contactPhone);
    setContactEmail(s.contactEmail);
    setContactLocation(s.contactLocation);
    setHasLoaded(true);
  }, []);

  const persist = useCallback(
    (patch: Partial<StoredSettings>) => {
      const next: StoredSettings = {
        headerCover,
        headerTitle,
        headerDescription,
        socialInstagram,
        socialFacebook,
        socialYoutube,
        contactPhone,
        contactEmail,
        contactLocation,
        ...patch,
      };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      window.dispatchEvent(new Event(SETTINGS_CHANGED_EVENT));
      if (patch.headerCover !== undefined) setHeaderCover(patch.headerCover);
      if (patch.headerTitle !== undefined) setHeaderTitle(patch.headerTitle);
      if (patch.headerDescription !== undefined)
        setHeaderDescription(patch.headerDescription);
      if (patch.socialInstagram !== undefined)
        setSocialInstagram(patch.socialInstagram);
      if (patch.socialFacebook !== undefined)
        setSocialFacebook(patch.socialFacebook);
      if (patch.socialYoutube !== undefined)
        setSocialYoutube(patch.socialYoutube);
      if (patch.contactPhone !== undefined) setContactPhone(patch.contactPhone);
      if (patch.contactEmail !== undefined) setContactEmail(patch.contactEmail);
      if (patch.contactLocation !== undefined)
        setContactLocation(patch.contactLocation);
    },
    [
      headerCover,
      headerTitle,
      headerDescription,
      socialInstagram,
      socialFacebook,
      socialYoutube,
      contactPhone,
      contactEmail,
      contactLocation,
    ],
  );

  const onCoverChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = typeof reader.result === "string" ? reader.result : null;
      if (dataUrl) persist({ headerCover: dataUrl });
    };
    reader.readAsDataURL(file);
    event.target.value = "";
  };

  const saveHeader = () => {
    persist({
      headerCover,
      headerTitle,
      headerDescription,
    });
  };

  const saveSocial = () => {
    persist({
      socialInstagram,
      socialFacebook,
      socialYoutube,
    });
  };

  const saveContactDetails = () => {
    persist({
      contactPhone,
      contactEmail,
      contactLocation,
    });
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
            <div className="mt-3 flex items-center gap-2">
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
                onClick={() => persist({ headerCover: null })}
                className="grid h-[22px] w-[22px] place-items-center rounded-[8px] border border-red-400"
                aria-label="Remove cover"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/picture/delete.svg" alt="" className="h-3 w-3" />
              </button>
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
