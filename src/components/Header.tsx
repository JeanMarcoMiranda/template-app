import React from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  onLogout: () => void
}

const Header: React.FC<HeaderProps> = ({onLogout}) => {
  return (
    <header className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          MyApp
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded" onClick={() => onLogout()}>
              Logout 
            </button> 
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;