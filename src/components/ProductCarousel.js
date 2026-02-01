import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import Message from "./Message";
import { listTopProducts } from "../actions/productActions";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

function ProductCarousel() {
  const dispatch = useDispatch();
  const [index, setIndex] = useState(0);
  const productTopRated = useSelector((state) => state.productTopRated);
  const { error, loading, products } = productTopRated;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  useEffect(() => {
    if (products.length <= 1) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % products.length), 4000);
    return () => clearInterval(id);
  }, [products.length]);

  if (loading) return <Loader />;
  if (error) return <Message variant="danger">{error}</Message>;
  if (!products?.length) return null;

  const current = products[index];

  return (
    <div className="bg-gradient-to-b from-primary-light to-primary rounded-xl p-5 my-6 max-w-4xl mx-auto shadow-lg overflow-hidden">
      <div className="flex flex-col items-center">
        <Link to={`/product/${current._id}`} className="flex flex-col items-center">
          <img
            src={`${BASE_URL}${current.image}`}
            alt={current.name}
            className="h-[300px] w-[300px] object-cover rounded-full shadow-lg hover:scale-105 transition-transform"
          />
          <div className="mt-4 text-center bg-black/80 text-white px-4 py-3 rounded-lg">
            <h4 className="text-lg font-semibold">
              {current.name} (৳{current.price})
            </h4>
          </div>
        </Link>
        {products.length > 1 && (
          <div className="flex gap-2 mt-4">
            {products.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                className={`w-2 h-2 rounded-full transition-colors ${i === index ? "bg-white" : "bg-white/50"}`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductCarousel;
