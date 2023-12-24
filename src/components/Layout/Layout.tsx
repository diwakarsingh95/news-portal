import { ReactNode } from "react";
import Footer from "../Footer";
import Header from "../Header";

type LayoutProps = { children: ReactNode };

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="no-scrollbar">
      <Header />
      <main className="max-w-xl sm:container mx-auto mt-20 px-6 sm:px-8 md:px-10 lg:px-20 xl:px-24 mb-10">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
