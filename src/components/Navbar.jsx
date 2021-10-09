import React from 'react';
import { Link } from 'react-router-dom';
import Logo from 'media/logo.ico';
import Ruta from 'components/Ruta';


const Navbar = () => {
  return (
    <nav className='h-20 bg-gray-100'>
      <ul className='flex w-full justify-between items-center'>
        <li><img className='mx-auto h-20 w-auto p-3 rounded-t-3xl' src={Logo} alt='Workflow' /></li>
        <li className='font-bold text-2xl text-gray-700'>Gestión de Ventas</li>
       <li className='px-3'>
      
          <Link to='/login'>
            <button className='bg-indigo-500 p-2 text-white rounded-lg shadow-md hover:bg-indigo-700'>
              Iniciar Sesión
            </button>
          </Link>
      </li>
      </ul>
    </nav>
  );
};

export default Navbar;
