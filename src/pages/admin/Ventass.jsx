import React, { useEffect, useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const VentasBackend = [
  {
    id_venta: '101',
    id_producto: '201',
    cantidad_producto: 5,
    precio_unitario: 1500,
    total_venta: 7500,
    fecha_venta: '2021-10-02',
    cedula_cliente: '123456',
    nombre_cliente: 'Ferney Gonzáles',
    nombre_vendedor: 'Julian Rodríguez'
  },
  {
    id_venta: '102',
    id_producto: '202',
    cantidad_producto: 3,
    precio_unitario: 1000,
    total_venta: 3000,
    fecha_venta: '2021-10-03',
    cedula_cliente: '7890123',
    nombre_cliente: 'Jose Gómez',
    nombre_vendedor: 'Camilo Rentería'
  }
 ];

const Ventas = () => {
  const [mostrarTabla, setMostrarTabla] = useState(true);
  const [Ventas, setVentas] = useState([]);
  const [textoBoton, setTextoBoton] = useState('Crear Nueva Venta');
  const [colorBoton, setColorBoton] = useState('indigo');

  useEffect(() => {
    //obtener lista de Ventass desde el backend
    setVentas(VentasBackend);
  }, []);

  useEffect(() => {
    if (mostrarTabla) {
      setTextoBoton('Crear Nueva Venta');
      setColorBoton('indigo');
    } else {
      setTextoBoton('Mostrar Todos los Ventas');
      setColorBoton('green');
    }
  }, [mostrarTabla]);
  return (
    <div className='flex h-full w-full flex-col items-center justify-start p-8'>
      <div className='flex flex-col'>
        <h2 className='text-3xl font-extrabold text-gray-900'>
          Página de administración de Ventas
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
        <TablaVentas listaVentas={Ventas} />
      ) : (
        <FormularioCreacionVentas
          setMostrarTabla={setMostrarTabla}
          listaVentas={Ventas}
          setVentas={setVentas}
        />
      )}
      <ToastContainer position='bottom-center' autoClose={5000} />
    </div>
  );
};

const TablaVentas = ({ listaVentas }) => {
  useEffect(() => {
    console.log('este es el listado de Ventas en el componente de tabla', listaVentas);
  }, [listaVentas]);
  return (
    <div className='flex flex-col items-center justify-center'>
      <h2 className='text-2xl font-extrabold text-gray-800'>Todos las Ventas</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Id Venta</th>
            <th>Id Producto</th>
            <th>Cantidad Producto</th>
            <th>Precio Unitario</th>
            <th>Total Venta</th>
            <th>Fecha Venta</th>
            <th>Cédula Cliente</th>
            <th>Nombre Cliente</th>
            <th>Nombre Vendedor</th>
            </tr>
        </thead>
        <tbody>
          {listaVentas.map((Ventas) => {
            return (
              <tr>
                <td>{Ventas.id_venta}</td>
                <td>{Ventas.id_producto}</td>
                <td>{Ventas.cantidad_producto}</td>
                <td>{Ventas.precio_unitario}</td>
                <td>{Ventas.total_venta}</td>
                <td>{Ventas.fecha_venta}</td>
                <td>{Ventas.cedula_cliente}</td>
                <td>{Ventas.nombre_cliente}</td>
                <td>{Ventas.nombre_vendedor}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const FormularioCreacionVentas = ({ setMostrarTabla, listaVentas, setVentas }) => {
  const form = useRef(null);

  const submitForm = (e) => {
    e.preventDefault();
    const fd = new FormData(form.current);
    
    const nuevoVentas = {};
    fd.forEach((value, key) => {
      nuevoVentas[key] = value;
    });

    setMostrarTabla(true);
    setVentas([...listaVentas, nuevoVentas]);
    toast.success('Venta agregada con éxito');
    };

  return (
    <div className='flex flex-col items-center justify-center'>
      <h2 className='text-2xl font-extrabold text-gray-800'>Crear nueva Venta</h2>
      <form ref={form} onSubmit={submitForm} className='flex flex-col'>
      <label className='flex flex-col' htmlFor='id_venta'>
          Id Ventas
          <input
            name='id_venta'
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='number'
            min={101}
            max={199}
            placeholder='101'
            required
            />
        </label>

        <label className='flex flex-col' htmlFor='id_producto'>
          Id Producto
          <input
            name='id_producto'
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='number'
            min={101}
            max={199}
            placeholder='101'
            required
            />
        </label>

        <label className='flex flex-col' htmlFor='cantidad'>
          Cantidad Producto
          <input
            name='cantidad'
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='number'
            min={1}
            placeholder='1'
            required
            />
        </label>

        <label className='flex flex-col' htmlFor='p_unidad'>
          Precio Unidad
          <input
            name='p_unidad'
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='number'
            placeholder='1000'
            required
            />
        </label>

        <label className='flex flex-col' htmlFor='t_venta'>
          Total Venta
          <input
            name='t_venta'
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='number'
            placeholder='5500'
            required
            />
        </label>

        <label className='flex flex-col' htmlFor='fecha_venta'>
          Fecha Venta
        <input
            name='fecha_venta'
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='date'
            placeholder='2021-10-02'
            required
        />
        </label>
        <label className='flex flex-col' htmlFor='cedula_cliente'>
          Cedula Cliente
        <input
            name='cedula_cliente'
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='text'
            placeholder='23543678'
            required
        />
        </label>
        <label className='flex flex-col' htmlFor='nombre_cliente'>
          Nombre Cliente
        <input
            name='nombre_cliente'
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='text'
            placeholder='Nairo'
            required
        />
        </label>
        <label className='flex flex-col' htmlFor='nombre_vendedor'>
          Nombre Vendedor
        <input
            name='nombre_vendedor'
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='text'
            placeholder='Camilo'
            required
        />
        </label>
        <button
          type='submit'
          className='col-span-2 bg-green-400 p-2 rounded-full shadow-md hover:bg-green-600 text-white'
        >
          Guardar Ventas
        </button>
      </form>
    </div>
  );
};

export default Ventas;
