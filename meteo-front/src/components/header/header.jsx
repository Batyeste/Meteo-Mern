import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CloudSun, Menu, X, Search } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <header className="bg-white shadow-sm dark:bg-gray-800">
      <div className="w-full mx-auto max-w-screen-xl p-4">
        <div className="flex items-center justify-between">
          {/* Logo et Titre */}
          <Link to="/" className="flex items-center space-x-3">
            <CloudSun size={28} className="text-blue-500" />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Météo Ipssi
            </span>
          </Link>

          {/* Navigation pour desktop */}
          <nav className="hidden md:flex md:space-x-8">
            <Link
              to="/"
              className="text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-white"
            >
              Accueil
            </Link>
            <Link
              to="/pays"
              className="text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-white"
            >
              Pays
            </Link>
            <Link
              to="/villes"
              className="text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-white"
            >
              Villes
            </Link>
            <Link
              to="/previsions"
              className="text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-white"
            >
              Prévisions
            </Link>
          </nav>

          {/* Boutons pour mobile */}
          <div className="flex items-center space-x-4 md:space-x-6">
            <button
              onClick={toggleSearch}
              className="p-2 text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
              <Search size={20} />
            </button>
            <button
              onClick={toggleMenu}
              type="button"
              className="md:hidden p-2 text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Barre de recherche déroulante */}
        {isSearchOpen && (
          <div className="mt-3 pb-2">
            <form className="flex items-center">
              <label htmlFor="simple-search" className="sr-only">
                Rechercher
              </label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search size={16} className="text-gray-500 dark:text-gray-400" />
                </div>
                <input
                  type="text"
                  id="simple-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Rechercher une ville..."
                />
              </div>
              <button
                type="submit"
                className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-500 rounded-lg border border-blue-700 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <Search size={16} />
                <span className="sr-only">Rechercher</span>
              </button>
            </form>
          </div>
        )}

        {/* Menu mobile */}
        {isMenuOpen && (
          <nav className="md:hidden mt-3 pb-3 border-t border-gray-200 dark:border-gray-700">
            <ul className="flex flex-col space-y-4 mt-4">
              <li>
                <Link
                  to="/"
                  className="block text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  to="/pays"
                  className="block text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Pays
                </Link>
              </li>
              <li>
                <Link
                  to="/villes"
                  className="block text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Villes
                </Link>
              </li>
              <li>
                <Link
                  to="/previsions"
                  className="block text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Prévisions
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}