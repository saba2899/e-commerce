import { useState, useEffect, type ReactNode } from "react";
import { UserContext } from "./UserContext";
import { getCurrentUser, type PublicUser } from "../services/auth";

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<PublicUser | null>(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
