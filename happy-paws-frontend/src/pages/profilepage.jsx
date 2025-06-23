import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  UserRound,
  MoreHorizontal,
  Mail,
  Phone,
  IdCard,
  Search,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { updateUserProfile } from "../services/UserService";
import {
  getUserApplications,
  getAcceptedApplications,
} from "../services/UserService";
import fondito from "../assets/bannerHoriz.jpg";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

      const updatedUser = await updateUserProfile(user.id, updatedData);

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
    <div
      className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-amarillito via-rosadito to-moradito overflow-hidden"
      style={{ backgroundImage: `url(${fondito})` }}
    >
     <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="lg:hidden fixed top-20 right-6 z-[100] bg-amarillito p-2 rounded-full shadow-lg border border-grisito"
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      <aside
        className={`w-full lg:w-1/5 bg-amarillito shadow-2xl border-r border-grisito p-6 fixed lg:static z-40 h-full transition-transform duration-300 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <h1 className="text-xl font-light text-azulito mb-6">
          Información de mi perfil
        </h1>

        <div className="relative">
          <button
            onClick={() => setEditing(true)}
            className="absolute top-4 right-4 text-negrito hover:text-grisito"
            title="Editar perfil"
          >
            <MoreHorizontal size={24} />
          </button>
        </div>

        <div className="flex items-center gap-4 mb-6 mt-8">
          <UserRound size={60} className="text-negrito" />
          <div>
            {editing ? (
              <input
                type="text"
                name="nombre"
                value={formValues.nombre}
                onChange={handleChange}
                className="w-full border-b border-grisito focus:outline-none bg-transparent"
              />
            ) : (
              <h2 className="text-xl font-semibold text-negrito mb-1 truncate">
                {formValues.nombre}
              </h2>
            )}
            <p className="text-grisito capitalize">{formValues.rol}</p>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <InfoField
            icon={<Mail size={20} />}
            label="Correo"
            value={formValues.correo}
            editing={editing}
            onChange={handleChange}
            name="correo"
          />
          <InfoField
            icon={<Phone size={20} />}
            label="Teléfono"
            value={formValues.telefono}
            editing={editing}
            onChange={handleChange}
            name="telefono"
          />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <IdCard size={20} className="text-grisito" />
              <span className="text-grisito text-xl">DUI:</span>
            </div>
            <p className="text-xl text-negrito opacity-90 break-all">
              {formValues.dui}
            </p>
          </div>
        </div>

        {editing && (
          <div className="flex gap-2 mb-6 flex-wrap">
            <button
              onClick={handleSave}
              className="text-negrito border border-grisito rounded-full px-4 py-1 text-xl hover:bg-purple-300 transition flex-1 min-w-[120px]"
            >
              Guardar
            </button>
            <button
              onClick={() => setEditing(false)}
              className="text-negrito border border-grisito rounded-full px-4 py-1 text-xl hover:bg-red-200 transition flex-1 min-w-[120px]"
            >
              Cancelar
            </button>
          </div>
        )}

        <button
          onClick={() => {
            try {
              logout();
              navigate("/");
              toast.info("Sesión cerrada");
            } catch (err) {
              toast.error("No se pudo cerrar sesión");
              console.log(err);
            }
          }}
          className="text-lg text-negrito border border-grisito rounded-full px-4 py-1 hover:bg-grisito w-full lg:w-auto"
        >
          Cerrar sesión
        </button>
      </aside>
      <main className="w-full lg:w-4/5 p-4 lg:p-8 space-y-8 mt-16 lg:mt-0">
        <h2 className="text-2xl lg:text-3xl font-bold text-negrito">
          Mis datos
        </h2>
        <div className="flex-1 space-y-6 px-2 lg:px-6">
          <DataSection
            title="Solicitudes"
            columns={["Mascota", "Fecha emitida", "Estado", "Sexo", "Tipo"]}
            data={solicitudes.map((row) => [
              row.pet,
              row.aplicationDate,
              row.state,
              row.gender,
              row.specie,
            ])}
          />

          <DataSection
            title="Historial de adopciones"
            columns={["Mascota", "Fecha emitida", "Sexo", "Tipo"]}
            data={historial.map((row) => [
              row.pet,
              row.aplicationDate,
              row.gender,
              row.specie,
            ])}
          />
        </div>
      </main>
    </div>
  );
}

function DataSection({ title, columns, data }) {
  const [filterText, setFilterText] = useState("");

  const normalizar = (str) =>
    str
      ?.toString()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  const filtrarTextoPlano = (celda) => {
    if (typeof celda === "string" || typeof celda === "number") {
      return normalizar(celda);
    }
    return "";
  };

  const filteredData = data.filter((row) =>
    row.some((cell) => filtrarTextoPlano(cell).includes(normalizar(filterText)))
  );

  return (
    <section className="bg-amarillito shadow-lg rounded-xl p-4 lg:p-6">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-4">
        <h3 className="text-lg lg:text-xl font-semibold text-negrito">
          {title}
        </h3>
        <div className="relative w-full lg:w-60">
          <input
            type="text"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            placeholder="Buscar..."
            className="pl-10 pr-3 py-1 rounded-full text-sm bg-blanquito text-negrito border border-grisito focus:outline-none focus:ring-2 focus:ring-rosadito w-full"
          />
          <Search className="absolute left-3 top-1.5 w-4 h-4 text-grisito" />
        </div>
      </div>
      <div className="hidden lg:block max-h-[220px] overflow-y-auto">
        <table className="w-full table-auto">
          <thead className="sticky top-0 bg-amarillito z-10">
            <tr>
              {columns.map((col, i) => (
                <th
                  key={i}
                  className="px-4 py-2 text-left text-grisito font-medium whitespace-nowrap"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-grisito">
            {filteredData.length > 0 ? (
              filteredData.map((row, idx) => (
                <tr key={idx}>
                  {row.map((cell, i) => (
                    <td
                      key={i}
                      className="px-4 py-2 text-left break-words max-w-[200px]"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center text-grisito italic py-4"
                >
                  No hay resultados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="lg:hidden space-y-3">
        {filteredData.length > 0 ? (
          filteredData.map((row, idx) => (
            <div
              key={idx}
              className="bg-blanquito p-4 rounded-lg shadow space-y-2"
            >
              {columns.map((col, i) => (
                <div key={i} className="flex justify-between">
                  <span className="text-grisito font-medium">{col}:</span>
                  <span className="text-negrito text-right break-all">
                    {row[i]}
                  </span>
                </div>
              ))}
            </div>
          ))
        ) : (
          <div className="text-center text-grisito italic py-4">
            No hay resultados.
          </div>
        )}
      </div>
    </section>
  );
}

function InfoField({ icon, label, value, editing, onChange, name }) {
  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-1">
        {icon}
        <span className="text-grisito text-xl">{label}:</span>
      </div>
      {editing ? (
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          className="w-full border-b border-grisito focus:outline-none bg-transparent"
        />
      ) : (
        <p className="text-xl text-negrito break-all overflow-hidden">
          {value}
        </p>
      )}
    </div>
  );
}