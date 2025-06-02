import React, { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<string | null>(null);

  const handleSubscribe = async () => {
    setStatus(null);
    if (!email.includes('@')) {
      setStatus('❌ Email invalide.');
      return;
    }

    try {
      const res = await fetch('http://localhost/quizverse/api/subscribe_newsletter.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (data.success) {
        setStatus('✅ Merci ! Vous recevrez nos prochaines nouveautés.');
        setEmail('');
      } else {
        setStatus('❌ ' + (data.error || 'Erreur inconnue.'));
      }
    } catch (err) {
      console.error(err);
      setStatus('❌ Erreur réseau.');
    }
  };

  return (
    <div className="mt-32 mb-20 w-full max-w-2xl text-white text-center bg-white/10 p-8 rounded-xl  glass-morphism border border-white/20">
      <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-6">
        📬 Abonnez-vous à la newsletter
      </h2>
      <p className="text-white/80 mb-6">
        Pour ne rater aucune nouveauté, recevez une alerte dès qu’un nouveau quiz est disponible.
      </p>
      <div className="flex gap-4 justify-center items-center">
        <input
          type="email"
          placeholder="Votre email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="p-3 rounded-xl w-2/3 bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none"
        />
        <button
          onClick={handleSubscribe}
          className="bg-gradient-to-r from-primary to-third text-white px-5 py-2 rounded-full font-medium hover:scale-105 transition"
        >
          S’abonner
        </button>
      </div>
      {status && <p className="mt-4 text-sm">{status}</p>}
    </div>
  );
};

export default Newsletter;
