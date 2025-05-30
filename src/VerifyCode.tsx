import React, { useState } from "react";

const VerifyCode = () => {
  const [email, setEmail] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("email") || "";
  });
  
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("http://localhost/quizverse/api/verify_code_and_reset.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code, mot_de_passe: password }),
    });

    const data = await res.json();
    setMessage(data.message || data.error);
  };

  return (
    <div className="pt-32 text-center text-white">
      <h1 className="text-2xl font-bold mb-4">Vérifier le code</h1>
      <form onSubmit={handleVerify} className="max-w-md mx-auto space-y-4">
        <input
          type="email"
          placeholder="Votre e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 rounded bg-white/10 text-white"
        />
        <input
          type="text"
          placeholder="Code reçu"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full p-2 rounded bg-white/10 text-white"
        />
        <input
          type="password"
          placeholder="Nouveau mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 rounded bg-white/10 text-white"
        />
        <button type="submit" className="bg-green-500 py-2 px-4 rounded">
          Réinitialiser
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default VerifyCode;
