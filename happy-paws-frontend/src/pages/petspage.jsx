import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import PetCard from '../components/petcard.jsx';
import { fetchAllPets } from '../services/petService.js';

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-64">
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
    nextPage: () => setCurrentPage(prev => Math.min(prev + 1, totalPages)),
    prevPage: () => setCurrentPage(prev => Math.max(prev - 1, 1)),
    goToPage: (page) => setCurrentPage(Math.max(1, Math.min(page, totalPages)))
  };
};

export default function PetsPage() {
  const [allPets, setAllPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('DISPONIBLE');
  
  useEffect(() => {
    const loadPets = async () => {
      try {
        setLoading(true);
        const petsData = await fetchAllPets(statusFilter);
        setAllPets(petsData);
      } catch (err) {
        console.error('Error loading pets:', err);
        setError(err.message || 'Error al cargar las mascotas');
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
    goToPage 
  } = usePagination(allPets);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="min-h-screen overflow-auto bg-amarillito px-4 py-6 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Peluditos buscando hogar</h1>
        
        <div className="flex items-center gap-3">
          <label className="text-gray-700 font-medium">Filtrar por:</label>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              goToPage(1); 
            }}
            className="px-3 py-2 border border-gray-300 rounded-md bg-white shadow-sm focus:ring-moradito focus:border-moradito"
          >
            <option value="DISPONIBLE">Disponibles</option>
            <option value="ADOPTADO">Adoptados</option>
            <option value="">Todos</option>
          </select>
        </div>
      </div>
      {currentItems.length > 0 ? (
        <>
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentItems.map(pet => (
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
            <div className="max-w-7xl mx-auto mt-12 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-gray-600 text-sm sm:text-base">
                Mostrando {currentItems.length} de {allPets.length} mascotas
              </div>
              
              <div className="flex items-center gap-2 flex-wrap justify-center">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className={`flex items-center px-4 py-2 rounded-full ${
                    currentPage === 1 
                      ? 'bg-gray-300 cursor-not-allowed' 
                      : 'bg-moradito text-white hover:bg-purple-700'
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
                          ? 'bg-moradito text-white' 
                          : 'bg-gray-200 hover:bg-gray-300'
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
                      ? 'bg-gray-300 cursor-not-allowed' 
                      : 'bg-moradito text-white hover:bg-purple-700'
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
        <div className="max-w-3xl mx-auto mt-20 text-center py-12 bg-white rounded-xl shadow">
          <h3 className="text-xl font-semibold text-gray-800">No se encontraron mascotas</h3>
          <p className="mt-2 text-gray-500">No hay mascotas disponibles con el filtro seleccionado.</p>
        </div>
      )}
    </div>
  );
}
