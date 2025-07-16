import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store";
import {
  fetchComments,
  createComment,
  removeComment,
} from "../store/commentsSlice";
import { getProductById, updateProduct } from "../api/product";
import ProductDetails from "../components/ProductDetails";
import CommentsSection from "../components/CommentsSection";
import { useState } from "react";
import type { Product } from "../types/types";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);
  const dispatch = useDispatch<AppDispatch>();
  const comments = useSelector((state: RootState) => state.comments.list);
  const loading = useSelector((state: RootState) => state.comments.loading);
  const error = useSelector((state: RootState) => state.comments.error);

  const [product, setProduct] = useState<Product | null>(null);
  const [productLoading, setProductLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchComments(productId));
    getProductById(productId)
      .then(setProduct)
      .catch(() => alert("Failed to load product"))
      .finally(() => setProductLoading(false));
  }, [dispatch, productId]);

  const handleUpdateProduct = async (data: Omit<Product, "id" | "comments">) => {
    if (!product) return false;
    try {
      const updated = await updateProduct({ ...product, ...data });
      setProduct(updated);
      return true;
    } catch {
      return false;
    }
  };

  const handleAddComment = async (text: string) => {
    await dispatch(createComment({ productId, description: text, date: new Date().toISOString() }));
  };

  const handleDeleteComment = async (id: number) => {
    await dispatch(removeComment(id));
  };

  if (productLoading || loading) return <div className="p-4">Loading...</div>;
  if (!product) return <div className="p-4 text-red-500">Product not found</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <ProductDetails product={product} onUpdate={handleUpdateProduct} />
      <CommentsSection
        comments={comments}
        onAddComment={handleAddComment}
        onDeleteComment={handleDeleteComment}
      />
    </div>
  );
}
