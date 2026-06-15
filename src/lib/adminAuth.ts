// Simple frontend-only admin auth using sessionStorage
// Credentials are checked client-side — suitable for a hidden admin panel
// For production, replace with a real auth backend

const ADMIN_USER = "pronectar";
const ADMIN_PASS = "MuscleEmpire@2026";
const SESSION_KEY = "me_admin_session";

export function login(username: string, password: string): boolean {
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    sessionStorage.setItem(SESSION_KEY, "true");
    return true;
  }
  return false;
}

export function logout(): void {
  sessionStorage.removeItem(SESSION_KEY);
}

export function isLoggedIn(): boolean {
  return sessionStorage.getItem(SESSION_KEY) === "true";
}
