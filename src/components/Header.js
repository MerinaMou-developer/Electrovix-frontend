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
  const [categoriesOpen, setCategoriesOpen] = useState(false);

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
    { to: "/", label: "Shop" },
    { to: "/", label: "Deals" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-soft">
      {/* Single compact nav bar */}
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <Link
            to="/"
            className="text-xl font-extrabold tracking-tight text-primary no-underline hover:text-accent transition-colors shrink-0"
          >
            Electrovix
          </Link>

          <button
            type="button"
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
          </button>

          <div className={`flex-1 md:flex md:items-center md:justify-between gap-4 ${mobileOpen ? "block absolute left-0 right-0 top-full mt-0 bg-white border-t border-slate-100 shadow-lg px-4 py-3" : "hidden md:flex"}`}>
            <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-5">
              <div className="relative">
                <button
                  type="button"
                  className="flex items-center gap-1 text-sm font-medium text-slate-700 hover:text-accent py-2"
                  onClick={() => setCategoriesOpen(!categoriesOpen)}
                >
                  Categories <FaChevronDown className={`w-3 transition-transform ${categoriesOpen ? "rotate-180" : ""}`} />
                </button>
                {categoriesOpen && (
                  <div className="absolute left-0 mt-0.5 w-44 bg-white rounded-lg shadow-card-hover border border-slate-100 py-1.5 z-50">
                    <Link to="/?category_slug=electronics" className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-accent" onClick={() => setCategoriesOpen(false)}>Electronics</Link>
                    <Link to="/?category_slug=fashion" className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-accent" onClick={() => setCategoriesOpen(false)}>Fashion</Link>
                    <Link to="/?category_slug=home" className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-accent" onClick={() => setCategoriesOpen(false)}>Home</Link>
                  </div>
                )}
              </div>

              <div className="hidden lg:flex items-center gap-1 text-sm">
                {mainLinks.map(({ to, label }) => (
                  <Link key={label} to={to} className={`px-3 py-2 rounded-lg no-underline ${isActive(to) && to !== "/" ? "text-accent font-medium" : "text-slate-600 hover:text-accent hover:bg-slate-50"}`}>
                    {label}
                  </Link>
                ))}
              </div>

              <div className="flex-1 max-w-xs lg:max-w-sm">
                <SearchBox />
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
              {!userInfo && (
                <Link to="/login" className={`inline-flex items-center gap-1.5 text-sm font-medium py-2 px-3 rounded-lg no-underline ${isActive("/login") ? "text-accent" : "text-slate-700 hover:text-accent"}`}>
                  <FaUser className="w-4 h-4" /> Sign In
                </Link>
              )}
              <Link to="/cart" className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-700 hover:text-accent py-2 px-3 rounded-lg hover:bg-slate-50 no-underline">
                <span className="relative">
                  <FaShoppingCart className="w-4 h-4" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 min-w-[1.1rem] h-4 px-1 flex items-center justify-center bg-accent text-white text-[10px] font-bold rounded-full">
                      {cartCount > 99 ? "99+" : cartCount}
                    </span>
                  )}
                </span>
                Cart
              </Link>
              {userInfo?.isAdmin && (
                <div className="relative">
                  <button type="button" className={`flex items-center gap-1 text-sm font-medium py-2 px-3 rounded-lg ${isActive("/admin/userlist") || isActive("/admin/productlist") || isActive("/admin/orderlist") ? "text-accent bg-accent/10" : "text-slate-700 hover:text-accent hover:bg-slate-50"}`} onClick={() => { setAdminOpen(!adminOpen); setUserOpen(false); }}>
                    Admin <FaChevronDown className={`w-3 transition-transform ${adminOpen ? "rotate-180" : ""}`} />
                  </button>
                  {adminOpen && (
                    <div className="absolute right-0 mt-0.5 w-40 bg-white rounded-lg shadow-card-hover border border-slate-100 py-1.5 z-50">
                      <Link to="/admin/userlist" className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-accent" onClick={() => setAdminOpen(false)}>Users</Link>
                      <Link to="/admin/productlist" className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-accent" onClick={() => setAdminOpen(false)}>Products</Link>
                      <Link to="/admin/orderlist" className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-accent" onClick={() => setAdminOpen(false)}>Orders</Link>
                    </div>
                  )}
                </div>
              )}
              {userInfo && (
                <div className="relative">
                  <button type="button" className={`flex items-center gap-1 text-sm font-medium py-2 px-3 rounded-lg ${isActive("/profile") ? "text-accent bg-accent/10" : "text-slate-700 hover:text-accent hover:bg-slate-50"}`} onClick={() => { setUserOpen(!userOpen); setAdminOpen(false); }}>
                    <FaUser className="w-4 h-4" /> {userInfo.name?.split(" ")[0]} <FaChevronDown className={`w-3 transition-transform ${userOpen ? "rotate-180" : ""}`} />
                  </button>
                  {userOpen && (
                    <div className="absolute right-0 mt-0.5 w-36 bg-white rounded-lg shadow-card-hover border border-slate-100 py-1.5 z-50">
                      <Link to="/profile" className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-accent" onClick={() => setUserOpen(false)}>Profile</Link>
                      <button type="button" className="block w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-red-600" onClick={logoutHandler}>Logout</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Mobile: show Shop/About/Contact under nav when open */}
        {mobileOpen && (
          <div className="md:hidden flex flex-wrap gap-2 pt-2 border-t border-slate-100">
            <Link to="/" className="text-sm text-slate-600 hover:text-accent px-2 py-1 no-underline">Shop</Link>
            <Link to="/about" className="text-sm text-slate-600 hover:text-accent px-2 py-1 no-underline">About</Link>
            <Link to="/contact" className="text-sm text-slate-600 hover:text-accent px-2 py-1 no-underline">Contact</Link>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
