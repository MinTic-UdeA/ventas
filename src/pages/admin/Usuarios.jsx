import React, { useEffect, useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { nanoid } from 'nanoid';
import { Dialog, Tooltip } from '@material-ui/core';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { obtenerUsuarios } from 'utils/api';

const Usuarios = () => {
  const [mostrarTabla, setMostrarTabla] = useState(true);
  const [usuarios, setUsuarios] = useState([]);
  const [textoBoton, setTextoBoton] = useState('Nuevo Usuario');
  const [colorBoton, setColorBoton] = useState('red');
  const [ejecutarConsulta, setEjecutarConsulta] = useState(true);

  useEffect(() => {
        console.log('consulta', ejecutarConsulta);
        if (ejecutarConsulta) {
            obtenerUsuarios(setUsuarios, setEjecutarConsulta);
        }
    }, [ejecutarConsulta]);

  useEffect(() => {
        //obtener lista de usuarios desde el backend
        if (mostrarTabla) {
            setEjecutarConsulta(true);
        }
    }, [mostrarTabla]);

  useEffect(() => {
    if (mostrarTabla) {
      setTextoBoton('Nuevo Usuario');
      setColorBoton('blue');
    } else {
      setTextoBoton('Mostrar Usuarios');
      setColorBoton('green');
    }
  }, [mostrarTabla]);
  return (
    <div className='flex h-full w-full flex-col items-center justify-start p-8'>
      <div className='flex flex-col w-full'>
        <h2 className='text-3xl font-extrabold text-gray-900'>
          Administración de Usuarios
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
        <TablaUsuarios listaUsuarios={usuarios} setEjecutarConsulta={setEjecutarConsulta}/>
      ) : (
        <FormularioCreacionUsuarios
          setMostrarTabla={setMostrarTabla}
          listaUsuarios={usuarios}
          setUsuarios={setUsuarios}
        />
      )}
      <ToastContainer position='bottom-center' autoClose={5000} />
    </div>
  );
};

const TablaUsuarios = ({ listaUsuarios, setEjecutarConsulta  }) => {
  const [busqueda, setBusqueda] = useState('');
  const [usuariosFiltrados, setUsuariosFiltrados] = useState(listaUsuarios);

  useEffect(() => {
    setUsuariosFiltrados(
      listaUsuarios.filter((elemento) => {
                return JSON.stringify(elemento).toLowerCase().includes(busqueda.toLowerCase());
            })
    )
  }, [busqueda, listaUsuarios]);

  return ( 
    <div className='flex flex-col items-center justify-center w-full'>
      <input
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder='Buscar'
        className='border-2 border-gray-700 px-3 py-1 self-start rounded-md focus:outline-none focus:border-indigo-500'
      />
      <h2 className='text-2xl font-extrabold text-gray-800'>Listado de Usuarios</h2>
      <div className='hidden md:flex w-full'>
        <table className='table'>
          <thead>
            <tr>
              <th>Id Usuario</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Telefono</th>
              <th>Email</th>
              <th>Usuario</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuariosFiltrados.map((Usuario) => {
              return (
                <FilaUsuario key={nanoid()} valuesUsuario={Usuario} setEjecutarConsulta={setEjecutarConsulta} />
              );
            })}
          </tbody>
        </table>
      </div>
      <div className='flex flex-col w-full m-2 md:hidden'>
        {usuariosFiltrados.map((fUsuario) => {
          return (
            <div className='bg-gray-400 m-2 shadow-xl flex flex-col p-2 rounded-xl'>
              <span>{fUsuario.nombre}</span>
              <span>{fUsuario.apellido}</span>
              <span>{fUsuario.teléfono}</span>
              <span>{fUsuario.email}</span>
              <span>{fUsuario.usuario}</span>
              {fUsuario.estado === 1 ?
                (<span>aqui</span>) : (<span>paso</span>)
              }
            </div>
          );
        })}
      </div>
    </div>
  );
};

const FilaUsuario = ({ valuesUsuario, setEjecutarConsulta }) => {
    console.log(valuesUsuario)
    const [edit, setEdit] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [infoNuevoUsuario, setInfoNuevoUsuario] = useState({
        idUsuario: valuesUsuario.id,
        nombre: valuesUsuario.nombre,
        apellido: valuesUsuario.apellido,
        telefono: valuesUsuario.telefono,
        email: valuesUsuario.email,
        usuario: valuesUsuario.usuario,
        rol: valuesUsuario.rol,
        estado: valuesUsuario.estado,
    });

    const actualizarUsuario = async () => {
        //enviar la info al backend
        const options = {
            method: 'PUT',
            url: `https://apiants.herokuapp.com/Usuarios/${valuesUsuario.id}`,
            headers: { 'Content-Type': 'application/json' },
            data: { ...infoNuevoUsuario },
        };

        await axios
            .request(options)
            .then(function (response) {
                console.log(response.data);
                if (response.data === "ok") {
                    toast.success('usuario modificado con éxito');
                }
                setEdit(false);
                setEjecutarConsulta(true);
            })
            .catch(function (error) {
                toast.error('Error modificando el usuario');
                console.error(error);
            });
    };

    const eliminarUsuario = async () => {
        const options = {
            method: 'DELETE',
            url: `https://apiants.herokuapp.com/Usuarios/${valuesUsuario.id}`,
            headers: { 'Content-Type': 'application/json' }
        };

        await axios
            .request(options)
            .then(function (response) {
                console.log(response.data);
                if (response.data === "ok") {
                    toast.success('usuario eliminado con éxito');
                }
                setEjecutarConsulta(true);
            })
            .catch(function (error) {
                console.error(error);
                toast.error('Error eliminando el usuario');
            });
        setOpenDialog(false);
    };

    return (
        <tr>
            {edit ? (
                <>
                    <td>{infoNuevoUsuario.id}</td>
                    <td>
                        <input
                            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                            type='text'
                            value={infoNuevoUsuario.nombre}
                            onChange={(e) => setInfoNuevoUsuario({ ...infoNuevoUsuario, nombre: e.target.value })}
                        />
                    </td>
                    <td>
                        <input
                            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                            type='text'
                            value={infoNuevoUsuario.apellido}
                            onChange={(e) => setInfoNuevoUsuario({ ...infoNuevoUsuario, apellido: e.target.value })}
                        />
                    </td>
                    <td>
                        <input
                            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                            type='text'
                            value={infoNuevoUsuario.telefono}
                            onChange={(e) => setInfoNuevoUsuario({ ...infoNuevoUsuario, telefono: e.target.value })}
                        />
                    </td>
                    <td>
                        <input
                            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                            type='text'
                            value={infoNuevoUsuario.email}
                            onChange={(e) => setInfoNuevoUsuario({ ...infoNuevoUsuario, email: e.target.value })}
                        />
                    </td>
                    <td>
                        <input
                            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                            type='text'
                            value={infoNuevoUsuario.usuario}
                            onChange={(e) => setInfoNuevoUsuario({ ...infoNuevoUsuario, usuario: e.target.value })}
                        />
                    </td>
                    <td>
                        <input
                            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                            type='text'
                            value={infoNuevoUsuario.rol}
                            onChange={(e) => setInfoNuevoUsuario({ ...infoNuevoUsuario, rol: e.target.value })}
                        />
                    </td>
                    <td>
                        <input
                            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                            type='text'
                            value={infoNuevoUsuario.estado}
                            onChange={(e) => setInfoNuevoUsuario({ ...infoNuevoUsuario, estado: e.target.value })}
                        />
                    </td>
                </>
            ) : (
                <>
                    <td>{valuesUsuario.id}</td>
                    <td>{valuesUsuario.nombre}</td>
                    <td>{valuesUsuario.apellido}</td>
                    <td>{valuesUsuario.telefono}</td>
                    <td>{valuesUsuario.email}</td>
                    <td>{valuesUsuario.usuario}</td>
                    <td>{valuesUsuario.rol}</td>
                    <td>{
                        valuesUsuario.estado? ("Habilitado") : ("Deshabilitado")
                    }
                    </td>
                </>
            )}
            <td>
                <div className='flex w-full justify-around'>
                    {edit ? (
                        <>
                            <Tooltip title='Confirmar Edición' arrow>
                                <i
                                    onClick={() => actualizarUsuario()}
                                    className='fas fa-check text-green-700 hover:text-green-500'
                                />
                            </Tooltip>
                            <Tooltip title='Cancelar edición' arrow>
                                <i
                                    onClick={() => setEdit(!edit)}
                                    className='fas fa-ban text-yellow-700 hover:text-yellow-500'
                                />
                            </Tooltip>
                        </>
                    ) : (
                        <>
                            <Tooltip title='Editar usuario' arrow>
                                <i
                                    onClick={() => setEdit(!edit)}
                                    className='fas fa-pencil-alt text-yellow-700 hover:text-yellow-500'
                                />
                            </Tooltip>
                            <Tooltip title='Eliminar usuario' arrow>
                                <i
                                    onClick={() => setOpenDialog(true)}
                                    className='fas fa-trash text-red-700 hover:text-red-500'
                                />
                            </Tooltip>
                        </>
                    )}
                </div>
                <Dialog open={openDialog}>
                    <div className='p-8 flex flex-col'>
                        <h1 className='text-gray-900 text-2xl font-bold'>
                            ¿Está seguro de eliminar el usuario?
                        </h1>
                        <div className='flex w-full items-center justify-center my-4'>
                            <button
                                onClick={() => eliminarUsuario()}
                                className='mx-2 px-4 py-2 bg-green-500 text-white hover:bg-green-700 rounded-md shadow-md'
                            >
                                Sí
                            </button>
                            <button
                                onClick={() => setOpenDialog(false)}
                                className='mx-2 px-4 py-2 bg-red-500 text-white hover:bg-red-700 rounded-md shadow-md'
                            >
                                No
                            </button>
                        </div>
                    </div>
                </Dialog>
            </td>
        </tr>
    );
};

const FormularioCreacionUsuarios = ({ setMostrarTabla, listaUsuarios, setUsuarios }) => {
  const form = useRef(null);

  const submitForm = async (e) => {
    e.preventDefault();
    const fd = new FormData(form.current);
    
    const nuevoUsuario = {};
    fd.forEach((value, key) => {
      nuevoUsuario[key] = value;
    });

    const options = {
            method: 'POST',
            url: 'https://apiants.herokuapp.com/Usuarios',
            headers: { 'Content-Type': 'application/json' },
            data: {
                id: nuevoUsuario.id,
                nombre: nuevoUsuario.nombre,
                apellido: nuevoUsuario.apellido,
                telefono: nuevoUsuario.telefono,
                email: nuevoUsuario.email,
                rol: nuevoUsuario.rol,
                estado: nuevoUsuario.estado
            },
        };

        await axios
            .request(options)
            .then(function (response) {
                console.log(response.data);
                if (response.data === "ok") {
                    toast.success('usuario agregado con éxito');
                }
            })
            .catch(function (error) {
                console.error(error);
                toast.error('Error creando un usuario');
            });

        setMostrarTabla(true);
  };

  return (
    <div className='flex flex-col items-center justify-center'>
      <h2 className='text-2xl font-extrabold text-gray-800'>Nuevo Usuario</h2>
      <form ref={form} onSubmit={submitForm} className='flex flex-col'>
        <label className='flex flex-col' htmlFor='nombre'>
          Nombre
          <input
            name='nombre'
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='text'
            placeholder='Digite el nombre'
            required
          />
        </label>
        <label className='flex flex-col' htmlFor='apellido'>
        Apellido
          <input
            name='apellido'
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='text'
            placeholder='Digite el apellido'
            required
          />
        </label>
        <label className='flex flex-col' htmlFor='telefono'>
        Telefono
          <input
            name='telefono'
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='text'
            placeholder='Digite el telefono'
            required
          />
        </label>
        <label className='flex flex-col' htmlFor='email'>
        email
          <input
            name='email'
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='text'
            placeholder='Digite el telefono'
            required
          />
        </label>
        <label className='flex flex-col' htmlFor='estado'>
          estado
          <select
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            name='tipoDoc'
            required
            defaultValue={0}
          >
            <option disabled value={0}>
              Seleccione una opción
            </option>
            <option>Deshabilitado</option>
            <option>Habilitado</option>
            </select>
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
        {/* <label className='flex flex-col' htmlFor='estado'>
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
        </label> */}
        
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
