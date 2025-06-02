import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";
import ShadowBlue from "./components/ShadowBlue";
const imageMap = import.meta.glob("/src/assets/*.jpg", { eager: true });

interface Reponse {
  id_reponse: number;
  texte: string;
  est_correcte?: number;
}

interface Question {
  id_question: number;
  enonce: string;
  image: string;
  reponses: Reponse[];
}

const Quiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { idUtilisateur } = useUser(); 

  const [questions, setQuestions] = useState<Question[]>([]);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [score, setScore] = useState<number | null>(null);

  
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch(`http://localhost/quizverse/api/get_quiz_questions.php?id_quiz=${id}`);
        const data = await res.json();

        if (!data.questions || data.questions.length === 0) {
          alert("Aucune question trouvée.");
          return;
        }

        setQuestions(data.questions);
        setTimeLeft(data.temps_limite * 60);
      } catch (error) {
        console.error("Erreur lors du chargement des questions :", error);
      }
    };

    fetchQuestions();
  }, [id]);

  // Timer
  useEffect(() => {
    if (timeLeft === null || score !== null) return;

    if (timeLeft === 0) {
      calculerScore();
      return;
    }

    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, score]);

  const handleSelect = (id_question: number, id_reponse: number) => {
    setSelectedAnswers({ ...selectedAnswers, [id_question]: id_reponse });
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      calculerScore();
    }
  };

  const calculerScore = async () => {
    let bonnes = 0;
    for (const question of questions) {
      const reponseChoisie = selectedAnswers[question.id_question];
      const bonneReponse = question.reponses.find((r) => r.est_correcte === 1);
      if (bonneReponse && bonneReponse.id_reponse === reponseChoisie) {
        bonnes++;
      }
    }
    const total = bonnes * 5;
    setScore(total);

    // ✅ enregistrement du score avec utilisateur connecté
    await fetch("http://localhost/quizverse/api/save_score.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_utilisateur: idUtilisateur,
        id_quiz: id,
        score: total,
      }),
    });

    navigate(`/resultat/${id}`, { state: { score: total } });
  };

  const question = questions[currentIndex];
  const minutes = timeLeft ? Math.floor(timeLeft / 60) : 0;
  const secondes = timeLeft ? timeLeft % 60 : 0;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 pt-24 text-white">
      {score !== null ? (
        <p>Calcul du score en cours...</p>
      ) : !question ? (
        <p>Chargement du quiz...</p>
      ) : (
        <div className="w-full max-w-xl bg-white/5 backdrop-blur rounded-xl p-6 border border-white/60 relative">
          <div className="absolute top-4 right-6 text-sm bg-white/20 px-4 py-1 rounded-full">
            ⏱ {minutes}:{secondes.toString().padStart(2, "0")}
          </div>
          <h2 className="text-2xl font-bold mb-4">Question {currentIndex + 1}</h2>
          <div className="flex flex-col md:flex-row gap-6 items-center">
          <img
  src={`http://localhost/quizverse/images/${question.image}`}
  alt="Illustration"
  className="w-48 h-32 object-cover rounded-lg border border-white/30"
/>
            <p className="text-lg text-center md:text-left">{question.enonce}</p>
          </div>
          <div className="mt-6 grid gap-4">
            {question.reponses.map((rep) => (
              <button
                key={rep.id_reponse}
                onClick={() => handleSelect(question.id_question, rep.id_reponse)}
                className={`w-full py-2 px-4 rounded-full border border-white/30 text-left transition duration-200
                  ${selectedAnswers[question.id_question] === rep.id_reponse
                    ? "bg-blue-600 text-white"
                    : "hover:bg-white/20"}`}
              >
                {rep.texte}
              </button>
            ))}
          </div>
          <div className="mt-6 text-center">
            <button
              onClick={nextQuestion}
              className="mt-2 px-6 py-2 bg-gradient-to-r from-sky-500 to-fuchsia-600 rounded-full font-semibold hover:scale-105 transition-transform"
            >
              {currentIndex < questions.length - 1 ? "Question suivante" : "Terminer"}
            </button>
          </div>
        </div>
      )}
      <ShadowBlue left="10%" top="20%" leftMd="15%" topMd="10%" leftLg="0%" topLg="15%" />
      <ShadowBlue left="10%" top="20%" leftMd="15%" topMd="10%" leftLg="80%" topLg="45%" />
     
    </div>
  );
};

export default Quiz;
