import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface Reponse {
  id_reponse: number;
  texte: string;
  est_correcte: boolean;
}

interface Question {
  id_question: number;
  enonce: string;
  reponses: Reponse[];
}

const ModifierQuiz = () => {
  const { id } = useParams();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [enonce, setEnonce] = useState('');
  const [nouvellesReponses, setNouvellesReponses] = useState<string[]>(['', '', '', '']);
  const [bonneReponseIndex, setBonneReponseIndex] = useState<number>(0);

  // Pour la modale de modification
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reponsesAModifier, setReponsesAModifier] = useState<Reponse[]>([]);
  const [questionAModifier, setQuestionAModifier] = useState<number | null>(null);
  const [bonneModifIndex, setBonneModifIndex] = useState(0);

  useEffect(() => {
    fetch(`http://localhost/quizverse/api/admin_get_quiz_questions.php?id_quiz=${id}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setQuestions(data);
        } else {
          console.error("Données reçues non valides :", data);
          setQuestions([]);
        }
      })
      .catch(err => {
        console.error("Erreur de chargement des questions :", err);
        setQuestions([]);
      });
  }, [id]);

  const handleAjouterQuestion = async () => {
    const payload = {
      id_quiz: id,
      enonce,
      reponses: nouvellesReponses.map((texte, i) => ({
        texte,
        est_correcte: i === bonneReponseIndex
      }))
    };

    try {
      const res = await fetch('http://localhost/quizverse/api/admin_ajouter_question.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (data.success) {
        window.location.reload();
      } else {
        alert(data.error || "Erreur lors de l'ajout de la question");
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
      alert("Erreur serveur lors de l'ajout.");
    }
  };

  const handleSupprimerQuestion = async (id_question: number) => {
    try {
      const res = await fetch('http://localhost/quizverse/api/admin_supprimer_question.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_question })
      });

      const data = await res.json();
      if (data.success) {
        setQuestions(questions.filter(q => q.id_question !== id_question));
      } else {
        alert(data.error || "Erreur lors de la suppression");
      }
    } catch (error) {
      console.error("Erreur suppression :", error);
    }
  };

  const handleModifierReponses = (id_question: number, anciennesReponses: Reponse[]) => {
    setReponsesAModifier(anciennesReponses);
    setQuestionAModifier(id_question);
    const correctIndex = anciennesReponses.findIndex(r => r.est_correcte);
    setBonneModifIndex(correctIndex !== -1 ? correctIndex : 0);
    setIsModalOpen(true);
  };

  const envoyerModifications = async () => {
    const payload = {
      id_question: questionAModifier,
      reponses: reponsesAModifier.map((r, i) => ({
        texte: r.texte,
        est_correcte: i === bonneModifIndex
      }))
    };

    const res = await fetch('http://localhost/quizverse/api/admin_modifier_reponses.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    if (data.success) {
      alert("Réponses modifiées !");
      setIsModalOpen(false);
      window.location.reload();
    } else {
      alert(data.error || "Erreur lors de la modification");
    }
  };

  return (
    <div className="pt-28 px-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Modifier le quiz #{id}</h1>

      <h2 className="text-xl font-semibold mb-4">Ajouter une nouvelle question</h2>
      <input
        type="text"
        placeholder="Enoncé"
        className="w-full mb-2 p-2 bg-white/10 border border-white/20 rounded"
        value={enonce}
        onChange={e => setEnonce(e.target.value)}
      />
      {nouvellesReponses.map((r, i) => (
        <div key={i} className="mb-2">
          <input
            type="text"
            value={r}
            placeholder={`Réponse ${i + 1}`}
            onChange={e => {
              const copy = [...nouvellesReponses];
              copy[i] = e.target.value;
              setNouvellesReponses(copy);
            }}
            className="p-2 rounded bg-white/10 border border-white/20 w-full"
          />
          <label className="ml-2">
            <input
              type="radio"
              checked={bonneReponseIndex === i}
              onChange={() => setBonneReponseIndex(i)}
            /> Bonne réponse
          </label>
        </div>
      ))}
      <button
        onClick={handleAjouterQuestion}
        className="mt-4 bg-blue-500 px-4 py-2 rounded"
      >
        Ajouter la question
      </button>

      <h2 className="text-xl font-semibold mt-10 mb-4">Questions existantes</h2>
      <ul className="space-y-4">
        {questions.map(q => (
          <li key={q.id_question} className="bg-white/10 p-4 rounded">
            <p className="font-semibold mb-2">{q.enonce}</p>
            <ul className="ml-4 mb-2 list-disc">
              {q.reponses.map(r => (
                <li key={r.id_reponse} className={r.est_correcte ? "text-green-400" : ""}>
                  {r.texte}
                </li>
              ))}
            </ul>
            <div className="flex gap-4">
              <button
                onClick={() => handleSupprimerQuestion(q.id_question)}
                className="text-red-400 hover:underline"
              >
                Supprimer
              </button>
              <button
                onClick={() => handleModifierReponses(q.id_question, q.reponses)}
                className="text-yellow-400 hover:underline"
              >
                Modifier les réponses
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Modale de modification */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white text-black rounded-lg p-6 w-[90%] max-w-md">
            <h3 className="text-xl font-bold mb-4">Modifier les réponses</h3>
            {reponsesAModifier.map((r, i) => (
              <div key={i} className="mb-3">
                <input
                  type="text"
                  value={r.texte}
                  onChange={(e) => {
                    const updated = [...reponsesAModifier];
                    updated[i].texte = e.target.value;
                    setReponsesAModifier(updated);
                  }}
                  className="w-full p-2 border rounded"
                />
                <label className="ml-2">
                  <input
                    type="radio"
                    checked={bonneModifIndex === i}
                    onChange={() => setBonneModifIndex(i)}
                  /> Bonne réponse
                </label>
              </div>
            ))}
            <div className="flex justify-end space-x-4 mt-6">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-300 rounded">Annuler</button>
              <button onClick={envoyerModifications} className="px-4 py-2 bg-blue-500 text-white rounded">Enregistrer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModifierQuiz;
