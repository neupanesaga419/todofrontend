import { createContext, ReactNode, useContext, useState } from "react";

type UserContextType = {
  userData: { name: string; email: string };
  permissions: string[];
  setUserData: (data: { name: string; email: string }) => void;
  setPermissions: (permissions: string[]) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState({ name: "", email: "" });
  const [permissions, setPermissions] = useState<string[]>([]);

  return (
    <UserContext.Provider
      value={{ userData, permissions, setUserData, setPermissions }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
