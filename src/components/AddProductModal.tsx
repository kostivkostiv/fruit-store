import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import type { Product } from "../types/types";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (productData: Omit<Product, 'id' | 'comments'>) => void;
};

type FormState = {
  imageUrl: string;
  name: string;
  count: string;
  size: { width: string; height: string };
  weight: string;
};

const INITIAL_STATE: FormState = {
  imageUrl: "",
  name: "",
  count: "",
  size: { width: "", height: "" },
  weight: "",
};

export default function AddProductModal({ isOpen, onClose, onConfirm }: Props) {
  const [formState, setFormState] = useState<FormState>(INITIAL_STATE);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'width' || name === 'height') {
      setFormState(p => ({ ...p, size: { ...p.size, [name]: value } }));
    } else {
      setFormState(p => ({ ...p, [name]: value }));
    }
  };

  const handleConfirm = () => {
    if (!formState.name.trim() || !formState.imageUrl.trim()) {
      alert("Name and Image URL are required.");
      return;
    }

    const productDataToSubmit = {
      ...formState,
      count: Number(formState.count) || 0,
      size: {
        width: Number(formState.size.width) || 0,
        height: Number(formState.size.height) || 0,
      }
    };

    onConfirm(productDataToSubmit);
    setFormState(INITIAL_STATE);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 bg-black/30" />
        <div className="relative bg-white rounded p-6 max-w-sm mx-auto z-20 w-full">
          <Dialog.Title className="text-lg font-bold mb-4">Add Product</Dialog.Title>
          <div className="space-y-2">
            <input name="name" value={formState.name} onChange={handleChange} placeholder="Name" className="w-full border p-2 rounded" />
            <input name="imageUrl" value={formState.imageUrl} onChange={handleChange} placeholder="Image URL" className="w-full border p-2 rounded" />
            <input name="count" type="number" value={formState.count} onChange={handleChange} placeholder="Count" className="w-full border p-2 rounded" />
            <input name="width" type="number" value={formState.size.width} onChange={handleChange} placeholder="Width" className="w-full border p-2 rounded" />
            <input name="height" type="number" value={formState.size.height} onChange={handleChange} placeholder="Height" className="w-full border p-2 rounded" />
            <input name="weight" value={formState.weight} onChange={handleChange} placeholder="Weight (e.g., 200g)" className="w-full border p-2 rounded" />
          </div>
          <div className="mt-6 flex justify-end space-x-2">
            <button onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
            <button onClick={handleConfirm} className="px-4 py-2 bg-blue-500 text-white rounded">Confirm</button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}