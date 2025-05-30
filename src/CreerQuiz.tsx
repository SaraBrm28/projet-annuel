import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreerQuiz = () => {
  const navigate = useNavigate();

  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [niveau, setNiveau] = useState('facile');
  const [tempsLimite, setTempsLimite] = useState(600);
  const [questions, setQuestions] = useState([
    {
      enonce: '',
      reponses: ['', '', '', ''],
      bonneReponseIndex: 0
    }
  ]);

  const ajouterQuestion = () => {
    setQuestions([...questions, {
      enonce: '',
      reponses: ['', '', '', ''],
      bonneReponseIndex: 0
    }]);
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
        console.error("Réponse non JSON:", text);
        alert("❌ Réponse inattendue du serveur.");
      }

    } catch (error) {
      console.error("Erreur réseau :", error);
      alert("Erreur de communication avec le serveur.");
    }
  };

  return (
    <div className="pt-28 px-6 text-white max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Créer un quiz personnalisé</h1>

      <input
        type="text"
        placeholder="Titre du quiz"
        value={titre}
        onChange={e => setTitre(e.target.value)}
        className="w-full mb-4 p-2 bg-white/10 border border-white/20 rounded"
      />

      <textarea
        placeholder="Description du quiz"
        value={description}
        onChange={e => setDescription(e.target.value)}
        className="w-full mb-4 p-2 bg-white/10 border border-white/20 rounded"
      />

      <div className="mb-4">
        <label className="mr-4">Niveau :</label>
        <select value={niveau} onChange={e => setNiveau(e.target.value)} className="p-2 rounded text-black">
          <option value="facile">Facile</option>
          <option value="moyen">Moyen</option>
          <option value="difficile">Difficile</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="mr-4">Temps limite (en secondes) :</label>
        <input
          type="number"
          value={tempsLimite}
          onChange={e => setTempsLimite(parseInt(e.target.value))}
          className="p-2 rounded bg-white/10 border border-white/20"
        />
      </div>

      <h2 className="text-xl font-semibold mb-2">Questions</h2>
      {questions.map((q, qIndex) => (
        <div key={qIndex} className="mb-6 p-4 bg-white/5 border border-white/20 rounded">
          <input
            type="text"
            placeholder={`Enoncé de la question ${qIndex + 1}`}
            value={q.enonce}
            onChange={e => modifierQuestion(qIndex, 'enonce', e.target.value)}
            className="w-full mb-2 p-2 rounded bg-white/10 border border-white/20"
          />
          {q.reponses.map((r, rIndex) => (
            <div key={rIndex} className="flex items-center mb-1">
              <input
                type="text"
                placeholder={`Réponse ${rIndex + 1}`}
                value={r}
                onChange={e => modifierReponse(qIndex, rIndex, e.target.value)}
                className="flex-1 p-2 rounded bg-white/10 border border-white/20"
              />
              <label className="ml-2 text-sm">
                <input
                  type="radio"
                  checked={q.bonneReponseIndex === rIndex}
                  onChange={() => modifierQuestion(qIndex, 'bonneReponseIndex', rIndex)}
                /> Bonne
              </label>
            </div>
          ))}
        </div>
      ))}

      <button onClick={ajouterQuestion} className="mb-6 bg-blue-500 px-4 py-2 rounded">
        Ajouter une question
      </button>

      <div>
        <button onClick={handleSubmit} className="bg-green-500 px-6 py-3 rounded text-lg font-bold">
          Créer le quiz
        </button>
      </div>
    </div>
  );
};

export default CreerQuiz;
