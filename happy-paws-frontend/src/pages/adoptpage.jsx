import React, { useState } from "react";
import { UseForm } from "../hooks/form";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PopUpForm from "../components/popupform.jsx";

export default function AdoptionFormPage() {
  const navigate = useNavigate();
  const [popup, setPopup] = useState({ show: false, message: "", type: "" });

  const initialValues = {
    hasOtherPets: "",
    location: "",
    reasons: "",
    hasSpace: "",
    hasTime: "",
  };

  const validate = (vals) =>
    !vals.hasOtherPets ||
    !vals.location ||
    !vals.reasons ||
    !vals.hasSpace ||
    !vals.hasTime
      ? "Por favor completa todos los campos"
      : null;

  const onSubmit = () =>
    setPopup({
      show: true,
      message: "¡Solicitud enviada con éxito!",
      type: "success",
    });

  const handleClose = () => {
    setPopup({ ...popup, show: false });
    if (popup.type === "success") {
      navigate("/info");
    }
  };

  const { values, handleChange, handleSubmit } = UseForm(
    initialValues,
    (vals) => {
      const error = validate(vals);
      if (error) {
        setPopup({ show: true, message: error, type: "error" });
      }
      return error;
    }
  );

  return (
    <div className="min-h-screen bg-amarillito p-6 flex flex-col items-center">
      {popup.show && (
        <PopUpForm
          message={popup.message}
          type={popup.type}
          onClose={handleClose}
        />
      )}

      <button
        onClick={() => navigate(-1)}
        className="self-start mb-4 text-negrito cursor-pointer">
        <ArrowLeft size={24} />
      </button>
      <div className="w-full max-w-4xl bg-blanquito rounded-2xl shadow-2xl p-12 space-y-8">
        <h2 className="text-2xl font-bold text-azulito text-center">
          ¡Solicita la adopción de un peludito!
        </h2>
        <form onSubmit={(e) => handleSubmit(e, onSubmit)} className="space-y-6">
          <div className="flex flex-col space-y-2">
            <label className="text-negrito">
              ¿Tiene otras mascotas en la actualidad?
            </label>
            <div className="flex items-center space-x-6">
              {["sí", "no"].map((opt) => (
                <label key={opt} className="inline-flex items-center space-x-2">
                  <input
                    type="radio"
                    name="hasOtherPets"
                    value={opt}
                    checked={values.hasOtherPets === opt}
                    onChange={handleChange}
                    className="h-4 w-4 accent-black cursor-pointer"/>
                  <span className="text-grisito capitalize">{opt}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-negrito">Ubicación</label>
            <input
              name="location"
              value={values.location}
              onChange={handleChange}
              className="w-full h-8 px-4 border border-grisito rounded-full focus:outline-none focus:ring-1 focus:ring-purple-300"/>
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-negrito">Motivos para adoptarlo</label>
            <input
              name="reasons"
              value={values.reasons}
              onChange={handleChange}
              className="w-full h-8 px-4 border border-grisito rounded-full focus:outline-none focus:ring-1 focus:ring-purple-300"/>
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-negrito">
              ¿Tiene espacio adecuado para la mascota?
            </label>
            <div className="flex items-center space-x-6">
              {["sí", "no"].map((opt) => (
                <label key={opt} className="inline-flex items-center space-x-2">
                  <input
                    type="radio"
                    name="hasSpace"
                    value={opt}
                    checked={values.hasSpace === opt}
                    onChange={handleChange}
                    className="h-4 w-4 accent-black cursor-pointer"/>
                  <span className="text-grisito capitalize">{opt}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-negrito">
              ¿Tiene tiempo suficiente para la mascota?
            </label>
            <div className="flex items-center space-x-6">
              {["sí", "no"].map((opt) => (
                <label key={opt} className="inline-flex items-center space-x-2">
                  <input
                    type="radio"
                    name="hasTime"
                    value={opt}
                    checked={values.hasTime === opt}
                    onChange={handleChange}
                    className="h-4 w-4 accent-black cursor-pointer"/>
                  <span className="text-grisito capitalize">{opt}</span>
                </label>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-moradito text-negrito rounded-full font-medium hover:bg-purple-300 transition">
            Enviar Solicitud
          </button>
        </form>
      </div>
    </div>
  );
}
