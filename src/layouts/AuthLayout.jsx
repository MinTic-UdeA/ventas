import React from 'react';
import Logo from 'media/logoAnt.ico';
import { Link } from 'react-router-dom';

const AuthLayout = ({ children }) => {
  return (
    <div className='flex w-sceem h-screem'>
      <div className='flex flex-nowrape h-full w-full'>
        <Link to='/'>
          <i className='fas fa-home cursor-pointer hover:text-indigo-900' />
        </Link>
      </div>
      <div className='max-w-md w-full'>
        <img className='mx-auto h-45 w-auto' src={Logo} alt='Workflow' />
        {children}
      </div>
      <div className='w-full flex items-start'>
        <Link to='/'>
          <i className='fas fa-home cursor-pointer hover:text-indigo-900' />
        </Link>
      </div>
    </div>
  );
};

export default AuthLayout;
