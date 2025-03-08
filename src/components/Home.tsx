import React from "react";
import Searchbar from "./Searchbar";
import physique from '../assets/physique.png'
import { Marquee } from "./magicui/marquee";
import { BorderBeam } from "./magicui/border-beam";
import ShadowBlue from "./ShadowBlue";
import { title } from "process";
import ShadowViolet from "./ShadowViolet";
import { BentoGrid } from "./magicui/bento-grid";
import Envie from "./Envie";
import { NeonGradientCard } from "./magicui/neon-gradient-card";
import anatomie from "../assets/anatomie.jpg"
import geographie from "../assets/geographie.jpg"
import reseau from "../assets/reseau.jpg"
import literature from "../assets/literature.jpg"
import astronomie from "../assets/astronomie.jpg"
import naruto from "../assets/naruto.jpg"
import { Meteors } from "./magicui/meteors";
import { MagicCard } from "./magicui/magic-card";
import Certificat from "./Certificat";
import { Neon } from "./magicui/neon";

const categories = [
  { title: "Littérature et grands auteurs", image: "src/assets/literature.jpg", borderColor: "border-pink-400" },
  { title: "Anatomie", image: "src/assets/anatomie.jpg", borderColor: "border-pink-400" },
  { title: "Astronomies", image: "src/assets/astronomie.jpg", borderColor: "border-pink-400" },
  { title: "Physique et lois fondamentales", image: "src/assets/physique.png", borderColor: "border-pink-400" },
  { title: "Géographie", image: "src/assets/geographie.jpg", borderColor: "border-pink-400" },
  { title: "Systèmes et réseaux", image: "src/assets/reseau.jpg", borderColor: "border-pink-400" },

];

const Home = () => {
  return (
    <div className="flex flex-col items-center min-h-screen text-center px-4 pt-20">
      <div className="absolute left-8 top-5"><ShadowBlue/></div>
      <Searchbar />
      <h1 className="text-3xl font-bold mt-28 mb-14 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-600">
        Decouvrez nos differentes categories
      </h1>
<div className="ml-6 mr-6">
     <Marquee>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
        {categories.map((category, index) => (
          <div
            key={index}
            className={`relative w-64 h-40 overflow-hidden rounded-xl ${category.borderColor} border-[1px]`}
          >
            <img
              src={category.image}
              alt={category.title}
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute bottom-0 left-0 w-full bg-black/60 text-white text-center p-2">
              {category.title}
            </div>
          </div>
        ))}
      </div>
      </Marquee>
      </div>
      <h1 className="text-4xl font-bold mt-56 mb-28 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-600">
        Nos quiz les plus populaires
      </h1>
      <div className="absolute -bottom-1.5 -left-1">
      </div> 
      <div className="h-screen w-full  flex items-center justify-center ">
       <div className=" grid h-full w-[1000px] grid-cols-5 grid-rows-3 gap-3 p-20 xl:m-64  md:m-3"> 
        <div className="col-span-3 row-span-1   ">
          <NeonGradientCard>
          
          </NeonGradientCard>
        </div>
        <div className="col-span-2 row-span-1 ">
        <NeonGradientCard className=" items-center ">
            <span  className=" z-10 text-center text-5xl font-bold  tracking-tighter text-black ">
             </span>
          </NeonGradientCard>
           </div>
        <div className="col-start-2 col-span-3 row-span-1"> 
        <NeonGradientCard>
            <span  className="pointer-events-none z-10 h-full    bg-clip-text text-center text-5xl font-bold leading-none tracking-tighter text-black ">
             </span>
          </NeonGradientCard>
          </div>
         </div>
         
        </div> 
        
       
        <div className="flex  flex-row justify-between items-center gap-6 w-3/4">
           <div>   <Neon> <Envie/> </Neon>
           
           </div>
          

           <Neon> <Certificat/> </Neon>
           </div>
        
       
        
    </div>
  );
};

export default Home;


               
                
            
       
   
