import { ReactNode } from "react";
import Footer from "../Footer";
import Header from "../Header";

type LayoutProps = { children: ReactNode };

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="no-scrollbar">
      <Header />
      <main className="container mx-auto mt-16 p-4 xl:px-24">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
