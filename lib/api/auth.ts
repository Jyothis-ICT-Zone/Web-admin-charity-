import { apiRequest } from "./client";

export type AdminProfile = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
};

export async function loginAdmin(email: string, password: string) {
  return apiRequest<{ token: string; admin: AdminProfile }>("/auth/admin/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function getAdminMe() {
  return apiRequest<{ admin: AdminProfile }>("/auth/admin/me", { auth: true });
}
