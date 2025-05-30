import { createContext, useContext, useState, useEffect } from "react";

type UserContextType = {
  idUtilisateur: number | null;
  nomUtilisateur: string | null;
  email: string | null;
  setUser: (id: number | null, nom: string | null, email?: string | null) => void;
};

const UserContext = createContext<UserContextType>({
  idUtilisateur: null,
  nomUtilisateur: null,
  email: null,
  setUser: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [idUtilisateur, setIdUtilisateur] = useState<number | null>(null);
  const [nomUtilisateur, setNomUtilisateur] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const id = localStorage.getItem("id_utilisateur");
    const nom = localStorage.getItem("nom_utilisateur");
    const email = localStorage.getItem("email");

    if (id) setIdUtilisateur(parseInt(id));
    if (nom) setNomUtilisateur(nom);
    if (email) setEmail(email);
  }, []);

  const setUser = (id: number | null, nom: string | null, emailOpt?: string | null) => {
    if (id !== null) localStorage.setItem("id_utilisateur", id.toString());
    if (nom !== null) localStorage.setItem("nom_utilisateur", nom);
    if (typeof emailOpt === "string") {
      localStorage.setItem("email", emailOpt);
      setEmail(emailOpt);
    }
    

    setIdUtilisateur(id);
    setNomUtilisateur(nom);
  };

  return (
    <UserContext.Provider value={{ idUtilisateur, nomUtilisateur, email, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
