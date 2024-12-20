import Header from "./Header";
import Footer from "./Footer";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Header />
      <main style={{ marginTop: "64px", flex: "1", padding: "10px" }}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
