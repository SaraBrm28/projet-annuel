import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './components/Button';
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
    <div className="min-h-screen pt-28 px-6 text-white">
      <h1 className="text-4xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-pink-600">
        Mon profil
      </h1>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profil utilisateur */}
        <div className="bg-white/10 p-6 rounded-xl glass-morphism-three backdrop-blur-md border border-white/20">
          <h2 className="text-2xl font-semibold mb-4">Mon profil</h2>
          <p className='pb-8 pt-3'><strong> Mon ID :</strong> {idUtilisateur}</p>
          <p className='pb-8'><strong>Nom d'utilisateur :</strong> {nomUtilisateur}</p>
          <p><strong>Email :</strong> {email}</p>
        </div>

        {/* Derniers quiz joués */}
        <div className=" p-8 rounded-2xl glass-morphism-four   border border-white/20 lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Derniers quiz joués</h2>
          {dernierScores.length === 0 ? (
            <p className="text-white/80">Aucun quiz joué récemment.</p>
          ) : (
            <ul className="space-y-3">
              {dernierScores.map((quiz, i) => (
                <li key={i} className="text-sm text-white bg-white/10 p-3 rounded-2xl border border-white/30">
                  <p><strong>{quiz.titre}</strong> ({quiz.categorie})</p>
                  <p>Score : {quiz.score}/100</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Certificats */}
        <div className="bg-white/10 p-6 rounded-xl  backdrop-blur-md glass-morphism-two border border-white/20">
          <h2 className="text-xl font-semibold mb-4">Mon Classement</h2>
          <p className="text-white/80">📜 En cours de développement...</p>
        </div>

        {/* Quiz favoris */}
        <div className="bg-white/10 p-6 rounded-xl glass-morphism-two backdrop-blur-md border border-white/20">
          <h2 className="text-xl font-semibold mb-4">Quiz favoris</h2>
          <p className="text-white/80">🌟 Bientôt tu pourras retrouver tes quiz préférés ici.</p>
        </div>
             
        {/* Mes commentaires */}
        <div className="bg-white/10 p-6 rounded-xl glass-morphism-three backdrop-blur-md border border-white/20 lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Mes commentaires</h2>
          {commentaires.length === 0 ? (
            <p className="text-white/60">Tu n'as pas encore publié de commentaire.</p>
          ) : (
            <ul className="space-y-3 text-sm">
              {commentaires.map((c, i) => (
                <li key={i} className="bg-white/10 p-3 rounded border border-white/10">
                  <p className="text-white">{c.texte}</p>
                  <p className="text-white/60 text-xs mt-1">
                    Quiz #{c.id_quiz} — {new Date(c.date_commentaire).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          )}
          
        </div>
        {role === 'admin' && (
  <div className="bg-white/10 p-6 rounded-xl glass-morphism-four border border-white/20 lg:col-span-2">
    <h2 className="text-xl font-semibold mb-4">Panel Administrateur</h2>
    <p className="text-white/80 mb-4">Accède à l'espace d'administration pour gérer la plateforme.</p>
    <button
      onClick={() => navigate('/admin-panel')}
      className="px-6 py-2 bg-gradient-to-r from-primary to-third rounded-full font-semibold hover:scale-105 transition-transform"
    >
      Accéder au panneau admin
    </button>
  </div>
)}

        {/* Bouton déconnexion */}
        <div className="lg:col-span-1">
  <div className="relative group w-fit mx-auto">
    <div className="absolute inset-0 bg-gradient-to-r from-third to-primary rounded-full blur opacity-250 group-hover:opacity-100 transition"></div>
    <Button variant="primary" onClick={handleLogout}>Me déconnecter</Button>
  </div>
</div>
        
        </div>
     </div>
      
  );
};

export default MonCompte;
