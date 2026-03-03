"use client";

import { createContext, useContext, useMemo, useState, ReactNode } from "react";

type Unit = "metric" | "imperial";

type UnitContextType = {
  unit: Unit;
  toggleUnit: () => void;
};

const UnitContext = createContext<UnitContextType | undefined>(undefined);

export function UnitProvider({ children }: { children: ReactNode }) {
  const [unit, setUnit] = useState<Unit>("metric");

  const toggleUnit = () => {
    setUnit(unit === "metric" ? "imperial" : "metric");
  };

  const contextValue = useMemo(() => {
    return { unit, toggleUnit };
  }, [unit]);

  
    return (    
      <UnitContext.Provider value={contextValue}>
        {children}
      </UnitContext.Provider>
    )
}

export const useUnit = () => {
  const context = useContext(UnitContext);
  if (!context) {
    throw new Error("useUnit must be used within a UnitProvider");
  }
  return context;
};