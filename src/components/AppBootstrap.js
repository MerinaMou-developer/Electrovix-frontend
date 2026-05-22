import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { listCategories, listBrands, listProducts } from "../actions/productActions";
import { warmBackend } from "../utils/warmBackend";

/**
 * Starts backend warmup and prefetches catalog data as soon as the app mounts.
 */
function AppBootstrap() {
  const dispatch = useDispatch();

  useEffect(() => {
    warmBackend();
    dispatch(listCategories());
    dispatch(listBrands());
    dispatch(listProducts("", "", 1, "", "", "", ""));
  }, [dispatch]);

  return null;
}

export default AppBootstrap;
