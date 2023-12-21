import { ReactNode } from "react";
import Footer from "../Footer";
import Header from "../Header";

type LayoutProps = { children: ReactNode };

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <main className="mt-[80px]">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
