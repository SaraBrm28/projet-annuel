import React from 'react'
import Button from './Button'
import ShadowBlue from './ShadowBlue'
import { PulsatingButton } from './magicui/pulsating-button'

import deco from '../assets/deco.jpeg'
import { Meteors } from './magicui/meteors'
import { useNavigate} from "react-router-dom";
import ShadowViolet from './ShadowViolet'
import { SparklesText } from './magicui/sparkles-text'
const Envie = () => {
     const navigate = useNavigate();
  return (
      
    <div className='flex flex-row justify-between items-center gap-7'> 
    




    <div className="flex flex-col   justify-between items-center">
      
    
    <div>
        
    <h1 className=" z-50 text-4xl  font-bold mt-1 mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-600">
        Envie de créer votre propre quiz?
      </h1>
      
     </div>
      <p className='w-96 z-50 text-2xl text-slate-600 text-center mt-1 mb-14 '>Pas de problème ! Vous avez une idée géniale pour un quiz et vous souhaitez la partager avec le monde entier ? C'est simple et rapide. Cliquez sur le bouton ci-dessous pour commencer à créer votre propre quiz personnalisé.</p>
    
       
       <div className="  z-50 relative group">
                       <div className="   group:hover:opacity-100  transition duration:200 absolute inset-0 bg-gradient-to-r from-third  to-primary rounded-full blur"> </div>
                     
                    <Button variant='primary' onClick={()=> navigate("/Inscription")}> Créer mon quiz  </Button>
                 
                    </div>
                    
        
       
     
    </div>
   
  

   </div>


  )
}

export default Envie