import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, Plus, ListFilter } from "lucide-react";
import PetCard from "../components/petcard.jsx";
import api from "../services/api";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import fondito from "../assets/bannerHoriz.jpg";

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-full bg-amarillito">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-moradito"></div>
  </div>
);

const ErrorMessage = ({ message }) => (
  <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded text-center">
    {message}
  </div>
);

const usePagination = (items = [], itemsPerPage = 6) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const currentItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return {
    currentPage,
    totalPages,
    currentItems,
    nextPage: () => setCurrentPage((prev) => Math.min(prev + 1, totalPages)),
    prevPage: () => setCurrentPage((prev) => Math.max(prev - 1, 1)),
    goToPage: (page) => setCurrentPage(Math.max(1, Math.min(page, totalPages))),
  };
};

export default function PetsPage() {
  const [allPets, setAllPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState("DISPONIBLE");
  const { user } = useAuth();
  const navigate = useNavigate();
  const canAddPet = user?.rol === "ADMIN" || user?.rol === "COLABORADOR";

  useEffect(() => {
    const loadPets = async () => {
      try {
        setLoading(true);
        console.log("Filtrando con status:", statusFilter);
        let petsData;

        if (statusFilter === "VACCINATED") {
          petsData = await api.get("/pets/vaccinated");
        } else if (statusFilter === "STERILIZED") {
          petsData = await api.get("/pets/sterilized");
        } else if (statusFilter === "DEWORMED") {
          petsData = await api.get("/pets/dewormed");
        } else if (
          statusFilter === "DISPONIBLE" ||
          statusFilter === "ADOPTADO"
        ) {
          petsData = await api.get(`/pets/status/${statusFilter}`);
        } else {
          petsData = await api.get("/pets/all");
        }

        setAllPets(petsData.data);
      } catch (err) {
        console.error("Error loading pets:", err);
        setError(err.message || "Error al cargar las mascotas");
      } finally {
        setLoading(false);
      }
    };

    loadPets();
  }, [statusFilter]);

  const {
    currentPage,
    totalPages,
    currentItems,
    nextPage,
    prevPage,
    goToPage,
  } = usePagination(allPets);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="min-h-screen overflow-auto bg-amarillito px-6 py-10 sm:px-12 lg:px-24 space-y-8">
      <div className="max-w-7xl mx-auto mb-8 flex justify-between items-start gap-4 flex-wrap">
        <div className="w-full md:w-auto">
          <h1 className="text-3xl font-bold text-negrito">
            Peluditos buscando hogar
          </h1>
        </div>
        <div className="flex flex-col items-end gap-3">
          <div className="flex items-center gap-2">
            <ListFilter />
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                goToPage(1);
              }}
              className="px-3 py-2 border border-gray-300 rounded-full bg-white shadow-sm focus:ring-purple-200 focus:border-purple-200"
            >
              <option value="DISPONIBLE">Disponibles</option>
              <option value="ADOPTADO">Adoptados</option>
              <option value="VACCINATED">Vacunados</option>
              <option value="STERILIZED">Esterilizados</option>
              <option value="DEWORMED">Desparasitados</option>
              <option value="">Todos</option>
            </select>
          </div>
          {canAddPet && (
            <button
              onClick={() => navigate("/addpetform")}
              className="bg-red-300 text-negrito text-sm font-medium px-4 py-1 rounded-full hover:bg-red-400 cursor-pointer inline-flex items-center space-x-2"
            >
              <Plus size={16} />
              <span>Agregar una mascota</span>
            </button>
          )}
        </div>
      </div>
      {currentItems.length > 0 ? (
        <>
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentItems.map((pet) => (
              <PetCard
                key={pet.id}
                id={pet.id}
                image={pet.photoUrl}
                name={pet.name}
                description={pet.description}
              />
            ))}
          </div>
          {allPets.length > 6 && (
            <div className="max-w-7xl mx-auto mt-16 flex flex-col sm:flex-row justify-between items-center gap-6">
              <div className="text-gray-600 text-sm sm:text-base">
                Mostrando {currentItems.length} de {allPets.length} mascotas
              </div>

              <div className="flex items-center gap-2 flex-wrap justify-center">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className={`flex items-center px-4 py-2 rounded-full ${
                    currentPage === 1
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-moradito text-white hover:bg-purple-700"
                  } transition-colors`}
                >
                  <ArrowLeft size={18} className="mr-2" />
                  Anterior
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => goToPage(i + 1)}
                      className={`w-10 h-10 rounded-full text-sm font-medium ${
                        currentPage === i + 1
                          ? "bg-moradito text-white"
                          : "bg-gray-200 hover:bg-gray-300"
                      } transition-colors`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className={`flex items-center px-4 py-2 rounded-full ${
                    currentPage === totalPages
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-moradito text-white hover:bg-purple-700"
                  } transition-colors`}
                >
                  Siguiente
                  <ArrowRight size={18} className="ml-2" />
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div
          className="max-w-3xl mx-auto mt-20 text-center py-12 bg-white rounded-xl shadow"
          style={{ backgroundImage: `url(${fondito})` }}
        >
          <h3 className="text-xl font-semibold text-gray-800">
            No se encontraron mascotas
          </h3>
          <p className="mt-2 text-gray-500">
            No hay mascotas disponibles con el filtro seleccionado.
          </p>
        </div>
      )}
    </div>
  );
}
