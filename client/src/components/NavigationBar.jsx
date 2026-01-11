import { Heart, Search, ShoppingBag, User } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../Context/StoreContext";

const NavigationBar = () => {
  const { totalCartProduct, assets, navigate } = useContext(StoreContext);
  const [show, setShow] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${query}`);
  }

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
    <nav className={`w-[97%] h-[60px] fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-white px-11 flex-row-between-property rounded-xl shadow-[0_8px_25px_rgba(0,0,0,0.12)] transition-transform duration-300 ${show ? "translate-y-0" : "-translate-y-[120px]"}`}>
      {/* // Left links */}
      <div className="flex-row-center-property gap-11">
        <Link to="/" className="block">
          <h1 className="roker-font text-3xl">Luxora</h1>
          <h1 className="roker-font text-xl ps-15">Avenue</h1>
        </Link>

        <ul className="flex-row-center-property gap-7 text-sm font-bold">
          {assets.navigationBarLink.map((item) => (
            <li key={item.name} className="">
              <Link
                to={item.link}
                className="block cursor-pointer hover:text-pink-600 transition">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* RIGHT */}
      <ul className="flex-row-center-property gap-7">
        <li>
          <form onSubmit={handleSearch} className="flex-row-center-property bg-[#eee] rounded-md px-2">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search for products, brands and more"
              className="outline-none p-2 text-sm bg-transparent"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              />
          </form>
        </li>

        <li>
          <Link to="/profile" className="flex-col-center-property">
            <User />
            <small>Profile</small>
          </Link>
        </li>

        <li>
          <Link to="/wishlist" className="flex-col-center-property">
            <Heart />
            <small>Wishlist</small>
          </Link>
        </li>

        <li>
          <Link to="/cart" className="flex-col-center-property relative">
            <ShoppingBag />
            <small>Bag</small>

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