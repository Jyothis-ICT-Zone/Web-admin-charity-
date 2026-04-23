import { apiRequest } from "./client";

export type MemberDto = {
  _id: string;
  name: string;
  position?: string;
};

export async function listMembers() {
  return apiRequest<{ data: MemberDto[] }>("/members?limit=200", { auth: true });
}

export async function createMember(payload: { name: string; position: string }) {
  return apiRequest("/members", { method: "POST", auth: true, body: JSON.stringify(payload) });
}

export async function updateMember(id: string, payload: Partial<{ name: string; position: string }>) {
  return apiRequest(`/members/${id}`, { method: "PUT", auth: true, body: JSON.stringify(payload) });
}

export async function deleteMember(id: string) {
  return apiRequest(`/members/${id}`, { method: "DELETE", auth: true });
}
