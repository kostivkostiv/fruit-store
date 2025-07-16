import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import type { Product } from "../types/types";

type Props = {
  product: Product;
  onUpdate: (data: Omit<Product, 'id' | 'comments'>) => Promise<boolean>;
};

type EditFormData = Omit<Product, 'id' | 'comments' | 'size'> & {
  size: { width: number, height: number }
};

export default function ProductDetails({ product, onUpdate }: Props) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editData, setEditData] = useState<EditFormData>({} as EditFormData);

  useEffect(() => {
    setEditData({
      name: product.name,
      imageUrl: product.imageUrl,
      count: product.count,
      weight: product.weight,
      size: { ...product.size },
    });
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const isSizeField = name === 'width' || name === 'height';
    
    if (isSizeField) {
      setEditData(prev => ({ ...prev, size: { ...prev.size, [name]: +value } }));
    } else {
      setEditData(prev => ({ ...prev, [name]: name === 'count' ? +value : value }));
    }
  };

  const handleSaveChanges = async () => {
    const success = await onUpdate(editData);
    if (success) {
      setIsEditModalOpen(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <img src={product.imageUrl} alt={product.name} className="w-full max-w-md h-auto object-cover mb-4 rounded-lg shadow-md" />
      <div className="space-y-2 text-lg">
        <p><strong>Count:</strong> {product.count}</p>
        <p><strong>Weight:</strong> {product.weight}</p>
        <p><strong>Size:</strong> {product.size.width} x {product.size.height} cm</p>
      </div>
      <button onClick={() => setIsEditModalOpen(true)} className="mt-6 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition">
        Edit Product
      </button>

      <Dialog open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen">
          <div className="fixed inset-0 bg-black/30" />
          <div className="relative bg-white rounded p-6 max-w-sm mx-auto z-20 w-full">
            <Dialog.Title className="text-lg font-bold mb-4">Edit Product</Dialog.Title>
            <div className="space-y-2">
            <Dialog.Title className="text-m font-bold">Name</Dialog.Title>
              <input name="name" value={editData.name} onChange={handleChange} className="w-full border p-2 rounded" />
              <Dialog.Title className="text-m font-bold">Image URL</Dialog.Title>
              <input name="imageUrl" value={editData.imageUrl} onChange={handleChange} className="w-full border p-2 rounded" />
              <Dialog.Title className="text-m font-bold">Count</Dialog.Title>
              <input name="count" type="number" value={editData.count} onChange={handleChange} className="w-full border p-2 rounded" />
              <Dialog.Title className="text-m font-bold">Width</Dialog.Title>
              <input name="width" type="number" value={editData.size?.width} onChange={handleChange} className="w-full border p-2 rounded" />
              <Dialog.Title className="text-m font-bold">Height</Dialog.Title>
              <input name="height" type="number" value={editData.size?.height} onChange={handleChange} className="w-full border p-2 rounded" />
              <Dialog.Title className="text-m font-bold">Weight</Dialog.Title>
              <input name="weight" value={editData.weight} onChange={handleChange} className="w-full border p-2 rounded" />
            </div>
            <div className="mt-6 flex justify-end space-x-2">
              <button onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 border rounded">Cancel</button>
              <button onClick={handleSaveChanges} className="px-4 py-2 bg-blue-500 text-white rounded">Save Changes</button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}