import React, { useLayoutEffect, ReactNode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import App from "./App";
import Inscription from "./Inscription";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./index.css";
import Connexion from "./Connexion"
import { Component } from "lucide-react";
import Categorie from "./Categorie";



const Wrapper = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children;}


const routes = [
{
path : "/",
component : <App />,
},
{
  path : "/Inscription",
  component : <Inscription />,
  },
  {
    path:"Connexion",
    component: <Connexion/>
  },
  {
    path:"Categorie",
    component: <Categorie/>
  }


]
ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <React.StrictMode>
    <div className="flex flex-col min-h-screen">
        <Navbar />
          <Wrapper>
            <Routes>
              {routes.map((route, i) => (
                <Route key={i} path={route.path} element={route.component} />
              ))}
            </Routes>
            <Footer />
          </Wrapper>
      </div>
    </React.StrictMode>
  </BrowserRouter>
)
