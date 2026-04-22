import { getAdminToken } from "@/lib/auth/session";

type ApiOptions = {
  method?: string;
  auth?: boolean;
  body?: string;
};

const BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api").replace(/\/$/, "");

export async function apiRequest<T>(path: string, options: ApiOptions = {}): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (options.auth) {
    const token = getAdminToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    method: options.method || "GET",
    headers,
    body: options.body,
    cache: "no-store",
  });

  const json = await response.json().catch(() => ({}));

  if (!response.ok || json?.success === false) {
    throw new Error(json?.message || `Request failed (${response.status})`);
  }

  return json as T;
}
