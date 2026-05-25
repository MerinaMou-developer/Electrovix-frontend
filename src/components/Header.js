import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SearchBox from "./SearchBox";
import CategoryRibbon from "./CategoryRibbon";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
import {
  FaShoppingCart,
  FaUser,
  FaBars,
  FaTimes,
  FaChevronDown,
  FaHeart,
  FaClipboardList,
} from "react-icons/fa";

function Header() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const { userInfo } = useSelector((state) => state.userLogin);
  const { cartItems } = useSelector((state) => state.cart);
  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const logoutHandler = () => {
    dispatch(logout());
    setUserOpen(false);
    setMobileOpen(false);
  };

  const hideRibbon = ["/login", "/register", "/forgot-password"].some((p) =>
    location.pathname.startsWith(p)
  );

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-nav-shadow">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4">
        <div className="flex items-center gap-3 md:gap-6">
          <Link
            to="/"
            className="flex items-center gap-2.5 text-xl font-extrabold text-ink no-underline shrink-0"
          >
            <span className="w-10 h-10 rounded-2xl bg-cta-gradient text-white flex items-center justify-center text-sm font-black shadow-pill">
              E
            </span>
            <span className="hidden sm:inline tracking-tight">
              Electro<span className="text-primary">vix</span>
            </span>
          </Link>

          <div className="hidden md:flex flex-1 justify-center px-4">
            <SearchBox />
          </div>

          <div className="flex items-center gap-1 md:gap-2 ml-auto">
            {userInfo && (
              <Link to="/profile" className="nav-icon-btn hidden sm:flex" title="Orders">
                <FaClipboardList className="w-4 h-4" />
              </Link>
            )}
            <Link to="/products?filter_by=featured" className="nav-icon-btn hidden sm:flex" title="Favorites">
              <FaHeart className="w-4 h-4" />
            </Link>
            <Link to="/cart" className="nav-icon-btn" title="Cart">
              <FaShoppingCart className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 min-w-[1.1rem] h-[1.1rem] px-1 flex items-center justify-center bg-red-500 text-white text-[10px] font-bold rounded-full">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>

            {!userInfo ? (
              <Link
                to="/login"
                className="hidden sm:inline-flex items-center gap-2 text-sm font-bold text-primary hover:bg-accent-pale py-2.5 px-4 rounded-2xl no-underline transition-colors"
              >
                Sign in
              </Link>
            ) : (
              <div className="relative hidden sm:block">
                <button
                  type="button"
                  className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-2xl hover:bg-accent-pale transition-colors"
                  onClick={() => {
                    setUserOpen(!userOpen);
                    setAdminOpen(false);
                  }}
                >
                  <span className="w-9 h-9 rounded-xl bg-cta-gradient text-white flex items-center justify-center text-xs font-bold">
                    {(userInfo.name || "U").charAt(0).toUpperCase()}
                  </span>
                  <FaChevronDown className={`w-3 text-muted transition-transform ${userOpen ? "rotate-180" : ""}`} />
                </button>
                {userOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-white rounded-2xl shadow-card-hover border border-accent-light py-2 z-50">
                    <Link
                      to="/profile"
                      className="block px-4 py-2.5 text-sm font-medium text-ink hover:bg-accent-pale no-underline"
                      onClick={() => setUserOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      type="button"
                      className="block w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
                      onClick={logoutHandler}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            {userInfo?.isAdmin && (
              <div className="relative hidden lg:block">
                <button
                  type="button"
                  className="text-xs font-bold text-primary py-2 px-3 rounded-xl hover:bg-accent-pale"
                  onClick={() => setAdminOpen(!adminOpen)}
                >
                  Admin
                </button>
                {adminOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-2xl shadow-card-hover border border-accent-light py-2 z-50">
                    <Link to="/admin/userlist" className="block px-4 py-2 text-sm no-underline text-ink hover:bg-accent-pale" onClick={() => setAdminOpen(false)}>Users</Link>
                    <Link to="/admin/productlist" className="block px-4 py-2 text-sm no-underline text-ink hover:bg-accent-pale" onClick={() => setAdminOpen(false)}>Products</Link>
                    <Link to="/admin/orderlist" className="block px-4 py-2 text-sm no-underline text-ink hover:bg-accent-pale" onClick={() => setAdminOpen(false)}>Orders</Link>
                  </div>
                )}
              </div>
            )}

            <button
              type="button"
              className="md:hidden nav-icon-btn"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        <div className="md:hidden mt-3">
          <SearchBox />
        </div>

        {mobileOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-accent-light flex flex-col gap-2">
            <Link to="/products" className="py-2 font-semibold text-ink no-underline" onClick={() => setMobileOpen(false)}>Shop</Link>
            <Link to="/about" className="py-2 text-ink-soft no-underline" onClick={() => setMobileOpen(false)}>About</Link>
            {!userInfo && (
              <Link to="/login" className="btn-primary text-center no-underline" onClick={() => setMobileOpen(false)}>
                <FaUser /> Sign in
              </Link>
            )}
          </div>
        )}
      </nav>
      {!hideRibbon && <CategoryRibbon />}
    </header>
  );
}

export default Header;
