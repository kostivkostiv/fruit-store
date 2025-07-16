import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AddProductModal from "../components/AddProductModal";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import type { RootState, AppDispatch } from "../store";
import { fetchProducts, createProduct, removeProduct } from "../store/productsSlice";
import type { Product } from "../types/types";

type SortType = "name" | "count";

export default function ProductList() {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products.list);
  const loading = useSelector((state: RootState) => state.products.loading);
  const error = useSelector((state: RootState) => state.products.error);

  const [sortType, setSortType] = useState<SortType>("name");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) =>
      sortType === "name"
        ? a.name.localeCompare(b.name)
        : b.count - a.count
    );
  }, [products, sortType]);

  const handleAddProduct = async (newProductData: Omit<Product, "id" | "comments">) => {
    await dispatch(createProduct(newProductData));
    setIsAddModalOpen(false);
  };

  const handleDeleteProduct = async () => {
    if (!productToDelete) return;
    await dispatch(removeProduct(productToDelete.id));
    setProductToDelete(null);
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      <div className="flex items-center mb-4">
        <button onClick={() => setIsAddModalOpen(true)} className="bg-blue-500 text-white px-4 py-2 rounded mr-4">
          Add Product
        </button>
        <select value={sortType} onChange={(e) => setSortType(e.target.value as SortType)} className="border p-2 rounded">
          <option value="name">Sort by Name</option>
          <option value="count">Sort by Count</option>
        </select>
      </div>

      <ul className="space-y-2">
        {sortedProducts.map((product) => (
          <li key={product.id} className="border p-2 rounded flex justify-between items-center">
            <Link to={`/product/${product.id}`} className="hover:underline">
              {product.name} (Count: {product.count})
            </Link>
            <button
              onClick={() => setProductToDelete(product)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onConfirm={handleAddProduct}
      />

      <DeleteConfirmationModal
        isOpen={!!productToDelete}
        onClose={() => setProductToDelete(null)}
        onConfirm={handleDeleteProduct}
        productName={productToDelete?.name}
      />
    </div>
  );
}
