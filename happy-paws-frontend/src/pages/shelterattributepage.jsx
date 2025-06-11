import React, { useState } from "react";
import ModalAttribute from "../components/modalattribute";
import ModalShelter from "../components/modalshelter";
import PopUpForm from "../components/popupform";
import { Edit3, Trash2, Plus } from "lucide-react";
import ConfirmDelete from "../components/confirmdelete";

export default function ShelterAttribute() {
  const [shelters, setShelters] = useState([
    { id: 1, name: "Refugio Central", address: "San Salvador", phone: "12345678", email: "central@refugio.com" },
    { id: 2, name: "Refugio Norte", address: "Santa Tecla", phone: "87654321", email: "norte@refugio.com" }
  ]);
  const [attributes, setAttributes] = useState([
    { id: 1, attributeName: "Vision", attributeValue: "No tiene un ojo" },
    { id: 2, attributeName: "Castrado", attributeValue: "Sí" },
    { id: 3, attributeName: "Temperamento", attributeValue: "Amigable" }
  ]);

  const [showShelterModal, setShowShelterModal] = useState(false);
  const [showAttributeModal, setShowAttributeModal] = useState(false);
  const [editingShelter, setEditingShelter] = useState(null);
  const [editingAttribute, setEditingAttribute] = useState(null);

  const [popupVisible, setPopupVisible] = useState(false);
  const [popupType, setPopupType] = useState("success");
  const [popupMessage, setPopupMessage] = useState("");

  const [confirmVisible, setConfirmVisible] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null); 

  const handleSaveShelter = (data) => {
    if (editingShelter) {
      setShelters((prev) => prev.map((s) => (s.id === editingShelter.id ? { ...s, ...data } : s)));
      setPopupMessage("Refugio actualizado con éxito");
    } else {
      const newShelter = { ...data, id: Date.now() };
      setShelters((prev) => [...prev, newShelter]);
      setPopupMessage("Refugio agregado con éxito");
    }
    setShowShelterModal(false);
    setEditingShelter(null);
    setPopupType("success");
    setPopupVisible(true);
  };

  const handleSaveAttribute = (data) => {
    if (editingAttribute) {
      setAttributes((prev) => prev.map((a) => (a.id === editingAttribute.id ? { ...a, ...data } : a)));
      setPopupMessage("Atributo actualizado con éxito");
    } else {
      const newAttribute = { ...data, id: Date.now() };
      setAttributes((prev) => [...prev, newAttribute]);
      setPopupMessage("Atributo agregado con éxito");
    }
    setShowAttributeModal(false);
    setEditingAttribute(null);
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
    if (itemToDelete.type === "shelter") {
      setShelters((prev) => prev.filter((s) => s.id !== itemToDelete.id));
      setPopupMessage("Refugio eliminado con éxito");
    } else if (itemToDelete.type === "attribute") {
      setAttributes((prev) => prev.filter((a) => a.id !== itemToDelete.id));
      setPopupMessage("Atributo eliminado con éxito");
    }
    setPopupType("success");
    setPopupVisible(true);
    setConfirmVisible(false);
    setItemToDelete(null);
  };

  const closePopup = () => setPopupVisible(false);

  return (
    <div className="h-full bg-amarillito flex flex-col md:flex-row gap-6 p-6">
      <div className="flex-1">
        <h2 className="text-xl font-bold mb-4 text-center text-azulito">Gestión de refugios</h2>
        <button
          style={{ backgroundColor: 'transparent', color: 'black' }}
          className="btn mb-2 float-right text-3xl font-bold w-12 h-12 flex items-center justify-center rounded-full transition-colors duration-300"
          onMouseEnter={e => {
            e.currentTarget.style.backgroundColor = '#E4CFEF';
            e.currentTarget.style.color = 'white';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = 'black';
          }}
          onClick={() => {
            setEditingShelter(null);
            setShowShelterModal(true);
          }}
          aria-label="Agregar Shelter">
          <Plus size={28} strokeWidth={2} />
        </button>
        <div className="max-h-[700px] overflow-y-auto">
          <table className="table-auto w-full">
            <thead>
              <tr className="sticky top-0 bg-amarillito border-b border-grisito py-3">
                <th className="text-center">ID</th>
                <th className="text-center">Nombre</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {shelters.map((s) => (
                <tr key={s.id} className="border-b border-grisito last:border-0">
                  <td className="py-2 text-center">{s.id}</td>
                  <td className="py-2 text-center">{s.name}</td>
                  <td className="py-2 flex gap-6 justify-center items-center">
                    <Edit3
                      className="cursor-pointer"
                      size={18}
                      onClick={() => {
                        setEditingShelter(s);
                        setShowShelterModal(true);
                      }}/>
                    <Trash2
                      className="cursor-pointer"
                      size={18}
                      onClick={() => confirmDelete(s.id, "shelter")}/>
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
          initialData={editingShelter}/>
      </div>
      <div className="flex-1">
        <h2 className="text-xl font-bold mb-4 text-center text-azulito">Gestión de atributos</h2>
        <button
          style={{ backgroundColor: 'transparent', color: 'black' }}
          className="btn mb-2 float-right text-3xl font-bold w-12 h-12 flex items-center justify-center rounded-full transition-colors duration-300"
          onMouseEnter={e => {
            e.currentTarget.style.backgroundColor = '#E4CFEF';
            e.currentTarget.style.color = 'white';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = 'black';
          }}
          onClick={() => {
            setEditingAttribute(null);
            setShowAttributeModal(true);
          }}
          aria-label="Agregar Atributo">
          <Plus size={28} strokeWidth={2} />
        </button>
        <div className="max-h-[700px] overflow-y-auto ">
          <table className="table-auto w-full">
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
                <tr key={a.id} className="border-b border-grisito last:border-0">
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
                      }}/>
                    <Trash2
                      className="cursor-pointer"
                      size={18}
                      onClick={() => confirmDelete(a.id, "attribute")}/>
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
          initialData={editingAttribute}/>
      </div>
      {popupVisible && (
        <PopUpForm
          type={popupType}
          message={popupMessage}
          onClose={closePopup}/>
      )}
      <ConfirmDelete
        visible={confirmVisible}
        onConfirm={performDelete}
        onCancel={cancelDelete}
        message="¿Está seguro que desea eliminar este item?"/>
    </div>
  );
}