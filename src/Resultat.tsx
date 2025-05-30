import { useParams, useLocation } from "react-router-dom";
import { useUser } from "./UserContext";
import Commentaires from "./components/Commentaires";
import ShadowBlue from "./components/ShadowBlue";
const Resultat = () => {
  const { id } = useParams();
  const location = useLocation();
  const { idUtilisateur } = useUser();
  const score = location.state?.score;

  if (!idUtilisateur) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-xl">
        Veuillez vous connecter pour commenter.
      </div>
    );
  }

  if (score === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-xl">
        Score non disponible.
      </div>
    );
  }

  const message = () => {
    if (score < 50) return "❌ Tu ferais mieux d'aller reviser.";
    if (score < 75) return "✨ Tu es proche du but";
    return "🏆 Champion ! Excellent travail.";
  };

  return (
    <div className="min-h-screen flex flex-col items-center text-white pt-24 px-6 pb-20">
      <div className="w-full max-w-2xl text-center mb-10 bg-white/10 p-8 rounded-2xl border border-white/20 backdrop-blur-md shadow-lg">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-300 via-purple-400 to-pink-600 text-transparent bg-clip-text">
          Ton score : {score}/100
        </h2>
        <p className="text-lg text-white/80">{message()}</p>
      </div>
      <ShadowBlue left="10%" top="20%" leftMd="15%" topMd="10%" leftLg="0%" topLg="15%" />
      <ShadowBlue left="10%" top="20%" leftMd="15%" topMd="10%" leftLg="80%" topLg="65%" />

      <div className="w-full max-w-3xl glass-morphism  p-6 rounded-xl border border-white/40 ">
        <h3 className="text-2xl font-semibold mb-4 text-center text-white/90">
          Commentaires
        </h3>
        <Commentaires id_quiz={parseInt(id!)} id_utilisateur={idUtilisateur} />
      </div>
    </div>
  );
};

export default Resultat;
