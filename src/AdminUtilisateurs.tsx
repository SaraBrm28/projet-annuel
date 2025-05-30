import React, { useEffect, useState } from 'react';

interface Utilisateur {
  id_utilisateur: number;
  nom_utilisateur: string;
  email: string;
  role: string;
}

const AdminUtilisateurs = () => {
  const [utilisateurs, setUtilisateurs] = useState<Utilisateur[]>([]);
  const [filtre, setFiltre] = useState('');

  const fetchUtilisateurs = async () => {
    try {
      const res = await fetch('http://localhost/quizverse/api/get_all_users.php');
      const data = await res.json();
      setUtilisateurs(data);
    } catch (err) {
      console.error('Erreur chargement utilisateurs:', err);
    }
  };

  const supprimerUtilisateur = async (id: number) => {
    if (!window.confirm('Confirmer la suppression de cet utilisateur ?')) return;

    try {
      const res = await fetch('http://localhost/quizverse/api/supprimer_utilisateur.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();
      if (data.success) {
        setUtilisateurs(utilisateurs.filter(u => u.id_utilisateur !== id));
      } else {
        alert('Erreur : ' + data.error);
      }
    } catch (err) {
      console.error('Erreur suppression :', err);
    }
  };

  useEffect(() => {
    fetchUtilisateurs();
  }, []);

  const utilisateursFiltres = utilisateurs.filter(user =>
    user.nom_utilisateur.toLowerCase().includes(filtre.toLowerCase())
  );

  return (
    <div className="min-h-screen pl-10 pr-10 pt-28 px-6 text-white">
      <h1 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
        Gestion des Utilisateurs
      </h1>

      <input
        type="text"
        placeholder="🔍 Rechercher un utilisateur..."
        className="w-full max-w-md mb-6 p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary"
        value={filtre}
        onChange={(e) => setFiltre(e.target.value)}
      />

      <div className="overflow-x-auto rounded-xl border border-white/20 bg-white/5">
        <table className="w-full text-sm text-left text-white">
          <thead className="bg-white/10 border-b border-white/10 text-sm text-white uppercase">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Nom</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Rôle</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {utilisateursFiltres.map((u) => (
              <tr key={u.id_utilisateur} className="border-t border-white/10 hover:bg-white/5 transition">
                <td className="px-4 py-2">{u.id_utilisateur}</td>
                <td className="px-4 py-2">{u.nom_utilisateur}</td>
                <td className="px-4 py-2">{u.email}</td>
                <td className="px-4 py-2">{u.role}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => supprimerUtilisateur(u.id_utilisateur)}
                    className={`text-sm font-medium ${
                      u.role === 'admin'
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-red-400 hover:underline'
                    }`}
                    disabled={u.role === 'admin'}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUtilisateurs;
