import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "../components/Product";
import ProductSkeleton from "../components/ProductSkeleton";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import CategoryList from "../components/CategoryList";
import BrandList from "../components/BrandList";
import PriceFilter from "../components/PriceFilter";
import { listProducts } from "../actions/productActions";
import { useLocation, useNavigate } from "react-router-dom";
import { FaUndo, FaSlidersH } from "react-icons/fa";

function ProductsScreen() {
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
    navigate(`/products?${params.toString()}`);
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
    navigate("/products");
  };

  const filterTabs = [
    ["", "All"],
    ["best_seller", "Best Seller"],
    ["featured", "Featured"],
    ["latest", "New"],
    ["discount", "Deals"],
  ];

  const title = keyword
    ? `Results for “${keyword}”`
    : categorySlug || brandSlug
    ? "Filtered products"
    : "All products";

  return (
    <div className="animate-fade-in py-4 md:py-6">
      <div className="mb-8">
        <h1 className="section-title">{title}</h1>
        <p className="section-subtitle">
          {products.length > 0 && !loading
            ? `${products.length} items on this page · use filters to narrow down`
            : "Discover electronics with smart filters and AI search"}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <aside className="lg:col-span-3">
          <div className="sidebar-card sticky top-36">
            <h2 className="text-lg font-bold text-ink mb-5 flex items-center gap-2">
              <FaSlidersH className="text-primary w-4 h-4" />
              Filters
            </h2>
            <CategoryList
              selectedCategory={categorySlug}
              onCategoryClick={handleCategoryClick}
            />
            <BrandList selectedBrand={brandSlug} onBrandClick={handleBrandClick} />
            <PriceFilter onPriceFilterChange={handlePriceFilterChange} />
            <button
              type="button"
              className="w-full mt-6 flex items-center justify-center gap-2 border-2 border-accent-light text-ink font-semibold py-3 px-4 rounded-2xl hover:bg-primary hover:text-white hover:border-primary transition-all"
              onClick={resetFilters}
            >
              <FaUndo className="w-3.5 h-3.5" /> Reset all
            </button>
          </div>
        </aside>

        <div className="lg:col-span-9">
          <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
            {filterTabs.map(([value, label]) => (
              <button
                key={label}
                type="button"
                className={`filter-pill shrink-0 ${
                  filterBy === value ? "filter-pill-active" : "filter-pill-inactive"
                }`}
                onClick={() => handleFilterChange(value)}
              >
                {label}
              </button>
            ))}
          </div>

          {loading && products.length === 0 ? (
            <ProductSkeleton count={8} />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : products.length === 0 ? (
            <div className="text-center py-20 glass-card">
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
                basePath="/products"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductsScreen;
