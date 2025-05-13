import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Landing     from "./pages/landingpage.jsx";
import MainLayout  from "./components/layouts/mainlayout.jsx";
import PetsPage    from "./pages/petspage.jsx";
import InfoPagePet from "./pages/infopetpage.jsx";
import LoginPage   from "./pages/login.jsx";
import SignUpPage  from "./pages/signup.jsx";
import AdoptionFormPage from "./pages/adoptpage.jsx"
import AboutUs from "./pages/aboutuspage.jsx";
import ContactPage from "./pages/contactpage.jsx";


export default function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index       element={<Landing     />} />
          <Route path="mascotas" element={<PetsPage    />} />
          <Route path="info"     element={<InfoPagePet />} />
          <Route path="adoptform" element={<AdoptionFormPage />} />
          <Route path="aboutus" element={<AboutUs />} />
          <Route path="contactus" element={<ContactPage />} />
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