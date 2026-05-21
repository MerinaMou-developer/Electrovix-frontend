import React, { useEffect } from "react";
import { Link } from "react-router-dom";
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
import TrustBar from "../components/TrustBar";
import PromoTiles from "../components/PromoTiles";
import CategoryList from "../components/CategoryList";
import BrandList from "../components/BrandList";
import PriceFilter from "../components/PriceFilter";
import { listProducts } from "../actions/productActions";
import { useLocation, useNavigate } from "react-router-dom";
import { FaUndo, FaArrowRight } from "react-icons/fa";

function HomeScreen() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get("keyword") || "";
  const filterBy = queryParams.get("filter_by") || "";
  const currentPage = queryParams.get("page") || 1;
  const categorySlug = queryParams.get("category_slug") || "";
  const brandSlug = queryParams.get("brand_slug") || "";
  const minPrice = queryParams.get("minPrice") || "";
  const maxPrice = queryParams.get("maxPrice") || "";

  const hasFilters = keyword || filterBy || categorySlug || brandSlug || minPrice || maxPrice;

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

  const updateQueryParams = (updates) => {
    const params = new URLSearchParams(location.search);
    Object.entries(updates).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    navigate(`/?${params.toString()}`);
  };

  const handleCategoryClick = (newCategorySlug) => {
    updateQueryParams({ category_slug: newCategorySlug, page: 1 });
  };

  const handleBrandClick = (newBrandSlug) => {
    updateQueryParams({ brand_slug: newBrandSlug, page: 1 });
  };

  const handleFilterChange = (newFilter) => {
    updateQueryParams({ filter_by: newFilter, page: 1 });
  };

  const handlePriceFilterChange = (newMinPrice, newMaxPrice) => {
    updateQueryParams({ minPrice: newMinPrice, maxPrice: newMaxPrice, page: 1 });
  };

  const resetFilters = () => {
    navigate("/");
  };

  const filterTabs = [
    ["best_seller", "Best Seller"],
    ["featured", "Featured"],
    ["latest", "New"],
    ["discount", "Discount"],
  ];

  return (
    <div className="animate-fade-in -mt-8">
      {/* Hero */}
      <div className="full-bleed mb-0">
        <ProductCarousel />
      </div>

      <div className="full-bleed">
        <div className="container mx-auto max-w-7xl">
          <TrustBar />
        </div>
      </div>

      <PromoTiles />
      <ShopByCategory />
      <DealsBanner />

      {/* Products section */}
      <section className="pt-4 pb-12">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
          <div>
            <h2 className="section-title">
              {hasFilters ? "Search results" : "Trending products"}
            </h2>
            <p className="section-subtitle">
              {hasFilters ? "Filtered for you" : "Hand-picked electronics you'll love"}
            </p>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-dark no-underline"
          >
            View all products <FaArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <aside className="lg:col-span-3">
            <div className="glass-card p-5 sticky top-28">
              <h3 className="text-base font-bold text-primary-dark mb-4">Filters</h3>
              <CategoryList
                selectedCategory={categorySlug}
                onCategoryClick={handleCategoryClick}
              />
              <BrandList selectedBrand={brandSlug} onBrandClick={handleBrandClick} />
              <PriceFilter onPriceFilterChange={handlePriceFilterChange} />
              <button
                type="button"
                className="w-full mt-4 flex items-center justify-center gap-2 border border-accent-light text-primary font-semibold py-2.5 px-4 rounded-lg hover:bg-primary hover:text-white transition-all"
                onClick={resetFilters}
              >
                <FaUndo className="w-3.5 h-3.5" /> Reset filters
              </button>
            </div>
          </aside>

          <div className="lg:col-span-9">
            <div className="flex flex-wrap gap-2 mb-6">
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
            ) : products.length === 0 ? (
              <div className="text-center py-16 glass-card">
                <p className="text-muted mb-4">No products match your filters.</p>
                <button type="button" onClick={resetFilters} className="btn-primary">
                  Clear filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
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
      </section>

      <div className="space-y-10 pb-4">
        <WhyShopWithUs />
        <NewsletterSignup />
      </div>
    </div>
  );
}

export default HomeScreen;
