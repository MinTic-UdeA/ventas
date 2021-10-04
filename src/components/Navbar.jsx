import React from 'react';
import { Link } from 'react-router-dom';
import Logo from 'media/logoAnt.ico';
import Ruta from 'components/Ruta';
//import TriggerDarkMode from './TriggerDarkMode';

const Navbar = () => {
  return (
    <nav className='h-20 bg-gray-100'>
      <ul className='flex w-full justify-between items-center'>
        <li><img className='mx-auto h-20 w-auto p-3 rounded-t-3xl' src={Logo} alt='Workflow' /></li>
        <li className='font-bold text-2xl text-gray-700'>Modulo de Gestión de Ventas</li>
       <li className='px-3'>
          <Ruta nombre='Inicio Sesión' ruta='/auth/Login'/>
      </li>
      </ul>
    </nav>
  );
};

export default Navbar;
