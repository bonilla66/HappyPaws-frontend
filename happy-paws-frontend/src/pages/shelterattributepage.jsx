import React, { useState } from "react";
import ModalAttribute from "../components/modalattribute";
import ModalShelter from "../components/modalshelter";
import PopUpForm from "../components/popupform";
import { Edit3, Trash2, Plus } from "lucide-react";
import ConfirmDelete from "../components/confirmdelete";
import ModalBreed from "../components/breedmodal"
import ModalSpecies from "../components/speciesmodal"

export default function ShelterAttribute() {
  const [shelters, setShelters] = useState([
    { id: 1, name: "Refugio Central", address: "San Salvador", phone: "12345678", email: "central@refugio.com" },
    { id: 2, name: "Refugio Norte", address: "Santa Tecla", phone: "87654321", email: "norte@refugio.com" },
    { id: 1, name: "Refugio Central", address: "San Salvador", phone: "12345678", email: "central@refugio.com" },
    { id: 2, name: "Refugio Norte", address: "Santa Tecla", phone: "87654321", email: "norte@refugio.com" },
    { id: 1, name: "Refugio Central", address: "San Salvador", phone: "12345678", email: "central@refugio.com" },
    { id: 2, name: "Refugio Norte", address: "Santa Tecla", phone: "87654321", email: "norte@refugio.com" },
    { id: 1, name: "Refugio Central", address: "San Salvador", phone: "12345678", email: "central@refugio.com" },
    { id: 2, name: "Refugio Norte", address: "Santa Tecla", phone: "87654321", email: "norte@refugio.com" },
    { id: 1, name: "Refugio Central", address: "San Salvador", phone: "12345678", email: "central@refugio.com" },
    { id: 2, name: "Refugio Norte", address: "Santa Tecla", phone: "87654321", email: "norte@refugio.com" },
    { id: 1, name: "Refugio Central", address: "San Salvador", phone: "12345678", email: "central@refugio.com" },
    { id: 2, name: "Refugio Norte", address: "Santa Tecla", phone: "87654321", email: "norte@refugio.com" },
    { id: 1, name: "Refugio Central", address: "San Salvador", phone: "12345678", email: "central@refugio.com" },
    { id: 2, name: "Refugio Norte", address: "Santa Tecla", phone: "87654321", email: "norte@refugio.com" },
    { id: 1, name: "Refugio Central", address: "San Salvador", phone: "12345678", email: "central@refugio.com" },
    { id: 2, name: "Refugio Norte", address: "Santa Tecla", phone: "87654321", email: "norte@refugio.com" },
    { id: 1, name: "Refugio Central", address: "San Salvador", phone: "12345678", email: "central@refugio.com" },
    { id: 2, name: "Refugio Norte", address: "Santa Tecla", phone: "87654321", email: "norte@refugio.com" },
    { id: 1, name: "Refugio Central", address: "San Salvador", phone: "12345678", email: "central@refugio.com" },
    { id: 2, name: "Refugio Norte", address: "Santa Tecla", phone: "87654321", email: "norte@refugio.com" },
    { id: 1, name: "Refugio Central", address: "San Salvador", phone: "12345678", email: "central@refugio.com" },
    { id: 2, name: "Refugio Norte", address: "Santa Tecla", phone: "87654321", email: "norte@refugio.com" },
    { id: 1, name: "Refugio Central", address: "San Salvador", phone: "12345678", email: "central@refugio.com" },
    { id: 2, name: "Refugio Norte", address: "Santa Tecla", phone: "87654321", email: "norte@refugio.com" },
  ]);

  const [attributes, setAttributes] = useState([
    { id: 1, attributeName: "Vision", attributeValue: "No tiene un ojo" },
    { id: 2, attributeName: "Castrado", attributeValue: "Sí" },
    { id: 3, attributeName: "Temperamento", attributeValue: "Amigable" },
    { id: 1, attributeName: "Vision", attributeValue: "No tiene un ojo" },
    { id: 2, attributeName: "Castrado", attributeValue: "Sí" },
    { id: 3, attributeName: "Temperamento", attributeValue: "Amigable" },
    { id: 1, attributeName: "Vision", attributeValue: "No tiene un ojo" },
    { id: 2, attributeName: "Castrado", attributeValue: "Sí" },
    { id: 3, attributeName: "Temperamento", attributeValue: "Amigable" },
    { id: 1, attributeName: "Vision", attributeValue: "No tiene un ojo" },
    { id: 2, attributeName: "Castrado", attributeValue: "Sí" },
    { id: 3, attributeName: "Temperamento", attributeValue: "Amigable" },
    { id: 1, attributeName: "Vision", attributeValue: "No tiene un ojo" },
    { id: 2, attributeName: "Castrado", attributeValue: "Sí" },
    { id: 3, attributeName: "Temperamento", attributeValue: "Amigable" },
    { id: 1, attributeName: "Vision", attributeValue: "No tiene un ojo" },
    { id: 2, attributeName: "Castrado", attributeValue: "Sí" },
    { id: 3, attributeName: "Temperamento", attributeValue: "Amigable" },
    { id: 1, attributeName: "Vision", attributeValue: "No tiene un ojo" },
    { id: 2, attributeName: "Castrado", attributeValue: "Sí" },
    { id: 3, attributeName: "Temperamento", attributeValue: "Amigable" },
    { id: 1, attributeName: "Vision", attributeValue: "No tiene un ojo" },
    { id: 2, attributeName: "Castrado", attributeValue: "Sí" },
    { id: 3, attributeName: "Temperamento", attributeValue: "Amigable" },
  ]);

  const [species, setSpecies] = useState([
    { id: 1, name: "Ave" },
    { id: 2, name: "Perro" },
    { id: 3, name: "Gato" },
    { id: 1, name: "Ave" },
    { id: 2, name: "Perro" },
    { id: 3, name: "Gato" },
    { id: 1, name: "Ave" },
    { id: 2, name: "Perro" },
    { id: 3, name: "Gato" },
    { id: 1, name: "Ave" },
    { id: 2, name: "Perro" },
    { id: 3, name: "Gato" },
    { id: 1, name: "Ave" },
    { id: 2, name: "Perro" },
    { id: 3, name: "Gato" },
    { id: 1, name: "Ave" },
    { id: 2, name: "Perro" },
    { id: 3, name: "Gato" },
    { id: 1, name: "Ave" },
    { id: 2, name: "Perro" },
    { id: 3, name: "Gato" },
    { id: 1, name: "Ave" },
    { id: 2, name: "Perro" },
    { id: 3, name: "Gato" },
  ]);

  const [breeds, setBreeds] = useState([
    { id: 1, name: "Salchicha", speciesId: 2 },
    { id: 2, name: "Labrador", speciesId: 2 },
    { id: 3, name: "Siames", speciesId: 3 },
     { id: 1, name: "Salchicha", speciesId: 2 },
    { id: 2, name: "Labrador", speciesId: 2 },
    { id: 3, name: "Siames", speciesId: 3 },
     { id: 1, name: "Salchicha", speciesId: 2 },
    { id: 2, name: "Labrador", speciesId: 2 },
    { id: 3, name: "Siames", speciesId: 3 },
     { id: 1, name: "Salchicha", speciesId: 2 },
    { id: 2, name: "Labrador", speciesId: 2 },
    { id: 3, name: "Siames", speciesId: 3 },
     { id: 1, name: "Salchicha", speciesId: 2 },
    { id: 2, name: "Labrador", speciesId: 2 },
    { id: 3, name: "Siames", speciesId: 3 },
     { id: 1, name: "Salchicha", speciesId: 2 },
    { id: 2, name: "Labrador", speciesId: 2 },
    { id: 3, name: "Siames", speciesId: 3 },
     { id: 1, name: "Salchicha", speciesId: 2 },
    { id: 2, name: "Labrador", speciesId: 2 },
    { id: 3, name: "Siames", speciesId: 3 },
     { id: 1, name: "Salchicha", speciesId: 2 },
    { id: 2, name: "Labrador", speciesId: 2 },
    { id: 3, name: "Siames", speciesId: 3 },
  ]);

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

  const handleSaveShelter = (data) => {
    if (editingShelter) {
      setShelters(prev => prev.map(s => s.id === editingShelter.id ? { ...s, ...data } : s));
      setPopupMessage("Refugio actualizado con éxito");
    } else {
      setShelters(prev => [...prev, { ...data, id: Date.now() }]);
      setPopupMessage("Refugio agregado con éxito");
    }
    setShowShelterModal(false);
    setEditingShelter(null);
    showSuccessPopup();
  };

  const handleSaveAttribute = (data) => {
    if (editingAttribute) {
      setAttributes(prev => prev.map(a => a.id === editingAttribute.id ? { ...a, ...data } : a));
      setPopupMessage("Atributo actualizado con éxito");
    } else {
      setAttributes(prev => [...prev, { ...data, id: Date.now() }]);
      setPopupMessage("Atributo agregado con éxito");
    }
    setShowAttributeModal(false);
    setEditingAttribute(null);
    showSuccessPopup();
  };

  const handleSaveSpecies = (data) => {
    if (editingSpecies) {
      setSpecies(prev => prev.map(sp => sp.id === editingSpecies.id ? { ...sp, ...data } : sp));
      setPopupMessage("Especie actualizada con éxito");
    } else {
      setSpecies(prev => [...prev, { ...data, id: Date.now() }]);
      setPopupMessage("Especie agregada con éxito");
    }
    setShowSpeciesModal(false);
    setEditingSpecies(null);
    showSuccessPopup();
  };

  const handleSaveBreed = (data) => {
    if (editingBreed) {
      setBreeds(prev => prev.map(b => b.id === editingBreed.id ? { ...b, ...data } : b));
      setPopupMessage("Raza actualizada con éxito");
    } else {
      setBreeds(prev => [...prev, { ...data, id: Date.now() }]);
      setPopupMessage("Raza agregada con éxito");
    }
    setShowBreedModal(false);
    setEditingBreed(null);
    showSuccessPopup();
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

  const performDelete = () => {
    if (!itemToDelete) return;

    switch(itemToDelete.type) {
      case "shelter":
        setShelters(prev => prev.filter(s => s.id !== itemToDelete.id));
        setPopupMessage("Refugio eliminado con éxito");
        break;
      case "attribute":
        setAttributes(prev => prev.filter(a => a.id !== itemToDelete.id));
        setPopupMessage("Atributo eliminado con éxito");
        break;
      case "species":
        setSpecies(prev => prev.filter(sp => sp.id !== itemToDelete.id));
        setPopupMessage("Especie eliminada con éxito");
        break;
      case "breed":
        setBreeds(prev => prev.filter(b => b.id !== itemToDelete.id));
        setPopupMessage("Raza eliminada con éxito");
        break;
      default:
        break;
    }
    setPopupType("success");
    setPopupVisible(true);
    setConfirmVisible(false);
    setItemToDelete(null);
  };

  const closePopup = () => setPopupVisible(false);

  return (
    <div className="h-full bg-amarillito px-6 py-2 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="flex flex-col">
        <h2 className="text-xl font-bold text-center text-azulito">Gestión de refugios</h2>
        <button
          style={{ backgroundColor: 'transparent', color: 'black' }}
          className="btn self-end text-3xl font-bold w-12 h-12 flex items-center justify-center rounded-full transition-colors duration-300"
          onMouseEnter={e => {
            e.currentTarget.style.backgroundColor = '#E4CFEF';
            e.currentTarget.style.color = 'white';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = 'black';
          }}
          onClick={() => { setEditingShelter(null); setShowShelterModal(true); }}
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
              {shelters.map(s => (
                <tr key={s.id} className="border-b border-grisito last:border-0">
                  <td className="py-2 text-center">{s.id}</td>
                  <td className="py-2 text-center">{s.name}</td>
                  <td className="py-2 flex gap-6 justify-center items-center">
                    <Edit3 className="cursor-pointer" size={18} onClick={() => { setEditingShelter(s); setShowShelterModal(true); }}/>
                    <Trash2 className="cursor-pointer" size={18} onClick={() => confirmDelete(s.id, "shelter")}/>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ModalShelter show={showShelterModal} onClose={() => setShowShelterModal(false)} onSave={handleSaveShelter} initialData={editingShelter} />
      </div>
      <div className="flex flex-col">
        <h2 className="text-xl font-bold text-center text-azulito">Gestión de atributos</h2>
        <button
          style={{ backgroundColor: 'transparent', color: 'black' }}
          className="btn self-end text-3xl font-bold w-12 h-12 flex items-center justify-center rounded-full transition-colors duration-300"
          onMouseEnter={e => {
            e.currentTarget.style.backgroundColor = '#E4CFEF';
            e.currentTarget.style.color = 'white';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = 'black';
          }}
          onClick={() => { setEditingAttribute(null); setShowAttributeModal(true); }}
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
              {attributes.map(a => (
                <tr key={a.id} className="border-b border-grisito last:border-0">
                  <td className="py-2 text-center">{a.id}</td>
                  <td className="py-2 text-center">{a.attributeName}</td>
                  <td className="py-2 text-center">{a.attributeValue}</td>
                  <td className="py-2 flex gap-6 justify-center items-center">
                    <Edit3 className="cursor-pointer" size={18} onClick={() => { setEditingAttribute(a); setShowAttributeModal(true); }}/>
                    <Trash2 className="cursor-pointer" size={18} onClick={() => confirmDelete(a.id, "attribute")} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ModalAttribute show={showAttributeModal} onClose={() => setShowAttributeModal(false)} onSave={handleSaveAttribute} initialData={editingAttribute} />
      </div>
      <div className="flex flex-col">
        <h2 className="text-xl font-bold mb-2 text-center text-azulito">Gestión de especies</h2>
        <button
          style={{ backgroundColor: 'transparent', color: 'black' }}
          className="btn mb-2 self-end text-3xl font-bold w-12 h-12 flex items-center justify-center rounded-full transition-colors duration-300"
          onMouseEnter={e => {
            e.currentTarget.style.backgroundColor = '#E4CFEF';
            e.currentTarget.style.color = 'white';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = 'black';
          }}
          onClick={() => { setEditingSpecies(null); setShowSpeciesModal(true); }}
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
              {species.map(sp => (
                <tr key={sp.id} className="border-b border-grisito last:border-0">
                  <td className="py-2 text-center">{sp.id}</td>
                  <td className="py-2 text-center">{sp.name}</td>
                  <td className="py-2 flex gap-6 justify-center items-center">
                    <Edit3 className="cursor-pointer" size={18} onClick={() => { setEditingSpecies(sp); setShowSpeciesModal(true); }} />
                    <Trash2 className="cursor-pointer" size={18} onClick={() => confirmDelete(sp.id, "species")} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ModalSpecies show={showSpeciesModal} onClose={() => setShowSpeciesModal(false)} onSave={handleSaveSpecies} initialData={editingSpecies} />
      </div>
      <div className="flex flex-col">
        <h2 className="text-xl font-bold mb-2 text-center text-azulito">Gestión de razas</h2>
        <button
          style={{ backgroundColor: 'transparent', color: 'black' }}
          className="btn mb-2 self-end text-3xl font-bold w-12 h-12 flex items-center justify-center rounded-full transition-colors duration-300"
          onMouseEnter={e => {
            e.currentTarget.style.backgroundColor = '#E4CFEF';
            e.currentTarget.style.color = 'white';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = 'black';
          }}
          onClick={() => { setEditingBreed(null); setShowBreedModal(true); }}
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
              {breeds.map(b => (
                <tr key={b.id} className="border-b border-grisito last:border-0">
                  <td className="py-2 text-center">{b.id}</td>
                  <td className="py-2 text-center">{b.name}</td>
                  <td className="py-2 text-center">{b.speciesId}</td>
                  <td className="py-2 flex gap-6 justify-center items-center">
                    <Edit3 className="cursor-pointer" size={18} onClick={() => { setEditingBreed(b); setShowBreedModal(true); }} />
                    <Trash2 className="cursor-pointer" size={18} onClick={() => confirmDelete(b.id, "breed")} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ModalBreed show={showBreedModal} onClose={() => setShowBreedModal(false)} onSave={handleSaveBreed} initialData={editingBreed} />
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