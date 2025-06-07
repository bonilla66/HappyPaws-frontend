import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Fondito from "../assets/bannerHoriz.jpg";
import BannerImage from "../assets/Group5.png";
import { UseForm } from "../hooks/form";

export default function SignUpPage() {
  const initialValues = {
    nombre: "",
    dui: "",
    telefono: "",
    email: "",
    password: "",
    rol: "colaborador",
    terms: false,
  };
  const validate = (vals) => {
    if (!vals.nombre || !vals.dui || !vals.telefono || !vals.email || !vals.password)
      return "Por favor completa todos los campos";
    if (!vals.terms) return "Debes aceptar términos y condiciones";
    return null;
  };
  const onSubmit = () => toast.success("¡Cuenta creada exitosamente!");

  const { values, handleChange, handleSubmit } = UseForm(
    initialValues,
    validate,
    { showErrorToast: true }
  );

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${Fondito})` }}>
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="bg-amarillito backdrop-blur-sm max-w-6xl w-full rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row">
          <div className="md:w-1/2">
            <img
              src={BannerImage}
              alt="Banner mascotas"
              className="w-full h-full object-cover"/>
          </div>
          <div className="md:w-1/2 p-12 flex flex-col justify-center space-y-6">
            <h2 className="text-4xl font-bold text-azulito text-center">
              ¡Únete a la familia HappyPaws!
            </h2>
            <p className="text-negrito text-center">
              Crea tu cuenta y encuentra a tu compañero peludo
            </p>
            <form onSubmit={(e) => handleSubmit(e, onSubmit)} className="space-y-6">
              <div className="flex flex-col">
                <label className="mb-1 text-grisito">Nombre completo</label>
                <input
                  name="nombre"
                  value={values.nombre}
                  onChange={handleChange}
                  type="text"
                  className="w-full h-8 px-4 border border-grisito rounded-full focus:outline-none focus:ring-1 focus:ring-purple-300"/>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="mb-1 text-grisito">DUI</label>
                  <input
                    name="dui"
                    value={values.dui}
                    onChange={handleChange}
                    type="text"
                    className="w-full h-8 px-4 border border-grisito rounded-full focus:outline-none focus:ring-1 focus:ring-purple-300"/>
                </div>
                <div className="flex flex-col">
                  <label className="mb-1 text-grisito">Teléfono</label>
                  <input
                    name="telefono"
                    value={values.telefono}
                    onChange={handleChange}
                    type="text"
                    className="w-full h-8 px-4 border border-grisito rounded-full focus:outline-none focus:ring-1 focus:ring-purple-300"/>
                </div>
              </div>
              <div className="flex flex-col">
                <label className="mb-1 text-grisito">Correo electrónico</label>
                <input
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  type="email"
                  className="w-full h-8 px-4 border border-grisito rounded-full focus:outline-none focus:ring-1 focus:ring-purple-300"/>
              </div>
              <div className="flex flex-col">
                <label className="mb-1 text-grisito">Contraseña</label>
                <input
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  type="password"
                  className="w-full h-8 px-4 border border-grisito rounded-full focus:outline-none focus:ring-1 focus:ring-purple-300"/>
              </div>
              <label className="flex items-center space-x-2 text-sm">
                <input
                  name="terms"
                  type="checkbox"
                  checked={values.terms}
                  onChange={handleChange}
                  className="h-4 w-4 accent-black cursor-pointer"/>
                <span className="text-grisito">Acepto términos y condiciones</span>
              </label>
              <button
                type="submit"
                className="w-full py-4 bg-moradito text-negrito rounded-full font-medium hover:bg-purple-300 transition">
                Crear cuenta
              </button>
            </form>
            <p className="text-center text-sm text-negrito">
              ¿Ya tienes cuenta?{" "}
              <Link to="/login" className="text-azulito font-medium hover:underline">
                Inicia sesión aquí
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
