import React from 'react'
import {Link} from 'react-router-dom';
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Ruta = ({nombre, icono, ruta})=>{
    return(
        <Link to={ruta}>
            <button className='p-1 my-2 bg-red-700 hover:bg-indigo-900 flex justify-center w-full text-white rounded-md'>
            <i class={`${icono} w-8`}>i</i>
                {nombre}
            </button>
           </Link>
    );
};
 export default Ruta;