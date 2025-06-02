import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Categorie from './Categorie';

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/categorie/:nom" element={<Categorie />} />
      </Routes>
    </div>
  );
}