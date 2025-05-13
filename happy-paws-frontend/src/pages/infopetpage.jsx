import React from "react";
import Dogo from "../assets/dog1.png";
import {PawPrint, Syringe, Bug, CheckCircle, ArrowLeft} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function InfoPagePet() {
  const navigate = useNavigate();
  const pet = {
    name: "Tod",
    specie: "perro",
    breed: "loremlorem",
    age: "3 años (aprox.)",
    sex: "Masculino",
    size: "Pequeño",
    imageUrl: Dogo,
    description: `Dicen que parezco un peluche, pero soy muy real. Me encanta correr por el jardín, echarme al sol y observar todo con calma. A veces hago travesuras pequeñas, pero también sé quedarme quieto cuando hace falta. ¿Lo intentamos?`,
    history: `Un día me encontraron cerca del parque, parecía que estaba perdido. Me llevaron al refugio y desde entonces me han cuidado muy bien. Ahora solo me falta una familia con quien compartir todo el cariño que tengo guardado.`,
    status: {
      sterilized: true,
      vaccinated: true,
      dewormed: true,
      available: true,
    },
  };
  return (
    <div className="min-h-screen bg-amarillito p-6">
      <header className="flex items-center justify-between mb-2">
         <Link to="/mascotas">
          <ArrowLeft size={24} className="text-negrito cursor-pointer" />
        </Link>
      </header>
      <div className="flex justify-center items-baseline gap-2 mb-6">
        <h1 className="text-4xl font-bold text-azulito">{pet.name}</h1>
        <span className="text-lg text-azulito">({pet.specie})</span>
      </div>
      <div className="flex flex-col md:flex-row items-start gap-8 mb-2">
        <div className="w-60 h-70 bg-grisito rounded-2xl overflow-hidden">
          <img
            src={pet.imageUrl}
            alt={pet.name}
            className="w-full h-full object-cover"/>
        </div>
        <div className="flex-1 space-y-6">
          <h2 className="text-2xl font-light text-azulito">Sobre mí…</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-negrito">
            <div>
              <h3 className="font-bold text-azulito text-xl">Tamaño</h3>
              <p>{pet.size}</p>
            </div>
            <div>
              <h3 className="font-bold text-azulito text-xl">Género</h3>
              <p>{pet.sex}</p>
            </div>
            <div>
              <h3 className="font-bold text-azulito text-xl">Raza</h3>
              <p>{pet.breed}</p>
            </div>
            <div>
              <h3 className="font-bold text-azulito text-xl">Edad</h3>
              <p>{pet.age}</p>
            </div>
          </div>
          <div className="bg-rosadito p-4 rounded-xl text-negrito">
            <h3 className="font-bold text-azulito text-xl">Descripción</h3>
            <p className="text-sm leading-relaxed">{pet.description}</p>
          </div>
        </div>
      </div>
      <div className="bg-anaranjadito p-8 rounded-2xl mb-6 mx-auto max-w-3xl">
        <div className="grid grid-cols-4 gap-x-6 justify-items-center">
          <div className="flex flex-col items-center space-y-0.5">
            <PawPrint size={32}/>
            <span className="text-sm font-medium">Esterilizad@</span>
            <span className="text-xs">{pet.status.sterilized?"Sí":"No"}</span>
          </div>
          <div className="flex flex-col items-center space-y-0.5">
            <Syringe size={32}/>
            <span className="text-sm font-medium">Vacunad@</span>
            <span className="text-xs">{pet.status.vaccinated?"Sí":"No"}</span>
          </div>
          <div className="flex flex-col items-center space-y-0.5">
            <Bug size={32}/>
            <span className="text-sm font-medium">Desparasitad@</span>
            <span className="text-xs">{pet.status.dewormed?"Sí":"No"}</span>
          </div>
          <div className="flex flex-col items-center space-y-0.5">
            <CheckCircle size={32}/>
            <span className="text-sm font-medium">Disponible</span>
            <span className="text-xs">{pet.status.available?"Sí":"No"}</span>
          </div>
        </div>
      </div>
      <div className="px-16 mb-12">
        <h2 className="font-bold text-azulito text-xl mb-2">Historia</h2>
        <p className="text-negrito text-l leading-relaxed">{pet.history}</p>
      </div>
      <div className="text-center">
        <button
        onClick={() => navigate("/adoptform")} 
        className="px-8 py-3 bg-moradito text-negrito rounded-full font-medium hover:bg-purple-300 transition"> Adóptame → </button>
      </div>
    </div>
  );
}
