import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowRight } from "react-icons/fa";
import { listTopProducts } from "../../actions/productActions";
import Product from "../Product";
import ProductSkeleton from "../ProductSkeleton";
import Message from "../Message";

function FeaturedProducts() {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.productTopRated);

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  const items = products?.slice(0, 4) || [];

  return (
    <section className="py-14 md:py-16">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <p className="text-primary font-bold text-sm uppercase tracking-wider mb-1">Top picks</p>
          <h2 className="section-title">Trending right now</h2>
          <p className="section-subtitle">Highest rated products our shoppers love</p>
        </div>
        <Link
          to="/products?filter_by=best_seller"
          className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary-dark no-underline"
        >
          View all <FaArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {loading ? (
        <ProductSkeleton count={4} />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}

export default FeaturedProducts;
