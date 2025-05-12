import { useState } from "react";
import Image from "next/image";
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineShoppingBag } from "react-icons/hi2";

const Header = ({ title, bgColor = "#800000" }) => { // Standard header farve heroppe guys
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  return (
    <section
      className="relative flex justify-between items-center text-white p-4 px-8"
      style={{ backgroundColor: bgColor }} // Header farve på singleview sider og eventuelt events?
    >
      <div className="flex items-center gap-4">
        <Image
          src="/img/SMK_MiniLogo_White.png"
          alt="Logo"
          width={240}
          height={82}
        />
        <h1 className="text-8xl font-thin">{title}</h1>
      </div>

      <div className="flex items-center gap-6 relative">
        <div className="relative">
          <IoSearchOutline
            className="cursor-pointer scale-150"
            onClick={toggleSearch}
          />
          {showSearch && (
            <input
              type="text"
              className="absolute right-full mr-2 top-1/2 -translate-y-1/2 p-1 text-white"
              placeholder="Søg..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          )}
        </div>

        <HiOutlineShoppingBag className="scale-150" />
      </div>
    </section>
  );
};

export default Header;
