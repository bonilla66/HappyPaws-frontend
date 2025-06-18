import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PopUpForm from "../components/popupform.jsx";
import ConfirmDelete from "../components/confirmdelete.jsx";
import useWizard from "../hooks/useWizard.js";
import api from "../services/api.js";
import { Trash2 } from "lucide-react";
import fondito from "../assets/bannerHoriz.jpg";
import { toast } from "react-toastify";
import icon from "../assets/icon3.png";
import { X } from 'lucide-react';


export default function EditPetPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = state || {};

  const { step, next, prev } = useWizard(4);
  const [form, setForm] = useState({
    photoURL: "",
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
    peso: "",
    shelterId: "",
    petAttributeIds: [],
    entryDate: "",
    reviewDate: "",
    history: "",
  });

  const [species, setSpecies] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [genders, setGenders] = useState([]);
  const [shelters, setShelters] = useState([]);
  const [_attributes, setAttributes] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("success");

  const [confirmVisible, setConfirmVisible] = useState(false);

  const inputStyle =
    "mt-1 block w-full rounded-lg border border-grisito shadow-sm focus:outline-none focus:ring-2 focus:ring-moradito focus:border-transparent";

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [speciesRes, _sizesRes, gendersRes, sheltersRes, attributesRes] =
          await Promise.all([
            api.get("/species/all"),
            api.get("/enums/sizes"),
            api.get("/enums/genders"),
            api.get("/shelters/all"),
            api.get("/pet_attributes/all"),
          ]);

        setSpecies(speciesRes.data);
        const sizeMap = {
          PEQUEÑO: 1,
          MEDIANO: 2,
          GRANDE: 3,
        };

        const mappedSizes = _sizesRes.data.map((s) => ({
          label: s.label,
          value: sizeMap[s.value],
        }));

        setSizes(mappedSizes);
        setGenders(gendersRes.data);
        setShelters(sheltersRes.data);
        setAttributes(attributesRes.data);
      } catch (err) {
        console.error("Error cargando datos auxiliares:", err);
      }
    };

    const fetchPetData = async () => {
      try {
        const res = await api.get(`/pets/${id}`);
        const pet = res.data;

        console.log("Pet cargada:", pet); // 👈 esto ayuda a debuguear

        setForm({
          photoURL: pet.photoURL || "",
          nombre: pet.name || "",
          edad: pet.age?.toString() || "",
          edadUnidad: pet.ageUnit || "",
          raza: pet.breedId?.toString() || "",
          sexo: pet.gender || "",
          tamaño: pet.sizeId?.toString() || "",
          tipo: pet.speciesId?.toString() || "",
          descripcion: pet.description || "",
          esterilizado: pet.sterilized || false,
          desparasitado: pet.parasiteFree || false,
          vacunado: pet.fullyVaccinated || false,
          llegada: pet.history || "",
          peso:
            pet.weight !== undefined && pet.weight !== null
              ? pet.weight.toString()
              : "",
          shelterId: pet.shelterId?.toString() || "",
          petAttributeIds:
            pet.attributes?.map((attr) => attr.id.toString()) || [],

          entryDate: pet.entryDate?.slice(0, 10) || "",
          reviewDate: pet.reviewDate?.slice(0, 10) || "",

          history: pet.history || "",
        });
      } catch (err) {
        console.error("Error al cargar mascota:", err);
        navigate(-1);
      }
    };

    setIsLoading(false);

    if (id) {
      fetchInitialData();
      fetchPetData();
    }
  }, [id, navigate]);

  useEffect(() => {
    const fetchBreedsBySpecies = async () => {
      if (!form.tipo) return;
      try {
        const res = await api.get(`/breeds/byspecie/${form.tipo}`);
        setBreeds(res.data);
      } catch (err) {
        console.error("Error cargando razas:", err);
      }
    };
    fetchBreedsBySpecies();
  }, [form.tipo]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({
      ...f,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: form.nombre,
      ageValue: parseInt(form.edad),
      ageUnit: form.edadUnidad,
      gender: form.sexo,
      weight: parseFloat(form.peso),
      sterilized: form.esterilizado,
      parasiteFree: form.desparasitado,
      fullyVaccinated: form.vacunado,
      entryDate: form.entryDate,
      reviewDate: form.reviewDate,
      description: form.descripcion,
      history: form.llegada,
      photoURL: form.photoURL,
      shelterId: parseInt(form.shelterId),
      speciesId: parseInt(form.tipo),
      sizeId: parseInt(form.tamaño),
      breedId: form.raza ? parseInt(form.raza) : null,
      petAttributeIds: form.petAttributeIds.map((id) => parseInt(id)),
    };
    console.log("Payload enviado:", payload);

    try {
      await api.patch(`/pets/${id}`, payload);
      toast.success("Mascota actualizada correctamente");
      setModalType("success");
    } catch (err) {
      console.error(
        "Error actualizando mascota:",
        err.response?.data || err.message,
        err
      );
      toast.error("Error al actualizar la mascota");
      setModalType("error");
    }
    setShowModal(true);
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/pets/${id}`);
      toast.success("Mascota eliminada correctamente");
      navigate(-1);
    } catch (err) {
      console.error("Error al eliminar:", err);
      toast.error("Error al eliminar la mascota");
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-negrito">
                URL de la Foto
              </label>
              <input
                type="text"
                name="photoURL"
                value={form.photoURL}
                onChange={handleChange}
                placeholder="https://..."
                className={inputStyle}
              />
              {form.photoURL && (
                <img
                  src={form.photoURL}
                  alt="preview"
                  className="w-32 h-32 mt-4 rounded-xl object-cover border border-grisito shadow"
                />
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-negrito">
                Nombre
              </label>
              <input
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                className={inputStyle}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-negrito">
                  Edad
                </label>
                <input
                  type="number"
                  name="edad"
                  value={form.edad}
                  onChange={handleChange}
                  className={inputStyle}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-negrito">
                  Unidad
                </label>
                <select
                  name="edadUnidad"
                  value={form.edadUnidad}
                  onChange={handleChange}
                  className={inputStyle}
                >
                  <option value="">Selecciona</option>
                  <option value="MESES">Meses</option>
                  <option value="AÑOS">Años</option>
                </select>
              </div>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-negrito">
                  Especie
                </label>
                <select
                  name="tipo"
                  value={form.tipo}
                  onChange={handleChange}
                  className={inputStyle}
                >
                  <option value="">Selecciona</option>
                  {species.map((s) => (
                    <option key={s.id_species} value={s.id_species}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-negrito">
                  Raza
                </label>
                <select
                  name="raza"
                  value={form.raza}
                  onChange={handleChange}
                  className={inputStyle}
                >
                  <option value="">Selecciona</option>
                  {breeds.map((b) => (
                    <option key={b.id_breed} value={b.id_breed}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-negrito">
                  Sexo
                </label>
                <select
                  name="sexo"
                  value={form.sexo}
                  onChange={handleChange}
                  className={inputStyle}
                >
                  <option value="">Selecciona</option>
                  {genders.map((g) => (
                    <option key={g.value} value={g.value}>
                      {g.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-negrito">
                  Tamaño
                </label>
                <select
                  name="tamaño"
                  value={form.tamaño}
                  onChange={handleChange}
                  className={inputStyle}
                >
                  <option value="">Selecciona</option>
                  {sizes.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-negrito">
                Peso (kg)
              </label>
              <input
                type="number"
                name="peso"
                value={form.peso}
                onChange={handleChange}
                className={inputStyle}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-negrito">
                Refugio
              </label>
              <select
                name="shelterId"
                value={form.shelterId}
                onChange={handleChange}
                className={inputStyle}
              >
                <option value="">Selecciona</option>
                {shelters.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-negrito">
                  Fecha de ingreso
                </label>
                <input
                  type="date"
                  name="entryDate"
                  value={form.entryDate}
                  onChange={handleChange}
                  className={inputStyle}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-negrito">
                  Fecha de revisión
                </label>
                <input
                  type="date"
                  name="reviewDate"
                  value={form.reviewDate}
                  onChange={handleChange}
                  className={inputStyle}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-negrito">
                Descripción
              </label>
              <textarea
                name="descripcion"
                value={form.descripcion}
                onChange={handleChange}
                rows={3}
                className={inputStyle}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-negrito">
                Historia de llegada
              </label>
              <textarea
                name="llegada"
                value={form.llegada}
                onChange={handleChange}
                rows={2}
                className={inputStyle}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <label className="text-sm text-negrito">Esterilizado</label>
                <input
                  type="checkbox"
                  name="esterilizado"
                  checked={form.esterilizado}
                  onChange={handleChange}
                />
                <label className="text-sm text-negrito">Desparasitado</label>
                <input
                  type="checkbox"
                  name="desparasitado"
                  checked={form.desparasitado}
                  onChange={handleChange}
                />
                <label className="text-sm text-negrito">Vacunado</label>
                <input
                  type="checkbox"
                  name="vacunado"
                  checked={form.vacunado}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mt-6">
              <label className="block text-sm font-medium text-negrito mb-2">
                Atributos especiales
              </label>
              <div className="bg-gray-50 rounded-md border border-gray-300 px-3 py-2 shadow-sm max-h-[128px] overflow-y-auto space-y-2">
                {_attributes.map((attr) => (
                  <div
                    key={attr.id}
                    className="flex items-center justify-between text-sm text-negrito"
                  >
                    <div className="mr-2">
                      <p className="font-semibold">{attr.attributeName}</p>
                      <p className="text-gray-500 text-xs">
                        {attr.attributeValue}
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={form.petAttributeIds.includes(
                        attr.id.toString()
                      )}
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        const updated = isChecked
                          ? [...form.petAttributeIds, attr.id.toString()]
                          : form.petAttributeIds.filter(
                              (id) => id !== attr.id.toString()
                            );
                        setForm((prev) => ({
                          ...prev,
                          petAttributeIds: updated,
                        }));
                      }}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                  </div>
                ))}
              </div>
            </div>
          </>
        );
      case 4:
        return (
          <div className="flex bg-rosadito rounded-[24px] shadow-xl w-full max-w-2xl mx-auto overflow-hidden mb-6">
            <div className="bg-rosadito p-2 rounded-2xl flex items-center justify-center flex-shrink-0 w-44 h-44">
              <img
                src={form.photoURL || "https://via.placeholder.com/150"}
                alt={form.nombre || "preview"}
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
            <div className="p-6 flex flex-col items-start text-left flex-1 overflow-hidden">
              <h3 className="text-2xl font-bold text-negrito truncate">
                {form.nombre || "Nombre pendiente"}
              </h3>
              <p className="text-sm text-negrito mt-2">
                <strong>Edad:</strong> {form.edad} {form.edadUnidad}
              </p>
              <p className="text-sm text-negrito">
                <strong>Sexo:</strong> {form.sexo}
              </p>
              <p className="text-sm text-negrito">
                <strong>Tamaño:</strong> {form.tamaño}
              </p>
              <p className="text-sm text-negrito mt-2 line-clamp-3">
                <strong>Descripción:</strong> {form.descripcion}
              </p>
              <p className="text-sm text-negrito mt-1">
                <strong>Fecha ingreso:</strong> {form.entryDate}
              </p>
              <p className="text-sm text-negrito">
                <strong>Refugio:</strong>{" "}
                {shelters.find((s) => s.id === parseInt(form.shelterId))
                  ?.name || ""}
              </p>
              <div className="mt-2 space-y-1 text-sm text-negrito">
                <p>
                  <strong>Esterilizado:</strong>{" "}
                  {form.esterilizado ? "✅ Sí" : "❌ No"}
                </p>
                <p>
                  <strong>Vacunado:</strong> {form.vacunado ? "✅ Sí" : "❌ No"}
                </p>
                <p>
                  <strong>Desparasitado:</strong>{" "}
                  {form.desparasitado ? "✅ Sí" : "❌ No"}
                </p>
              </div>
              <div className="mt-4 text-sm text-negrito">
                <strong>Atributos seleccionados:</strong>
                <ul className="mt-1 space-y-2">
                  {form.petAttributeIds.length > 0 ? (
                    form.petAttributeIds.map((id) => {
                      const atributo = _attributes.find(
                        (a) => a.id === parseInt(id)
                      );
                      return (
                        <li key={id} className="ml-4">
                          {atributo ? (
                            <>
                              <p className="font-semibold">
                                {atributo.attributeName}
                              </p>
                              <p className="text-gray-600 text-xs">
                                {atributo.attributeValue}
                              </p>
                            </>
                          ) : (
                            <p>ID: {id}</p>
                          )}
                        </li>
                      );
                    })
                  ) : (
                    <li className="ml-4">No se seleccionaron atributos</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-full bg-amarillito min-h-screen py-4">
      <h3 className="text-3xl font-semibold text-negrito ml-10 mb-4">
        Editar mascota
      </h3>
      {isLoading ? (
        <p
          className="text-center mt-20 text-xl text-gray-600 h-full w-full"
          style={{ backgroundImage: `url(${fondito})` }}
        >
          Caargando datos...
        </p>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (step === 4) handleSubmit(e);
          }}
          className="max-w-4xl mx-auto bg-blanquito shadow-xl rounded-2xl p-10 space-y-6"
        >
          {renderStep()}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => setConfirmVisible(true)}
              className="p-2 rounded-full text-red-600 hover:bg-red-100"
              title="Eliminar mascota"
            >
              <Trash2 className="w-6 h-6" />
            </button>
            <div className="space-x-4">
              {step > 1 && (
                <button
                  type="button"
                  onClick={prev}
                  className="px-6 py-2 bg-grisito text-negrito rounded-full hover:bg-gray-400"
                >
                  Atrás
                </button>
              )}
              {step < 3 && (
                <button
                  type="button"
                  onClick={next}
                  className="px-6 py-2 bg-moradito text-negrito rounded-full hover:bg-purple-200"
                >
                  Siguiente
                </button>
              )}
              {step === 3 && (
                <button
                  type="button"
                  onClick={next}
                  className="px-6 py-2 bg-moradito text-negrito rounded-full hover:bg-purple-200"
                >
                  Visualizar
                </button>
              )}
              {step === 4 && (
                <button
                  type="submit"
                  className="px-6 py-2 bg-azulito text-blanquito rounded-full hover:bg-sky-600"
                >
                  Guardar cambios
                </button>
              )}
            </div>
          </div>
        </form>
      )}
      {showModal && (
        <PopUpForm
          type={modalType}
          message={
            modalType === "success"
              ? "Mascota actualizada con éxito"
              : "Hubo un error al actualizar la mascota"
          }
          onClose={() => {
            setShowModal(false);
            if (modalType === "success") {
              navigate("/mascotas");
            }
          }}
        />
      )}

      <ConfirmDeleteInline
        visible={confirmVisible}
        onConfirm={handleDelete}
        onCancel={() => setConfirmVisible(false)}
      />
    </div>
  );

  function ConfirmDeleteInline({ visible, onConfirm, onCancel }) {
    if (!visible) return null;

    return (
      <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex justify-center items-center z-50">
        <div className="bg-anaranjadito rounded-xl shadow-2xl p-6 w-full max-w-sm text-center relative">
          <button
            onClick={onCancel}
            className="absolute top-2 right-3 text-black text-xl"
          >
            <X className="w-5 h-5" />
          </button>

          <img
            src={icon}
            alt="Icono de huella"
            className="w-12 h-12 mx-auto mb-4"
          />
          <p className="text-negrito text-base mb-6">
            ¿Estás seguro que quieres eliminar esta mascota?
          </p>

          <div className="flex justify-center space-x-4">
            <button
              onClick={onConfirm}
              className="bg-red-400 text-white rounded-full px-6 py-2 text-sm font-semibold hover:bg-red-400 transition"
            >
              Sí
            </button>
            <button
              onClick={onCancel}
              className="bg-grisito text-black rounded-full px-6 py-2 text-sm font-semibold hover:bg-gray-400 transition"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  }
}
