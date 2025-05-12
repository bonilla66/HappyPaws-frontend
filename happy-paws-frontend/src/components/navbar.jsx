import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/icon1.png'

export default function Navbar() {
  return (
    <nav className="bg-amarillito">
      <div className="container mx-auto px-0 flex items-center justify-between h-14">
        <div className="flex items-center space-x-2 pl-4">
          <img src={logo} alt="HappyPaws logo" className="w-8 h-8" />
          <span className="text-azulito font-bold text-xl">HappyPaws</span>
        </div>
        <ul className="hidden md:flex space-x-4 text-negrito text-lg">
          <li>
            <Link to="/mascotas" className="text-azulito">
              mascotas
            </Link>
          </li>
          <li>
            <Link to="/sobre-nosotros" className="text-azulito">
              sobre nosotros
            </Link>
          </li>
          <li>
            <Link to="/contactanos" className="text-azulito">
              contáctanos
            </Link>
          </li>
        </ul>

        <div className="pr-4">
            <Link to="/login" className="text-lg px-4 py-1.5 border border-azulito text-azulito font-medium rounded-full hover:bg-blue-300 hover:text-white transition">
                iniciar sesión
            </Link>
        </div>
      </div>
    </nav>
  )
}
