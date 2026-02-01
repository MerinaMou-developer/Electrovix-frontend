// Modify ProductListScreen

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import {
  listProducts,
  deleteProduct,
  createProduct,
} from "../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";

function ProductListScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation() || { search: "" };
  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get("keyword") || "";
  const filterBy = queryParams.get("filter_by") || "";
  const currentPage = queryParams.get("page") || 1;

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pages, page } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });

    if (!userInfo?.isAdmin) {
      navigate("/login");
    }

    if (successCreate) {
      navigate(`/admin/products/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts(keyword, filterBy, currentPage));
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    keyword,
    filterBy,
    currentPage,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <button type="button" onClick={createProductHandler} className="bg-primary hover:bg-primary-light text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2">
          Create Product
        </button>
      </div>

      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <div className="overflow-x-auto border border-gray-200 rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr><th className="px-4 py-2 text-left text-sm font-semibold">ID</th><th className="px-4 py-2 text-left text-sm font-semibold">NAME</th><th className="px-4 py-2 text-left text-sm font-semibold">PRICE</th><th className="px-4 py-2 text-left text-sm font-semibold">CATEGORY</th><th className="px-4 py-2 text-left text-sm font-semibold">BRAND</th><th className="px-4 py-2 text-left text-sm font-semibold"></th></tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products?.length > 0 ? products.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50">
                    <td className="px-4 py-2">{product._id}</td>
                    <td className="px-4 py-2">{product.name}</td>
                    <td className="px-4 py-2">৳{product.price}</td>
                    <td className="px-4 py-2">{product.category?.name}</td>
                    <td className="px-4 py-2">{product.brand?.name}</td>
                    <td className="px-4 py-2 flex gap-2">
                      <Link to={`/admin/products/${product._id}/edit`} className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm">Edit</Link>
                      <button type="button" onClick={() => deleteHandler(product._id)} className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded text-sm">Delete</button>
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan="6" className="px-4 py-8 text-center text-gray-500">No products found</td></tr>
                )}
              </tbody>
            </table>
          </div>
          <Paginate pages={pages} page={page} isAdmin={true} basePath="/productlist" keyword={keyword} filterBy={filterBy} />
        </div>
      )}
    </div>
  );
}

export default ProductListScreen;
