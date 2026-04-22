import { AUTH_STORAGE_KEY, AUTH_TOKEN_KEY } from "./constants";

export function setAdminSession(token: string) {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(AUTH_STORAGE_KEY, "true");
  window.localStorage.setItem(AUTH_TOKEN_KEY, token);
}

export function clearAdminSession() {
  if (typeof window === "undefined") return;
  window.sessionStorage.removeItem(AUTH_STORAGE_KEY);
  window.localStorage.removeItem(AUTH_TOKEN_KEY);
}

export function getAdminToken() {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem(AUTH_TOKEN_KEY) || "";
}

export function isAdminLoggedIn() {
  if (typeof window === "undefined") return false;
  return window.sessionStorage.getItem(AUTH_STORAGE_KEY) === "true";
}
