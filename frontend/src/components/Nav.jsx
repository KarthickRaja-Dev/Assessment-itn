import { useState } from "react";
import PostJob from "./PostJob";

const Nav = ({ tamilNaduTopCities, getJobs }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <nav className="flex max-w-5xl items-center mx-auto justify-between px-10 py-4 bg-white shadow-sm rounded-full mt-4">
      <div className="flex items-center space-x-7">
        <img src="/logo.png" alt="Logo" className="h-8 w-8" />
        <a href="#home" className="nav-link">
          Home
        </a>
        <a href="#findjobs" className="nav-link">
          Find Jobs
        </a>
        <a href="#findtalents" className="nav-link">
          Find Talents
        </a>
        <a href="#aboutus" className="nav-link">
          About us
        </a>
        <a href="#testimonials" className="nav-link">
          Testimonials
        </a>
      </div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold px-6 py-2 rounded-full shadow-md hover:from-purple-600 hover:to-purple-800 transition"
      >
        Create Jobs
      </button>
      <PostJob
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          getJobs();
        }}
        tamilNaduTopCities={tamilNaduTopCities}
      />
    </nav>
  );
};

export default Nav;
