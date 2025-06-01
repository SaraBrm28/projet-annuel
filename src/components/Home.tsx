import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Searchbar from "./Searchbar";
import { Marquee as AnimatedMarquee } from "./magicui/marquee";
import ShadowBlue from "./ShadowBlue";
import { NeonGradientCard } from "./magicui/neon-gradient-card";
import Envie from "./Envie";
import Certificat from "./Certificat";
import { Neon } from "./magicui/neon";
import { BorderBeam } from "./magicui/border-beam";

interface Quiz {
  id_quiz: number;
  titre: string;
  image: string;
  niveau: string;
  temps_limite: number;
  description: string;
}

interface Category {
  nom: string;
  image: string;
}

const Home = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [popularQuizzes, setPopularQuizzes] = useState<Quiz[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost/quizverse/api/get_categorie.php");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("❌ Erreur chargement catégories :", error);
      }
    };

    const fetchPopularQuizzes = async () => {
      try {
        const res = await fetch("http://localhost/quizverse/api/get_popular_quiz.php");
        const data = await res.json();
        setPopularQuizzes(data);
      } catch (error) {
        console.error("❌ Erreur chargement quiz populaires :", error);
      }
    };

    fetchCategories();
    fetchPopularQuizzes();
  }, []);

  const renderPopularCard = (quiz: Quiz) => (
    <Neon className="relative h-full w-full cursor-pointer overflow-hidden">
      {/* Blurred background inside the card content */}
      <div className="absolute inset-0 z-0">
        <img
          src={`src/assets/${quiz.image}`}
          alt={quiz.titre}
          className="w-full h-full object-cover blur-lg scale-110 opacity-70 rounded-[inherit]"
        />
      </div>
  
      {/* Foreground content */}
      <div className="relative z-10 flex flex-col justify-between h-full w-full p-6 text-white bg-black/30 rounded-[inherit]">
        <div>
          <h2 className="text-xl font-bold mb-2">{quiz.titre}</h2>
          <p className="text-sm">Niveau : {quiz.niveau}</p>
          <p className="text-sm">Temps limite : {quiz.temps_limite} min</p>
        </div>
        <button className="mt-auto self-center bg-gradient-to-r from-blue-500 to-pink-500 px-4 py-1.5 rounded-full text-sm font-medium text-white hover:scale-105 transition">
  Lancer le quiz
</button>
      </div>
    </Neon>
  );

  return (
    <div className="flex flex-col items-center min-h-screen text-center px-4 pt-20">
      <div className="absolute left-8 top-5">
        <ShadowBlue />
      </div>

      <Searchbar />

      <h1 className="text-3xl font-bold mt-28 mb-14 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-600">
        Découvrez nos différentes catégories
      </h1>

      <div className="ml-6 mr-6">
        {categories.length > 0 && (
          <AnimatedMarquee>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
              {categories.map((category, index) => (
                <div
                  key={index}
                  onClick={() => navigate(`/categorie/${category.nom}`)}
                  className="relative w-64 h-40 overflow-hidden rounded-xl border-pink-400 border-[1px] cursor-pointer"
                >
                  <img
                    src={`src/assets/${category.image}`}
                    alt={category.nom}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute bottom-0 left-0 w-full bg-black/60 text-white text-center p-2">
                    {category.nom}
                  </div>
                </div>
              ))}
            </div>
          </AnimatedMarquee>
        )}
      </div>

      <h1 className="text-4xl font-bold mt-56 mb-28 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-600">
        Nos quiz les plus populaires
      </h1>

      <div className="min-h-screen w-full flex items-center justify-center bg-black">
  <div className="grid h-full w-[1000px] grid-cols-5 grid-rows-3 gap-6 p-10">
    {popularQuizzes[0] && (
      <div
        className="col-span-3 row-span-1 cursor-pointer transition-transform hover:scale-[1.02]"
        onClick={() => navigate(`/quiz/${popularQuizzes[0].id_quiz}`)}
      >
        <div className="bg-gradient-to-br from-purple-700 to-indigo-800 rounded-2xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-2">{popularQuizzes[0].titre}</h2>
          <p className="text-sm text-white/80">{popularQuizzes[0].description}</p>
          <div className="mt-4 text-sm flex justify-between text-white/90">
            <span className="italic">Niveau : {popularQuizzes[0].niveau}</span>
            <span>Temps : {popularQuizzes[0].temps_limite} min</span>
          </div>
        </div>
      </div>
    )}

    {popularQuizzes[1] && (
      <div
        className="col-span-2 row-span-1 cursor-pointer transition-transform hover:scale-[1.02]"
        onClick={() => navigate(`/quiz/${popularQuizzes[1].id_quiz}`)}
      >
        <div className="bg-gradient-to-br from-pink-600 to-fuchsia-700 rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-white mb-2">{popularQuizzes[1].titre}</h2>
          <p className="text-sm text-white/80">{popularQuizzes[1].description}</p>
          <div className="mt-4 text-sm flex justify-between text-white/90">
            <span className="italic">Niveau : {popularQuizzes[1].niveau}</span>
            <span>Temps : {popularQuizzes[1].temps_limite} min</span>
          </div>
        </div>
      </div>
    )}

    {popularQuizzes[2] && (
      <div
        className="col-start-2 col-span-3 row-span-1 cursor-pointer transition-transform hover:scale-[1.02]"
        onClick={() => navigate(`/quiz/${popularQuizzes[2].id_quiz}`)}
      >
        <div className="bg-gradient-to-br from-cyan-600 to-sky-700 rounded-2xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-2">{popularQuizzes[2].titre}</h2>
          <p className="text-sm text-white/80">{popularQuizzes[2].description}</p>
          <div className="mt-4 text-sm flex justify-between text-white/90">
            <span className="italic">Niveau : {popularQuizzes[2].niveau}</span>
            <span>Temps : {popularQuizzes[2].temps_limite} min</span>
          </div>
        </div>
      </div>
    )}
  </div>
</div>



      <div className="flex flex-row justify-between items-center gap-6 w-3/4 mt-32">
        <Neon><Envie /></Neon>
        <Neon><Certificat /></Neon>
      </div>
    </div>
  );
};

export default Home;
