import React from "react";
import { Link } from "react-router-dom";

type QuizProps = {
  id: number;
  titre: string;
  niveau: string;
  temps_limite: number;
};

const QuizCard = ({ id, titre, niveau, temps_limite }: QuizProps) => {
  return (
    <div className="rounded-2xl border border-pink-400 p-6 bg-black/40 text-white w-[320px]">
      <h2 className="text-xl font-bold mb-2">{titre}</h2>
      <p className="text-sm">Niveau : {niveau}</p>
      <p className="text-sm mb-4">Temps limite : {temps_limite} min</p>
      <Link
        to={`/Quiz/${id}`}
        className="bg-gradient-to-r from-blue-500 to-pink-500 text-white font-semibold px-6 py-2 rounded-full block text-center"
      >
        Lancer le quiz
      </Link>
    </div>
  );
};

export default QuizCard;
