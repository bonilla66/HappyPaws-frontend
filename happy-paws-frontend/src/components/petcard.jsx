import React from 'react'
import { ArrowRight, Edit3 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function PetCard({ id, image, name, description }) {
  const { user } = useAuth()
  const navigate = useNavigate()
  const canEdit = user?.rol === 'ADMIN' || user?.rol === 'COLABORADOR'

  return (
    <div className="relative flex bg-rosadito rounded-[24px] max-w-md w-full h-52 mx-auto overflow-hidden hover:-translate-y-1 + scale shadow-lg">
      {canEdit && (
        <button
        aria-label="Editar mascota"
          onClick={() =>
            navigate('/editpet', {
              state: { id, image, name, description },
            })
          }
          className="absolute top-2 right-2 p-2 rounded-full bg-amarillito hover:bg-yellow-100 transition-colors duration-200 cursor-pointer"
        >
          <Edit3 size={18} className="text-negrito" />
        </button>
      )}

      <div className="bg-rosadito p-2 rounded-2xl flex items-center justify-center flex-shrink-0 w-44 h-48">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>

      <div className="p-6 flex flex-col items-center text-center flex-1 overflow-hidden">
        <h3 className="text-2xl font-bold text-negrito truncate ">
          {name}
        </h3>
        <p className="text-sm text-negrito flex-1">
          {description || 'Descripción no disponible'}
        </p>
        <Link
          to={`/mascotas/${id}`}
          state={{ id, image, name, description }}
          className="mt-4 inline-flex items-center space-x-2 px-4 py-2 bg-azulito text-blanquito font-medium rounded-full hover:bg-blue-300 transition-colors duration-200"
        >
          <span>Ver más</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  )
}
