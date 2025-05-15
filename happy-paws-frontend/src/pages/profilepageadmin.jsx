import React, { useState } from "react";
import { UserRound, MoreHorizontal, Mail, Phone, IdCard } from "lucide-react";

export default function ProfilePageAdmin() {
    const [editing, setEditing] = useState(false);
    const [formValues, setFormValues] = useState({
        nombre: "Alejandro Ortega",
        rol: "Adoptante",
        correo: "alejandroortega@email.com",
        telefono: "77778888",
        dui: "12345678-9",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues(v => ({ ...v, [name]: value }));
    };

    //se lo pedi a chatxd
    const solicitudes = [...Array(10)].map((_, i) => ({
        mascota: `Mascota ${i+1}`,
        fecha: `2025-05-${(i+1).toString().padStart(2, '0')}`,
        estado: i % 2 === 0 ? 'Pendiente' : 'Completada',
        sexo: i % 2 === 0 ? 'Macho' : 'Hembra',
        tipo: i % 2 === 0 ? 'Perro' : 'Gato',
    }));
    const historial = [...Array(8)].map((_, i) => ({
        mascota: `Adoptado ${i+1}`,
        fecha: `2024-0${(i%9)+1}-15`,
        sexo: i % 2 === 0 ? 'Macho' : 'Hembra',
        tipo: i % 2 === 0 ? 'Perro' : 'Gato',
    }));

    return (
        <div className="min-h-screen bg-amarillito p-6">
            <h1 className="text-3xl font-light text-azulito mb-6">Información de mi perfil</h1>
            <div className="flex gap-8">
                <div className="w-2/5 relative border-r border-grisito pr-6">
                    <button
                        onClick={() => setEditing(e => !e)}
                        className="absolute top-4 right-4 text-negrito hover:text-grisito cursor-pointer">
                        <MoreHorizontal size={24} />
                    </button>
                    <div className="flex items-center gap-4 mb-4 mt-6">
                        <UserRound size={120} className="text-negrito" />
                        <div>
                            {editing ? (
                                <input
                                    type="text"
                                    name="nombre"
                                    value={formValues.nombre}
                                    onChange={handleChange}
                                    className="w-full border-b border-grisito focus:outline-none"
                                />
                            ) : (
                                <h2 className="text-2xl font-semibold text-negrito mb-1">{formValues.nombre}</h2>
                            )}
                            <p className="text-grisito capitalize">{formValues.rol}</p>
                        </div>
                    </div>
                    <div className="space-y-6 mb-6">
                        <div>
                            <h3 className="text-2xl font-semibold mt-12"> Información personal</h3>
                            <div className="flex items-center gap-2 mb-1 mt-4">
                                <Mail size={30} className="text-grisito" />
                                <span className="text-grisito text-xl">Correo:</span>
                            </div>
                            {editing ? (
                                <input
                                    type="email"
                                    name="correo"
                                    value={formValues.correo}
                                    onChange={handleChange}
                                    className=" w-full border-b border-grisito focus:outline-none"
                                />
                            ) : (
                                <p className="text-xl text-negrito">{formValues.correo}</p>
                            )}
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <Phone size={30} className="text-grisito" />
                                <span className="text-grisito text-xl">Teléfono:</span>
                            </div>
                            {editing ? (
                                <input
                                    type="text"
                                    name="telefono"
                                    value={formValues.telefono}
                                    onChange={handleChange}
                                    className="w-full border-b border-grisito focus:outline-none"
                                />
                            ) : (
                                <p className="text-negrito text-xl">{formValues.telefono}</p>
                            )}
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <IdCard size={30} className="text-grisito" />
                                <span className="text-grisito text-xl">DUI:</span>
                            </div>
                            {editing ? (
                                <input
                                    type="text"
                                    name="dui"
                                    value={formValues.dui}
                                    onChange={handleChange}
                                    className="w-full border-b border-grisito focus:outline-none"/>
                            ) : (
                                <p className="text-xl text-negrito">{formValues.dui}</p>
                            )}
                        </div>
                    </div>
                    <button className="text-negrito border border-grisito rounded-full px-4 py-1 text-sm hover:bg-grisito transition relative left-120">
                        Cerrar sesión
                    </button>
                </div>
                 <div className="flex-1 space-y-6">
                    <div className="p-6">
                        <h3 className="text-xl font-semibold text-negrito mb-2">Solicitudes</h3>
                        <table className="w-full table-fixed">
                            <thead>
                                <tr className="border-b border-grisito">
                                    <th className="px-4 py-2 text-grisito text-xl text-center sticky top-0 ">Mascota</th>
                                    <th className="px-4 py-2 text-grisito text-xl text-center sticky top-0 ">Fecha emitida</th>
                                    <th className="px-4 py-2 text-grisito text-xl text-center sticky top-0 ">Estado</th>
                                    <th className="px-4 py-2 text-grisito text-xl text-center sticky top-0 ">Sexo</th>
                                    <th className="px-4 py-2 text-grisito text-xl text-center sticky top-0 ">Tipo</th>
                                </tr>
                            </thead>
                        </table>
                        <div className="max-h-[250px] overflow-y-auto">
                            <table className="w-full table-fixed">
                                <tbody className="divide-y divide-grisito">
                                    {solicitudes.map((row, i) => (
                                        <tr key={i}>
                                            <td className="px-4 py-2 text-center">{row.mascota}</td>
                                            <td className="px-4 py-2 text-center">{row.fecha}</td>
                                            <td className="px-4 py-2 text-center">{row.estado}</td>
                                            <td className="px-4 py-2 text-center">{row.sexo}</td>
                                            <td className="px-4 py-2 text-center">{row.tipo}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="p-6">
                        <h3 className="text-xl font-semibold text-negrito mb-2">Historial de adopciones</h3>
                        <table className="w-full table-fixed">
                            <thead>
                                <tr className="border-b border-grisito">
                                    <th className="px-4 py-2 text-grisito text-xl text-center sticky top-0 ">Mascota</th>
                                    <th className="px-4 py-2 text-grisito text-xl text-center sticky top-0 ">Fecha emitida</th>
                                    <th className="px-4 py-2 text-grisito text-xl text-center sticky top-0 ">Sexo</th>
                                    <th className="px-4 py-2 text-grisito text-xl text-center sticky top-0 ">Tipo</th>
                                </tr>
                            </thead>
                        </table>
                        <div className="max-h-[250px] overflow-y-auto">
                            <table className="w-full table-fixed">
                                <tbody className="divide-y divide-grisito">
                                    {historial.map((row, i) => (
                                        <tr key={i}>
                                            <td className="px-4 py-2 text-center">{row.mascota}</td>
                                            <td className="px-4 py-2 text-center">{row.fecha}</td>
                                            <td className="px-4 py-2 text-center">{row.sexo}</td>
                                            <td className="px-4 py-2 text-center">{row.tipo}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    </div>
            </div>
        </div>
    );
}
