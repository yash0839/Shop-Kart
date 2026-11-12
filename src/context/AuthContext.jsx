import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

/*
  ⚠️ DEMO AUTHENTICATION ONLY - NOT PRODUCTION SECURITY.
  Accounts live in this browser's localStorage. There is no server, no tokens and no
  real protection. Passwords are hashed with SHA-256 only so they are not stored as plain
  text - a real app needs a backend with salted, slow hashing (bcrypt/argon2) and secure sessions.
*/
const AuthContext = createContext(null);

async function hashPassword(password) {
  const bytes = new TextEncoder().encode(`shopkart-demo:${password}`);
  if (!globalThis.crypto?.subtle) {
    // crypto.subtle only exists on https / localhost. Fallback keeps the demo working elsewhere.
    return Array.from(bytes).map((byte) => byte.toString(16)).join("");
  }
  const digest = await globalThis.crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

export function AuthProvider({ children }) {
  const [storedUsers, setUsers] = useLocalStorage("shopkart_users", []);
  const [user, setUser] = useLocalStorage("shopkart_session", null);
  const users = Array.isArray(storedUsers) ? storedUsers : [];

  const register = async ({ name, email, password }) => {
    const cleanEmail = email.trim().toLowerCase();
    if (users.some((account) => account.email === cleanEmail)) {
      return { ok: false, error: "An account with this email already exists. Please log in." };
    }
    const passwordHash = await hashPassword(password);
    setUsers((previous) => [
      ...previous,
      { id: Date.now(), name: name.trim(), email: cleanEmail, passwordHash },
    ]);
    return { ok: true };
  };

  const login = async ({ email, password }) => {
    const cleanEmail = email.trim().toLowerCase();
    const account = users.find((item) => item.email === cleanEmail);
    const passwordHash = await hashPassword(password);
    if (!account || account.passwordHash !== passwordHash) {
      return { ok: false, error: "Incorrect email or password." };
    }
    setUser({ id: account.id, name: account.name, email: account.email });
    return { ok: true };
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside <AuthProvider>");
  return context;
}
