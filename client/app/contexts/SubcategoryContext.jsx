"use client";

import { createContext, useState } from "react";

export const SubcategoryContext = createContext();

export const SubcategoryProvider = ({ children }) => {
  const [subcategoryId, setSubcategoryId] = useState();

  return (
    <SubcategoryContext.Provider value={{ subcategoryId, setSubcategoryId }}>
      {children}
    </SubcategoryContext.Provider>
  );
};
