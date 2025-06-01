
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './components/Button';
import { BorderBeam } from './components/magicui/border-beam'; // adapte le chemin si besoin
import ShadowBlue from './components/ShadowBlue';

interface Commentaire {
  texte: string;
  date_commentaire: string;
  id_quiz: number;
}

interface DernierScore {
  titre: string;
  categorie: string;
  score: number;
}

const MonCompte = () => {
  const nomUtilisateur = localStorage.getItem('nom_utilisateur');
  const idUtilisateur = localStorage.getItem('id_utilisateur');
  const email = localStorage.getItem('email') || 'email@example.com';
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const [commentaires, setCommentaires] = useState<Commentaire[]>([]);
  const [dernierScores, setDernierScores] = useState<DernierScore[]>([]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/Connexion');
    window.location.reload();
  };

  useEffect(() => {
    const fetchCommentaires = async () => {
      try {
        const res = await fetch(`http://localhost/quizverse/api/get_user_comments.php?id_utilisateur=${idUtilisateur}`);
        const data = await res.json();
        setCommentaires(data);
      } catch (err) {
        console.error("Erreur chargement commentaires:", err);
      }
    };

    const fetchDerniersQuiz = async () => {
      try {
        const res = await fetch(`http://localhost/quizverse/api/get_last_scores.php?id_utilisateur=${idUtilisateur}`);
        const data = await res.json();
        setDernierScores(data);
      } catch (err) {
        console.error("Erreur chargement scores:", err);
      }
    };

    if (idUtilisateur) {
      fetchCommentaires();
      fetchDerniersQuiz();
    }
  }, [idUtilisateur]);

  return (
    <div className="min-h-screen pt-28 px-6 text-white ">
      <h1 className="text-4xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">
        Mon profil
      </h1>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profil utilisateur */}
        <div className="relative p-6 rounded-xl border glass-morphism-five border-slate-600 bg-black">
          <BorderBeam />
          <h2 className="text-2xl font-semibold mb-4">Mon profil</h2>
          <p className="pb-6"><strong>Mon ID :</strong> {idUtilisateur}</p>
          <p className="pb-6"><strong>Nom d'utilisateur :</strong> {nomUtilisateur}</p>
          <p><strong>Email :</strong> {email}</p>
        </div>

        {/* Derniers quiz joués */}
        <div className="relative p-6 rounded-xl border border-slate-700 glass-morphism-five bg-black lg:col-span-2">
          <BorderBeam />
          <h2 className="text-xl font-semibold mb-4">Derniers quiz joués</h2>
          {dernierScores.length === 0 ? (
            <p className="text-gray-600">Aucun quiz joué récemment.</p>
          ) : (
            <ul className="space-y-3">
              {dernierScores.map((quiz, i) => (
                <li key={i} className="text-sm bg-gray-900 p-3 rounded-lg border  border-slate-900">
                  <p><strong>{quiz.titre}</strong> ({quiz.categorie})</p>
                  <p>Score : {quiz.score}/100</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Classement */}
        <div className="relative p-6 rounded-xl border glass-morphism-five border-slate-700 bg-black">
          <BorderBeam />
          <h2 className="text-xl font-semibold mb-4">Mon Classement</h2>
          <p className="text-gray-600">📜 En cours de développement...</p>
        </div>

        {/* Quiz favoris */}
        <div className="relative p-6 rounded-xl border glass-morphism-five border-slate-700 bg-black">
          <BorderBeam />
          <h2 className="text-xl font-semibold mb-4">Quiz favoris</h2>
          <p className="text-gray-600">🌟 Tu pourras bientôt retrouver tes quiz préférés ici.</p>
        </div>

        {/* Mes commentaires */}
        <div className="relative p-6 rounded-xl border glass-morphism-five border-slate-700 bg-black lg:col-span-2">
          <BorderBeam />
          <h2 className="text-xl font-semibold mb-4">Mes commentaires</h2>
          {commentaires.length === 0 ? (
            <p className="text-gray-600">Tu n'as pas encore publié de commentaire.</p>
          ) : (
            <ul className="space-y-3 text-sm">
              {commentaires.map((c, i) => (
                <li key={i} className="bg-gray-900 p-3 rounded border border-gray-800">
                  <p>{c.texte}</p>
                  <p className="text-gray-500 text-xs mt-1">
                    Quiz #{c.id_quiz} — {new Date(c.date_commentaire).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Panel admin */}
        {role === 'admin' && (
          <div className="relative p-6 rounded-xl border border-slate-700 bg-black lg:col-span-2">
            <BorderBeam />
            <h2 className="text-xl font-semibold mb-4">Panel Administrateur</h2>
            <p className="text-gray-700 mb-4">Accède à l'espace d'administration pour gérer la plateforme.</p>
            <button
              onClick={() => navigate('/admin-panel')}
              className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold hover:scale-105 transition-transform"
            >
              Accéder au panneau admin
            </button>
          </div>
        )}
         <ShadowBlue left="10%" top="20%" leftMd="15%" topMd="10%" leftLg="80%" topLg="65%" />
     
        {/* Déconnexion */}
        <div className="lg:col-span-1">
          <div className="relative group w-fit mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-third rounded-full blur opacity-250 group-hover:opacity-100 transition"></div>
            <Button variant="primary" onClick={handleLogout}>Me déconnecter</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonCompte;
