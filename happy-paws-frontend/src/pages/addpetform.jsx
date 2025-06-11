import React, { useState, useEffect } from "react";
import { Image as ImageIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PopUpForm from "../components/popupform.jsx";
import useWizard from "../hooks/useWizard.js";

export default function AddPetForm() {
  const navigate = useNavigate();
  const {step, next, prev} = useWizard(2);
  const [form, setForm] = useState({
    photo: null,
    nombre: "",
    edad: "",
    edadUnidad: "",
    raza: "",
    sexo: "",
    tamaño: "",
    tipo: "",
    descripcion: "",
    esterilizado: false,
    desparasitado: false,
    vacunado: false,
    llegada: "",
    peso: ""
  });
  
  const [preview, setPreview] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("success");
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({
      ...f,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setForm((f) => ({ ...f, photo: file }));
    const url = URL.createObjectURL(file);
    setPreview(url);
  };
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nombre || !form.edad) {
      setModalType("error");
    } else {
      setModalType("success");
    }
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    if (modalType === "success") navigate(-1);
  };
  return (
    <div className="w-full bg-amarillito min-h-screen py-4">
      <h3 className="text-3xl font-semibold text-negrito ml-10 mb-4">
        Formulario de la mascota
      </h3>
      <form
        onSubmit={step === 2 ? handleSubmit : (e) => e.preventDefault()}
        className="max-w-4xl mx-auto bg-blanquito shadow-xl rounded-2xl p-10 grid gap-6 md:grid-cols-[200px,1fr]">
        <div className="flex flex-col items-center">
          <div className="w-30 h-30 bg-grisito rounded-xl overflow-hidden border border-grisito mb-4 shadow-md">
            {preview ? (
              <img
                src={preview}
                alt="preview"
                className="w-full h-full object-cover"/>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-grisito">
                <ImageIcon size={56} />
              </div>
            )}
          </div>
          <label className="px-6 py-2 bg-grisito text-negrito rounded-full cursor-pointer hover:bg-grisito/80 transition-colors duration-200">
            Subir Foto
            <input
              type="file"
              accept="image/*"
              onChange={handleFile}
              className="hidden"/>
          </label>
        </div>
        <div className="space-y-6">
          {step === 1 ? (
            <>
              <h2 className="text-2xl font-semibold">Datos de la mascota</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: "Nombre", name: "nombre" },
                  { label: "Edad", name: "edad" },
                  { label: "Raza", name: "raza" },
                  {
                    label: "Sexo",
                    name: "sexo",
                    type: "select",
                    options: ["", "Macho", "Hembra"],
                  },
                  {
                    label: "Tamaño",
                    name: "tamaño",
                    type: "select",
                    options: ["Pequeño", "Mediano", "Grande"],
                  },
                  { label: "Tipo", name: "tipo" },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium">
                      {field.label}
                    </label>
                    {field.name === "edad" ? (
                      <div className="flex space-x-2">
                        <input
                          name="edad"
                          value={form.edad}
                          onChange={handleChange}
                          className="mt-1 block w-1/2 rounded-lg border-grisito shadow-sm focus:outline-none focus:ring-2 focus:ring-moradito focus:border-transparent transition"
                          required
                        />
                        <select
                          name="edadUnidad"
                          value={form.edadUnidad}
                          onChange={handleChange}
                          className="mt-1 block w-1/2 rounded-lg border-grisito shadow-sm focus:outline-none focus:ring-2 focus:ring-moradito focus:border-transparent transition"
                        >
                          <option value="">Unidad</option>
                          <option value="Meses">Meses</option>
                          <option value="Años">Años</option>
                        </select>
                      </div>
                    ) : field.type === "select" ? (
                      <select
                        name={field.name}
                        value={form[field.name]}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-lg border-grisito shadow-sm focus:outline-none focus:ring-2 focus:ring-moradito focus:border-transparent transition">
                        {field.options.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt || "Selecciona"}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        name={field.name}
                        value={form[field.name]}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-lg border-grisito shadow-sm focus:outline-none focus:ring-2 focus:ring-moradito focus:border-transparent transition"
                        required={["nombre"].includes(field.name)}
                      />
                    )}
                  </div>
                ))}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium">
                    Descripción
                  </label>
                  <textarea
                    name="descripcion"
                    value={form.descripcion}
                    onChange={handleChange}
                    rows={3}
                    className="mt-1 block w-full rounded-lg border-grisito shadow-sm focus:outline-none focus:ring-2 focus:ring-moradito focus:border-transparent transition"/>
                </div>
              </div>
              <div className="text-right">
                <button
                  type="button"
                  onClick={next}
                  className="px-6 py-2 bg-grisito text-negrito rounded-full cursor-pointer hover:bg-grisito/80 transition-colors duration-200">
                  Siguiente
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-semibold">Historial Médico</h2>
              <div className="grid grid-cols-1 gap-4 font-medium">
                {[
                  { label: "¿Está Esterilizado?", name: "esterilizado" },
                  { label: "¿Está Desparasitado?", name: "desparasitado" },
                  { label: "¿Con todas sus vacunas?", name: "vacunado" },
                ].map((fld) => (
                  <div key={fld.name} className="flex items-center space-x-2">
                    <span className="flex-1 text-sm">{fld.label}</span>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        name={fld.name}
                        checked={form[fld.name]}
                        onChange={handleChange}
                        className="form-checkbox h-5 w-5 text-moradito"/>
                        <span className="ml-1">Sí</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        disabled={!form[fld.name]}
                        checked={!form[fld.name]}
                        onChange={() =>
                          setForm((f) => ({ ...f, [fld.name]: !f[fld.name] }))
                        }
                        className="form-checkbox h-5 w-5 text-grisito"/>
                      <span className="ml-1">No</span>
                    </label>
                  </div>
                ))}
                <div>
                  <label className="block text-sm font-medium">
                    ¿Cómo llegó al refugio?
                  </label>
                  <textarea
                    name="llegada"
                    value={form.llegada}
                    onChange={handleChange}
                    rows={2}
                    className="mt-1 block w-full rounded-lg border-grisito shadow-sm focus:outline-none focus:ring-2 focus:ring-moradito focus:border-transparent transition"/>
                </div>
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prev}
                  className="px-6 py-2 bg-grisito rounded-full cursor-pointer hover:bg-grisito/80 transition-colors duration-200">
                  Atrás
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-moradito text-negrito rounded-full cursor-pointer hover:bg-moradito/80 transition-colors duration-200">
                  Crear
                </button>
              </div>
            </>
          )}
        </div>
      </form>
      {showModal && (
        <PopUpForm
          type={modalType}
          message={
            modalType === "success"
              ? "Mascota agregada con éxito"
              : "Hemos tenido algún problema para agregar a la mascota"
          }
          onClose={closeModal}/>
      )}
    </div>
  );
}
