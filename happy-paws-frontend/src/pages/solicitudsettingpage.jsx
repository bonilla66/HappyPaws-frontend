import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Trash2, UserRound, ChevronLeft, Mail, Phone } from "lucide-react";
import ClickPopup from "../components/clickpopup.jsx";
import api from "../services/api";

export default function SolicitudSettingPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [solicitud, setSolicitud] = useState({
    id: "",
    user: { id: "", name: "", email: "", phone: "" },
    pet: { id: "", name: "" },
    aplicationDate: "",
    reasonAdoption: "",
    otherPets: false,
    enoughSpace: false,
    enoughTime: false,
    locationDescription: "",
    aplicationState: "PENDIENTE"
  });
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const fetchSolicitud = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/aplication/${id}`);
        
        const data = response.data;

        setSolicitud({
          id: data.id,
          user: {
            id: data.userId,
            name: data.user || "No disponible"
          },
          pet: {
            id: data.petId,
            name: data.pet || "No disponible"
          },
          aplicationDate: data.aplicationDate 
            ? new Date(data.aplicationDate).toLocaleDateString() 
            : "No disponible",
          reasonAdoption: data.reasonAdoption || "No especificado",
          otherPets: data.otherPets || false,
          enoughSpace: data.enoughSpace || false,
          enoughTime: data.enoughTime || false,
          locationDescription: data.locationDescription || "No especificado",
          aplicationState: data.aplicationState || "PENDIENTE"
        });

      } catch (error) {
        console.error("Error al cargar solicitud:", error);
        toast.error(
          error.response?.data?.message || 
          error.message || 
          "Error al cargar la solicitud"
        );
        navigate("/colaborador", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    fetchSolicitud();
  }, [id, navigate]);
 const handleDeleteClick = () => setShowConfirm(true);
  const closeConfirm = () => setShowConfirm(false);

  const handleConfirmDelete = async () => {
    try {
      await api.delete(`/aplication/${id}`);
      toast.success("Solicitud eliminada con éxito");
      navigate("/colaboradorpage");
    } catch (error) {
      console.error("Error al eliminar:", error);
      toast.error(
        error.response?.data?.message || 
        "Error al eliminar la solicitud"
      );
    } finally {
      setShowConfirm(false);
    }
  };


 
  const handleEstadoChange = (e) => {
    setSolicitud(prev => ({ ...prev, aplicationState: e.target.value }));
  };

  const handleSave = async () => {
    try {
      await api.patch(`/aplication/${id}`, {
        aplicationState: solicitud.aplicationState
      });
      toast.success("Estado actualizado con éxito");
    } catch (error) {
      console.error("Error al actualizar:", error);
      toast.error(
        error.response?.data?.message || 
        "Error al actualizar el estado"
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-amarillito flex items-center justify-center">
        <div className="text-xl text-negrito">Cargando información...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amarillito py-6 px-4">
      <button
        onClick={() => navigate("/colaboradorpage")}
        className="flex items-center text-azulito hover:text-moradito mb-6"
      >
        <ChevronLeft size={20} />
        <span className="ml-1">Volver al panel</span>
      </button>

      <h2 className="text-2xl font-semibold text-negrito mb-6">
        Detalle de solicitud #{solicitud.id}
      </h2>
      
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
          <div>
            <span className="block text-sm text-grisito">Estado actual</span>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              solicitud.aplicationState === "PENDIENTE" ? "bg-yellow-100 text-yellow-800" :
              solicitud.aplicationState === "ACEPTADA" ? "bg-green-100 text-green-800" :
              "bg-red-100 text-red-800"
              
            }`}>
              {solicitud.aplicationState}
            </span>
          </div>
          <button
            onClick={handleDeleteClick}
            className="text-rojo hover:text-rojo/80 cursor-pointer"
            aria-label="Eliminar solicitud"
          >
            <Trash2 size={24} />
          </button>
        </div>

        <div className="px-6 py-4 space-y-6">
          <div className="space-y-3">
            <h3 className="text-lg font-medium text-negrito">Solicitante</h3>
            <div className="flex items-center gap-2">
              <UserRound size={20} className="text-grisito" />
              <span className="text-negrito">{solicitud.user.name}</span>
            </div>
            {solicitud.user.email && (
              <div className="flex items-center gap-2">
                <Mail size={20} className="text-grisito" />
                <span className="text-negrito">{solicitud.user.email}</span>
              </div>
            )}
            {solicitud.user.phone && (
              <div className="flex items-center gap-2">
                <Phone size={20} className="text-grisito" />
                <span className="text-negrito">{solicitud.user.phone}</span>
              </div>
            )}
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-medium text-negrito">Mascota solicitada</h3>
            <div className="bg-amarillito/10 p-3 rounded-lg">
              <p className="text-negrito font-medium">{solicitud.pet.name}</p>
              <p className="text-sm text-grisito">ID: {solicitud.pet.id}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-negrito mb-3">Detalles de la solicitud</h3>
              <div className="space-y-3">
                <div>
                  <span className="block text-sm text-grisito">Fecha de solicitud</span>
                  <p className="text-negrito">{solicitud.aplicationDate}</p>
                </div>

                <div>
                  <span className="block text-sm text-grisito">Motivo de adopción</span>
                  <p className="text-negrito">{solicitud.reasonAdoption}</p>
                </div>

                <div>
                  <span className="block text-sm text-grisito">Descripción del lugar</span>
                  <p className="text-negrito">{solicitud.locationDescription}</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium text-grisito">Requisitos</h4>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={solicitud.otherPets}
                  readOnly
                  className="form-checkbox h-4 w-4 text-moradito"
                />
                <span className="ml-2 text-sm text-negrito">Tiene otras mascotas</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={solicitud.enoughSpace}
                  readOnly
                  className="form-checkbox h-4 w-4 text-moradito"
                />
                <span className="ml-2 text-sm text-negrito">Espacio adecuado</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={solicitud.enoughTime}
                  readOnly
                  className="form-checkbox h-4 w-4 text-moradito"
                />
                <span className="ml-2 text-sm text-negrito">Tiempo suficiente</span>
              </label>
            </div>
          </div>
          <div className="pt-4 border-t border-gray-200">
            <h3 className="text-lg font-medium text-negrito mb-3">Cambiar estado</h3>
            <div className="flex items-center gap-3">
              <select
                value={solicitud.aplicationState}
                onChange={handleEstadoChange}
                className="flex-1 px-3 py-2 border border-grisito rounded-lg focus:outline-none focus:ring-2 focus:ring-moradito/50"
              >
                <option value="PENDIENTE">Pendiente</option>
                <option value="ACEPTADA">Aceptada</option>
                <option value="RECHAZADA">Rechazada</option>
              </select>
              <button
                onClick={handleSave}
                className="px-6 py-3 bg-moradito text-negrito rounded-full font-medium hover:bg-purple-300 transition">
                Guardar cambios
              </button>
            </div>
          </div>
        </div>
      </div>
      {showConfirm && (
        <ClickPopup
          message="¿Estás seguro que deseas eliminar esta solicitud? Esta acción no se puede deshacer."
          onConfirm={handleConfirmDelete}
          onCancel={closeConfirm}
          confirmText="Eliminar"
          cancelText="Cancelar"
        />
      )}
    </div>
  );
}