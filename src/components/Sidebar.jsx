import React from 'react'
import ImagenLogo from 'components/ImagenLogo';
import { Link } from 'react-router-dom';
<<<<<<< HEAD
import Ruta from 'components/RutaSidebar';


=======
import Ruta from 'components/Ruta';
//import { FontAwesomeIcon } from '@font-awesome/css/font-awesome.min.css';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
>>>>>>> dev

const Sidebar = () => {
    return (
        <nav className='hidden lg:flex lg:w-72 h-full border border-gray-300 flex-col bg-gray-50 p-4 m-4'>
                <Link to='/admin'>
                    <ImagenLogo/>
                </Link>
<<<<<<< HEAD
                <div className='my-8'>
                    <Ruta icono="fas fa-user" ruta="/admin/Perfil" nombre="Perfil"/>
                    <Ruta icono="fas fa-cart-arrow-down" ruta="/admin/Productos" nombre="Productos"/>
                    <Ruta icono='fas fa-cash-register' ruta='/admin/Ventas' nombre='Ventas'/>
                    <Ruta icono='fas fa-users' ruta='/admin/Usuarios' nombre='Usuarios'/>
=======
                <div className='my-4'>
                    <Ruta nombre="Perfil" icono="fa fa-user" ruta="/admin/Perfil" />
                    <Ruta nombre="Productos" icono="fa fa-product-hunt" ruta="/admin/Productos" />
                    <Ruta nombre='Ventas' icono='fa fa-cash-register' ruta='/admin/Ventas' />
                    <Ruta nombre='Usuarios' icono='fa fa-users' ruta='/admin/Usuarios' />
>>>>>>> dev
                </div>
                <button>Cerrar Sesión</button>
        </nav>
        
    );
};
export default Sidebar;
