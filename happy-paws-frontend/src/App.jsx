import { Routes, Route } from 'react-router-dom';
import Landing from "./pages/landingpage.jsx"
import MainLayout from './components/layouts/mainlayout.jsx';
import PetsPage from "./pages/petspage.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Landing />} />
        <Route path="mascotas" element={<PetsPage />} />
        </Route>
    </Routes>
  )
}