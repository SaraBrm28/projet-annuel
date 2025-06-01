import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Neon } from './components/magicui/neon'; 

const AdminPanel = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'admin') {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen pt-28 px-6 text-white">
      <h1 className="text-4xl font-bold text-center mb-[200px] text-transparent bg-clip-text bg-gradient-to-r from-primary to-third">
        Panneau d'administration
      </h1>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
       
        <Neon className="h-full">
          <div className="flex flex-col h-full justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-4 text-black">Gérer les utilisateurs</h2>
              <p className="text-black/80 text-sm"> consulte , supprime des comptes utilisateurs.</p>
            </div>
            <button
              onClick={() => navigate('/admin/utilisateurs')}
              className="mt-6 px-4 py-2 hover:bg-gray-600 transition bg-black text-white rounded-full  "
            >
              Accéder
            </button>
          </div>
        </Neon>

        {/* Carte 2 */}
        <Neon className="h-full">
          <div className="flex flex-col h-full justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-4 text-black">Gérer les quiz</h2>
              <p className="text-black/80 text-sm">supprimer, modifier les quiz disponibles sur la plateforme.</p>
            </div>
            <button
              onClick={() => navigate('/admin/quiz')}
              className="mt-6 px-4 py-2 bg-black text-white rounded-full hover:bg-gray-600 transition"
            >
              Accéder
            </button>
          </div>
        </Neon>

        {/* Carte 3 */}
        <Neon className="h-full">
          <div className="flex flex-col h-full justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-4 text-black">Gérer les commentaires</h2>
              <p className="text-black/80 text-sm">Modère les commentaires postés par les utilisateurs.</p>
            </div>
            <button
              onClick={() => navigate('/admin/commentaires')}
              className="mt-6 px-4 py-2 bg-black text-white rounded-full hover:bg-gray-600 transition"
            >
              Accéder
            </button>
          </div>
        </Neon>
      </div>
    </div>
  );
};

export default AdminPanel;
