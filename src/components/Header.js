import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SearchBox from "./SearchBox";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
import { FaShoppingCart, FaUser, FaBars, FaTimes, FaChevronDown, FaTruck, FaShieldAlt, FaBolt } from "react-icons/fa";

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
    { to: "/products", label: "Products" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-nav-gradient shadow-nav-shadow border-b border-white/10">
      <div className="bg-primary-dark/80 py-2 shadow-inner-glow">
        <div className="container mx-auto px-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-[11px] font-medium text-accent-pale/90">
          <span className="flex items-center gap-2">
            <FaTruck className="w-3.5 h-3.5 text-accent-light" /> Free delivery over ৳500
          </span>
          <span className="flex items-center gap-2">
            <FaShieldAlt className="w-3.5 h-3.5 text-accent-light" /> Secure payment
          </span>
          <span className="hidden sm:flex items-center gap-2">
            <FaBolt className="w-3.5 h-3.5 text-accent-light" /> Trusted global brands
          </span>
        </div>
      </div>
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-white no-underline hover:text-accent-light transition-colors shrink-0"
          >
            <span className="w-9 h-9 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center text-accent-light font-black text-sm">
              E
            </span>
            <span>
              Electro<span className="text-accent-light">vix</span>
            </span>
          </Link>

          <button
            type="button"
            className="md:hidden p-2 rounded-lg text-accent-pale hover:bg-white/10 hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
          </button>

          <div className={`flex-1 md:flex md:items-center md:justify-between gap-4 ${mobileOpen ? "block absolute left-0 right-0 top-full mt-0 bg-primary/98 backdrop-blur-xl border-t border-white/10 shadow-xl px-4 py-4" : "hidden md:flex"}`}>
            <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-5">
              <div className="hidden lg:flex items-center gap-1 text-sm">
                {mainLinks.map(({ to, label }) => (
                  <Link
                    key={label}
                    to={to}
                    className={`px-3 py-2 rounded-lg no-underline transition-colors ${
                      isActive(to)
                        ? "text-white bg-white/15 font-medium"
                        : "text-accent-pale hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {label}
                  </Link>
                ))}
              </div>

              <div className="flex-1 max-w-xs lg:max-w-sm">
                <SearchBox />
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-white/10">
              {!userInfo && (
                <Link
                  to="/login"
                  className={`inline-flex items-center gap-1.5 text-sm font-semibold py-2 px-4 rounded-xl no-underline transition-all ${
                    isActive("/login")
                      ? "bg-accent text-white shadow-glow"
                      : "text-accent-pale hover:text-white hover:bg-white/10"
                  }`}
                >
                  <FaUser className="w-4 h-4" /> Sign In
                </Link>
              )}
              <Link
                to="/cart"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-pale hover:text-white py-2 px-3 rounded-xl hover:bg-white/10 no-underline transition-all"
              >
                <span className="relative">
                  <FaShoppingCart className="w-4 h-4" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 min-w-[1.1rem] h-4 px-1 flex items-center justify-center bg-accent-light text-primary text-[10px] font-bold rounded-full">
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
                    className={`flex items-center gap-1 text-sm font-semibold py-2 px-3 rounded-xl transition-all ${
                      isActive("/admin/userlist") || isActive("/admin/productlist") || isActive("/admin/orderlist")
                        ? "text-white bg-white/15"
                        : "text-accent-pale hover:text-white hover:bg-white/10"
                    }`}
                    onClick={() => {
                      setAdminOpen(!adminOpen);
                      setUserOpen(false);
                    }}
                  >
                    Admin <FaChevronDown className={`w-3 transition-transform ${adminOpen ? "rotate-180" : ""}`} />
                  </button>
                  {adminOpen && (
                    <div className="absolute right-0 mt-0.5 w-40 bg-white rounded-xl shadow-card-hover border border-accent-light/50 py-1.5 z-50">
                      <Link to="/admin/userlist" className="block px-3 py-2 text-sm text-slate-700 hover:bg-accent-pale hover:text-primary" onClick={() => setAdminOpen(false)}>Users</Link>
                      <Link to="/admin/productlist" className="block px-3 py-2 text-sm text-slate-700 hover:bg-accent-pale hover:text-primary" onClick={() => setAdminOpen(false)}>Products</Link>
                      <Link to="/admin/orderlist" className="block px-3 py-2 text-sm text-slate-700 hover:bg-accent-pale hover:text-primary" onClick={() => setAdminOpen(false)}>Orders</Link>
                    </div>
                  )}
                </div>
              )}
              {userInfo && (
                <div className="relative">
                  <button
                    type="button"
                    className={`flex items-center gap-1 text-sm font-semibold py-2 px-3 rounded-xl transition-all ${
                      isActive("/profile") ? "text-white bg-white/15" : "text-accent-pale hover:text-white hover:bg-white/10"
                    }`}
                    onClick={() => {
                      setUserOpen(!userOpen);
                      setAdminOpen(false);
                    }}
                  >
                    <FaUser className="w-4 h-4" /> {userInfo.name?.split(" ")[0]}{" "}
                    <FaChevronDown className={`w-3 transition-transform ${userOpen ? "rotate-180" : ""}`} />
                  </button>
                  {userOpen && (
                    <div className="absolute right-0 mt-0.5 w-36 bg-white rounded-xl shadow-card-hover border border-accent-light/50 py-1.5 z-50">
                      <Link to="/profile" className="block px-3 py-2 text-sm text-slate-700 hover:bg-accent-pale hover:text-primary" onClick={() => setUserOpen(false)}>Profile</Link>
                      <button type="button" className="block w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-accent-pale hover:text-red-600" onClick={logoutHandler}>Logout</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        {mobileOpen && (
          <div className="md:hidden flex flex-wrap gap-2 pt-2 border-t border-white/10">
            {mainLinks.map(({ to, label }) => (
              <Link key={label} to={to} className="text-sm text-accent-pale hover:text-accent-light px-2 py-1 no-underline">
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
