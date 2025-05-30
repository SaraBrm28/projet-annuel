import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

type Quiz = {
  id_quiz: number;
  titre: string;
  niveau: string;
  temps_limite: number;
  description: string;
  image: string;
};

const Recherche = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const quizzes: Quiz[] = location.state?.results || [];

  const [selectedQuiz, setSelectedQuiz] = React.useState<Quiz | null>(null);

  return (
    <div className="pt-[90px] pb-[100px]">
      <h1 className="text-3xl font-bold text-center mt-28 mb-14 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-600">
Resultat de recherche
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
        {quizzes.length === 0 ? (
          <p className="text-white text-center col-span-full">Aucun quiz trouvé.</p>
        ) : (
          quizzes.map((quiz) => (
            <div
              key={quiz.id_quiz}
              className="w-72 h-40 bg-white/10 backdrop-blur-md border-pink-300 border-[1px] rounded-2xl p-4 flex flex-col justify-between hover:scale-105 transition duration-300"
            >
              <h2 className="text-xl font-semibold mb-2 truncate">{quiz.titre}</h2>
              <div className="text-sm text-gray-300">
                Niveau : {quiz.niveau}<br />
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
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
                <p><strong>Niveau :</strong> {selectedQuiz.niveau}</p>
                <p><strong>Temps limite :</strong> {selectedQuiz.temps_limite} min</p>
              </div>
              <button
                onClick={() => navigate(`/quiz/${selectedQuiz.id_quiz}`)}
                className="mt-8 w-[300px] py-1.5 bg-gradient-to-r from-blue-500 to-pink-500 rounded-full text-white font-bold hover:opacity-90"
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

export default Recherche;
