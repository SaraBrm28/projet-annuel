import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Quiz {
  id_quiz: number;
  titre: string;
  categorie: string;
  nb_questions: number;
}

interface Categorie {
  id_categorie: number;
  nom: string;
}

const AdminQuiz = () => {
  const [quizList, setQuizList] = useState<Quiz[]>([]);
  const [categorieList, setCategorieList] = useState<Categorie[]>([]);
  const [filtreQuiz, setFiltreQuiz] = useState('');
  const [filtreCategorie, setFiltreCategorie] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuiz();
    fetchCategories();
  }, []);

  const fetchQuiz = async () => {
    const res = await fetch('http://localhost/quizverse/api/get_all_quiz.php');
    const data = await res.json();
    setQuizList(data);
  };

  const fetchCategories = async () => {
    const res = await fetch('http://localhost/quizverse/api/get_all_categories.php');
    const data = await res.json();
    setCategorieList(data);
  };

  const supprimerQuiz = async (id: number) => {
    if (!confirm("Supprimer ce quiz ?")) return;
    const res = await fetch('http://localhost/quizverse/api/supprimer_quiz.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    const data = await res.json();
    if (data.success) fetchQuiz();
    else alert(data.error || "Erreur suppression");
  };

  const supprimerCategorie = async (id: number) => {
    if (!confirm("Supprimer cette catégorie ?")) return;
    const res = await fetch('http://localhost/quizverse/api/supprimer_categorie.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    const data = await res.json();
    if (data.success) fetchCategories();
    else alert(data.error || "Erreur suppression");
  };

  const quizFiltres = quizList.filter(q => q.titre.toLowerCase().includes(filtreQuiz.toLowerCase()));
  const categorieFiltres = categorieList.filter(c => c.nom.toLowerCase().includes(filtreCategorie.toLowerCase()));

  return (
    <div className="min-h-screen pt-28 px-6 text-white">
      <h1 className="text-3xl font-bold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-third  via-secondary to-primary">
        Gestion des Quiz & Catégories
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Colonne gauche : Quiz */}
        <div className="bg-white/5 backdrop-blur-md p-6 glass-morphism-two rounded-2xl border border-white/20">
          <h2 className="text-2xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-white text-center">
            Quiz
          </h2>
          <input
            type="text"
            placeholder="🔍 Rechercher un quiz..."
            className="p-3 mb-6 w-full rounded-xl bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            value={filtreQuiz}
            onChange={e => setFiltreQuiz(e.target.value)}
          />
          <ul className="space-y-3">
            {quizFiltres.map(q => (
              <li
                key={q.id_quiz}
                className="bg-white/10 p-4 rounded-xl flex justify-between items-center border border-white/10"
              >
                <div>
                  <p className="text-lg font-semibold">{q.titre}</p>
                  <p className="text-sm text-gray-300 italic">{q.categorie}</p>
                </div>
                <div className="space-x-3">
                  <button
                    onClick={() => navigate(`/admin/modifier/${q.id_quiz}`)}
                    className="text-primary hover:underline text-sm font-medium"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => supprimerQuiz(q.id_quiz)}
                    className="text-red-400 hover:underline text-sm font-medium"
                  >
                    Supprimer
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Colonne droite : Catégories */}
        <div className="bg-white/5 backdrop-blur-md p-6 glass-morphism-two rounded-2xl border border-white/20">
          <h2 className="text-2xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-white text-center">
            Catégories
          </h2>
          <input
            type="text"
            placeholder="🔍 Rechercher une catégorie..."
            className="p-3 mb-6 w-full rounded-xl bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary"
            value={filtreCategorie}
            onChange={e => setFiltreCategorie(e.target.value)}
          />
          <ul className="space-y-3">
            {categorieFiltres.map(c => (
              <li
                key={c.id_categorie}
                className="bg-white/10 p-4 rounded-xl flex justify-between items-center border border-white/10"
              >
                <span className="text-white">{c.nom}</span>
                <button
                  onClick={() => supprimerCategorie(c.id_categorie)}
                  className="text-red-400 hover:underline text-sm font-medium"
                >
                  Supprimer
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminQuiz;
