import React from 'react'
import { Instagram, Facebook, Twitter } from 'lucide-react'
import logo from '../assets/icon1.png'
import fondito from "../assets/bannerHoriz.jpg"

export default function Footer() {
  return (
    <footer className="relative bg-cover bg-center text-azulito flex items-center justify-center"style={{ backgroundImage: `url(${fondito})` }}>
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between py-2 px-4">
        <div className="flex items-center space-x-2 relative -left-35">
          <img src={logo} alt="HappyPaws logo" className="w-8 h-8" />
          <span className="text-azulito font-semibold text-lg">HappyPaws</span>
        </div>
        <div className="mt-4 md:mt-0 text-lg relative -left-5">
          <ul className="flex space-x-6 text-azulito">
            <li>
              <a href="/aboutus" className="hover:underline">
                sobre nosotros
              </a>
            </li>
            <li>
              <a href="/contactus" className="hover:underline">
                contáctanos
              </a>
            </li>
          </ul>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-4 text-azulito relative left-35">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-azulito">
            <Instagram size={20} />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-azulito">
            <Facebook size={20} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-azulito">
            <Twitter size={20} />
          </a>
        </div>
      </div>
    </footer>
  )
}