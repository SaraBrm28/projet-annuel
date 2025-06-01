import React, { useState } from "react";

const ResetPasswordRequest = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("http://localhost/quizverse/api/send_code.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    if (data.message) {
        setMessage("✅ " + data.message);
        setTimeout(() => {
          window.location.href = `/verifier-code?email=${encodeURIComponent(email)}`;
        }, 1000); 
      } else {
        setMessage("❌ " + data.error);
      }
      
  };

  return (
    <div className="pt-32 text-center text-white">
      <h1 className="text-2xl font-bold mb-4">Mot de passe oublié</h1>
      <form onSubmit={handleSendCode} className="max-w-md mx-auto space-y-4">
        <input
          type="email"
          placeholder="Votre e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 rounded bg-white/10 text-white"
        />
        <button type="submit" className="bg-blue-500 py-2 px-4 rounded">
          Envoyer le code
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default ResetPasswordRequest;
