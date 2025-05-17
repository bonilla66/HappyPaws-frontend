import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserRound, MoreHorizontal, Trash2 } from "lucide-react";
import PopUpForm from "../components/popupform.jsx";
import ClickPopup from "../components/clickpopup.jsx";

export default function UserSettingPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [editing, setEditing] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("success");

  const rolesList = [
    { id: 1, nombre: "Admin" },
    { id: 2, nombre: "Colaborador" },
    { id: 3, nombre: "Adoptante" }
  ];

  const [form, setForm] = useState({
    nombre: "",
    rol: "",
    correo: "",
    telefono: "",
    dui: "",
    activo: true,
  });

  useEffect(() => {
    // Carga simulada de datos de usuario
    const user = {
      nombre: "Ana Pérez",
      rol: "Adoptante",
      correo: "ana.perez@example.com",
      telefono: "77778888",
      dui: "12345678-9",
      activo: true,
    };
    setForm(user);
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    const { nombre, correo, telefono, dui } = form;
    if (!nombre || !correo || !telefono || !dui) {
      setModalType("error");
    } else {
      setModalType("success");
      setEditing(false);
    }
    setShowModal(true);
  };

  const handleDeleteClick = () => setShowConfirm(true);
  const closeConfirm = () => setShowConfirm(false);

  const handleConfirmDelete = () => {
    // Primero cerramos el modal de confirmación
    setShowConfirm(false);
    // Mostramos el toast
    toast.success("Usuario eliminado con éxito");
    // Y luego, tras un pequeño retardo para que se vea el toast, navegamos atrás
    setTimeout(() => navigate(-1), 1500);
  };

  const closeModal = () => {
    setShowModal(false);
    if (modalType === "success") navigate(-1);
  };

  return (
    <div className="min-h-screen bg-amarillito py-6">
      <h2 className="text-xl font-semibold text-negrito ml-3">Editar usuario</h2>
      <div className="max-w-3xl mx-auto bg-blanquito rounded-2xl shadow-lg overflow-hidden">
        <div className="flex justify-between items-center px-6 py-3">
          <button
            onClick={handleDeleteClick}
            className="text-rojo hover:text-rojo/80 cursor-pointer">
            <Trash2 size={24} />
          </button>
          <button
            onClick={() => setEditing(e => !e)}
            className="text-negrito hover:text-grisito cursor-pointer">
            <MoreHorizontal size={24} />
          </button>
        </div>
        <form onSubmit={handleSave} className="px-6 py-4 space-y-4">
          <div className="flex items-center gap-4">
            <UserRound size={80} className="text-negrito" />
            {editing ? (
              <input
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                className="w-full px-2 py-1 border border-grisito rounded focus:outline-none"
              />
            ) : (
              <h3 className="text-lg font-medium text-negrito">{form.nombre}</h3>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-grisito mb-1">Rol</label>
            {editing ? (
              <select
                name="rol"
                value={form.rol}
                onChange={handleChange}
                className="w-full border-b border-grisito focus:outline-none"
              >
                <option value="">Selecciona un rol</option>
                {rolesList.map(r => (
                  <option key={r.id} value={r.nombre}>
                    {r.nombre}
                  </option>
                ))}
              </select>
            ) : (
              <p className="text-negrito">{form.rol}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-grisito mb-1">Correo</label>
            {editing ? (
              <input
                type="email"
                name="correo"
                value={form.correo}
                onChange={handleChange}
                className="w-full px-2 py-1 border border-grisito rounded focus:outline-none"
              />
            ) : (
              <p className="text-negrito">{form.correo}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-grisito mb-1">Teléfono</label>
            {editing ? (
              <input
                type="text"
                name="telefono"
                value={form.telefono}
                onChange={handleChange}
                className="w-full px-2 py-1 border border-grisito rounded focus:outline-none"
              />
            ) : (
              <p className="text-negrito">{form.telefono}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-grisito mb-1">DUI</label>
            {editing ? (
              <input
                type="text"
                name="dui"
                value={form.dui}
                onChange={handleChange}
                className="w-full px-2 py-1 border border-grisito rounded focus:outline-none"
              />
            ) : (
              <p className="text-negrito">{form.dui}</p>
            )}
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="activo"
              checked={form.activo}
              onChange={handleChange}
              className="form-checkbox h-4 w-4 text-moradito"
            />
            <label className="ml-2 text-sm text-grisito">Activo</label>
          </div>
          {editing && (
            <div className="text-right">
              <button
                type="submit"
                className="px-6 py-1 bg-moradito text-negrito rounded-full hover:bg-moradito/90 transition"
              >
                Guardar
              </button>
            </div>
          )}
        </form>
      </div>
      {showModal && (
        <PopUpForm
          type={modalType}
          message={modalType === "success" ? "Usuario actualizado con éxito" : "Error al actualizar usuario"}
          onClose={closeModal}
        />
      )}
      {showConfirm && (
        <ClickPopup
          message="¿Estás seguro que quieres eliminar este usuario?"
          onConfirm={handleConfirmDelete}
          onCancel={closeConfirm}
        />
      )}
    </div>
  );
}
