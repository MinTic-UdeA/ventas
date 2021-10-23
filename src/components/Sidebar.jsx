import React from 'react'
import ImagenLogo from 'components/ImagenLogo';
import { Link } from 'react-router-dom';
import Ruta from 'components/Ruta';
//import { FontAwesomeIcon } from '@font-awesome/css/font-awesome.min.css';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAuth0 } from "@auth0/auth0-react";

const Sidebar = () => {
    const { logout } = useAuth0();
    return (
        <nav className='hidden lg:flex lg:w-72 h-full border border-gray-300 flex-col bg-gray-50 p-4 m-4'>
                <Link to='/admin'>
                    <ImagenLogo/>
                </Link>
                <div className='my-4'>
                    <Ruta nombre="Perfil" icono="fa fa-user" ruta="/admin/Perfil" />
                    <Ruta nombre="Productos" icono="fa fa-product-hunt" ruta="/admin/Productos" />
                    <Ruta nombre='Ventas' icono='fa fa-cash-register' ruta='/admin/Ventas' />
                    <Ruta nombre='Usuarios' icono='fa fa-users' ruta='/admin/Usuarios' />
                </div>
                <button onClick={() => logout({ returnTo: window.location.origin })}>Cerrar Sesión</button>
        </nav>
        
    );
};
export default Sidebar;
