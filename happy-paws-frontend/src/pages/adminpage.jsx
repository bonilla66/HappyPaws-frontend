import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  UserRound,
  MoreHorizontal,
  Mail,
  Phone,
  IdCard,
  Eye,
  Search,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { updateUserProfile } from "../services/UserService";
import api from "../services/api";
import fondito from "../assets/bannerHoriz.jpg";

export default function AdminPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [editing, setEditing] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const [formValues, setFormValues] = useState({
    nombre: "",
    rol: "",
    correo: "",
    telefono: "",
    dui: "",
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
    }
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  const [users, setUsers] = useState([]);
  const [pets, setPets] = useState([]);
  const [requests, setRequests] = useState([]);

  const [loadingPets, setLoadingPets] = useState(true);
  const [loadingRequests, setLoadingRequests] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, petsRes, requestsRes] = await Promise.all([
          api.get("/user/all"),
          api.get("/pets/all"),
          api.get("/aplication/all"),
        ]);
        setUsers(usersRes.data);
        setPets(petsRes.data);
        setRequests(requestsRes.data);
      } catch (err) {
        toast.error("Error al cargar datos del panel");
        console.error(err);
      } finally {
        setLoadingUsers(false);
        setLoadingPets(false);
        setLoadingRequests(false);
      }
    };
    fetchData();
  }, []);

  const getUserNameById = (id) => {
    const user = users.find((u) => u.id_user === id);
    return user ? user.name : "Usuario desconocido";
  };

  const getPetNameById = (id) => {
    const pet = pets.find((p) => p.id === id);
    return pet ? pet.name : "Mascota desconocida";
  };

  if (loadingUsers || loadingPets || loadingRequests) {
    return (
      <div className="h-screen w-full bg-amarillito flex items-center justify-center text-2xl text-negrito">
        Cargando datos del panel...
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex bg-gradient-to-br from-amarillito via-rosadito to-moradito overflow-hidden"
      style={{ backgroundImage: `url(${fondito})` }}
    >
      <aside className="w-1/5 bg-amarillito shadow-2xl border-r border-grisito p-6">
        <h1 className="text-xl font-light text-azulito mb-6">
          Información de mi perfil
        </h1>

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="absolute top-4 right-4 text-negrito hover:text-grisito"
          >
            <MoreHorizontal size={24} />
          </button>

          {menuOpen && (
            <div className="absolute top-12 right-2 bg-amarillito shadow-xl rounded-md z-50 w-48">
              <button
                onClick={() => {
                  setEditing(true);
                  setMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-grisito text-sm text-negrito"
              >
                Editar perfil
              </button>
              <button
                onClick={() => {
                  navigate("/dashboard");
                  setMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-grisito text-sm text-negrito"
              >
                Agregar datos
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4 mb-6 mt-8">
          <UserRound size={80} className="text-negrito" />
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
              <h2 className="text-xl font-semibold text-negrito mb-1">
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
            <p className="text-xl text-negrito opacity-90">{formValues.dui}</p>
          </div>
        </div>

        {editing && (
          <div className="flex gap-2 mb-6">
            <button
              onClick={handleSave}
              className="text-negrito border border-grisito rounded-full px-4 py-1 text-xl hover:bg-purple-300 transition"
            >
              Guardar
            </button>
            <button
              onClick={() => setEditing(false)}
              className="text-negrito border border-grisito rounded-full px-4 py-1 text-xl hover:bg-red-200 transition"
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
          className="text-lg text-negrito border border-grisito rounded-full px-4 py-1 hover:bg-grisito"
        >
          Cerrar sesión
        </button>
      </aside>

      <main className="w-4/5 p-8 space-y-8">
        <h2 className="text-3xl font-bold text-negrito">
          Panel de administración
        </h2>
        <DataSection
          title="Usuarios"
          columns={["ID", "Nombre", "Rol", "Acción"]}
          data={users.map((u) => [
            u.id_user,
            u.name,
            u.rol,
            <Link
              to={`/usersetting/${u.id_user}`}
              className="text-azulito hover:underline flex items-center gap-1 transition-transform duration-200 transform hover:scale-105"
            >
              <Eye size={16} />
              Ver más
            </Link>,
          ])}
        />

        <DataSection
          title="Mascotas"
          columns={["ID", "Nombre", "Raza", "Acción"]}
          data={pets.map((p) => [
            p.id,
            p.name,
            p.breed || "Sin raza",
            <Link
              to="/editpet"
              state={{ id: p.id }}
              className="text-azulito hover:underline flex items-center gap-1 transition-transform duration-200 transform hover:scale-105"
            >
              <Eye size={16} />
              Ver más
            </Link>,
          ])}
        />

        <DataSection
          title="Solicitudes de Adopción"
          columns={["ID", "Usuario", "Mascota", "Estado", "Acción"]}
          data={requests.map((r) => [
            r.id,
            getUserNameById(r.userId),
            getPetNameById(r.petId),
            r.aplicationState,
            <Link
              to={`/solisetting/${r.id}`}
              className="text-azulito hover:underline flex items-center gap-1 transition-transform duration-200 transform hover:scale-105"
            >
              <Eye size={16} />
              Ver más
            </Link>,
          ])}
        />
      </main>
    </div>
  );
}

function InfoField({ icon, label, value, editing, onChange, name }) {
  return (
    <div>
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
        <p className="text-xl text-negrito">{value}</p>
      )}
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

  const filteredData = data.filter((row) =>
    row.some((cell) =>
      normalizar(cell).toString().includes(normalizar(filterText))
    )
  );

  return (
    <section className="bg-amarillito shadow-lg rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-negrito">{title}</h3>
        <div className="relative w-60">
          <input
            type="text"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            placeholder="Buscar..."
            className="pl-10 pr-3 py-1 rounded-full text-sm bg-blanquito text-negrito border border-grisito focus:outline-none focus:ring-2 focus:ring-rosadito"
          />
          <Search className="absolute left-3 top-1.5 w-4 h-4 text-grisito" />
        </div>
      </div>

      <div className="max-h-[220px] overflow-y-auto">
        <table className="w-full table-fixed">
          <thead className="sticky top-0 bg-amarillito z-10">
            <tr>
              {columns.map((col, i) => (
                <th
                  key={i}
                  className="px-4 py-2 text-left text-grisito font-medium"
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
                    <td key={i} className="px-4 py-2 text-left">
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
    </section>
  );
}
