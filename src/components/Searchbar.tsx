import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { BorderBeam } from './magicui/border-beam'
const Searchbar = () => {
  return (
    
    <form className="z-50 pt-2  w-[500px] relative">
      
        <div className="relative">
            <input type="search" placeholder="Recherchez votre quiz" className="w-full border border-gray-700 p-4 rounded-full bg-slate-600  "/>
       <button className='absolute right-1  top-1/2 -translate-y-1/2 p-4 rounded-full bg-slate-500 '> <AiOutlineSearch /></button>
        </div>
    </form>
    
  )
}

export default Searchbar