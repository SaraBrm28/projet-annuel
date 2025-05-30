import React, { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import ShadowBlue from './components/ShadowBlue';
import Button from './components/Button';
import { useUser } from './UserContext';

const Connexion = () => {
  const [username, setUsername] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    

    try {
      const response = await fetch('http://localhost/quizverse/api/connexion.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nom_utilisateur: username,
          mot_de_passe: motDePasse,
        }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("id_utilisateur", data.id_utilisateur);
        localStorage.setItem("nom_utilisateur", data.nom_utilisateur);
        localStorage.setItem("email", data.email);
        localStorage.setItem("role", data.role);
        setUser(data.id_utilisateur, data.nom_utilisateur, data.email); // ✅ email ajouté
        navigate('/');
      } else {
        setMessage('❌ ' + (data.error || 'Erreur de connexion'));
      }
    } catch {
      setMessage('❌ Erreur de connexion au serveur.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <main className="flex-grow flex justify-center items-center pt-28 pb-64 p-8">
          <div className="justify-between w-1/2 pr-8">
            <h1 className="pr-14 font-bold text-4xl mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-fuchsia-600">
                Bienvenue sur QuizVerse ! prêts à tester vos connaissances ?
              </span>
            </h1>
          </div>

          <ShadowBlue left="10%" top="20%" leftMd="15%" topMd="10%" leftLg="0%" topLg="15%" />

          <div className="items-center w-1/3">
            <div className="glass-morphism-two p-8 rounded-2xl">
              <h2 className="text-2xl font-bold mb-6 text-center">CONNEXION</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm mb-2 text-white">Nom d'utilisateur</label>
                  <input
                    type="text"
                    className="w-full p-2 rounded-full bg-white/20 border border-white/30"
                    placeholder="Entrez votre nom d'utilisateur"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm mb-2 text-white">Mot de passe</label>
                  <input
                    type="password"
                    className="w-full p-2 rounded-full bg-white/20 border border-white/30"
                    placeholder="Entrez votre mot de passe"
                    value={motDePasse}
                    onChange={(e) => setMotDePasse(e.target.value)}
                  />
                </div>
                <div className="mb-6">
                  <Link to="/mot-de-passe-oublie" className="text-sm text-fuchsia-400 hover:underline">
                    Mot de passe oublié ?
                  </Link>
                </div>

                <ShadowBlue left="10%" top="20%" leftMd="15%" topMd="10%" leftLg="-90%" topLg="90%" />

                <div className="relative group mt-4">
                  <div className="group-hover:opacity-100 transition duration-200 absolute inset-0 bg-gradient-to-r from-third to-primary rounded-full blur"></div>
                  <Button variant="primary">Se connecter</Button>
                </div>
              </form>

              {message && <p className="mt-4 text-center text-white">{message}</p>}

              <p className="mt-4 text-center text-sm">
                Vous n'avez pas de compte ?{" "}
                <Link to="/Inscription" className="text-fuchsia-400 hover:underline">
                  S'inscrire
                </Link>
              </p>
            </div>
          </div>
        </main>
      </div>
      <ShadowBlue left="10%" top="20%" leftMd="15%" topMd="10%" leftLg="40%" topLg="0%" />
    </div>
  );
};

export default Connexion;
