import { apiRequest } from "./client";

export type ContactDto = {
  _id: string;
  fullName: string;
  email: string;
  phone?: string;
  message: string;
  createdAt?: string;
};

export async function listContacts() {
  return apiRequest<{ data: ContactDto[] }>("/contact?limit=500", { auth: true });
}

export async function deleteContact(id: string) {
  return apiRequest(`/contact/${id}`, { method: "DELETE", auth: true });
}

export async function getContactNotifications() {
  return apiRequest<{ unreadCount: number; data: ContactDto[] }>("/contact/notifications", { auth: true });
}

export async function markContactNotificationsRead() {
  return apiRequest<{ updated: number }>("/contact/notifications/read", { method: "PUT", auth: true });
}
