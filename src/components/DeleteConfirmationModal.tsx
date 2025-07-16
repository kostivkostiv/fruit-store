import { Dialog } from "@headlessui/react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  productName?: string;
};

export default function DeleteConfirmationModal({ isOpen, onClose, onConfirm, productName }: Props) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 bg-black/30" />
        <div className="relative bg-white rounded p-6 max-w-sm mx-auto z-20">
          <Dialog.Title className="text-lg font-bold mb-4">Confirm Delete</Dialog.Title>
          <p>
            Are you sure you want to delete <strong>{productName}</strong>?
          </p>
          <div className="mt-6 flex justify-end space-x-2">
            <button onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
            <button onClick={onConfirm} className="px-4 py-2 bg-red-500 text-white rounded">Delete</button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}