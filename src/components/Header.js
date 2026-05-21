import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SearchBox from "./SearchBox";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
import { FaShoppingCart, FaUser, FaBars, FaTimes, FaChevronDown } from "react-icons/fa";

function Header() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const logoutHandler = () => {
    dispatch(logout());
    setUserOpen(false);
    setMobileOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  const mainLinks = [
    { to: "/products", label: "Shop" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-nav-shadow">
      <div className="bg-primary-dark text-white/90 py-1.5 text-center text-[11px] font-medium tracking-wide">
        Free delivery on orders over ৳500 · Secure payment · Global shipping
      </div>
      <nav className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between gap-4">
          <Link
            to="/"
            className="flex items-center gap-2.5 text-xl font-extrabold text-primary-dark no-underline shrink-0"
          >
            <span className="w-9 h-9 rounded-lg bg-primary text-white flex items-center justify-center text-sm font-black">
              E
            </span>
            <span className="hidden sm:inline">
              Electro<span className="text-primary font-bold">vix</span>
            </span>
          </Link>

          <div className="hidden md:flex flex-1 max-w-xl mx-4">
            <SearchBox />
          </div>

          <button
            type="button"
            className="md:hidden p-2 rounded-lg text-primary hover:bg-accent-pale"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
          </button>

          <div className={`${mobileOpen ? "flex" : "hidden"} md:flex items-center gap-2 md:gap-3 absolute md:relative top-full left-0 right-0 md:top-auto bg-white md:bg-transparent border-b md:border-0 border-accent-light/50 md:shadow-none shadow-card p-4 md:p-0 flex-col md:flex-row`}>
            <div className="md:hidden w-full mb-3">
              <SearchBox />
            </div>
            <div className="hidden md:flex items-center gap-1 mr-2">
              {mainLinks.map(({ to, label }) => (
                <Link
                  key={label}
                  to={to}
                  className={`px-3 py-2 rounded-lg text-sm font-medium no-underline transition-colors ${
                    isActive(to) ? "text-primary-dark bg-accent-pale" : "text-primary hover:text-primary-dark hover:bg-accent-pale"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>

            {!userInfo && (
              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-dark py-2 px-3 rounded-lg hover:bg-accent-pale no-underline"
              >
                <FaUser className="w-4 h-4" /> Sign In
              </Link>
            )}
            <Link
              to="/cart"
              className="inline-flex items-center gap-1.5 text-sm font-semibold bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark no-underline transition-colors"
            >
              <span className="relative">
                <FaShoppingCart className="w-4 h-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 min-w-[1rem] h-4 px-1 flex items-center justify-center bg-primary-dark text-white text-[10px] font-bold rounded-full">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </span>
              Cart
            </Link>

            {userInfo?.isAdmin && (
              <div className="relative">
                <button
                  type="button"
                  className="flex items-center gap-1 text-sm font-medium text-primary py-2 px-3 rounded-lg hover:bg-accent-pale"
                  onClick={() => {
                    setAdminOpen(!adminOpen);
                    setUserOpen(false);
                  }}
                >
                  Admin <FaChevronDown className={`w-3 transition-transform ${adminOpen ? "rotate-180" : ""}`} />
                </button>
                {adminOpen && (
                  <div className="absolute right-0 mt-1 w-40 bg-white rounded-lg shadow-card-hover border border-accent-light/60 py-1 z-50">
                    <Link to="/admin/userlist" className="block px-3 py-2 text-sm text-primary-dark hover:bg-accent-pale no-underline" onClick={() => setAdminOpen(false)}>Users</Link>
                    <Link to="/admin/productlist" className="block px-3 py-2 text-sm text-primary-dark hover:bg-accent-pale no-underline" onClick={() => setAdminOpen(false)}>Products</Link>
                    <Link to="/admin/orderlist" className="block px-3 py-2 text-sm text-primary-dark hover:bg-accent-pale no-underline" onClick={() => setAdminOpen(false)}>Orders</Link>
                  </div>
                )}
              </div>
            )}
            {userInfo && (
              <div className="relative">
                <button
                  type="button"
                  className="flex items-center gap-1 text-sm font-medium text-primary py-2 px-3 rounded-lg hover:bg-accent-pale"
                  onClick={() => {
                    setUserOpen(!userOpen);
                    setAdminOpen(false);
                  }}
                >
                  <FaUser className="w-4 h-4" /> {userInfo.name?.split(" ")[0]}
                  <FaChevronDown className={`w-3 transition-transform ${userOpen ? "rotate-180" : ""}`} />
                </button>
                {userOpen && (
                  <div className="absolute right-0 mt-1 w-36 bg-white rounded-lg shadow-card-hover border border-accent-light/60 py-1 z-50">
                    <Link to="/profile" className="block px-3 py-2 text-sm text-primary-dark hover:bg-accent-pale no-underline" onClick={() => setUserOpen(false)}>Profile</Link>
                    <button type="button" className="block w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50" onClick={logoutHandler}>Logout</button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        {mobileOpen && (
          <div className="md:hidden flex gap-3 pt-3 border-t border-accent-light/50 mt-3">
            {mainLinks.map(({ to, label }) => (
              <Link key={label} to={to} className="text-sm font-medium text-primary no-underline" onClick={() => setMobileOpen(false)}>
                {label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
