import React, { useEffect, useState } from 'react';
import ShadowBlue from './components/ShadowBlue';
interface Commentaire {
  id: number;
  contenu: string;
  auteur: string;
  date: string;
  cible: string; // quiz ou sujet forum
}

const AdminCommentaires = () => {
  const [quizCommentaires, setQuizCommentaires] = useState<Commentaire[]>([]);
  const [forumCommentaires, setForumCommentaires] = useState<Commentaire[]>([]);
  const [filtreQuiz, setFiltreQuiz] = useState('');
  const [filtreForum, setFiltreForum] = useState('');

  useEffect(() => {
    fetch('http://localhost/quizverse/api/admin_get_commentaires_quiz.php')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setQuizCommentaires(data);
        else console.error("Quiz commentaires non valides :", data);
      });

    fetch('http://localhost/quizverse/api/admin_get_commentaires_forum.php')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setForumCommentaires(data);
        else console.error("Forum commentaires non valides :", data);
      });
  }, []);

  const supprimerCommentaire = async (id: number, type: 'quiz' | 'forum') => {
    if (!confirm("Supprimer ce commentaire ?")) return;

    const res = await fetch(`http://localhost/quizverse/api/admin_supprimer_commentaire_${type}.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });

    const data = await res.json();
    if (data.success) {
      if (type === 'quiz') setQuizCommentaires(c => c.filter(com => com.id !== id));
      else setForumCommentaires(c => c.filter(com => com.id !== id));
    } else {
      alert(data.error || "Erreur suppression");
    }
  };

  const commentairesFiltres = (liste: Commentaire[], filtre: string) => {
    if (!Array.isArray(liste)) return [];
    return liste.filter(c =>
      c.contenu.toLowerCase().includes(filtre.toLowerCase()) ||
      c.cible.toLowerCase().includes(filtre.toLowerCase())
    );
  };

  return (
    <div className="pt-28 px-6 text-white flex flex-col md:flex-row gap-6">
      {/* Commentaires quiz */}
      <div className="w-full md:w-1/2 bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/70">
        <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
          Commentaires des Quiz
        </h2>
        <input
          className="w-full mb-4 p-2 rounded-xl bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Rechercher un commentaire ou quiz..."
          value={filtreQuiz}
          onChange={e => setFiltreQuiz(e.target.value)}
        />
        <ul className="space-y-3">
          {commentairesFiltres(quizCommentaires, filtreQuiz).map(com => (
            <li key={com.id} className="bg-white/10 p-4 rounded-xl border border-white/10">
              <p className="text-sm italic text-gray-300 mb-1">
                {com.date} – {com.auteur} sur <strong>{com.cible}</strong>
              </p>
              <p className="text-white mb-2">{com.contenu}</p>
              <button
                onClick={() => supprimerCommentaire(com.id, 'quiz')}
                className="text-red-400 hover:text-red-300 text-sm font-medium"
              >
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      </div>


      {/* Commentaires forum */}
      <div className="w-full md:w-1/2 bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/70">
        <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
          Commentaires du Forum
        </h2>
        <input
          className="w-full mb-4 p-2 rounded-xl bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary"
          placeholder="Rechercher un commentaire ou sujet..."
          value={filtreForum}
          onChange={e => setFiltreForum(e.target.value)}
        />
        <ul className="space-y-3">
          {commentairesFiltres(forumCommentaires, filtreForum).map(com => (
            <li key={com.id} className="bg-white/10 p-4 rounded-xl border border-white/0">
              <p className="text-sm italic text-gray-300 mb-1">
                {com.date} – {com.auteur} dans <strong>{com.cible}</strong>
              </p>
              <p className="text-white mb-2">{com.contenu}</p>
              <button
                onClick={() => supprimerCommentaire(com.id, 'forum')}
                className="text-red-400 hover:text-red-300 text-sm font-medium"
              >
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminCommentaires;
