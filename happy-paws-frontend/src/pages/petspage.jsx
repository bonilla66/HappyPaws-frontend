import React from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import usePagination from '../hooks/pagination.js'
import PetCard       from '../components/petcard.jsx'
import Dogo          from '../assets/dog1.png'


const pets = [
  { id: 1, name: 'Tod',  image: Dogo, description: 'Dicen que parezco un peluche… pero soy muy real. Me encanta correr por el jardín.' },
  { id: 1, name: 'Tod',  image: Dogo, description: 'Dicen que parezco un peluche… pero soy muy real. Me encanta correr por el jardín.' },
  { id: 1, name: 'Tod',  image: Dogo, description: 'Dicen que parezco un peluche… pero soy muy real. Me encanta correr por el jardín.' },
  { id: 1, name: 'Tod',  image: Dogo, description: 'Dicen que parezco un peluche… pero soy muy real. Me encanta correr por el jardín.' },
  { id: 1, name: 'Tod',  image: Dogo, description: 'Dicen que parezco un peluche… pero soy muy real. Me encanta correr por el jardín.' },
  { id: 1, name: 'Tod',  image: Dogo, description: 'Dicen que parezco un peluche… pero soy muy real. Me encanta correr por el jardín.' },
  { id: 1, name: 'Tod',  image: Dogo, description: 'Dicen que parezco un peluche… pero soy muy real. Me encanta correr por el jardín.' },
  { id: 1, name: 'Tod',  image: Dogo, description: 'Dicen que parezco un peluche… pero soy muy real. Me encanta correr por el jardín.' },
  { id: 1, name: 'Tod',  image: Dogo, description: 'Dicen que parezco un peluche… pero soy muy real. Me encanta correr por el jardín.' },
  { id: 1, name: 'Tod',  image: Dogo, description: 'Dicen que parezco un peluche… pero soy muy real. Me encanta correr por el jardín.' },
  { id: 1, name: 'Tod',  image: Dogo, description: 'Dicen que parezco un peluche… pero soy muy real. Me encanta correr por el jardín.' },
  { id: 1, name: 'Tod',  image: Dogo, description: 'Dicen que parezco un peluche… pero soy muy real. Me encanta correr por el jardín.' },
  { id: 1, name: 'Tod',  image: Dogo, description: 'Dicen que parezco un peluche… pero soy muy real. Me encanta correr por el jardín.' },
  { id: 1, name: 'Tod',  image: Dogo, description: 'Dicen que parezco un peluche… pero soy muy real. Me encanta correr por el jardín.' },
  { id: 1, name: 'Tod',  image: Dogo, description: 'Dicen que parezco un peluche… pero soy muy real. Me encanta correr por el jardín.' },
  { id: 1, name: 'Tod',  image: Dogo, description: 'Dicen que parezco un peluche… pero soy muy real. Me encanta correr por el jardín.' },
  { id: 1, name: 'Tod',  image: Dogo, description: 'Dicen que parezco un peluche… pero soy muy real. Me encanta correr por el jardín.' },
  { id: 1, name: 'Tod',  image: Dogo, description: 'Dicen que parezco un peluche… pero soy muy real. Me encanta correr por el jardín.' },
  { id: 1, name: 'Tod',  image: Dogo, description: 'Dicen que parezco un peluche… pero soy muy real. Me encanta correr por el jardín.' },
  { id: 1, name: 'Tod',  image: Dogo, description: 'Dicen que parezco un peluche… pero soy muy real. Me encanta correr por el jardín.' },
  { id: 1, name: 'Tod',  image: Dogo, description: 'Dicen que parezco un peluche… pero soy muy real. Me encanta correr por el jardín.' },
  { id: 1, name: 'Tod',  image: Dogo, description: 'Dicen que parezco un peluche… pero soy muy real. Me encanta correr por el jardín.' },
  { id: 1, name: 'Tod',  image: Dogo, description: 'Dicen que parezco un peluche… pero soy muy real. Me encanta correr por el jardín.' },
  { id: 1, name: 'Tod',  image: Dogo, description: 'Dicen que parezco un peluche… pero soy muy real. Me encanta correr por el jardín.' }
]

export default function PetsPage() {
  const { page, totalPages, currentItems, nextPage, prevPage } =
    usePagination(pets, 9)

  return (
    <div className="flex flex-col h-full bg-amarillito w-full">
      <div className="px-4 pt-6 pb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 auto-rows-min gap-6">
        {currentItems.map(pet => (
          <PetCard
            id={pet.id} 
            key={pet.id}
            image={pet.image}
            name={pet.name}
            description={pet.description}
          />
        ))}
      </div>
      <div className="mt-auto px-4 pb-6 flex justify-center space-x-4">
        {page > 1 && (
          <button
            onClick={prevPage}
            className="inline-flex items-center space-x-2 px-8 py-3 bg-moradito text-negrito font-medium rounded-full hover:bg-purple-300 hover:text-white transition-colors duration-200">
            <ArrowLeft size={16} />
            <span>Regresar</span>
          </button>
        )}
        {pets.length > 9 && page < totalPages && (
          <button
            onClick={nextPage}
            className="inline-flex items-center space-x-2 px-8 py-3 bg-moradito text-negrito font-medium rounded-full hover:bg-purple-300 hover:text-white transition-colors duration-200">
            <span>Cargar más</span>
            <ArrowRight size={16} />
          </button>
        )}
      </div>
    </div>
  )
}
