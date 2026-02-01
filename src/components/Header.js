import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SearchBox from "./SearchBox";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";

function Header() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
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
  };
  const isActive = (path) => location.pathname === path;
  const linkClass = (path) =>
    `text-gray-800 hover:text-blue-600 no-underline ${isActive(path) ? "text-blue-600 font-bold" : ""}`;

  return (
    <header>
      <div className="flex justify-between items-center px-4 py-2 bg-gray-100 border-b border-gray-200 text-sm">
        <span>World's Fastest Online Shopping Destination</span>
        <div>
          <span className="mr-3">Bangladesh</span>|<span className="ml-3">BDT</span>
        </div>
      </div>

      <nav className="bg-white py-3 shadow-sm">
        <div className="container mx-auto px-4 flex flex-wrap items-center justify-between">
          <Link to="/" className={`font-bold text-xl text-gray-900 ${isActive("/") ? "text-blue-600 underline" : ""}`}>
            Electrovix
          </Link>

          <button
            type="button"
            className="md:hidden p-2 rounded hover:bg-gray-100"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              {mobileOpen ? (
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              ) : (
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              )}
            </svg>
          </button>

          <div className={`w-full md:flex md:items-center md:w-auto ${mobileOpen ? "block" : "hidden"}`}>
            <div className="flex flex-col md:flex-row md:items-center md:gap-4 pt-4 md:pt-0">
              {/* Categories dropdown */}
              <div className="relative">
                <button
                  type="button"
                  className="flex items-center gap-1 text-gray-800 hover:text-blue-600 py-2"
                  onClick={() => setCategoriesOpen(!categoriesOpen)}
                >
                  All Categories
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                {categoriesOpen && (
                  <div className="absolute left-0 mt-1 w-48 bg-white rounded shadow-lg border py-1 z-50">
                    <Link to="/category/electronics" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setCategoriesOpen(false)}>Electronics</Link>
                    <Link to="/category/fashion" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setCategoriesOpen(false)}>Fashion</Link>
                    <Link to="/category/home" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setCategoriesOpen(false)}>Home</Link>
                  </div>
                )}
              </div>

              <div className="flex-1 max-w-md my-2 md:my-0">
                <SearchBox />
              </div>

              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 border-t md:border-t-0 pt-2 md:pt-0">
                <Link to="/login" className={linkClass("/login")}>
                  <span className="mr-1">Login</span>
                </Link>
                <Link to="/cart" className={`flex items-center gap-1 ${linkClass("/cart")}`}>
                  Cart
                  {cartCount > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5">{cartCount}</span>
                  )}
                </Link>

                {userInfo?.isAdmin && (
                  <div className="relative">
                    <button
                      type="button"
                      className={linkClass("/admin/userlist")}
                      onClick={() => { setAdminOpen(!adminOpen); setUserOpen(false); }}
                    >
                      Admin ▾
                    </button>
                    {adminOpen && (
                      <div className="absolute right-0 mt-1 w-40 bg-white rounded shadow-lg border py-1 z-50">
                        <Link to="/admin/userlist" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setAdminOpen(false)}>Users</Link>
                        <Link to="/admin/productlist" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setAdminOpen(false)}>Products</Link>
                        <Link to="/admin/orderlist" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setAdminOpen(false)}>Orders</Link>
                      </div>
                    )}
                  </div>
                )}

                {userInfo && (
                  <div className="relative">
                    <button
                      type="button"
                      className={linkClass("/profile")}
                      onClick={() => { setUserOpen(!userOpen); setAdminOpen(false); }}
                    >
                      {userInfo.name} ▾
                    </button>
                    {userOpen && (
                      <div className="absolute right-0 mt-1 w-32 bg-white rounded shadow-lg border py-1 z-50">
                        <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setUserOpen(false)}>Profile</Link>
                        <button type="button" className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={logoutHandler}>Logout</button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="bg-primary-light text-white">
        <div className="container mx-auto px-4 py-2 flex flex-wrap justify-center gap-6">
          <Link to="/" className="text-white hover:underline">Shop</Link>
          <Link to="/" className="text-white hover:underline">Blog</Link>
          <Link to="/" className="text-white hover:underline">About</Link>
          <Link to="/" className="text-white hover:underline">Pages</Link>
          <Link to="/" className="text-white hover:underline">Brand</Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
