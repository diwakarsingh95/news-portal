import { MdSearch } from "react-icons/md";
import { MdLogout } from "react-icons/md";

const Header = () => {
  return (
    <header className="fixed w-full top-0 z-10 py-6 px-5 md:px-6 lg:px-16 xl:px-20">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="font-bold flex flex-wrap leading-none items-center gap-2">
            <span className="bg-black text-white p-2 rounded-l">News</span>
            <span>Portal</span>
          </h1>
          <div className="inline-flex items-center gap-4">
            <button className="text-xl">
              <MdSearch />
            </button>
            <button className="text-lg font-light">
              <MdLogout />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
