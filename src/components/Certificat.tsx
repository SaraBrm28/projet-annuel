import React from 'react'
import Button from './Button'
import ShadowBlue from './ShadowBlue'
import { PulsatingButton } from './magicui/pulsating-button'

import deco from '../assets/deco.jpeg'
import { Meteors } from './magicui/meteors'
import { useNavigate} from "react-router-dom";
import ShadowViolet from './ShadowViolet'

const Certificat = () => {
     const navigate = useNavigate();
  return (
  
          
        <div className='flex flex-row justify-between items-center gap-7'> 
        
    
    
    
    
        <div className="flex flex-col   justify-between items-center">
          
        
        
        <h1 className=" z-50 text-4xl  font-bold mt-1 mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-600">
            Relevez les defis et obtenez un certificat de succés!
          </h1>
         
         
          
           
           <div className="  z-50 relative group">
                           <div className="   group:hover:opacity-100  transition duration:200 absolute inset-0 bg-gradient-to-r from-third  to-primary rounded-full blur"> </div>
                        
                        <Button variant='primary' onClick={()=> navigate("/Categorie")}> Commencer  </Button>
                     
                        </div>
                        
            
           
         
        </div>
       
      
    
       </div>
  )
}

export default Certificat
