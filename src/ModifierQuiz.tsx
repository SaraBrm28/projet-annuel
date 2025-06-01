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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reponsesAModifier, setReponsesAModifier] = useState<Reponse[]>([]);
  const [questionAModifier, setQuestionAModifier] = useState<number | null>(null);
  const [bonneModifIndex, setBonneModifIndex] = useState(0);

  useEffect(() => {
    fetch(`http://localhost/quizverse/api/admin_get_quiz_questions.php?id_quiz=${id}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setQuestions(data);
        else setQuestions([]);
      })
      .catch(() => setQuestions([]));
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

    const res = await fetch('http://localhost/quizverse/api/admin_ajouter_question.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    if (data.success) window.location.reload();
    else alert(data.error || "Erreur lors de l'ajout");
  };

  const handleSupprimerQuestion = async (id_question: number) => {
    const res = await fetch('http://localhost/quizverse/api/admin_supprimer_question.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id_question })
    });

    const data = await res.json();
    if (data.success) setQuestions(questions.filter(q => q.id_question !== id_question));
    else alert(data.error || "Erreur lors de la suppression");
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
    <div className="pt-28 pl-16 pr-16 px-6 text-white">
      <h1 className="text-3xl font-bold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
        Modifier le Quiz #{id}
      </h1>

      <section className="mb-10 bg-white/5 p-6 rounded-2xl border border-white/20">
        <h2 className="text-xl font-semibold mb-4 text-white">➕ Ajouter une nouvelle question</h2>
        <input
          type="text"
          placeholder="Enoncé de la question"
          className="w-full mb-4 p-3 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-primary"
          value={enonce}
          onChange={e => setEnonce(e.target.value)}
        />
        {nouvellesReponses.map((r, i) => (
          <div key={i} className="mb-3 flex items-center gap-3">
            <input
              type="text"
              value={r}
              placeholder={`Réponse ${i + 1}`}
              onChange={e => {
                const copy = [...nouvellesReponses];
                copy[i] = e.target.value;
                setNouvellesReponses(copy);
              }}
              className="flex-1 p-2 rounded-lg bg-white/10 border border-white/20"
            />
            <label className="text-sm text-gray-300">
              <input
                type="radio"
                checked={bonneReponseIndex === i}
                onChange={() => setBonneReponseIndex(i)}
                className="mr-1"
              />
              Bonne réponse
            </label>
          </div>
        ))}
        <button
          onClick={handleAjouterQuestion}
          className="mt-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold px-6 py-2 rounded-xl hover:bg-primary/80 transition"
        >
          ➕ Ajouter la question
        </button>
      </section>

      <section className="mb-20">
        <h2 className="text-3xl font-semibold mb-6 text-center text-secondary">📋 Questions existantes</h2>
        <ul className="space-y-4">
          {questions.map(q => (
            <li key={q.id_question} className="bg-white/5 p-5 rounded-xl border border-white/10">
              <p className="font-semibold mb-2 text-lg">{q.enonce}</p>
              <ul className="ml-4 mb-2 list-disc space-y-1">
                {q.reponses.map(r => (
                  <li key={r.id_reponse} className={r.est_correcte ? "text-green-400 font-medium" : ""}>
                    {r.texte}
                  </li>
                ))}
              </ul>
              <div className="flex gap-4 mt-3">
                <button
                  onClick={() => handleSupprimerQuestion(q.id_question)}
                  className="text-red-400 hover:underline text-sm"
                >
                  ❌ Supprimer
                </button>
                <button
                  onClick={() => handleModifierReponses(q.id_question, q.reponses)}
                  className="text-slate-300 hover:underline text-sm"
                >
                  ✏️ Modifier les réponses
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {isModalOpen && (
        <div className="fixed  inset-0 bg-black/70 z-50 flex items-center justify-center px-4">
          <div className=" bg-zinc-900 text-white rounded-xl p-6 w-full max-w-lg shadow-xl">
            <h3 className="text-xl font-bold mb-4">✏️ Modifier les réponses</h3>
            {reponsesAModifier.map((r, i) => (
              <div key={i} className="mb-4">
                <input
                  type="text"
                  value={r.texte}
                  onChange={(e) => {
                    const updated = [...reponsesAModifier];
                    updated[i].texte = e.target.value;
                    setReponsesAModifier(updated);
                  }}
                  className="w-full p-2 border bg-zinc-800 rounded-2xl"
                />
                <label className="ml-2 text-sm">
                  <input
                    type="radio"
                    checked={bonneModifIndex === i}
                    onChange={() => setBonneModifIndex(i)}
                    className="mr-1"
                  />
                  Bonne réponse
                </label>
              </div>
            ))}
            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-2xl bg-gray-500"
              >
                Annuler
              </button>
              <button
                onClick={envoyerModifications}
                className="px-4 py-2 rounded-2xl bg-secondary text-white hover:bg-primary/80"
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModifierQuiz;
