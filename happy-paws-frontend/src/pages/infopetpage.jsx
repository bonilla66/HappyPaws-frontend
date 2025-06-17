import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, PawPrint, Syringe, Bug, CheckCircle } from 'lucide-react';
import { fetchPetById } from '../services/petService';

export default function InfoPagePet() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const loadPet = async () => {
      setLoading(true);
      try {
        const rawPet = await fetchPetById(id, token);
        setPet(normalizePetData(rawPet));
      } catch (err) {
        setError(err.message || 'Error al cargar la mascota');
      } finally {
        setLoading(false);
      }
    };

    loadPet();
  }, [id, token, navigate]);

  function normalizePetData(rawPet) {
    return {
      id: rawPet.id,
      name: rawPet.name || 'Sin nombre',
      species: rawPet.species?.name || rawPet.species || 'Desconocido',
      breed: rawPet.breed?.name || rawPet.breed || 'Desconocido',
      gender:
        rawPet.gender === 'HEMBRA'
          ? 'Femenino'
          : rawPet.gender === 'MACHO'
          ? 'Masculino'
          : 'Desconocido',
      size: rawPet.size?.name || rawPet.size || 'Desconocido',
      age: rawPet.age
        ? `${Math.floor(rawPet.age / 12)} años y ${rawPet.age % 12} meses`
        : 'Edad no especificada',
      sterilized: rawPet.sterilized || false,
      vaccinated: rawPet.fullyVaccinated || false,
      dewormed: rawPet.parasiteFree || false,
      status: rawPet.status === 'DISPONIBLE',
      photoUrl: rawPet.photoUrl || '/default-pet.jpg',
      description: rawPet.description || 'Sin descripción disponible',
      history: rawPet.history || 'Sin historia disponible',
      entryDate: rawPet.entry_Date
        ? new Date(rawPet.entry_Date).toLocaleDateString()
        : 'Fecha desconocida',
    };
  }

  if (loading) return <div className="text-center py-12">Cargando mascota...</div>;
  if (error) return <div className="text-center py-12 text-red-500">{error}</div>;
  if (!pet) return <div className="text-center py-12">Mascota no encontrada</div>;



  return (
    <div className="min-h-screen max-h-screen overflow-y-auto bg-amarillito p-4 sm:p-6">
      <header className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigate(-1)}
          className="text-negrito flex items-center space-x-2"
        >
          <ArrowLeft size={24} />
          <span>Volver</span>
        </button>
      </header>
      <div className="flex justify-center items-baseline gap-2 mb-6 flex-wrap">
        <h1 className="text-3xl sm:text-4xl font-bold text-azulito">{pet.name}</h1>
        <span className="text-lg text-azulito">({pet.species})</span>
      </div>
      <div className="flex flex-col md:flex-row items-start gap-6 md:gap-10 mb-6">
        <div className="w-full md:w-64 aspect-square bg-grisito rounded-2xl overflow-hidden mx-auto md:mx-0">
          <img
            src={pet.photoUrl}
            alt={pet.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 space-y-6">
          <h2 className="text-2xl font-light text-azulito">Sobre mí…</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 text-negrito">
            <InfoItem title="Tamaño" value={pet.size} />
            <InfoItem title="Género" value={pet.gender} />
            <InfoItem title="Raza" value={pet.breed} />
            <InfoItem title="Edad" value={pet.age} />
          </div>
          <div className="bg-rosadito p-4 rounded-xl text-negrito">
            <h3 className="font-bold text-azulito text-xl mb-2">Descripción</h3>
            <p className="text-sm leading-relaxed">{pet.description}</p>
          </div>
        </div>
      </div>
      <div className="bg-anaranjadito p-6 rounded-2xl mb-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-4 justify-items-center">
          <MedicalItem icon={<PawPrint size={32} />} label="Esterilizad@" value={pet.sterilized} />
          <MedicalItem icon={<Syringe size={32} />} label="Vacunad@" value={pet.vaccinated} />
          <MedicalItem icon={<Bug size={32} />} label="Desparasitad@" value={pet.dewormed} />
          <MedicalItem icon={<CheckCircle size={32} />} label="Disponible" value={pet.status} />
        </div>
      </div>
      <div className="mb-12">
        <h2 className="font-bold text-azulito text-xl mb-2">Historia</h2>
        <p className="text-negrito text-base leading-relaxed">{pet.history}</p>
      </div>
      <div className="h-20 text-center mt-10">
        <button
          onClick={() => navigate('/adoptform')}
          className="px-8 py-3 bg-moradito text-negrito rounded-full font-medium hover:bg-purple-300 transition"
        >
          Adóptame →
        </button>
      </div>
    </div>
  );
}
const InfoItem = ({ title, value }) => (
  <div>
    <h3 className="font-bold text-azulito text-lg">{title}</h3>
    <p>{value}</p>
  </div>
);

const MedicalItem = ({ icon, label, value }) => (
  <div className="flex flex-col items-center space-y-1">
    {icon}
    <span className="text-sm font-medium">{label}</span>
    <span className="text-xs">{value ? 'Sí' : 'No'}</span>
  </div>
);
