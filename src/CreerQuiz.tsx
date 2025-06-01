import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ShadowBlue from './components/ShadowBlue';
import ShadowViolet from './components/ShadowViolet';
const CreerQuiz = () => {
  const navigate = useNavigate();

  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [niveau, setNiveau] = useState('facile');
  const [tempsLimite, setTempsLimite] = useState(600);
  const [questions, setQuestions] = useState([
    { enonce: '', reponses: ['', '', '', ''], bonneReponseIndex: 0 }
  ]);

  const ajouterQuestion = () => {
    setQuestions([...questions, { enonce: '', reponses: ['', '', '', ''], bonneReponseIndex: 0 }]);
  };

  const modifierQuestion = (index: number, champ: string, valeur: any) => {
    const copie = [...questions];
    if (champ === 'enonce') copie[index].enonce = valeur;
    else if (champ === 'bonneReponseIndex') copie[index].bonneReponseIndex = parseInt(valeur);
    setQuestions(copie);
  };

  const modifierReponse = (qIndex: number, rIndex: number, valeur: string) => {
    const copie = [...questions];
    copie[qIndex].reponses[rIndex] = valeur;
    setQuestions(copie);
  };

  const handleSubmit = async () => {
    const payload = {
      titre,
      description,
      niveau,
      temps_limite: tempsLimite,
      questions: questions.map(q => ({
        enonce: q.enonce,
        reponses: q.reponses.map((r, i) => ({
          texte: r,
          est_correcte: i === q.bonneReponseIndex
        }))
      }))
    };

    try {
      const res = await fetch('http://localhost/quizverse/api/creer_quiz_utilisateur.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const text = await res.text();
      try {
        const data = JSON.parse(text);
        if (data.success) {
          alert("✅ Quiz créé avec succès !");
          navigate('/');
        } else {
          alert("❌ " + (data.error || "Erreur serveur."));
        }
      } catch {
        alert("❌ Réponse inattendue du serveur.");
      }
    } catch (error) {
      alert("Erreur de communication avec le serveur.");
    }
  };

  return (
    <div className="pt-28 px-6 text-white max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
        🎨 Créer un quiz personnalisé
      </h1>

      <div className="space-y-6 bg-white/5 p-8 rounded-2xl border border-white/70">
        <input
          type="text"
          placeholder="Titre du quiz"
          value={titre}
          onChange={e => setTitre(e.target.value)}
          className="w-full p-3 rounded-xl bg-white/10 border border-white/20 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
        />

        <textarea
          placeholder="Description du quiz"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="w-full p-3 rounded-xl bg-white/10 border border-white/20 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
        />

        <div className="flex flex-wrap items-center gap-6">
          <div className="flex flex-col">
            <label className="text-sm mb-1">Niveau</label>
            <select
              value={niveau}
              onChange={e => setNiveau(e.target.value)}
              className="p-2 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none"
            >
              <option value="facile">Facile</option>
              <option value="moyen">Moyen</option>
              <option value="difficile">Difficile</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-sm mb-1">Temps limite (secondes)</label>
            <input
              type="number"
              value={tempsLimite}
              onChange={e => setTempsLimite(parseInt(e.target.value))}
              className="p-2 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none w-40"
            />
          </div>
        </div>
      </div>
      <ShadowViolet left="10%" top="20%" leftMd="15%" topMd="10%" leftLg="0%" topLg="15%" />
      
      <ShadowBlue left="10%" top="20%" leftMd="15%" topMd="10%" leftLg="80%" topLg="45%" />
      <ShadowBlue left="10%" top="20%" leftMd="15%" topMd="10%" leftLg="90%" topLg="75%" />
      <ShadowBlue left="10%" top="20%" leftMd="15%" topMd="10%" leftLg="0%" topLg="15%" />
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4 text-secondary">📝 Questions</h2>
        <div className="space-y-8">
          {questions.map((q, qIndex) => (
            <div key={qIndex} className="p-6 bg-white/5 border border-white/70 rounded-xl space-y-4">
              <input
                type="text"
                placeholder={`Enoncé de la question ${qIndex + 1}`}
                value={q.enonce}
                onChange={e => modifierQuestion(qIndex, 'enonce', e.target.value)}
                className="w-full p-3 rounded-xl bg-white/10 border border-white/20 placeholder-gray-300"
              />
              {q.reponses.map((r, rIndex) => (
                <div key={rIndex} className="flex items-center gap-3">
                  <input
                    type="text"
                    placeholder={`Réponse ${rIndex + 1}`}
                    value={r}
                    onChange={e => modifierReponse(qIndex, rIndex, e.target.value)}
                    className="flex-1 p-2 rounded-xl bg-white/10 border border-white/20"
                  />
                  <label className="text-sm text-gray-300">
                    <input
                      type="radio"
                      checked={q.bonneReponseIndex === rIndex}
                      onChange={() => modifierQuestion(qIndex, 'bonneReponseIndex', rIndex)}
                      className="mr-1 "
                    />
                    Correcte
                  </label>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6  flex gap-24">
        <button
          onClick={ajouterQuestion}
          className="bg-gradient-to-r from-secondary to-primary text-white px-6 py-3 rounded-2xl hover:bg-secondary/80 transition"
        >
          ➕ Ajouter une question
        </button>
        <button
          onClick={handleSubmit}
          className="bg-gradient-to-r from-third to-primary text-white px-6 py-3 rounded-2xl font-semibold text-lg hover:bg-primary/80 transition"
        >
          🚀 Créer le quiz
        </button>
      </div>
    </div>
  );
};

export default CreerQuiz;
