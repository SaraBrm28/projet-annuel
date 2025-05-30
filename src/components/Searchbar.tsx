import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Searchbar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const res = await fetch(`http://localhost/quizverse/api/search_quiz.php?q=${encodeURIComponent(query)}`);
    const data = await res.json();

    navigate("/recherche", { state: { results: data } });
  };

  return (
    <form onSubmit={handleSearch} className="z-50 pt-2 w-[500px] relative">
      <div className="relative">
        <input
          type="search"
          placeholder="Recherchez votre quiz"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full border border-gray-700 p-4 rounded-full bg-slate-600"
        />
        <button
          type="submit"
          className="absolute right-1 top-1/2 -translate-y-1/2 p-4 rounded-full bg-slate-500"
        >
          <AiOutlineSearch />
        </button>
      </div>
    </form>
  );
};

export default Searchbar;
