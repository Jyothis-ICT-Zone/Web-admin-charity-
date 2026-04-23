import { apiRequest } from "./client";

export type SettingsDto = {
  _id: string;
  header?: { siteName?: string; tagline?: string; logoUrl?: string };
  socialLinks?: Array<{ label?: string; url?: string }>;
  contactDetails?: { phone?: string; email?: string; address?: string };
};

export async function listSettings() {
  return apiRequest<{ data: SettingsDto[] }>("/settings?limit=100", { auth: true });
}

export async function createSettings(payload: Omit<SettingsDto, "_id">) {
  return apiRequest<{ data?: { _id?: string } }>("/settings", { method: "POST", auth: true, body: JSON.stringify(payload) });
}

export async function updateSettings(id: string, payload: Omit<SettingsDto, "_id">) {
  return apiRequest(`/settings/${id}`, { method: "PUT", auth: true, body: JSON.stringify(payload) });
}
