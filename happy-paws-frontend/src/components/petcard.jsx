import React from 'react'
import { ArrowRight } from 'lucide-react'

export default function PetCard({ image, name, description, onClick }) {
  return (
    <div className="flex bg-rosadito rounded-[24px] shadow-lg max-w-md w-full h-52 mx-auto overflow-hidden">
      <div className="bg-rosadito p-2 rounded-2xl flex items-center justify-centerflex-shrink-0 w-45 h-50">
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
        <p className="mt-2 text-sm text-negrito overflow-auto max-h-20">
          {description}
        </p>
        <button
          onClick={onClick}
          className="mt-4 inline-flex items-center space-x-2 px-4 py-2 bg-azulito text-blanquito font-medium rounded-full hover:bg-blue-300 transition-colors duration-200">
          <span>Ver más</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  )
}

