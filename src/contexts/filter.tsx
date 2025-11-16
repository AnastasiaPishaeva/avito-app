import React, { createContext, useContext, useState, type ReactNode } from "react";

export interface FiltersState {
  status: string[];
  categoryId: string;
  minPrice: string ;
  maxPrice: string ;
  search: string;
  sortBy: string;
  sortOrder: string;
}

interface FiltersContextProps {
  filters: FiltersState;
  setFilters: (filters: FiltersState) => void;
  resetFilters: () => void;
}

const FiltersContext = createContext<FiltersContextProps | undefined>(undefined);

export const FiltersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [filters, setFilters] = useState<FiltersState>({
    status: [],
    categoryId: "",
    minPrice: "",
    maxPrice: "",
    search: "",
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const resetFilters = () => {
    setFilters({
      status: [],
      categoryId: "",
      minPrice: "",
      maxPrice: "",
      search: "",
      sortBy: "createdAt",
      sortOrder: "desc",
    });
  };

  return (
    <FiltersContext.Provider value={{ filters, setFilters, resetFilters }}>
      {children}
    </FiltersContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FiltersContext);
  if (!context) throw new Error("useFilters must be used within a FiltersProvider");
  return context;
};
