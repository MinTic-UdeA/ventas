import React, { useEffect, useState } from 'react';

const TablaUsuarios = ({ listaUsuarios }) => {
  useEffect(() => {
    
  }, [listaUsuarios]);
  return (
    <div className='flex flex-col items-center justify-center'>
      <h2 className='text-2xl font-extrabold text-gray-800'>Todos los Usuarios</h2>
      <table className='bg red'>
        <thead>
          <tr>
            <th>Id de Usuario</th>
            <th>Nombre de Usuario</th>
            <th>Rol de Usuario</th>
            <th>Estado de Usuario</th>
          </tr>
        </thead>
       <tbody>
              <tr>
                <td>001</td>
                <td>juan perez</td>
                <td>administrador</td>
                <td>activo</td>
              </tr>
              <tr>
                <td>002</td>
                <td>Pablo lopez</td>
                <td>vendedor</td>
                <td>activo</td>
              </tr>
      </tbody>
      </table>
    </div>
    
  );
};


const FormularioCreacionUsuarios = () => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <h2 className='text-2xl font-extrabold text-gray-800'>Crear nuevo Usuario</h2>
      <form className='grid grid-cols-2'>
        <label for="fname" className='align-baseline'>Id de usuario:</label>
        <input className='bg-gray-50 border border-gray-600 p-1  m-2' type='text' />
        <label for="fname">Nombre:</label>
        <input className='bg-gray-50 border border-gray-600 p-1  m-2' type='text' />
        <label for="fname">Apellidos:</label>
        <input className='bg-gray-50 border border-gray-600 p-1  m-2' type='text' />
        <label for="fname">Teléfono:</label>
        <input className='bg-gray-50 border border-gray-600 p-1  m-2' type='text' />
        <label for="fname">Email:</label>
        <input className='bg-gray-50 border border-gray-600 p-1  m-2' type='text' />
        <label for="fname">Usuario:</label>
        <input className='bg-gray-50 border border-gray-600 p-1  m-2' type='text' />
        <label for="fname">Contraseña:</label>
        <input className='bg-gray-50 border border-gray-600 p-1  m-2' type='text' />
        <label for="fname">Confirme contraseña:</label>
        <input className='bg-gray-50 border border-gray-600 p-1  m-2' type='text' />
        <button className='boton m-2'>
          Guardar
        </button>
        <button className='boton m-2'>
          Cancelar
        </button>
      </form>
    </div>
  );
};

const Usuarios = () => {
  const [mostrarTabla, setMostrarTabla] = useState(true);
  const [Usuarios, setUsuarios] = useState([]);
  const [textoBoton, setTextoBoton] = useState('Crear Nuevo Usuario');

  useEffect(() => {
    if (mostrarTabla) {
      setTextoBoton('Crear Nuevo Usuario');
    } else {
      setTextoBoton('Mostrar Todos los Usuarios');
    }
  }, [mostrarTabla]);
  return (
    <div className='flex h-full w-full flex-col items-center justify-start p-8'>
      <div className='flex flex-col'>
        <h2 className='text-3xl font-extrabold text-gray-900'>
          Gestion de Usuarios
        </h2>
        <button onClick={() => {
          setMostrarTabla(!mostrarTabla);
        }}  className='boton'>
          {textoBoton}
        </button>
      </div>
      {mostrarTabla ? (
        <TablaUsuarios listaUsuarios={Usuarios} />) : (
        <FormularioCreacionUsuarios />
      )}
    </div>
  )
}

export default Usuarios
