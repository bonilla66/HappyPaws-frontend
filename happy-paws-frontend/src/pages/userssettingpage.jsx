import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserRound, MoreHorizontal, Trash2 } from "lucide-react";
import PopUpForm from "../components/popupform.jsx";
import ClickPopup from "../components/clickpopup.jsx";
import api from "../services/api.js";

export default function UserSettingPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [editing, setEditing] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("success");
  const [rolesList, setRolesList] = useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await api.get("/enums/roles");
        setRolesList(res.data);
      } catch (err) {
        toast.error("Error al cargar roles");
        console.error(err);
      }
    };
    fetchRoles();
  }, []);

  const [form, setForm] = useState({
    nombre: "",
    rol: "",
    correo: "",
    telefono: "",
    dui: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get(`/user/${id}`);
        const user = res.data;
        setForm({
          nombre: user.name,
          rol: user.rol,
          correo: user.email,
          telefono: user.phone,
          dui: user.dui,
        });
      } catch (error) {
        toast.error("No se pudo cargar la información del usuario");
        console.error(error);
      }
    };
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const { nombre, correo, telefono, dui, rol } = form;

    if (!nombre || !correo || !telefono || !dui || !rol) {
      setModalType("error");
      setShowModal(true);
      return;
    }

    try {
      await api.patch(`/user/${id}`, {
        name: nombre,
        email: correo,
        phone: telefono,
        DUI: dui,
        rol: rol,
      });
      setModalType("success");
      setEditing(false);
    } catch (error) {
      console.error(error);
      setModalType("error");
    } finally {
      setShowModal(true);
    }
  };

  const handleDeleteClick = () => setShowConfirm(true);
  const closeConfirm = () => setShowConfirm(false);

  const handleConfirmDelete = () => {
    setShowConfirm(false);
    toast.success("Usuario eliminado con éxito");
    setTimeout(() => navigate(-1), 1500);
  };

  const closeModal = () => {
    setShowModal(false);
    if (modalType === "success") {
      toast.success("Cambios guardados correctamente");
      navigate(-1);
    }
  };

  if (rolesList.length === 0) {
    return <div className="text-center text-grisito">Cargando datos...</div>;
  }
  return (
    <div className="min-h-screen bg-amarillito py-6">
      <h2 className="text-xl font-semibold text-negrito ml-3">
        Editar usuario
      </h2>
      <div className="max-w-3xl mx-auto bg-blanquito rounded-2xl shadow-lg overflow-hidden">
        <div className="flex justify-between items-center px-6 py-3">
          <button
            onClick={handleDeleteClick}
            className="text-rojo hover:text-rojo/80 cursor-pointer"
          >
            <Trash2 size={24} />
          </button>
          <button
            onClick={() => setEditing((e) => !e)}
            className="text-negrito hover:text-grisito cursor-pointer"
          >
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
              <h3 className="text-lg font-medium text-negrito">
                {form.nombre}
              </h3>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-grisito mb-1">
              Rol
            </label>
            {editing ? (
              <select
                name="rol"
                value={form.rol}
                onChange={handleChange}
                className="w-full border-b border-grisito focus:outline-none"
              >
                <option value="">Selecciona un rol</option>
                {rolesList.map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </select>
            ) : (
              <p className="text-negrito">
                {rolesList.find((r) => r.value === form.rol)?.label || form.rol}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-grisito mb-1">
              Correo
            </label>
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
            <label className="block text-sm font-medium text-grisito mb-1">
              Teléfono
            </label>
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
            <label className="block text-sm font-medium text-grisito mb-1">
              DUI
            </label>
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
          message={
            modalType === "success"
              ? "Usuario actualizado con éxito"
              : "Error al actualizar usuario"
          }
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
