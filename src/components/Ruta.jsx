import React from 'react'
import {Link} from 'react-router-dom';
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Ruta = ({nombre, icono, ruta})=>{
    return(
        <Link to={ruta}>
            <button className='p-1 my-2 bg-red-700 hover:bg-indigo-900 flex justify-items-center w-full text-white rounded-md'>
            <div class={`${icono} w-8`}></div> 
            {nombre}
            </button>
           </Link>
    );
};
 export default Ruta;