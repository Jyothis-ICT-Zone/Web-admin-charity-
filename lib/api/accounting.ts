import { apiRequest } from "./client";

export type AccountingDto = {
  _id: string;
  title: string;
  pdf?: string;
};

export async function listAccounting() {
  return apiRequest<{ data: AccountingDto[] }>("/accounting?limit=200", { auth: true });
}

export async function createAccounting(payload: { title: string; pdf?: string }) {
  return apiRequest("/accounting", { method: "POST", auth: true, body: JSON.stringify(payload) });
}

export async function updateAccounting(id: string, payload: Partial<{ title: string; pdf?: string }>) {
  return apiRequest(`/accounting/${id}`, { method: "PUT", auth: true, body: JSON.stringify(payload) });
}

export async function deleteAccounting(id: string) {
  return apiRequest(`/accounting/${id}`, { method: "DELETE", auth: true });
}
