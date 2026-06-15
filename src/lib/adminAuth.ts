const ADMIN_USER = "pronectar";
const DEFAULT_PASS = "MuscleEmpire@2026";
const PASS_KEY = "me_admin_pwd";
const SESSION_KEY = "me_admin_session";

function getPassword(): string {
  return localStorage.getItem(PASS_KEY) || DEFAULT_PASS;
}

export function login(username: string, password: string): boolean {
  if (username === ADMIN_USER && password === getPassword()) {
    sessionStorage.setItem(SESSION_KEY, "true");
    return true;
  }
  return false;
}

export function changePassword(currentPass: string, newPass: string): boolean {
  if (currentPass !== getPassword()) return false;
  localStorage.setItem(PASS_KEY, newPass);
  return true;
}

export function logout(): void {
  sessionStorage.removeItem(SESSION_KEY);
}

export function isLoggedIn(): boolean {
  return sessionStorage.getItem(SESSION_KEY) === "true";
}
