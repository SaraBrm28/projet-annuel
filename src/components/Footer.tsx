import React from 'react'
import { FaEnvelope, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import Logoo from '../assets/logoo.png'

const Footer = () => {
  return (
    <footer className="  pt-32  bg-black text-white py-6  cursor-none">
      <div className="container mx-auto text-center">
       <div className="  pb-3 flex place-content-center justify-center">
         <a href='#'>
                    <img src={Logoo} alt='logo' className='w-40'>
                    
                    </img>
                </a>
        </div>
        <nav className="mb-4  ">
          <ul className="flex justify-center space-x-6  text-sm">
            <li>
              <a href="#" className="hover:text-indigo-400 hoverElement  ">
                ACCUEIL
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-indigo-400 hoverElement">
                FORUM
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-indigo-400 hoverElement ">
                PROJETS
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-indigo-400 hoverElement ">
                À PROPOS
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-indigo-400 hoverElement ">
                CONTACT
              </a>
            </li>
          </ul>
        </nav>
        <hr className="border-gradient-to-r from-third  to-primary w-2/3 mx-auto mb-4" />


<div className="flex justify-center   space-x-4 mb-4">
<div className=" relative group hoverElement ">
                <div className="   group:hover:opacity-100  transition duration:200 absolute inset-0 bg-gradient-to-r from-third  to-primary rounded-full blur"> </div>
             <button  className=" cursor-none  relative leading-none text-white bg-black px-4 py-2  rounded-full hover:scale-105 duration-200"> <FaFacebook size={20}/> </button>
             </div>
  <div className=" relative group hoverElement cursor-none">
                <div className="   group:hover:opacity-100  transition duration:200 absolute inset-0 bg-gradient-to-r from-third  to-primary rounded-full blur"> </div>
             <button  className="  cursor-none relative leading-none text-white bg-black px-4 py-2  rounded-full hover:scale-105 duration-200"> <FaInstagram size={20}/> </button>
             </div>
  <div className=" relative group hoverElement cursor-none">
                <div className="   group:hover:opacity-100  transition duration:200 absolute inset-0 bg-gradient-to-r from-third  to-primary rounded-full blur"> </div>
             <button  className=" cursor-none  relative leading-none text-white bg-black px-4 py-2  rounded-full hover:scale-105 duration-200"> <FaLinkedin size={20}/> </button>
             </div>
</div>


<div className="text-xs text-gray-400 flex justify-between w-3/4 mx-auto">
  <p>© 2025 quizverse. Tous droits réservés</p>
  <a href="#" className="hover:text-indigo-400">
    Politique de confidentialité
  </a>
</div>
        </div>
        </footer>
  )
}

export default Footer