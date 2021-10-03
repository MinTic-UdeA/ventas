import React from 'react'
import {Link} from 'react-router-dom';
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Ruta = ({icono, ruta, nombre})=>{
    return(
        <Link to={ruta}>
            <button className='p-1 my-2 bg-indigo-700 hover:bg-indigo-900 flex justify-center w-full text-white rounded-md'>
            <i class={`${icono} w-8`}>i</i>
                {nombre}
            </button>
           </Link>
    );
};
 export default Ruta;