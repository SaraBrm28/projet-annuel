import React, { useLayoutEffect, ReactNode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import ResetPasswordRequest from "./ResetPasswordRequest";
import VerifyCodeAndReset from './VerifyCode';
import App from "./App";
import Inscription from "./Inscription";
import Connexion from "./Connexion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Categorie from "./Categorie";
import Quiz from "./Quiz";
import MonCompte from "./MonCompte";
import Recherche from "./components/Recherche";
import "./index.css";
import { UserProvider } from "./UserContext";
import Resultat from "./Resultat";
import Forum from "./Forum";
import AdminPanel from "./AdminPanel";
import { Component } from "lucide-react";
import AdminUtilisateurs from './AdminUtilisateurs';
import AdminQuiz from "./AdminQuiz";
import ModifierQuiz from "./ModifierQuiz";
import AdminCommentaires from "./AdminCommentaires";
import CreerQuiz from "./CreerQuiz";
const Wrapper = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children;
};

const routes = [
  { path: "/", component: <App /> },
  { path: "/Inscription", component: <Inscription /> },
  { path: "/Connexion", component: <Connexion /> },
  { path: "/Categorie/:nom", component: <Categorie /> },
  { path: "/Quiz/:id", component: <Quiz /> },
  { path: "/MonCompte", component: <MonCompte /> },
  { path: "/recherche", component: <Recherche /> },
  { path: "/creer-quiz", component: <CreerQuiz /> },
  {
   path: "/admin/modifier/:id", component: <ModifierQuiz />
  },
  {
   path:"/admin/commentaires", component:<AdminCommentaires/>
  },
  {
   path:"/admin/utilisateurs", component:<AdminUtilisateurs/>
  },
  {path:"/admin/quiz", component: <AdminQuiz/>},
  {
    path: "/mot-de-passe-oublie",
    component: <ResetPasswordRequest />
  },
  { path: "/resultat/:id", component: <Resultat /> },
  { path: "/Forum", component: <Forum /> },
  { path:"/admin-panel" ,component: <AdminPanel /> },
  {
    path: "/verifier-code",
    component: <VerifyCodeAndReset />
  },
 
];

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <React.StrictMode>
      <UserProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <Wrapper>
            <Routes>
              {routes.map((route, i) => (
                <Route key={i} path={route.path} element={route.component} />
              ))}
            </Routes>
          </Wrapper>
          <Footer />
        </div>
      </UserProvider>
    </React.StrictMode>
  </BrowserRouter>
);
