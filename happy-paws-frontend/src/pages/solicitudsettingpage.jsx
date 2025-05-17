import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Trash2, UserRound } from "lucide-react";
import ClickPopup from "../components/clickpopup.jsx";

export default function SolicitudSettingPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [solicitud, setSolicitud] = useState({
    usuario: "",
    mascota: "",
    applicationDate: "",
    reasonAdoption: "",
    otherPets: false,
    enoughSpace: false,
    enoughTime: false,
    estado: ""
  });
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const data = {
      usuario: "Ana Pérez",
      mascota: "Luna",
      applicationDate: "2025-05-10",
      reasonAdoption: "Deseo compañía",
      otherPets: true,
      enoughSpace: true,
      enoughTime: true,
      estado: "Pendiente"
    };
    setSolicitud(data);
  }, [id]);

  const handleDeleteClick = () => setShowConfirm(true);
  const closeConfirm = () => setShowConfirm(false);
  const handleConfirmDelete = () => {
    toast.success("Solicitud eliminada con éxito");
    setShowConfirm(false);
    setTimeout(() => navigate(-1), 1500);
  };

  const handleEstadoChange = e => {
    setSolicitud(s => ({ ...s, estado: e.target.value }));
  };
  const handleSave = () => {
    toast.success("Estado actualizado con éxito");
  };

  return (
    <div className="min-h-screen bg-amarillito py-6">
      <h2 className="text-xl font-semibold text-negrito ml-3">Detalle de solicitud</h2>
      <div className="max-w-3xl mx-auto bg-blanquito rounded-2xl shadow-lg overflow-hidden">
        <div className="flex justify-end items-center px-6 py-3">
          <button
            onClick={handleDeleteClick}
            className="text-rojo hover:text-rojo/80 cursor-pointer">
            <Trash2 size={24} />
          </button>
        </div>
        <div className="px-6 py-4 space-y-6">
          <div className="flex flex-col items-center text-center space-y-2">
            <UserRound size={80} className="text-negrito" />
            <p className="text-xl font-semibold text-negrito">{solicitud.usuario}</p>
          </div>
          <div>
            <span className="block text-sm text-grisito mb-1">Mascota</span>
            <p className="text-negrito">{solicitud.mascota}</p>
          </div>
          <div>
            <span className="block text-sm text-grisito mb-1">Fecha de solicitud</span>
            <p className="text-negrito">{solicitud.applicationDate}</p>
          </div>
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={solicitud.otherPets}
                readOnly
                className="form-checkbox h-4 w-4 text-moradito"/>
              <span className="ml-2 text-sm text-grisito">Tiene otras mascotas</span>
            </label>
          </div>
          <div>
            <span className="block text-sm text-grisito mb-1">Motivo de adopción</span>
            <p className="text-negrito">{solicitud.reasonAdoption}</p>
          </div>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={solicitud.enoughSpace}
                readOnly
                className="form-checkbox h-4 w-4 text-moradito"/>
              <span className="ml-2 text-sm text-grisito">Espacio adecuado</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={solicitud.enoughTime}
                readOnly
                className="form-checkbox h-4 w-4 text-moradito"/>
              <span className="ml-2 text-sm text-grisito">Tiempo suficiente</span>
            </label>
          </div>
          <div>
            <span className="block text-sm text-grisito mb-1">Estado</span>
            <div className="flex items-center space-x-2">
              <select
                name="estado"
                value={solicitud.estado}
                onChange={handleEstadoChange}
                className="w-1/3 px-2 py-1 border border-grisito rounded focus:outline-none">
                <option value="Pendiente">Pendiente</option>
                <option value="Aprobada">Aprobada</option>
                <option value="Rechazada">Rechazada</option>
              </select>
              <button
                onClick={handleSave}
                className="px-4 py-1 bg-moradito text-white rounded-full hover:bg-moradito/90 transition">
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
      {showConfirm && (
        <ClickPopup
          message="¿Estás seguro que quieres eliminar esta solicitud?"
          onConfirm={handleConfirmDelete}
          onCancel={closeConfirm}/>
      )}
    </div>
  );
}
