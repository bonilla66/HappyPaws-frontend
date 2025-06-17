import React, { useState, useEffect } from "react";
import ModalAttribute from "../components/modalattribute";
import ModalShelter from "../components/modalshelter";
import PopUpForm from "../components/popupform";
import { Edit3, Trash2, Plus } from "lucide-react";
import ConfirmDelete from "../components/confirmdelete";
import ModalBreed from "../components/breedmodal";
import ModalSpecies from "../components/speciesmodal";
import api from "../services/api";
import { toast } from "react-toastify";

export default function ShelterAttribute() {
  const [shelters, setShelters] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [species, setSpecies] = useState([]);
  const [breeds, setBreeds] = useState([]);
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [sheltersRes, attributesRes, speciesRes, breedsRes] =
          await Promise.all([
            api.get("/shelters/all"),
            api.get("/pet_attributes/all"),
            api.get("/species/all"),
            api.get("/breeds/all"),
          ]);

        if (Array.isArray(sheltersRes.data)) setShelters(sheltersRes.data);
        else toast.error("Error al cargar refugios");

        if (Array.isArray(attributesRes.data))
          setAttributes(attributesRes.data);
        else toast.error("Error al cargar atributos");

        if (Array.isArray(speciesRes.data)) {
          const normalizedSpecies = speciesRes.data.map((sp) => ({
            id: sp.id_species,
            name: sp.name,
          }));
          setSpecies(normalizedSpecies);
        } else {
          toast.error("Error al cargar especies");
        }

        if (Array.isArray(breedsRes.data)) {
          const normalizedBreeds = breedsRes.data.map((b) => ({
            id: b.id_breed,
            name: b.name,
            speciesId: b.speciesId,
          }));
          setBreeds(normalizedBreeds);
        } else {
          toast.error("Error al cargar razas");
        }
      } catch (err) {
        console.error("Error al cargar los datos del sistema", err);
        toast.error("Error general al cargar los datos");
      }
    };

    fetchAll();
  }, []);

  const [showShelterModal, setShowShelterModal] = useState(false);
  const [showAttributeModal, setShowAttributeModal] = useState(false);
  const [showSpeciesModal, setShowSpeciesModal] = useState(false);
  const [showBreedModal, setShowBreedModal] = useState(false);

  const [editingShelter, setEditingShelter] = useState(null);
  const [editingAttribute, setEditingAttribute] = useState(null);
  const [editingSpecies, setEditingSpecies] = useState(null);
  const [editingBreed, setEditingBreed] = useState(null);

  const [popupVisible, setPopupVisible] = useState(false);
  const [popupType, setPopupType] = useState("success");
  const [popupMessage, setPopupMessage] = useState("");

  const [confirmVisible, setConfirmVisible] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const handleSaveShelter = async (data) => {
    try {
      if (editingShelter) {
        await api.put(`/shelters/${editingShelter.id}`, data);
        const res = await api.get("/shelters/all");
        setShelters(res.data);
        setPopupMessage("Refugio actualizado con éxito");
      } else {
        await api.post("/shelters/register", data);
        const res = await api.get("/shelters/all");
        setShelters(res.data);
        setPopupMessage("Refugio agregado con éxito");
      }

      setShowShelterModal(false);
      setEditingShelter(null);
      showSuccessPopup();
    } catch (error) {
      console.error(
        "Error al guardar refugio:",
        error.response?.data || error.message
      );
      toast.error(
        error.response?.data?.message || "No se pudo guardar el refugio"
      );
    }
  };

  const handleSaveAttribute = async (data) => {
    try {
      if (editingAttribute) {
        await api.put(`/pet_attributes/update/${editingAttribute.id}`, data);
        const res = await api.get("/pet_attributes/all");
        setAttributes(res.data);
        setPopupMessage("Atributo actualizado con éxito");
      } else {
        await api.post("/pet_attributes/register", data);
        const res = await api.get("/pet_attributes/all");
        setAttributes(res.data);
        setPopupMessage("Atributo agregado con éxito");
      }

      setShowAttributeModal(false);
      setEditingAttribute(null);
      showSuccessPopup();
    } catch (error) {
      console.error(
        "Error al guardar atributo:",
        error.response?.data || error.message
      );
      toast.error(
        error.response?.data?.message || "No se pudo guardar el atributo"
      );
    }
  };

  const handleSaveSpecies = async (data) => {
    try {
      if (editingSpecies) {
        await api.put(`/species/${editingSpecies.id}`, data);
        const res = await api.get("/species/all");
        const normalized = res.data.map((sp) => ({
          id: sp.id_species,
          name: sp.name,
        }));
        setSpecies(normalized);
        setPopupMessage("Especie actualizada con éxito");
      } else {
        await api.post("/species/register", data);
        const res = await api.get("/species/all");
        const normalized = res.data.map((sp) => ({
          id: sp.id_species,
          name: sp.name,
        }));
        setSpecies(normalized);
        setPopupMessage("Especie agregada con éxito");
      }

      setShowSpeciesModal(false);
      setEditingSpecies(null);
      showSuccessPopup();
    } catch (error) {
      console.error(
        "Error al guardar especie:",
        error.response?.data || error.message
      );
      toast.error(
        error.response?.data?.message || "No se pudo guardar la especie"
      );
    }
  };

  const handleSaveBreed = async (data) => {
    try {
      if (editingBreed) {
        await api.put(`/breeds/${editingBreed.id}`, data);
        const res = await api.get("/breeds/all");
        const normalized = res.data.map((b) => ({
          id: b.id_breed,
          name: b.name,
          speciesId: b.speciesId,
        }));
        setBreeds(normalized);
        setPopupMessage("Raza actualizada con éxito");
      } else {
        await api.post("/breeds/register", data);
        const res = await api.get("/breeds/all");
        const normalized = res.data.map((b) => ({
          id: b.id_breed,
          name: b.name,
          speciesId: b.speciesId,
        }));
        setBreeds(normalized);
        setPopupMessage("Raza agregada con éxito");
      }

      setShowBreedModal(false);
      setEditingBreed(null);
      showSuccessPopup();
    } catch (error) {
      console.error(
        "Error al guardar raza:",
        error.response?.data || error.message
      );
      toast.error(
        error.response?.data?.message || "No se pudo guardar la raza"
      );
    }
  };

  const showSuccessPopup = () => {
    setPopupType("success");
    setPopupVisible(true);
  };

  const confirmDelete = (id, type) => {
    setItemToDelete({ id, type });
    setConfirmVisible(true);
  };

  const cancelDelete = () => {
    setConfirmVisible(false);
    setItemToDelete(null);
  };

  const performDelete = async () => {
    if (!itemToDelete) return;

    try {
      switch (itemToDelete.type) {
        case "shelter": {
          await api.delete(`/shelters/${itemToDelete.id}`);
          const sheltersRes = await api.get("/shelters/all");
          setShelters(sheltersRes.data);
          setPopupMessage("Refugio eliminado con éxito");
          break;
        }

        case "attribute": {
          await api.delete(`/pet_attributes/delete/${itemToDelete.id}`);
          const attrRes = await api.get("/pet_attributes/all");
          setAttributes(attrRes.data);
          setPopupMessage("Atributo eliminado con éxito");
          break;
        }

        case "species": {
          await api.delete(`/species/${itemToDelete.id}`);
          const speciesRes = await api.get("/species/all");
          const normalizedSpecies = speciesRes.data.map((sp) => ({
            id: sp.id_species,
            name: sp.name,
          }));
          setSpecies(normalizedSpecies);
          setPopupMessage("Especie eliminada con éxito");
          break;
        }

        case "breed": {
          await api.delete(`/breeds/${itemToDelete.id}`);
          const breedsRes = await api.get("/breeds/all");
          const normalizedBreeds = breedsRes.data.map((b) => ({
            id: b.id_breed,
            name: b.name,
            speciesId: b.speciesId,
          }));
          setBreeds(normalizedBreeds);
          setPopupMessage("Raza eliminada con éxito");
          break;
        }

        default:
          return;
      }

      setPopupType("success");
    } catch (error) {
      console.error(
        "Error al eliminar:",
        error.response?.data || error.message
      );
      toast.error(
        error.response?.data?.message || "No se pudo eliminar el elemento"
      );
      setPopupType("error");
      setPopupMessage("Error al eliminar");
    }

    setPopupVisible(true);
    setConfirmVisible(false);
    setItemToDelete(null);
  };
  const closePopup = () => setPopupVisible(false);

  return (
    <div className="h-full bg-amarillito px-6 py-2 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="flex flex-col">
        <h2 className="text-xl font-bold text-center text-azulito">
          Gestión de refugios
        </h2>
        <button
          style={{ backgroundColor: "transparent", color: "black" }}
          className="btn self-end text-3xl font-bold w-12 h-12 flex items-center justify-center rounded-full transition-colors duration-300"
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#E4CFEF";
            e.currentTarget.style.color = "white";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "black";
          }}
          onClick={() => {
            setEditingShelter(null);
            setShowShelterModal(true);
          }}
          aria-label="Agregar Refugio"
        >
          <Plus size={28} strokeWidth={2} />
        </button>
        <div className="max-h-[300px] overflow-y-auto">
          <table className="table-auto w-full -mt-2">
            <thead>
              <tr className="sticky top-0 bg-amarillito border-b border-grisito py-2">
                <th className="text-center">ID</th>
                <th className="text-center">Nombre</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {shelters.map((s) => (
                <tr
                  key={s.id}
                  className="border-b border-grisito last:border-0"
                >
                  <td className="py-2 text-center">{s.id}</td>
                  <td className="py-2 text-center">{s.name}</td>
                  <td className="py-2 flex gap-6 justify-center items-center">
                    <Edit3
                      className="cursor-pointer"
                      size={18}
                      onClick={() => {
                        setEditingShelter(s);
                        setShowShelterModal(true);
                      }}
                    />
                    <Trash2
                      className="cursor-pointer"
                      size={18}
                      onClick={() => confirmDelete(s.id, "shelter")}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ModalShelter
          show={showShelterModal}
          onClose={() => setShowShelterModal(false)}
          onSave={handleSaveShelter}
          initialData={editingShelter}
        />
      </div>
      <div className="flex flex-col">
        <h2 className="text-xl font-bold text-center text-azulito">
          Gestión de atributos
        </h2>
        <button
          style={{ backgroundColor: "transparent", color: "black" }}
          className="btn self-end text-3xl font-bold w-12 h-12 flex items-center justify-center rounded-full transition-colors duration-300"
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#E4CFEF";
            e.currentTarget.style.color = "white";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "black";
          }}
          onClick={() => {
            setEditingAttribute(null);
            setShowAttributeModal(true);
          }}
          aria-label="Agregar Atributo"
        >
          <Plus size={28} strokeWidth={2} />
        </button>
        <div className="max-h-[300px] overflow-y-auto">
          <table className="table-auto w-full -mt-2">
            <thead>
              <tr className="sticky top-0 bg-amarillito border-b border-grisito py-3">
                <th className="text-center">ID</th>
                <th className="text-center">Nombre</th>
                <th className="text-center">Valor</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {attributes.map((a) => (
                <tr
                  key={a.id}
                  className="border-b border-grisito last:border-0"
                >
                  <td className="py-2 text-center">{a.id}</td>
                  <td className="py-2 text-center">{a.attributeName}</td>
                  <td className="py-2 text-center">{a.attributeValue}</td>
                  <td className="py-2 flex gap-6 justify-center items-center">
                    <Edit3
                      className="cursor-pointer"
                      size={18}
                      onClick={() => {
                        setEditingAttribute(a);
                        setShowAttributeModal(true);
                      }}
                    />
                    <Trash2
                      className="cursor-pointer"
                      size={18}
                      onClick={() => confirmDelete(a.id, "attribute")}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ModalAttribute
          show={showAttributeModal}
          onClose={() => setShowAttributeModal(false)}
          onSave={handleSaveAttribute}
          initialData={editingAttribute}
        />
      </div>
      <div className="flex flex-col">
        <h2 className="text-xl font-bold mb-2 text-center text-azulito">
          Gestión de especies
        </h2>
        <button
          style={{ backgroundColor: "transparent", color: "black" }}
          className="btn mb-2 self-end text-3xl font-bold w-12 h-12 flex items-center justify-center rounded-full transition-colors duration-300"
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#E4CFEF";
            e.currentTarget.style.color = "white";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "black";
          }}
          onClick={() => {
            setEditingSpecies(null);
            setShowSpeciesModal(true);
          }}
          aria-label="Agregar Especie"
        >
          <Plus size={28} strokeWidth={2} />
        </button>
        <div className="max-h-[300px] overflow-y-auto">
          <table className="table-auto w-full -mt-2">
            <thead>
              <tr className="sticky top-0 bg-amarillito border-b border-grisito py-3">
                <th className="text-center">ID</th>
                <th className="text-center">Nombre</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {species.map((sp) => (
                <tr
                  key={sp.id}
                  className="border-b border-grisito last:border-0"
                >
                  <td className="py-2 text-center">{sp.id}</td>
                  <td className="py-2 text-center">{sp.name}</td>
                  <td className="py-2 flex gap-6 justify-center items-center">
                    <Edit3
                      className="cursor-pointer"
                      size={18}
                      onClick={() => {
                        setEditingSpecies(sp);
                        setShowSpeciesModal(true);
                      }}
                    />
                    <Trash2
                      className="cursor-pointer"
                      size={18}
                      onClick={() => confirmDelete(sp.id, "species")}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ModalSpecies
          show={showSpeciesModal}
          onClose={() => setShowSpeciesModal(false)}
          onSave={handleSaveSpecies}
          initialData={editingSpecies}
        />
      </div>
      <div className="flex flex-col">
        <h2 className="text-xl font-bold mb-2 text-center text-azulito">
          Gestión de razas
        </h2>
        <button
          style={{ backgroundColor: "transparent", color: "black" }}
          className="btn mb-2 self-end text-3xl font-bold w-12 h-12 flex items-center justify-center rounded-full transition-colors duration-300"
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#E4CFEF";
            e.currentTarget.style.color = "white";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "black";
          }}
          onClick={() => {
            setEditingBreed(null);
            setShowBreedModal(true);
          }}
          aria-label="Agregar Raza"
        >
          <Plus size={28} strokeWidth={2} />
        </button>
        <div className="max-h-[300px] overflow-y-auto">
          <table className="table-auto w-full -mt-2">
            <thead>
              <tr className="sticky top-0 bg-amarillito border-b border-grisito py-3">
                <th className="text-center">ID</th>
                <th className="text-center">Nombre</th>
                <th className="text-center">Especie ID</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {breeds.map((b) => (
                <tr
                  key={b.id}
                  className="border-b border-grisito last:border-0"
                >
                  <td className="py-2 text-center">{b.id}</td>
                  <td className="py-2 text-center">{b.name}</td>
                  <td className="py-2 text-center">{b.speciesId}</td>
                  <td className="py-2 flex gap-6 justify-center items-center">
                    <Edit3
                      className="cursor-pointer"
                      size={18}
                      onClick={() => {
                        setEditingBreed(b);
                        setShowBreedModal(true);
                      }}
                    />
                    <Trash2
                      className="cursor-pointer"
                      size={18}
                      onClick={() => confirmDelete(b.id, "breed")}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ModalBreed
          show={showBreedModal}
          onClose={() => setShowBreedModal(false)}
          onSave={handleSaveBreed}
          initialData={editingBreed}
        />
      </div>
      {popupVisible && (
        <PopUpForm
          type={popupType}
          message={popupMessage}
          onClose={closePopup}
        />
      )}
      <ConfirmDelete
        visible={confirmVisible}
        onConfirm={performDelete}
        onCancel={cancelDelete}
        message="¿Está seguro que desea eliminar este item?"
      />
    </div>
  );
}
