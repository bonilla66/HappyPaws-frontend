import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/icon1.png";

export default function Navbar() {
  const user = null;
  // const user = { nombre: "Alejandro Ortega", rol: "Admin" };

  const firstName = user?.nombre.split(" ")[0];

  const settingsRoute =
    user?.rol === "Admin"
      ? "/adminpage"
      : user?.rol === "Colaborador"
      ? "/colaboradorpage"
      : "/profilepage";

  return (
    <nav className="bg-amarillito relative">
      <div className="container px-0 flex items-center justify-between h-14">
        <Link
          to="/"
          className="flex items-center space-x-2 pl-4 ml-2 cursor-pointer">
          <img src={logo} alt="HappyPaws logo" className="w-8 h-8" />
          <span className="text-azulito font-bold text-xl">HappyPaws</span>
        </Link>
        <ul className="hidden md:flex space-x-4 text-negrito text-lg">
          <li>
            <Link to="/mascotas" className="text-azulito">
              mascotas
            </Link>
          </li>
          <li>
            <Link to="/aboutus" className="text-azulito">
              sobre nosotros
            </Link>
          </li>
          <li>
            <Link to="/contactus" className="text-azulito">
              contáctanos
            </Link>
          </li>
        </ul>
        <div className="relative left-40 pr-4">
          {!user ? (
            <Link
              to="/login"
              className="text-lg px-4 py-1.5 border border-azulito text-azulito font-medium rounded-full hover:bg-blue-300 hover:text-white transition">
              Iniciar sesión
            </Link>
          ) : (
            <Link
              to={settingsRoute}
              className="text-lg px-4 py-1.5 border border-azulito text-azulito font-medium rounded-full hover:bg-blue-300 hover:text-white transition">
              {firstName}
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
