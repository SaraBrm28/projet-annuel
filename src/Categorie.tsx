import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ShadowBlue from "./components/ShadowBlue";

type Quiz = {
  id_quiz: number;
  titre: string;
  niveau: string;
  temps_limite: number;
  actif: number;
  description: string;
  image: string;
};

const Categorie = () => {
  const { nom } = useParams();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      const res = await fetch(
        `http://localhost/quizverse/api/get_quiz_by_categorie.php?nom=${encodeURIComponent(nom!)}`
      );
      const data = await res.json();
      setQuizzes(data);
    };
    fetchQuizzes();
  }, [nom]);

  return (
    <div className="pt-[200px]">
      <h1 className="text-5xl leading-[1.2] font-bold text-center mb-[100px] z-50 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-600">
        {nom}
      </h1>

      <ShadowBlue left="10%" top="20%" leftMd="15%" topMd="10%" leftLg="0%" topLg="15%" />
      <ShadowBlue left="10%" top="20%" leftMd="15%" topMd="10%" leftLg="80%" topLg="45%" />
      <ShadowBlue left="10%" top="20%" leftMd="15%" topMd="10%" leftLg="30%" topLg="75%" />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
        {quizzes.length === 0 ? (
          <p className="col-span-full text-center text-lg text-gray-400">
            Aucun quiz pour cette catégorie pour l'instant.
          </p>
        ) : (
          quizzes.map((quiz) => (
            <div
              key={quiz.id_quiz}
              className="w-72 h-40 bg-white/10 backdrop-blur-md border-pink-300 border-[1px] rounded-2xl p-4 flex flex-col justify-between hover:scale-105 transition duration-300"
            >
              <h2 className="text-xl font-semibold mb-2 truncate text-balance leading-snug max-h-[3.5rem] overflow-hidden break-words">
                {quiz.titre}
              </h2>
              <div className="text-sm text-gray-300">
                Niveau : {quiz.niveau} <br />
                Temps limite : {quiz.temps_limite} min
              </div>
              <button
                onClick={() => setSelectedQuiz(quiz)}
                className="mt-4 w-full py-1.5 bg-gradient-to-r from-blue-500 to-pink-500 rounded-full text-white font-bold hover:opacity-90"
              >
                Lancer le quiz
              </button>
            </div>
          ))
        )}
      </div>

      {selectedQuiz && (
        <div className="fixed inset-0 z-50  flex items-center justify-center bg-black/50 backdrop-blur">
          <div className="relative w-[700px] h-[500px] rounded-2xl overflow-hidden shadow-xl">
            <img
              src={`/src/assets/${selectedQuiz.image}`}
              alt={selectedQuiz.titre}
              className="absolute inset-0 w-full h-full object-cover opacity-30"
            />
            <div className="relative z-10 w-full h-full bg-white/10 backdrop-blur-xl px-10 py-12 flex flex-col justify-center items-center text-white gap-6">

            <h2 className="text-2xl font-bold">{selectedQuiz.titre}</h2>

<p className="text-sm text-white/80 text-center">
  {selectedQuiz.description}
</p>

<div className="text-sm text-white/70 text-center space-y-1">
  <p><span className="font-semibold text-white">Niveau :</span> {selectedQuiz.niveau}</p>
  <p><span className="font-semibold text-white">Temps limite :</span> {selectedQuiz.temps_limite} min</p>
</div>

<button
  onClick={() => navigate(`/quiz/${selectedQuiz.id_quiz}`)}
  className="mt-12 w-[300px] py-1.5 bg-gradient-to-r from-blue-500 to-pink-500 rounded-full text-white font-bold hover:opacity-90 transition-transform duration-300 ease-in-out transform hover:scale-105"
>
  Commencer
</button>
              <button
                onClick={() => setSelectedQuiz(null)}
                className="absolute top-2 right-3 text-white text-lg hover:text-red-400"
              >
                x
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categorie;
