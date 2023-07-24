import { createContext, ReactNode, useContext, useEffect, useRef } from "react";

type ListContextType = {
  inititalRender: boolean;
} | null;

type ListContextProviderType = {
  children: ReactNode;
};

const ListContext = createContext<ListContextType>(null);

export function useListContext() {
  const context = useContext(ListContext);
  if (!context) throw new Error("useListContext hook must be used inside ListContext component");
  return context;
}

export function ListContextProvider({ children }: ListContextProviderType) {
  const initialRender = useRef(true);
  useEffect(() => {
    initialRender.current = false;
  }, []);
  return (
    <ListContext.Provider value={{ inititalRender: initialRender.current }}>{children}</ListContext.Provider>
  );
}
