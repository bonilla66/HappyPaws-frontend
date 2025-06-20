import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserRound, MoreHorizontal, Mail, Phone, IdCard } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { updateUserProfile } from "../services/UserService";
import { getUserApplications, getAcceptedApplications } from "../services/UserService";


export default function ProfilePage() {
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
 


  const { user, logout } = useAuth();

  const [formValues, setFormValues] = useState({
    nombre: user?.name || "",
    rol: user?.rol || "",
    correo: user?.email || "",
    telefono: user?.phone || "",
    dui: user?.dui || "",
  });

useEffect(() => {
  if (user) {
    setFormValues({
      nombre: user.name || "",
      rol: user.rol || "",
      correo: user.email || "",
      telefono: user.phone || "",
      dui: user.dui || "",
    });
    const fetchData = async () => {
      try {
        const solicitudesData = await getUserApplications(user.email);
        const historialData = await getAcceptedApplications();
        setSolicitudes(solicitudesData);
        setHistorial(historialData);
      } catch (error) {
        console.error("Error al cargar solicitudes:", error);
        toast.error("Error al cargar tus solicitudes");
      }
    };

    fetchData();
  }
}, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((v) => ({ ...v, [name]: value }));
  };

  const handleSave = async () => {
    const { nombre, correo, telefono } = formValues;

    if (!nombre || !correo || !telefono) {
      toast.error("Por favor, complete todos los campos");
      return;
    }

    try {
      const updatedData = {
        name: nombre,
        email: correo,
        phone: telefono,
        rol: formValues.rol,
      };

      const updatedUser = await updateUserProfile(updatedData);

      setFormValues({
        nombre: updatedUser.name,
        correo: updatedUser.email,
        telefono: updatedUser.phone,
        dui: updatedUser.dui,
        rol: updatedUser.rol,
      });

      toast.success("Perfil actualizado con éxito");
      setEditing(false);
    } catch (error) {
      if (error.response?.data?.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Error al actualizar perfil");
        console.error(error);
      }
    }
  };

 const [solicitudes, setSolicitudes] = useState([]);
   const [historial, setHistorial] = useState([]);

  return (
    <div className="min-h-screen bg-amarillito p-6">
      <h1 className="text-3xl font-light text-azulito mb-6">
        Información de mi perfil
      </h1>
      <div className="flex gap-8">
        <div className="w-2/5 relative border-r border-grisito pr-6">
          <button
            onClick={() => setEditing((e) => !e)}
            className="absolute top-4 right-4 text-negrito hover:text-grisito cursor-pointer"
          >
            <MoreHorizontal size={24} />
          </button>
          <div className="flex items-center gap-4 mb-4 mt-6">
            <UserRound size={120} className="text-negrito" />
            <div>
              {editing ? (
                <input
                  type="text"
                  name="nombre"
                  value={formValues.nombre}
                  onChange={handleChange}
                  className="w-full border-b border-grisito focus:outline-none"
                />
              ) : (
                <h2 className="text-2xl font-semibold text-negrito mb-1">
                  {formValues.nombre}
                </h2>
              )}
              <p className="text-grisito capitalize">{formValues.rol}</p>
            </div>
          </div>
          <div className="space-y-6 mb-6">
            <div>
              <h3 className="text-2xl font-semibold mt-12">
                {" "}
                Información personal
              </h3>
              <div className="flex items-center gap-2 mb-1 mt-4">
                <Mail size={30} className="text-grisito" />
                <span className="text-grisito text-xl">Correo:</span>
              </div>
              {editing ? (
                <input
                  type="email"
                  name="correo"
                  value={formValues.correo}
                  onChange={handleChange}
                  className=" w-full border-b border-grisito focus:outline-none"
                />
              ) : (
                <p className="text-xl text-negrito">{formValues.correo}</p>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Phone size={30} className="text-grisito" />
                <span className="text-grisito text-xl">Teléfono:</span>
              </div>
              {editing ? (
                <input
                  type="text"
                  name="telefono"
                  value={formValues.telefono}
                  onChange={handleChange}
                  className="w-full border-b border-grisito focus:outline-none"
                />
              ) : (
                <p className="text-negrito text-xl">{formValues.telefono}</p>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <IdCard size={30} className="text-grisito" />
                <span className="text-grisito text-xl">DUI:</span>
              </div>
              <p className="text-xl text-negrito opacity-70">
                {formValues.dui}
              </p>
            </div>
          </div>
          {editing && (
            <>
              <button
                onClick={handleSave}
                className="bg-moradito text-negrito rounded-full px-4 py-1 text-sm hover:bg-purple-300 transition mr-4"
              >
                Guardar cambios
              </button>
              <button
                onClick={() => {
                  setFormValues({
                    nombre: user.name || "",
                    correo: user.email || "",
                    telefono: user.phone || "",
                    dui: user.dui || "",
                    rol: user.rol || "",
                  });
                  setEditing(false);
                }}
                className="border border-grisito text-negrito rounded-full px-4 py-1 text-sm hover:bg-red-200 transition cursor-pointer"
              >
                Cancelar
              </button>
            </>
          )}
          <button
            onClick={() => {
              try {
                logout();
                navigate("/");
                toast.info("Sesion cerrada");
              } catch (err) {
                toast.error("No se pudo cerrar sesión");
                console.error(err);
              }
            }}
            className="cursor-pointer text-negrito border border-grisito rounded-full px-4 py-1 text-sm hover:bg-grisito transition ml-2"
          >
            Cerrar sesión
          </button>
        </div>
        <div className="flex-1 space-y-6">
          <div className="px-6">
            <h3 className="text-xl font-semibold text-negrito mb-2">
              Solicitudes
            </h3>
            <table className="w-full table-fixed">
              <thead>
                <tr className="border-b border-grisito">
                  <th className="px-4 py-2 text-grisito text-xl text-center sticky top-0 ">
                    Mascota
                  </th>
                  <th className="px-4 py-2 text-grisito text-xl text-center sticky top-0 ">
                    Fecha emitida
                  </th>
                  <th className="px-4 py-2 text-grisito text-xl text-center sticky top-0 ">
                    Estado
                  </th>
                  <th className="px-4 py-2 text-grisito text-xl text-center sticky top-0 ">
                    Sexo
                  </th>
                  <th className="px-4 py-2 text-grisito text-xl text-center sticky top-0 ">
                    Tipo
                  </th>
                </tr>
              </thead>
            </table>
            <div className="max-h-[250px] overflow-y-auto">
              <table className="w-full table-fixed">
                <tbody className="divide-y divide-grisito">
                {solicitudes.map((row, i) => (
              <tr key={i}>
              <td className="px-4 py-2 text-center">{row.pet}</td>
              <td className="px-4 py-2 text-center">{row.aplicationDate}</td>
              <td className="px-4 py-2 text-center">{row.state}</td>
              <td className="px-4 py-2 text-center">{row.gender}</td>
              <td className="px-4 py-2 text-center">{row.specie}</td>
              </tr>
               ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="px-6">
            <h3 className="text-xl font-semibold text-negrito">
              Historial de adopciones
            </h3>
            <table className="w-full table-fixed">
              <thead>
                <tr className="border-b border-grisito">
                  <th className="px-4 py-2 text-grisito text-xl text-center sticky top-0 ">
                    Mascota
                  </th>
                  <th className="px-4 py-2 text-grisito text-xl text-center sticky top-0 ">
                    Fecha emitida
                  </th>
                  <th className="px-4 py-2 text-grisito text-xl text-center sticky top-0 ">
                    Sexo
                  </th>
                  <th className="px-4 py-2 text-grisito text-xl text-center sticky top-0 ">
                    Tipo
                  </th>
                </tr>
              </thead>
            </table>
            <div className="max-h-[250px] overflow-y-auto">
              <table className="w-full table-fixed">
                <tbody className="divide-y divide-grisito">
                 {historial.map((row, i) => (
              <tr key={i}>
              <td className="px-4 py-2 text-center">{row.pet}</td>
              <td className="px-4 py-2 text-center">{row.aplicationDate}</td>
              <td className="px-4 py-2 text-center">{row.gender}</td>
              <td className="px-4 py-2 text-center">{row.specie}</td>
              </tr>
               ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
