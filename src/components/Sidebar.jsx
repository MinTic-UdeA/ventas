import React from 'react'
import ImagenLogo from 'components/ImagenLogo';
import { Link } from 'react-router-dom';
import Ruta from 'components/RutaSidebar';



const Sidebar = () => {
    return (
        <nav className='hidden lg:flex lg:w-72 h-full border border-gray-300 flex-col bg-gray-50 p-4 m-4'>
                <Link to='/admin'>
                    <ImagenLogo/>
                </Link>
                <div className='my-8'>
                    <Ruta icono="fas fa-user" ruta="/admin/Perfil" nombre="Perfil"/>
                    <Ruta icono="fas fa-cart-arrow-down" ruta="/admin/Productos" nombre="Productos"/>
                    <Ruta icono='fas fa-cash-register' ruta='/admin/Ventas' nombre='Ventas'/>
                    <Ruta icono='fas fa-users' ruta='/admin/Usuarios' nombre='Usuarios'/>
                </div>
                <button>Cerrar Sesión</button>
        </nav>
        
    );
};
export default Sidebar;
