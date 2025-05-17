import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { UserRound, MoreHorizontal, Mail, Phone, IdCard, Eye } from "lucide-react";

export default function ColaboradorPage() {
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [formValues, setFormValues] = useState({
    nombre: "Alejandro Ortega",
    rol: "Colaborador",
    correo: "colaborador@happypaws.com",
    telefono: "77778888",
    dui: "12345678-9"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues(v => ({ ...v, [name]: value }));
  };

  const handleSave = () => {
    const { nombre, correo, telefono, dui } = formValues;
    if (!nombre || !correo || !telefono || !dui) {
      toast.error("Por favor, complete todos los campos");
    } else {
      toast.success("Cambios guardados");
      setEditing(false);
    }
  };

  const [pets] = useState([
    { id: 1, nombre: "Luna", raza: "Husky" },
    { id: 2, nombre: "Max", raza: "Bulldog" },
    { id: 3, nombre: "Milo", raza: "Beagle" },
    { id: 4, nombre: "Nala", raza: "Labrador" },
    { id: 5, nombre: "Oso", raza: "Pastor" },
    { id: 6, nombre: "Kira", raza: "Schnauzer" },
    { id: 7, nombre: "Rocky", raza: "Boxer" },
    { id: 8, nombre: "Coco", raza: "Poodle" }
  ]);
  const [requests] = useState([
    { id: 1, usuario: "Ana Pérez", mascota: "Luna", estado: "Pendiente" },
    { id: 2, usuario: "Luis Gómez", mascota: "Max", estado: "Aprobada" },
    { id: 3, usuario: "María Ruiz", mascota: "Milo", estado: "Rechazada" },
    { id: 4, usuario: "José Díaz", mascota: "Nala", estado: "Pendiente" },
    { id: 5, usuario: "Carla Ruiz", mascota: "Oso", estado: "Aprobada" },
    { id: 6, usuario: "Pedro Salazar", mascota: "Kira", estado: "Pendiente" },
    { id: 7, usuario: "Laura Méndez", mascota: "Rocky", estado: "Rechazada" },
    { id: 8, usuario: "Raúl Torres", mascota: "Coco", estado: "Aprobada" }
  ]);

  return (
    <div className="h-screen flex bg-amarillito overflow-hidden">
      <div className="w-1/5 border-r border-grisito p-6 relative">
        <button
          onClick={() => setEditing(e => !e)}
          className="absolute top-4 right-4 text-negrito hover:text-grisito cursor-pointer">
          <MoreHorizontal size={24} />
        </button>
        <div className="flex items-center gap-4 mb-4 mt-6">
          <UserRound size={80} className="text-negrito" />
          <div>
            {editing ? (
              <input
                type="text"
                name="nombre"
                value={formValues.nombre}
                onChange={handleChange}
                className="w-full border-b border-grisito focus:outline-none"/>
            ) : (
              <h2 className="text-xl font-semibold text-negrito mb-1">
                {formValues.nombre}
              </h2>
            )}
            <p className="text-grisito capitalize">{formValues.rol}</p>
          </div>
        </div>
        <div className="space-y-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Mail size={20} className="text-grisito" />
              <span className="text-grisito text-sm">Correo:</span>
            </div>
            {editing ? (
              <input
                type="email"
                name="correo"
                value={formValues.correo}
                onChange={handleChange}
                className="w-full border-b border-grisito focus:outline-none"/>
            ) : (
              <p className="text-sm text-negrito">{formValues.correo}</p>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Phone size={20} className="text-grisito" />
              <span className="text-grisito text-sm">Teléfono:</span>
            </div>
            {editing ? (
              <input
                type="text"
                name="telefono"
                value={formValues.telefono}
                onChange={handleChange}
                className="w-full border-b border-grisito focus:outline-none"/>
            ) : (
              <p className="text-sm text-negrito">{formValues.telefono}</p>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <IdCard size={20} className="text-grisito" />
              <span className="text-grisito text-sm">DUI:</span>
            </div>
            {editing ? (
              <input
                type="text"
                name="dui"
                value={formValues.dui}
                onChange={handleChange}
                className="w-full border-b border-grisito focus:outline-none"/>
            ) : (
              <p className="text-sm text-negrito">{formValues.dui}</p>
            )}
          </div>
        </div>
        {editing && (
          <button
            onClick={handleSave}
            className="text-negrito border border-grisito rounded-full px-4 py-1 text-xs hover:bg-grisito cursor-pointer mb-4">
            Guardar cambios
          </button>
        )}
        <button
          onClick={() => navigate("/")}
          className="ml-2 text-negrito border border-grisito rounded-full px-4 py-1 text-xs hover:bg-grisito cursor-pointer">
          Cerrar sesión
        </button>
      </div>
      <div className="w-4/5 p-6 space-y-6">
        <h2 className="text-2xl font-semibold text-negrito mb-2 mt-0">
          Panel de Administración
        </h2>
        <section>
          <h3 className="text-lg font-semibold text-negrito mb-1">Mascotas</h3>
          <table className="w-full table-fixed mb-2">
            <thead>
              <tr className="border-b border-grisito">
                <th className="px-4 py-2 text-grisito text-left sticky top-0 bg-amarillito">ID</th>
                <th className="px-4 py-2 text-grisito text-left sticky top-0 bg-amarillito">Nombre</th>
                <th className="px-4 py-2 text-grisito text-left sticky top-0 bg-amarillito">Raza</th>
                <th className="px-4 py-2 text-grisito text-left sticky top-0 bg-amarillito">Acción</th>
              </tr>
            </thead>
          </table>
          <div className="max-h-[180px] overflow-y-auto mx-6">
            <table className="w-full table-fixed">
              <tbody className="divide-y divide-grisito">
                {pets.map(p => (
                  <tr key={p.id}>
                    <td className="px-4 py-2 text-left">{p.id}</td>
                    <td className="px-4 py-2 text-left">{p.nombre}</td>
                    <td className="px-4 py-2 text-left">{p.raza}</td>
                    <td className="px-4 py-2 text-left">
                      <Link to="/petsetting" className="inline-flex items-center text-negrito cursor-pointer hover:text-moradito">
                        <Eye size={16}/><span className="ml-1">Ver más</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section>
          <h3 className="text-lg font-semibold text-negrito mb-1">Solicitudes de Adopción</h3>
          <table className="w-full table-fixed mb-2">
            <thead>
              <tr className="border-b border-grisito">
                <th className="px-4 py-2 text-grisito text-left sticky top-0 bg-amarillito">ID</th>
                <th className="px-4 py-2 text-grisito text-left sticky top-0 bg-amarillito">Usuario</th>
                <th className="px-4 py-2 text-grisito text-left sticky top-0 bg-amarillito">Mascota</th>
                <th className="px-4 py-2 text-grisito text-left sticky top-0 bg-amarillito">Estado</th>
                <th className="px-4 py-2 text-grisito text-left sticky top-0 bg-amarillito">Acción</th>
              </tr>
            </thead>
          </table>
          <div className="max-h-[180px] overflow-y-auto mx-6">
            <table className="w-full table-fixed">
              <tbody className="divide-y divide-grisito">
                {requests.map(r => (
                  <tr key={r.id}>
                    <td className="px-4 py-2 text-left">{r.id}</td>
                    <td className="px-4 py-2 text-left">{r.usuario}</td>
                    <td className="px-4 py-2 text-left">{r.mascota}</td>
                    <td className="px-4 py-2 text-left">{r.estado}</td>
                    <td className="px-4 py-2 text-left">
                      <Link to="/solisetting" className="inline-flex items-center text-negrito cursor-pointer hover:text-moradito">
                        <Eye size={16}/><span className="ml-1">Ver más</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
