import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import ShopByCategory from "../components/ShopByCategory";
import DealsBanner from "../components/DealsBanner";
import WhyShopWithUs from "../components/WhyShopWithUs";
import NewsletterSignup from "../components/NewsletterSignup";
import CategoryList from "../components/CategoryList";
import BrandList from "../components/BrandList";
import PriceFilter from "../components/PriceFilter";
import { listProducts } from "../actions/productActions";
import { useLocation, useNavigate } from "react-router-dom";
import { FaUndo } from "react-icons/fa";
import AIChatBox from "../components/AIChatBox";

function HomeScreen() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  // Extract query parameters
  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get("keyword") || "";
  const filterBy = queryParams.get("filter_by") || "";
  const currentPage = queryParams.get("page") || 1;
  const categorySlug = queryParams.get("category_slug") || "";
  const brandSlug = queryParams.get("brand_slug") || "";
  const minPrice = queryParams.get("minPrice") || "";
  const maxPrice = queryParams.get("maxPrice") || "";

  // Fetch products whenever filters or pagination change
  useEffect(() => {
    dispatch(
      listProducts(
        keyword,
        filterBy,
        currentPage,
        categorySlug,
        brandSlug,
        minPrice,
        maxPrice
      )
    );
  }, [
    dispatch,
    keyword,
    filterBy,
    currentPage,
    categorySlug,
    brandSlug,
    minPrice,
    maxPrice,
  ]);

  // Update query parameters while preserving existing filters
  const updateQueryParams = (updates) => {
    const params = new URLSearchParams(location.search);

    // Update or delete provided parameters
    Object.entries(updates).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.set(key, value); // Set the new value
      } else {
        params.delete(key); // Remove the parameter if empty
      }
    });

    // Navigate to the updated URL
    navigate(`/?${params.toString()}`);
  };

  // Handlers for filter interactions
  const handleCategoryClick = (newCategorySlug) => {
    updateQueryParams({
      category_slug: newCategorySlug,
      page: 1, // Reset to the first page
    });
  };

  const handleBrandClick = (newBrandSlug) => {
    updateQueryParams({
      brand_slug: newBrandSlug,
      page: 1, // Reset to the first page
    });
  };

  const handleFilterChange = (newFilter) => {
    updateQueryParams({ filter_by: newFilter, page: 1 });
  };

  const handlePriceFilterChange = (newMinPrice, newMaxPrice) => {
    updateQueryParams({
      minPrice: newMinPrice,
      maxPrice: newMaxPrice,
      page: 1,
    });
  };

  // Reset Filters
  const resetFilters = () => {
    navigate("/"); // Reset URL to the base without any query params
  };

  const filterTabs = [
    ["best_seller", "Best Seller"],
    ["featured", "Featured"],
    ["latest", "New"],
    ["discount", "Discount"],
  ];

  return (
    <div className="animate-fade-in">
      {/* Compact hero */}
      <div className="full-bleed mb-6">
        <ProductCarousel />
      </div>

      {/* Shop by Category */}
      <ShopByCategory />

      {/* Deals banner */}
      <DealsBanner />

      {/* AI Assistant */}
      {/* <AIChatBox /> */}

      {/* Trending Products */}
      <h1 className="section-title my-10">Trending Products</h1>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <aside className="md:col-span-3 space-y-6">
          <div className="glass-card p-5 sticky top-28">
            <h2 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-accent rounded-full" />
              Filters
            </h2>
          <CategoryList
            selectedCategory={categorySlug} // Highlight active category
            onCategoryClick={handleCategoryClick} // Callback to handle category click
          />
          <BrandList
            selectedBrand={brandSlug} // Highlight active brand
            onBrandClick={handleBrandClick} // Callback to handle brand click
          />
          <PriceFilter onPriceFilterChange={handlePriceFilterChange} />
          <button
            type="button"
            className="w-full mt-4 flex items-center justify-center gap-2 bg-accent-pale hover:bg-primary hover:text-white text-primary font-semibold py-3 px-4 rounded-xl transition-all duration-200 border border-accent-light/50"
            onClick={resetFilters}
          >
            <FaUndo /> Reset All
          </button>
          </div>
        </aside>
        <div className="md:col-span-9">
          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {filterTabs.map(([value, label]) => (
              <button
                key={value}
                type="button"
                className={`filter-pill ${filterBy === value ? "filter-pill-active" : "filter-pill-inactive"}`}
                onClick={() => handleFilterChange(value)}
              >
                {label}
              </button>
            ))}
          </div>

          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
              </div>
              <Paginate
                pages={pages}
                page={page}
                keyword={keyword}
                filterBy={filterBy}
                category_slug={categorySlug}
                brand_slug={brandSlug}
                minPrice={minPrice}
                maxPrice={maxPrice}
              />
            </>
          )}
        </div>
      </div>

      {/* Why Shop With Us */}
      <div className="mt-12">
        <WhyShopWithUs />
      </div>

      {/* Newsletter */}
      <div className="mt-12">
        <NewsletterSignup />
      </div>
    </div>
  );
}

export default HomeScreen;
