import { CircleUserRound, Heart, Search, ShoppingBag } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { StoreContext } from "../Context/StoreContext";

const NavigationBar = () => {
  const { totalCartProduct, assets, navigate } = useContext(StoreContext);
  const [show, setShow] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?query=${query}`);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScroll && currentScroll > 50) {
        setShow(false);
      } else {
        setShow(true);
      }

      setLastScroll(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  return (
    <nav
      className={`w-[97%] h-[70px] fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-[#FFF] px-5 flex-row-between-property rounded-lg transition-transform duration-300 ${show ? "translate-y-0" : "-translate-y-[120px]"}`}
    >
      {/* // Left links */}
      <ul className="flex-row-center-property gap-11">
        <li className="h-[70px] flex items-center">
          <Link to="/" className="block">
            <h1 className="roker-font text-3xl">Luxora</h1>
            <h1 className="roker-font text-xl ps-15">Avenue</h1>
          </Link>
        </li>

        <li className="flex gap-5 px-2">
          {assets.navigationBarLink.map((item) => (
            <NavLink
              key={item.name}
              to={item.link}
              className={({ isActive }) =>
                `relative h-[70px] flex items-center px-2 py-auto transition ${isActive ? "text-pink-600" : "text-black"} after:content-[''] after:absolute after:left-0 after:-bottom-0 after:h-[4px] after:w-0 after:bg-pink-600 after:transition-all after:duration-300 hover:after:w-full after:rounded-t-full font-semibold`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </li>
      </ul>

      {/* RIGHT */}
      <ul className="flex-row-center-property gap-7">
        <li>
          <form
            onSubmit={handleSearch}
            className="flex items-center bg-[#eee] rounded-md px-2 w-[280px] gap-2">
            <button
              type="submit"
              disabled={!query}
              className={`${query ? "cursor-pointer text-black" : "opacity-50"}`}>
              <Search size={20} />
            </button>

            <input
              type="text"
              placeholder="Search for products, brands and more"
              className="outline-none py-2 text-sm bg-transparent flex-1"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>
        </li>

        <li>
          <Link to="/profile">
            <CircleUserRound />
          </Link>
        </li>

        <li>
          <Link to="/wishlist">
            <Heart />
          </Link>
        </li>

        <li>
          <Link to="/cart" className="relative">
            <ShoppingBag />
            {totalCartProduct() > 0 && (
              <span className="absolute -top-2 -right-1 bg-black text-white text-xs px-1.5 py-[2px] rounded-full">
                {totalCartProduct()}
              </span>
            )}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
