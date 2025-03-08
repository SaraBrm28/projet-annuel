import React from 'react'
import Logoo from '../assets/logoo.png'

import Button from './Button'
import { useNavigate} from "react-router-dom";
const Menus =[
    {
        id:1,
        name:"Accueil",
        link:"/#",
    },
    {
     id: 2,
     name: "Nos quiz",
     link: "/#",
    },
    {
        id:3,
        name:"Forum",
        link:"/#",

    },
    {
        id:4,
        name:"Categorie",
        link:"/Categorie",
    },
    
]
const Navbar = () => {
    const navigate = useNavigate();

    
  return (
    <div className="  bg-black cursor-none"> 
    <div className=" py-1 pl-8 " >
        <div className="flex justify-between  gap-5 ">
    
        <a href='#'  onClick={()=> navigate("/")}>
            <img src={Logoo} alt='logo' className='w-40'>
            
            </img>
        </a>
         <div className="  pr-14 flex justify between items-center gap-8">
            
            <ul className="  text-white  hidden sm:flex items-center gap-7">
                
                {Menus.map(( data,index) => (
                    <li key={index}>
                        <a href={data.link} className="">
                            {data.name}
                        </a>
                    </li>
                ))}
                
            </ul>
            
            <div className=" relative group">
                <div className="   group:hover:opacity-100  transition duration:200 absolute inset-0 bg-gradient-to-r from-third  to-primary rounded-full blur"> </div>
              
             <Button variant='primary' onClick={()=> navigate("/Connexion")}> Mon compte  </Button>
          
             </div>
             
             </div>
        </div>
    
    </div> 
    </div>
  )
}

export default Navbar;