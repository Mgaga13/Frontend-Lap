import Header from "./Header";
import Footer from "./Footer";
import { createContext, useState } from "react";
export const SearchContext = createContext<{
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  totalCart: number;
  setTotalCart: React.Dispatch<React.SetStateAction<number>>;
}>({
  search: "",
  setSearch: () => {}, // Default empty function
  totalCart: 0, // Default value for totalCart
  setTotalCart: () => {}, // Default empty function
});
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [search, setSearch] = useState("");
  const [totalCart, setTotalCart] = useState<number>(0);
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <SearchContext.Provider
        value={{ search, setSearch, totalCart, setTotalCart }}
      >
        <Header />
        <main style={{ marginTop: "64px", flex: "1", padding: "10px" }}>
          {children}
        </main>
        <Footer />
      </SearchContext.Provider>
    </div>
  );
};

export default Layout;
