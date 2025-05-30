import React, { useEffect, useState } from "react";

interface Commentaire {
  id_commentaire: number;
  id_parent: number | null;
  auteur: string;
  texte: string;
  date_commentaire: string;
  likes: number;
  reponses?: Commentaire[];
}

const Commentaires = ({ id_quiz, id_utilisateur }: { id_quiz: number, id_utilisateur: number }) => {
  const [commentaires, setCommentaires] = useState<Commentaire[]>([]);
  const [texte, setTexte] = useState("");
  const [message, setMessage] = useState("");

  const fetchCommentaires = async () => {
    try {
      const res = await fetch(`http://localhost/quizverse/api/get_comments.php?id_quiz=${id_quiz}`);
      const data = await res.json();

      if (data.error) {
        console.error("Erreur dans les commentaires :", data.error);
        setCommentaires([]);
        return;
      }

      if (!Array.isArray(data)) {
        console.error("Format inattendu :", data);
        setCommentaires([]);
        return;
      }

      setCommentaires(data);
    } catch (err) {
      console.error("Erreur lors du chargement des commentaires :", err);
      setCommentaires([]);
    }
  };

  const ajouterCommentaire = async (texte: string, id_parent: number | null = null) => {
    if (texte.trim() === "") return;

    const res = await fetch("http://localhost/quizverse/api/add_comments.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_quiz, id_utilisateur, texte, id_parent }),
    });

    const data = await res.json();

    if (data.success) {
      setTexte("");
      setMessage("✅ Commentaire publié !");
      fetchCommentaires();
      setTimeout(() => setMessage(""), 3000); // cache le message après 3s
    } else {
      alert("❌ Erreur lors de l'ajout : " + data.error);
    }
  };
  const supprimerCommentaire = async (id_commentaire: number) => {
    const confirm = window.confirm("Voulez-vous vraiment supprimer ce commentaire ?");
    if (!confirm) return;
  
    const res = await fetch("http://localhost/quizverse/api/delete_comment.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_commentaire, id_utilisateur }),
    });
  
    const data = await res.json();
  
    if (data.success) {
      fetchCommentaires();
    } else {
      alert("❌ Erreur lors de la suppression : " + data.error);
    }
  };
  
  const toggleLike = async (id_commentaire: number) => {
    await fetch("http://localhost/quizverse/api/toggle_like.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_utilisateur, id_commentaire }),
    });
    fetchCommentaires();
  };

  useEffect(() => {
    fetchCommentaires();
  }, []);

  return (
    <div className="mt-10 w-full  max-w-2xl">
      <h3 className="text-xl  font-semibold mb-4">Commentaires</h3>

      <textarea
        value={texte}
        onChange={(e) => setTexte(e.target.value)}
        className="w-full p-2 rounded-2xl bg-white/10 text-white border border-white/20"
        placeholder="Écris un commentaire..."
      />

      <button
        onClick={() => ajouterCommentaire(texte)}
        className="mt-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 px-6 py-2 rounded-full font-semibold transition"
      >
        Publier
      </button>

      {message && (
        <p className="mt-2 text-green-400 text-sm">{message}</p>
      )}

      <div className="mt-6 space-y-4">
        {commentaires.map((c) => (
          <div key={c.id_commentaire} className="bg-white/10 p-4 rounded-2xl">
            <div className="flex justify-between text-sm text-white/80">
              <span>{c.auteur}</span>
              <span>{new Date(c.date_commentaire).toLocaleString()}</span>
            </div>
            <p className="text-white mt-1">{c.texte}</p>
            <div className="mt-2 flex gap-4 text-sm">
              <button onClick={() => toggleLike(c.id_commentaire)}>❤️ {c.likes}</button>
            </div>
            {c.auteur === localStorage.getItem("nom_utilisateur") && (
  <button
    onClick={() => supprimerCommentaire(c.id_commentaire)}
    className="text-red-400 hover:underline"
  >
    🗑 Supprimer
  </button>
)}
            {c.reponses && c.reponses.map((rep) => (
              <div key={rep.id_commentaire} className="ml-4 mt-2 border-l border-white/20 pl-2">
                <div className="text-sm text-white/80">
                  {rep.auteur} — {new Date(rep.date_commentaire).toLocaleString()}
                </div>
                <p className="text-white">{rep.texte}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Commentaires;
