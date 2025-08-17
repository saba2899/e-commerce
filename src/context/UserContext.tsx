import { createContext } from "react";
import { type PublicUser } from "../services/auth";

type UserContextType = {
  user: PublicUser | null;
  setUser: (u: PublicUser | null) => void;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});
