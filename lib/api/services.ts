import { apiRequest } from "./client";

export type ServiceDto = {
  _id: string;
  title: string;
  description?: string;
  coverImage?: string;
  galleryImages?: string[];
  socialPostLinks?: Array<{ label?: string; url?: string }>;
};

export async function listServices() {
  return apiRequest<{ data: ServiceDto[] }>("/services?limit=100", { auth: true });
}

export async function createService(payload: {
  title: string;
  description: string;
  coverImage: string;
  galleryImages: string[];
  socialPostLinks?: Array<{ label: string; url: string }>;
}) {
  return apiRequest("/services", { method: "POST", auth: true, body: JSON.stringify(payload) });
}

export async function updateService(
  id: string,
  payload: Partial<{
    title: string;
    description: string;
    coverImage: string;
    galleryImages: string[];
    socialPostLinks: Array<{ label: string; url: string }>;
  }>
) {
  return apiRequest(`/services/${id}`, { method: "PUT", auth: true, body: JSON.stringify(payload) });
}

export async function deleteService(id: string) {
  return apiRequest(`/services/${id}`, { method: "DELETE", auth: true });
}
