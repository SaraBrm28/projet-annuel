import React, { useEffect, useState } from "react";
import { Neon } from "./magicui/neon";

interface UtilisateurClassement {
  id_utilisateur: number;
  nom_utilisateur: string;
  moyenne: number;
}

const Classement = () => {
  const [topUsers, setTopUsers] = useState<UtilisateurClassement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClassement = async () => {
      try {
        const res = await fetch("http://localhost/quizverse/api/get_top_users.php");
        const data = await res.json();

        if (Array.isArray(data)) {
          setTopUsers(data);
        } else {
          console.error("Réponse inattendue :", data);
          setTopUsers([]);
        }
      } catch (error) {
        console.error("Erreur de récupération du classement :", error);
        setTopUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchClassement();
  }, []);

  return (
    <div className="min-h-screen pt-28 px-6 text-white">
      <h1 className="text-4xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
        Classement des meilleurs utilisateurs
      </h1>

      <Neon borderSize={3} borderRadius={20}>
        <div className="p-8 bg-white/5 rounded-[inherit]">
          {loading ? (
            <p className="text-center text-white">Chargement du classement...</p>
          ) : Array.isArray(topUsers) && topUsers.length > 0 ? (
            <ol className="space-y-4">
              {topUsers.map((user, index) => (
                <li
                  key={user.id_utilisateur}
                  className="flex justify-between items-center p-4 bg-white/10 rounded-lg border border-white/10"
                >
                  <span className="text-lg text-black font-semibold">
                    #{index + 1} — {user.nom_utilisateur}
                  </span>
                  <span className="text-black font-bold">{user.moyenne}/100</span>
                </li>
              ))}
            </ol>
          ) : (
            <p className="text-center text-white/70">Aucun score à afficher.</p>
          )}
        </div>
      </Neon>
    </div>
  );
};

export default Classement;
