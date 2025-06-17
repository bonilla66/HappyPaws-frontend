import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainLayout            from "./components/layouts/mainlayout.jsx";
import Landing               from "./pages/landingpage.jsx";
import PetsPage              from "./pages/petspage.jsx";
import InfoPagePet           from "./pages/infopetpage.jsx";
import AdoptionFormPage      from "./pages/adoptpage.jsx";
import AboutUs               from "./pages/aboutuspage.jsx";
import ContactPage           from "./pages/contactpage.jsx";
import LoginPage             from "./pages/login.jsx";
import SignUpPage            from "./pages/signup.jsx";
import ProfilePage           from "./pages/profilepage.jsx";
import AdminPage             from "./pages/adminpage.jsx";
import ColaboradorPage       from "./pages/colaboradorpage.jsx";
import AddPetForm            from "./pages/addpetform.jsx";
import UserSettingPage       from "./pages/userssettingpage.jsx";
import SolicitudSettingPage  from "./pages/solicitudsettingpage.jsx";
import PetSettingPage        from "./pages/petsettingpage.jsx";
import ShelterAttribute from "./pages/shelterattributepage.jsx";
import { useAuth } from "./context/AuthContext";


export default function App() {
    const { loading } = useAuth();

    if (loading) {
      return <div className="text-center mt-20 text-xl text-gray-600">Cargando sesión...</div>;
    }
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index                    element={<Landing               />} />
          <Route path="mascotas"          element={<PetsPage              />} />
          <Route path="info"              element={<InfoPagePet           />} />
          <Route path="adoptform"         element={<AdoptionFormPage      />} />
          <Route path="aboutus"           element={<AboutUs               />} />
          <Route path="contactus"         element={<ContactPage           />} />
          <Route path="profilepage"       element={<ProfilePage           />} />
          <Route path="adminpage"         element={<AdminPage             />} />
          <Route path="colaboradorpage"   element={<ColaboradorPage       />} />
          <Route path="addpetform"        element={<AddPetForm            />} />
          <Route path="usersetting/:id"       element={<UserSettingPage       />} />
          <Route path="solisetting/:id"      element={<SolicitudSettingPage  />} />
          <Route path="petsetting/:id"        element={<PetSettingPage        />} />
          <Route path="dashboard"         element={<ShelterAttribute/>}/>
        </Route>
        <Route path="login"  element={<LoginPage  />} />
        <Route path="signup" element={<SignUpPage />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        pauseOnHover
      />
    </>
  );
}
