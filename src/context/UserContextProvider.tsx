import { useState, useEffect, type ReactNode } from "react";
import { UserContext } from "./UserContext";
import { getCurrentUser, type PublicUser } from "../services/auth";

export function UserProvider({ children }: { children: ReactNode }) {
  // Initialize synchronously from localStorage so protected routes don't
  // see a null user on first render after refresh
  const [user, setUser] = useState<PublicUser | null>(() => getCurrentUser());

  // Keep user in sync with auth changes (login/logout)
  useEffect(() => {
    const handler = () => setUser(getCurrentUser());
    window.addEventListener('authStateChange', handler);
    return () => window.removeEventListener('authStateChange', handler);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
