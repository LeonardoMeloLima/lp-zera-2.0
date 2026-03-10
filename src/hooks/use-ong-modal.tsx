import { createContext, useContext, useState, ReactNode } from "react";

interface ONGModalContextType {
  open: boolean;
  setOpen: (v: boolean) => void;
}

const ONGModalContext = createContext<ONGModalContextType>({ open: false, setOpen: () => {} });

export const useONGModal = () => useContext(ONGModalContext);

export function ONGModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <ONGModalContext.Provider value={{ open, setOpen }}>
      {children}
    </ONGModalContext.Provider>
  );
}
