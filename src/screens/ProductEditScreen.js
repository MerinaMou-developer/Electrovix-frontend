import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { listProductDetails, updateProduct } from "../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";
import { API_BASE_URL } from "../config";

function ProductEditScreen() {
  const { id: productId } = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [brands, setBrands] = useState([]);
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState(0); // New state for discount percentage
  const [uploading, setUploading] = useState(false);
  const [categories, setCategories] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    const fetchCategoriesAndBrands = async () => {
      try {
        const { data: categoriesData } = await axios.get(
          `${API_BASE_URL}/api/products/categories/`
        );
        const { data: brandsData } = await axios.get(
          `${API_BASE_URL}/api/products/brand/`
        );

        setCategories(categoriesData);
        setBrands(brandsData);

        if (product.name && product._id === Number(productId)) {
          setName(product.name);
          setPrice(product.price);
          setImage(product.image);
          setBrand(product.brand.slug);
          setCategory(product.category.slug);
          setCountInStock(product.countInStock);
          setDescription(product.description);
          setDiscountPercentage(product.discountPercentage || 0); // Set the discount percentage
        }
      } catch (error) {
        console.error("Error fetching categories or brands:", error);
      }
    };

    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      navigate("/admin/productlist");
    } else {
      if (!product.name || product._id !== Number(productId)) {
        dispatch(listProductDetails(productId));
        fetchCategoriesAndBrands();
      } else {
        fetchCategoriesAndBrands();
      }
    }
  }, [dispatch, product, productId, navigate, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
        discountPercentage, // Include discountPercentage in the update payload
      })
    );
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append("image", file);
    formData.append("product_id", productId);

    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(
        `${API_BASE_URL}/api/products/upload/`,
        formData,
        config
      );
      setImage(data.image);
      setUploading(false);
    } catch (error) {
      console.error("Upload error:", error);
      setUploading(false);
    }
  };

  return (
    <div>
      <Link to="/admin/productlist" className="inline-block mb-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded">Go Back</Link>
      <FormContainer>
        <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
          <form onSubmit={submitHandler} className="space-y-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Name</label><input type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Price</label><input type="number" placeholder="Enter price" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Discount Percentage</label><input type="number" placeholder="Enter discount percentage" value={discountPercentage} onChange={(e) => setDiscountPercentage(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Image</label><input type="text" placeholder="Enter image URL" value={image} onChange={(e) => setImage(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light mb-2" /><input type="file" onChange={uploadFileHandler} className="w-full text-sm" />{uploading && <Loader />}</div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Brand</label><select value={brand} onChange={(e) => setBrand(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light"><option value="">Select Brand</option>{brands.map((b) => <option key={b.slug} value={b.slug}>{b.name}</option>)}</select></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Stock</label><input type="number" placeholder="Enter stock" value={countInStock} onChange={(e) => setCountInStock(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Category</label><select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light"><option value="">Select Category</option>{categories.map((cat) => <option key={cat.slug} value={cat.slug}>{cat.name}</option>)}</select></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Description</label><input type="text" placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light" /></div>
            <button type="submit" className="mt-4 bg-primary hover:bg-primary-light text-white font-semibold py-2 px-4 rounded-lg">Update</button>
          </form>
        )}
      </FormContainer>
    </div>
  );
}

export default ProductEditScreen;
