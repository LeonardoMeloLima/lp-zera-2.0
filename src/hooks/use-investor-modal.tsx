import { createContext, useContext, useState, ReactNode } from "react";

interface InvestorModalContextType {
  open: boolean;
  setOpen: (v: boolean) => void;
}

const InvestorModalContext = createContext<InvestorModalContextType>({ open: false, setOpen: () => {} });

export const useInvestorModal = () => useContext(InvestorModalContext);

export function InvestorModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <InvestorModalContext.Provider value={{ open, setOpen }}>
      {children}
    </InvestorModalContext.Provider>
  );
}
