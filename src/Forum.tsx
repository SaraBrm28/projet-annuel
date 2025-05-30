import React, { useEffect, useState } from "react";
import { useUser } from "./UserContext";
import ShadowBlue from "./components/ShadowBlue";
interface Post {
  id_post: number;
  id_parent: number | null;
  nom_utilisateur: string;
  contenu: string;
  date_post: string;
  likes: number;
  dislikes: number;
  reponses?: Post[];
}

const Forum = () => {
  const { idUtilisateur } = useUser();
  const [posts, setPosts] = useState<Post[]>([]);
  const [texte, setTexte] = useState("");
  const [reponseTextes, setReponseTextes] = useState<{ [key: number]: string }>({});
  const [replyVisible, setReplyVisible] = useState<{ [key: number]: boolean }>({});

  const fetchPosts = async () => {
    try {
      const res = await fetch("http://localhost/quizverse/api/get_forum_posts.php");
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error("Erreur chargement posts:", err);
    }
  };

  const publierPost = async (contenu: string, id_parent: number | null = null) => {
    if (!idUtilisateur || contenu.trim() === "") {
      alert("Merci de remplir tous les champs !");
      return;
    }

    const res = await fetch("http://localhost/quizverse/api/add_forum_posts.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_utilisateur: idUtilisateur, contenu, id_parent })
    });

    const data = await res.json();
    if (data.success) {
      if (id_parent) {
        setReponseTextes((prev) => ({ ...prev, [id_parent]: "" }));
        setReplyVisible((prev) => ({ ...prev, [id_parent]: false }));
      } else {
        setTexte("");
      }
      fetchPosts();
    } else {
      alert("❌ Erreur : " + (data.error || "Une erreur inconnue est survenue."));
    }
  };

  const toggleLike = async (id_post: number, is_like: boolean) => {
    await fetch("http://localhost/quizverse/api/toggle_forum_like.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_utilisateur: idUtilisateur, id_post, is_like })
    });
    fetchPosts();
  };

  const toggleReplyInput = (id_post: number) => {
    setReplyVisible((prev) => ({ ...prev, [id_post]: !prev[id_post] }));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen pt-28 px-4 md:px-8 text-white max-w-3xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-8 text-center bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
        Forum de discussion
      </h1>
      <ShadowBlue left="10%" top="20%" leftMd="15%" topMd="10%" leftLg="0%" topLg="15%" />
      <ShadowBlue left="10%" top="20%" leftMd="15%" topMd="10%" leftLg="80%" topLg="45%" />
     
      <div className="mb-6">
        <textarea
          value={texte}
          onChange={(e) => setTexte(e.target.value)}
          placeholder="Partage ton message..."
          className="w-full p-4 rounded-lg bg-white/10 border border-white/20 mb-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
        />
        <button
          onClick={() => publierPost(texte)}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 px-6 py-2 rounded-full font-semibold transition"
        >
          Publier
        </button>
      </div>

      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id_post} className="bg-white/5 border border-white/10 p-5 rounded-xl shadow-md hover:shadow-purple-900 transition">
            <div className="text-sm text-white/60 flex justify-between">
              <span className="font-semibold">{post.nom_utilisateur}</span>
              <span>{new Date(post.date_post).toLocaleString()}</span>
            </div>
            <p className="text-white mt-3 text-lg">{post.contenu}</p>

            <div className="mt-3 flex items-center gap-4 text-sm text-white/80">
              <button onClick={() => toggleLike(post.id_post, true)} className="hover:text-green-400 transition">👍 {post.likes}</button>
              <button onClick={() => toggleLike(post.id_post, false)} className="hover:text-red-400 transition">👎 {post.dislikes}</button>
              <button onClick={() => toggleReplyInput(post.id_post)} className="hover:text-blue-400 transition">💬 Répondre</button>
            </div>

            {replyVisible[post.id_post] && (
              <div className="mt-4">
                <textarea
                  value={reponseTextes[post.id_post] || ""}
                  onChange={(e) =>
                    setReponseTextes((prev) => ({ ...prev, [post.id_post]: e.target.value }))
                  }
                  placeholder="Répondre..."
                  className="w-full p-3 rounded bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
                />
                <button
                  className="mt-2 bg-green-600 px-4 py-2 rounded hover:bg-green-700 transition"
                  onClick={() => publierPost(reponseTextes[post.id_post], post.id_post)}
                >
                  Répondre
                </button>
              </div>
            )}

            {post.reponses && post.reponses.length > 0 && (
              <div className="mt-5 pl-5 border-l-2 border-purple-600 space-y-3">
                {post.reponses.map((rep) => (
                  <div key={rep.id_post} className="bg-white/10 p-3 rounded-lg">
                    <div className="text-sm text-white/60 mb-1">
                      <strong>{rep.nom_utilisateur}</strong> — {new Date(rep.date_post).toLocaleString()}
                    </div>
                    <p className="text-white">{rep.contenu}</p>
                    <div className="mt-2 flex gap-3 text-sm text-white/70">
                      <button onClick={() => toggleLike(rep.id_post, true)} className="hover:text-green-400">👍 {rep.likes}</button>
                      <button onClick={() => toggleLike(rep.id_post, false)} className="hover:text-red-400">👎 {rep.dislikes}</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forum;
