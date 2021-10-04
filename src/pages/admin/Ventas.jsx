import React, { useEffect, useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const VentasBackend = [
  {
    id_venta: '101',
    total_venta: 1000,
    id_producto: '201',
    cantidad_producto: 5,
    fecha_venta: '2021-10-02',
    cedula_cliente: '123456',
    nombre_cliente: 'Nairo',
    nombre_vendedor: 'Camilo'
  },
  {
    id_venta: '102',
    total_venta: 2000,
    id_producto: '202',
    cantidad_producto: 3,
    fecha_venta: '2021-10-01',
    cedula_cliente: '24680',
    nombre_cliente: 'Nairo Rojas',
    nombre_vendedor: 'Camilo Grimaldos'
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
      <table>
        <thead>
          <tr>
            <th>Id Venta</th>
            <th>Total Ventas</th>
            <th>Id Producto</th>
            <th>Cantidad Producto</th>
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
                <td>{Ventas.total_venta}</td>
                <td>{Ventas.id_producto}</td>
                <td>{Ventas.cantidad_producto}</td>
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
    // identificar el caso de éxito y mostrar un toast de éxito
    toast.success('Venta agregada con éxito');
    // identificar el caso de error y mostrar un toast de error
    // toast.error('Error creando un Ventas');
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
        <label className='flex flex-col' htmlFor='total_venta'>
          Total Venta
          <input
            name='total_venta'
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='number'
            min={5000}
            placeholder='1500'
            required
            />
            </label>
        <label className='flex flex-col' htmlFor='id_producto'>
          Id Producto
        <input
            name='id_producto'
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='number'
            min={201}
            max={299}
            placeholder='201'
            required
        />
        </label>
        <label className='flex flex-col' htmlFor='cantidad_producto'>
          Cantidad Producto
        <input
            name='cantidad_producto'
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='number'
            placeholder='5'
            min={1}
            max={100}
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
