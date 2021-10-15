import React, { useEffect, useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const UsuariosBackend = [
  {
    nombre: 'Nairo',
    apellido: 'Rojas',
    tipo: 'CC',
    cedula: '79171305',
    telefono: '3207259876',
    rol:'administrador',
    estado: 'autorizado'
  },
  {
    nombre: 'Camilo',
    apellido: 'Fernandez',
    tipo: 'CC',
    cedula: '5678907565',
    telefono: '3215987667',
    rol:'usuario',
    estado: 'pendiente'
  }
 ];

const Usuarios = () => {
  const [mostrarTabla, setMostrarTabla] = useState(true);
  const [Usuarios, setUsuarios] = useState([]);
  const [textoBoton, setTextoBoton] = useState('Crear Nuevo Usuarios');
  const [colorBoton, setColorBoton] = useState('indigo');

  useEffect(() => {
    //obtener lista de Usuarioss desde el backend
    setUsuarios(UsuariosBackend);
  }, []);

  useEffect(() => {
    if (mostrarTabla) {
      setTextoBoton('Crear Nuevo Usuario');
      setColorBoton('indigo');
    } else {
      setTextoBoton('Mostrar Todos los Usuarios');
      setColorBoton('green');
    }
  }, [mostrarTabla]);
  return (
    <div className='flex h-full w-full flex-col items-center justify-start p-8'>
      <div className='flex flex-col'>
        <h2 className='text-3xl font-extrabold text-gray-900'>
          Página de administración de Usuarios
        </h2>
        <button
          onClick={() => {
            setMostrarTabla(!mostrarTabla);
          }}
          className={`text-white bg-${colorBoton}-500 p-5 rounded-full m-6 w-28 self-end`}
        >
          {textoBoton}
        </button>
      </div>
      {mostrarTabla ? (
        <TablaUsuarios listaUsuarios={Usuarios} />
      ) : (
        <FormularioCreacionUsuarios
          setMostrarTabla={setMostrarTabla}
          listaUsuarios={Usuarios}
          setUsuarios={setUsuarios}
        />
      )}
      <ToastContainer position='bottom-center' autoClose={5000} />
    </div>
  );
};

const TablaUsuarios = ({ listaUsuarios }) => {
  useEffect(() => {
    console.log('este es el listado de Usuarios en el componente de tabla', listaUsuarios);
  }, [listaUsuarios]);
  return (
    <div className='flex flex-col items-center justify-center m-4 p-4'>
      <h2 className='text-2xl font-extrabold text-gray-800'>Todos los Usuarios</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Nombre del Usuario</th>
            <th>Apellido de Usuario</th>
            <th>Tio documento de Usuario</th>
            <th>Cedula del Usuario</th>
            <th>Telefono del Usuario</th>
            <th>Rol Usuario</th>
            <th>Estado Usuario</th>
          </tr>
        </thead>
        <tbody>
          {listaUsuarios.map((Usuario) => {
            return (
              <tr>
                <td>{Usuario.nombre}</td>
                <td>{Usuario.apellido}</td>
                <td>{Usuario.tipo}</td>
                <td>{Usuario.cedula}</td>
                <td>{Usuario.telefono}</td>
                <td>{Usuario.rol}</td>
                 <td>{Usuario.estado}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const FormularioCreacionUsuarios = ({ setMostrarTabla, listaUsuarios, setUsuarios }) => {
  const form = useRef(null);

  const submitForm = (e) => {
    e.preventDefault();
    const fd = new FormData(form.current);
    
    const nuevoUsuario = {};
    fd.forEach((value, key) => {
      nuevoUsuario[key] = value;
    });

    setMostrarTabla(true);
    setUsuarios([...listaUsuarios, nuevoUsuario]);
    // identificar el caso de éxito y mostrar un toast de éxito
    toast.success('Usuario agregado con éxito');
    // identificar el caso de error y mostrar un toast de error
    // toast.error('Error creando un Usuarios');
  };

  return (
    <div className='flex flex-col items-center justify-center'>
      <h2 className='text-2xl font-extrabold text-gray-800'>Crear nuevo Usuario</h2>
      <form ref={form} onSubmit={submitForm} className='flex flex-col'>
        <label className='flex flex-col' htmlFor='nombre'>
          Nombre del Usuario
          <input
            name='nombre'
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='text'
            placeholder='Nairo'
            required
          />
        </label>
        <label className='flex flex-col' htmlFor='apellido'>
        Apellido del Usuario
          <input
            name='apellido'
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='text'
            placeholder='Nairo'
            required
          />
        </label>
        <label className='flex flex-col' htmlFor='tipoDoc'>
          Tipo de documento del Usuario
          <select
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            name='tipoDoc'
            required
            defaultValue={0}
          >
            <option disabled value={0}>
              Seleccione una opción
            </option>
            <option>CC</option>
            <option>TI</option>
            <option>Pasaporte</option>
            <option>CE</option>
            </select>
        </label>
       <label className='flex flex-col' htmlFor='cedula'>
          Cédula del Usuario
          <input
            name='cedula'
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='text'
            placeholder='7971305'
            required
          />
        </label>
        <label className='flex flex-col' htmlFor='telefono'>
          Teléfono del Usuario
          <input
            name='telefono'
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='text'
            placeholder='3208907685'
            required
          />
        </label>
        <label className='flex flex-col' htmlFor='edad'>
          Edad Usuario
          <input
            name='edad'
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='number'
            min={1}
            max={100}
            placeholder= '45'
           />
        </label>
        <label className='flex flex-col' htmlFor='rol'>
          Rol del Usuario
          <select
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            name='rol'
            required
            defaultValue={0}
          >
            <option disabled value={0}>
              Seleccione una opción
            </option>
            <option>Administrador</option>
            <option>Vendedor</option>
            </select>
        </label>
        <label className='flex flex-col' htmlFor='estado'>
          Tipo de documento del Usuario
          <select
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            name='estado'
            required
            defaultValue={0}
          >
            <option disabled value={0}>
              Seleccione una opción
            </option>
            <option>Pendiente</option>
            <option>Autorizado</option>
            <option>No Autorizado</option>
            </select>
        </label>
        
        <button
          type='submit'
          className='col-span-2 bg-green-400 p-2 rounded-full shadow-md hover:bg-green-600 text-white'
        >
          Guardar Usuario
        </button>
      </form>
    </div>
  );
};

export default Usuarios;
