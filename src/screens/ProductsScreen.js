import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import CategoryList from "../components/CategoryList";
import BrandList from "../components/BrandList";
import PriceFilter from "../components/PriceFilter";
import { listProducts } from "../actions/productActions";
import { useLocation, useNavigate } from "react-router-dom";
import { FaUndo } from "react-icons/fa";

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

  return (
    <div className="animate-fade-in">
      <h1 className="section-title my-10">All Products</h1>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <aside className="md:col-span-3 space-y-6">
          <div className="glass-card p-5 sticky top-28">
            <h2 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-accent rounded-full" />
              Filters
            </h2>
            <CategoryList
              selectedCategory={categorySlug}
              onCategoryClick={handleCategoryClick}
            />
            <BrandList
              selectedBrand={brandSlug}
              onBrandClick={handleBrandClick}
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
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {[
              ["best_seller", "Best Seller"],
              ["featured", "Featured"],
              ["latest", "New"],
              ["discount", "Discount"],
            ].map(([value, label]) => (
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
