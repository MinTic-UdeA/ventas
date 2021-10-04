import React, { useEffect, useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const productosBackend = [
  {
    nombre: 'mozarela',
    tipo: 'tajado',
    medida: 'libra',
    cantidad: 3
  },
  {
    nombre: 'pera',
    tipo: 'entero',
    medida: 'kilo',
    cantidad: 2
  },
  {
    nombre: 'doblecrema',
    tipo: 'al vacío',
    medida: 'bloque',
    cantidad: 1
  },
  {
    nombre: 'campesino',
    tipo: 'natural',
    medida: 'media libra',
    cantidad: 3
  },
 ];

const Productos = () => {
  const [mostrarTabla, setMostrarTabla] = useState(true);
  const [Productos, setProductos] = useState([]);
  const [textoBoton, setTextoBoton] = useState('Crear Nuevo Productos');
  const [colorBoton, setColorBoton] = useState('indigo');

  useEffect(() => {
    //obtener lista de Productoss desde el backend
    setProductos(productosBackend);
  }, []);

  useEffect(() => {
    if (mostrarTabla) {
      setTextoBoton('Crear Nuevo Producto');
      setColorBoton('indigo');
    } else {
      setTextoBoton('Mostrar Todos los Productos');
      setColorBoton('green');
    }
  }, [mostrarTabla]);
  return (
    <div className='flex h-full w-full flex-col items-center justify-start p-8'>
      <div className='flex flex-col'>
        <h2 className='text-3xl font-extrabold text-gray-900'>
          Página de administración de Productos
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
        <TablaProductos listaProductos={Productos} />
      ) : (
        <FormularioCreacionProductos
          setMostrarTabla={setMostrarTabla}
          listaProductos={Productos}
          setProductos={setProductos}
        />
      )}
      <ToastContainer position='bottom-center' autoClose={5000} />
    </div>
  );
};

const TablaProductos = ({ listaProductos }) => {
  useEffect(() => {
    console.log('este es el listado de Productos en el componente de tabla', listaProductos);
  }, [listaProductos]);
  return (
    <div className='flex flex-col items-center justify-center'>
      <h2 className='text-2xl font-extrabold text-gray-800'>Todos los Productos</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre del Producto</th>
            <th>Tipo de Producto</th>
            <th>Medida del Producto</th>
            <th>Cantidad del Producto</th>
          </tr>
        </thead>
        <tbody>
          {listaProductos.map((producto) => {
            return (
              <tr>
                <td>{producto.nombre}</td>
                <td>{producto.tipo}</td>
                <td>{producto.medida}</td>
                <td>{producto.cantidad}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const FormularioCreacionProductos = ({ setMostrarTabla, listaProductos, setProductos }) => {
  const form = useRef(null);

  const submitForm = (e) => {
    e.preventDefault();
    const fd = new FormData(form.current);
    
    const nuevoProducto = {};
    fd.forEach((value, key) => {
      nuevoProducto[key] = value;
    });

    setMostrarTabla(true);
    setProductos([...listaProductos, nuevoProducto]);
    // identificar el caso de éxito y mostrar un toast de éxito
    toast.success('Producto agregado con éxito');
    // identificar el caso de error y mostrar un toast de error
    // toast.error('Error creando un Productos');
  };

  return (
    <div className='flex flex-col items-center justify-center'>
      <h2 className='text-2xl font-extrabold text-gray-800'>Crear nuevo Producto</h2>
      <form ref={form} onSubmit={submitForm} className='flex flex-col'>
        <label className='flex flex-col' htmlFor='nombre'>
          Nombre del Producto
          <input
            name='nombre'
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='text'
            placeholder='mozarela'
            required
          />
        </label>
        <label className='flex flex-col' htmlFor='tipo'>
          Tipo de Producto
          <select
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            name='tipo'
            required
            defaultValue={0}
          >
            <option disabled value={0}>
              Seleccione una opción
            </option>
            <option>Al vacío</option>
            <option>Entero</option>
            <option>Tajado</option>
            <option>Natural</option>
            <option>Bajo en grasa</option>
            </select>
        </label>
        <label className='flex flex-col' htmlFor='medida'>
          Medida del Producto
          <input
            name='medida'
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='text'
            placeholder='libra'
            required
          />
        </label>
        <label className='flex flex-col' htmlFor='cantidad'>
        Cantidad del Producto
          <input
            name='cantidad'
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='number'
            min={1}
            max={50}
            placeholder='5'
            required
          />
        </label>

        <button
          type='submit'
          className='col-span-2 bg-green-400 p-2 rounded-full shadow-md hover:bg-green-600 text-white'
        >
          Guardar producto
        </button>
      </form>
    </div>
  );
};

export default Productos;
