/** Fired after any charity admin localStorage write (same tab). */
export const CHARITY_DATA_UPDATED_EVENT = "charity-data-updated";

export const CHARITY_STORAGE_KEYS = {
  services: "charity-admin-services-v1",
  accounting: "charity-admin-accounting-v1",
  members: "charity-admin-members-v1",
  contact: "charity-admin-contact-v1",
} as const;

export function dispatchCharityDataUpdated(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(CHARITY_DATA_UPDATED_EVENT));
}
