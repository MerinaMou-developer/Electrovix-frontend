import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import CategoryList from "../components/CategoryList";
import BrandList from "../components/BrandList";
import PriceFilter from "../components/PriceFilter";
import { listProducts } from "../actions/productActions";
import { useLocation, useNavigate } from "react-router-dom";
import { FaUndo } from "react-icons/fa";

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

  return (
    <div>
      <ProductCarousel />
      <h1 className="text-center my-5">Trending Products</h1>

      {/* Category, Brand, and Price Filters */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-3 space-y-4">
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
            className="w-full mt-3 bg-primary hover:bg-primary-light text-white font-medium py-2 px-4 rounded flex items-center justify-center gap-2"
            onClick={resetFilters}
          >
            <FaUndo /> Reset All Filters
          </button>
        </div>
        <div className="md:col-span-9">
          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {[
              ["best_seller", "Best Seller"],
              ["featured", "Featured Product"],
              ["latest", "New Product"],
              ["discount", "Discount"],
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                className={`px-4 py-2 rounded border font-semibold uppercase transition-colors ${
                  filterBy === value
                    ? "bg-primary text-white border-primary"
                    : "bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200"
                }`}
                onClick={() => handleFilterChange(value)}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Product List */}
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
    </div>
  );
}

export default HomeScreen;
