import React from 'react'
import { ArrowRight } from 'lucide-react'
import { Link }       from 'react-router-dom'

export default function PetCard({ id, image, name, description }) {
  return (
    <div className="flex bg-rosadito rounded-[24px] shadow-2xl max-w-md w-full h-52 mx-auto overflow-hidden">
      <div className="bg-rosadito p-2 rounded-2xl flex items-center justify-center flex-shrink-0 w-44 h-48">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>
      <div className="p-6 flex flex-col items-center text-center flex-1 overflow-hidden">
        <h3 className="text-2xl font-bold text-negrito truncate">
          {name}
        </h3>
          <p className="text-sm text-negrito flex-1">
           {description || 'Descripción no disponible'}
          </p>
        <Link
          to={`/mascotas/${id}`}
          state={{ id, image, name, description }}
          className="mt-4 inline-flex items-center space-x-2 px-4 py-2 bg-azulito text-blanquito font-medium rounded-full hover:bg-blue-300 transition-colors duration-200">
          <span>Ver más</span>
          <ArrowRight size={16} />
        </Link>
        
      </div>
    </div>
  )
}

