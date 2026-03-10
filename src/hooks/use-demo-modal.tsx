import { createContext, useContext, useState, ReactNode } from "react";

interface DemoModalContextType {
  open: boolean;
  setOpen: (v: boolean) => void;
}

const DemoModalContext = createContext<DemoModalContextType>({ open: false, setOpen: () => {} });

export const useDemoModal = () => useContext(DemoModalContext);

export function DemoModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <DemoModalContext.Provider value={{ open, setOpen }}>
      {children}
    </DemoModalContext.Provider>
  );
}
