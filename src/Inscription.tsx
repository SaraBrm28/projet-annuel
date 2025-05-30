import React, { useState, FormEvent } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import ShadowBlue from './components/ShadowBlue';
import Button from './components/Button';
import { useNavigate, Link } from 'react-router-dom';
const Inscription = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost/quizverse/api/inscription.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nom_utilisateur: username,
          email: email,
          mot_de_passe: motDePasse,
        }),
      });

      const data = await response.json();

      if (data.message) {
        setMessage('✅ ' + data.message);
        setUsername('');
        setEmail('');
        setMotDePasse('');
      } else if (data.error) {
        setMessage('❌ ' + data.error);
      }
    } catch (error) {
      setMessage("❌ Erreur de connexion au serveur.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <main className="flex-grow flex justify-center items-center pt-28 pb-64 p-8">
          <div className=" justify-between  w-1/2 pr-8">
            <h1 className="pr-14 font-bold text-4xl mb-4"> <span className='text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-fuchsia-600'>Bienvenue sur QuizVerse ! prets a tester vos connaissances? </span></h1>
          </div>
          <div className="">
            <ShadowBlue left="10%" top="20%" leftMd="15%" topMd="10%" leftLg="0%" topLg="15%" />
          </div>
          <div className=" items-center w-1/3 ">
            <div className="  glass-morphism-two p-8  rounded-2xl ">
              <h2 className=" place-self-center  text-2xl font-bold mb-6">Inscription</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-primary block text-sm font-medium mb-2">Nom d'utilisateur</label>
                  <input
                    type="text"
                    className="w-full p-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30"
                    placeholder="Entrez votre nom d'utilisateur"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-primary block text-sm font-medium mb-2">Email:</label>
                  <input
                    type="email"
                    className="w-full p-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30"
                    placeholder="Entrez votre Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-primary block text-sm font-medium mb-2">Mot de passe</label>
                  <input
                    type="password"
                    className="w-full p-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30"
                    placeholder="Entrez votre mot de passe"
                    value={motDePasse}
                    onChange={(e) => setMotDePasse(e.target.value)}
                  />
                </div>

                <div className="">
                  <ShadowBlue left="10%" top="20%" leftMd="15%" topMd="10%" leftLg="80%" topLg="20%" />
                </div>

                <div className="relative group mt-4">
                  <div className="  group:hover:opacity-100  transition duration:200 absolute inset-0 bg-gradient-to-r from-third  to-primary rounded-full blur"></div>
                  <Button variant={'primary'}> S'inscrire</Button>
                </div>
              </form>
              {message && (
                <p className="mt-4 text-center text-sm text-white">{message}</p>
              )}
              <p className="mt-4 text-center text-sm">
                Vous n'avez deja un compte? <Link to="/Connexion" className="text-fuchsia-400 hover:underline">
                Se connecter
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

export default Inscription;
