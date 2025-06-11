import React from "react";

export default function ConfirmDelete({ visible, onConfirm, onCancel, message }) {
  if (!visible) return null;
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-transparent to-anaranjadito/50 backdrop-blur-sm z-40 flex items-center justify-center">
      <div className="bg-anaranjadito p-6 rounded-2xl w-96 relative">
        <p className="mb-6 text-negrito font-semibold">{message || "¿Está seguro que desea eliminar este item?"}</p>
        <div className="flex justify-center gap-6">
          <button
            className="cursor-pointer px-4 py-2 bg-grisito rounded-full hover:bg-gray-400"
            onClick={onCancel}>
            Cancelar
          </button>
          <button
            className="cursor-pointer px-4 py-2 bg-red-500 text-blanquito rounded-full hover:bg-red-600"
            onClick={onConfirm}>
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
