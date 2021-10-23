import React, { useEffect, useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { nanoid } from 'nanoid';
import { Dialog, Tooltip } from '@material-ui/core';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { obtenerVentas, obtenerProducto, obtenerUsuario } from 'utils/api';

const Ventas = () => {
    const [mostrarTabla, setMostrarTabla] = useState(true);
    const [ventas, setVentas] = useState([]);
    const [textoBoton, setTextoBoton] = useState('Nueva Venta');
    const [colorBoton, setColorBoton] = useState('red');
    const [ejecutarConsulta, setEjecutarConsulta] = useState(true);

    useEffect(() => {
        console.log('consulta', ejecutarConsulta);
        if (ejecutarConsulta) {
            obtenerVentas(setVentas, setEjecutarConsulta);
        }
    }, [ejecutarConsulta]);

    useEffect(() => {
        //obtener lista de ventas desde el backend
        if (mostrarTabla) {
            setEjecutarConsulta(true);
        }
    }, [mostrarTabla]);

    useEffect(() => {
        if (mostrarTabla) {
            setTextoBoton('Nueva Venta');
            setColorBoton('blue');
        } else {
            setTextoBoton('Mostrar Ventas');
            setColorBoton('green');
        }
    }, [mostrarTabla]);
    return (
        <div className='flex h-full w-full flex-col items-center justify-start p-8'>
            <div className='flex flex-col w-full'>
                <h2 className='text-3xl font-extrabold text-gray-900'>
                    Administración de Ventas
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
                <TablaVentas listaVentas={ventas} setEjecutarConsulta={setEjecutarConsulta} />
            ) : (
                <FormularioCreacionVentas
                    setMostrarTabla={setMostrarTabla}
                    listaVentas={ventas}
                    setVentas={setVentas}
                />
            )}
            <ToastContainer position='bottom-center' autoClose={5000} />
        </div>
    );
};

const TablaVentas = ({ listaVentas, setEjecutarConsulta }) => {
    const [busqueda, setBusqueda] = useState('');
    const [ventasFiltrados, setVentasFiltrados] = useState(listaVentas);

    useEffect(() => {
        setVentasFiltrados(
            listaVentas.filter((elemento) => {
                return JSON.stringify(elemento).toLowerCase().includes(busqueda.toLowerCase());
            })
        );
    }, [busqueda, listaVentas]);

    return (
        <div className='flex flex-col items-center justify-center w-full'>
            <input
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder='Buscar'
                className='border-2 border-gray-700 px-3 py-1 self-start rounded-full focus:outline-none focus:border-indigo-500'
            />
            <h2 className='text-2xl font-extrabold text-gray-800'>Listado de Ventas</h2>
            <div className='hidden md:flex w-full'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Fecha Venta</th>
                            <th>Id Venta</th>
                            {//<th>Cédula Cliente</th>
                            //<th>Cliente</th>
                            }
                            <th>Id Producto</th>
                            <th>Cantidad</th>
                            <th>Precio Unitario</th>
                            <th>Total Venta</th>
                            <th>Vendedor</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ventasFiltrados.map((Venta) => {
                            return (
                                <FilaVenta key={nanoid()} valuesVenta={Venta} setEjecutarConsulta={setEjecutarConsulta} />
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className='flex flex-col w-full m-2 md:hidden'>
                {ventasFiltrados.map((fVenta) => {
                    return (
                        <div className='bg-gray-400 m-2 shadow-xl flex flex-col p-2 rounded-xl'>
                            <span>{fVenta.nombre_cliente}</span>
                            <span>{fVenta.nombre_vendedor}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const FilaVenta = ({ valuesVenta, setEjecutarConsulta }) => {
    const [edit, setEdit] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [infoNuevaVenta, setInfoNuevaVenta] = useState({
        id: valuesVenta.id,
        fecha: valuesVenta.fecha,
        cantidad: valuesVenta.cantidad,
        total: valuesVenta.total,
        producto_id: valuesVenta.producto_id,
        usuario_id: valuesVenta.usuario_id,
        precio: valuesVenta.ventaproducto.precio,
        estado: valuesVenta.estado,
        
    });

    const actualizarVenta = async () => {
        //enviar la info al backend
        const options = {
            method: 'PUT',
            url: `https://apiants.herokuapp.com/Ventas/${valuesVenta.id}`,
            headers: { 'Content-Type': 'application/json' },
            data: { ...infoNuevaVenta },
        };

        await axios
            .request(options)
            .then(function (response) {
                console.log(response.data);
                if (response.data === "ok") {
                    toast.success('venta modificada con éxito');
                }
                setEdit(false);
                setEjecutarConsulta(true);
            })
            .catch(function (error) {
                toast.error('Error modificando la venta');
                console.error(error);
            });
    };

    const eliminarVenta = async () => {
        const options = {
            method: 'DELETE',
            url: `https://apiants.herokuapp.com/Ventas/${valuesVenta.id}`,
            headers: { 'Content-Type': 'application/json' }
        };

        await axios
            .request(options)
            .then(function (response) {
                console.log(response.data);
                if (response.data === "ok") {
                    toast.success('venta eliminada con éxito');
                }
                setEjecutarConsulta(true);
            })
            .catch(function (error) {
                console.error(error);
                toast.error('Error eliminando la venta');
            });
        setOpenDialog(false);
    };

    return (
        <tr>
            {edit ? (
                <>
                    <td>
                        <input
                            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                            type='date'
                            value={infoNuevaVenta.fecha}
                            onChange={(e) =>
                                setInfoNuevaVenta({ ...infoNuevaVenta, fecha: e.target.value })
                            }
                        />
                    </td>
                    {/**<td>{infoNuevaVenta.id}</td>*/}
                    <td>
                        <input
                            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                            type='number'
                            value={infoNuevaVenta.id}
                            onChange={(e) => setInfoNuevaVenta({ ...infoNuevaVenta, id: e.target.value })}
                        />
                    </td>
                    <td>
                        <input
                            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                            type='number'
                            value={infoNuevaVenta.producto_id}
                            onChange={(e) => setInfoNuevaVenta({ ...infoNuevaVenta, producto_id: e.target.value })}
                        />
                    </td>

                    <td>
                        <input
                            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                            type='number'
                            value={infoNuevaVenta.cantidad}
                            onChange={(e) => setInfoNuevaVenta({ ...infoNuevaVenta, cantidad: e.target.value })}
                        />
                    </td>

                    <td> {infoNuevaVenta.precio} </td>

                    <td>
                        <input
                            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                            type='number'
                            value={infoNuevaVenta.total}
                            onChange={(e) => setInfoNuevaVenta({ ...infoNuevaVenta, total: e.target.value })}
                        />
                    </td>


                    {/** 
                    <td>
                        <input
                            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                            type='text'
                            value={infoNuevaVenta.cedula}
                            onChange={(e) =>
                                setInfoNuevaVenta({ ...infoNuevaVenta, cedula: e.target.value })
                            }
                        />
                    </td>

                    <td>
                        <input
                            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                            type='text'
                            value={infoNuevaVenta.cliente}
                            onChange={(e) => setInfoNuevaVenta({ ...infoNuevaVenta, cliente: e.target.value })}
                        />
                    </td>
                    */}
                    <td>
                        <input
                            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                            type='text'
                            value={infoNuevaVenta.usuario_id}
                            onChange={(e) => setInfoNuevaVenta({ ...infoNuevaVenta, usuario_id: e.target.value })}
                        />
                    </td>

                    <td>
                        <input
                            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                            type='text'
                            value={infoNuevaVenta.estado}
                            onChange={(e) => setInfoNuevaVenta({ ...infoNuevaVenta, estado: e.target.value })}
                        />
                     </td>
                </>
            ) : (
                <>
                    <td>{valuesVenta.fecha}</td>
                    <td>{valuesVenta.id}</td>
                    { //<td>{valuesVenta.idCliente}</td>
                    //<td>{valuesVenta.cliente}</td>
                    }
                    <td>{valuesVenta.producto_id}</td>
                    <td>{valuesVenta.cantidad}</td>
                    <td>{valuesVenta.ventaproducto.precio}</td>
                    <td>{valuesVenta.total}</td>
                    <td>{valuesVenta.ventausuario.nombre}</td>
                    <td>{valuesVenta.estado}</td>
                </>
            )}
            <td>
                <div className='flex w-full justify-around'>
                    {edit ? (
                        <>
                            <Tooltip title='Confirmar Edición' arrow>
                                <i
                                    onClick={() => actualizarVenta()}
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
                            <Tooltip title='Editar venta' arrow>
                                <i
                                    onClick={() => setEdit(!edit)}
                                    className='fas fa-pencil-alt text-yellow-700 hover:text-yellow-500'
                                />
                            </Tooltip>
                            <Tooltip title='Eliminar venta' arrow>
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
                            ¿Está seguro de eliminar la Venta?
                        </h1>
                        <div className='flex w-full items-center justify-center my-4'>
                            <button
                                onClick={() => eliminarVenta()}
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

const FormularioCreacionVentas = ({ setMostrarTabla, listaVentas, setVentas }) => {

    const [cantidadProducto, setCantidadProducto] = useState(0);
    const [idProductoConsultar, setIdProductoConsultar] = useState(1);
    const [ProductoConsultado, setProductoConsultado] = useState({});

    useEffect(() => {
        obtenerProducto(idProductoConsultar, setProductoConsultado);
    }, [idProductoConsultar]);

    const [idEmpleadoConsultar, setIdEmpleadoConsultar] = useState(1);
    const [empleadoConsultado, setEmpleadoConsultado] = useState({});

    useEffect(() => {
        obtenerUsuario(idEmpleadoConsultar, setEmpleadoConsultado);
    }, [idEmpleadoConsultar]);

    const form = useRef(null);

    const submitForm = async (e) => {
        e.preventDefault();
        const fd = new FormData(form.current);

        const NuevaVenta = {};
        fd.forEach((value, key) => {
            NuevaVenta[key] = value;
        });

        const options = {
            method: 'POST',
            url: 'https://apiants.herokuapp.com/Ventas',
            headers: { 'Content-Type': 'application/json' },
            data: {
                fecha: NuevaVenta.fecha,
                cantidad: NuevaVenta.cantidad,
                total: NuevaVenta.total,
                estado: 1, //NuevaVenta.estado,
                producto_id: NuevaVenta.idProducto,
                usuario_id: NuevaVenta.idVendedor
            },
        };

        await axios
            .request(options)
            .then(function (response) {
                console.log(response.data);
                if (response.data === "ok") {
                    toast.success('venta agregada con éxito');
                }
            })
            .catch(function (error) {
                console.error(error);
                toast.error('Error creando una venta');
            });

        setMostrarTabla(true);
    };

    return (
        <div className='flex flex-col items-center justify-center'>
            <h2 className='text-2xl font-extrabold text-gray-800'>Nueva Venta</h2>
            <form ref={form} onSubmit={submitForm} className='flex flex-col'>

                <label className='flex flex-col' htmlFor='fecha'>
                    Fecha
                    <input
                        name='fecha'
                        className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                        type='date'
                        //min={1/1/1990}
                        required
                    />
                </label>

                <label className='flex flex-col' htmlFor='idProducto'>
                    ID Producto
                    <input
                        name='idProducto'
                        className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                        type='number'
                        min={1}
                        placeholder='0'
                        required
                        onInput= {(e) => setIdProductoConsultar(e.target.value)}
                    />
                </label>

                <label className='flex flex-col' htmlFor='nameProducto'>
                    Producto
                    <input
                        name='nameProducto'
                        className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                        type='text'
                        placeholder='Producto'
                        value={ProductoConsultado.nombre}
                    />
                </label>

                <label className='flex flex-col' htmlFor='cantidad'>
                    Cantidad
                    <input
                        name='cantidad'
                        className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                        type='number'
                        placeholder='0'
                        required
                        value={cantidadProducto} onInput={e => setCantidadProducto(e.target.value)}
                    />
                </label>

                <label className='flex flex-col' htmlFor='precio'>
                    Precio Unitario
                    <input
                        name='precio'
                        className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                        type='text'
                        placeholder='0'
                        required
                        value={ProductoConsultado.precio}
                    />
                </label>

                <label className='flex flex-col' htmlFor='total'>
                    Total
                    <input
                        name='total'
                        className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                        type='text'
                        placeholder='0'
                        value={ ProductoConsultado.precio === undefined? 0 : cantidadProducto === undefined? 0 : ProductoConsultado.precio * cantidadProducto }
                    />
                </label>

                <label className='flex flex-col' htmlFor='idCliente'>
                    ID Cliente
                    <input
                        name='idCliente'
                        className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                        type='text'
                        placeholder='12345678'
                        required
                    />
                </label>

                <label className='flex flex-col' htmlFor='cliente'>
                    Cliente
                    <input
                        name='cliente'
                        className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                        type='text'
                        placeholder='Jairo Gomez'
                        required
                    />
                </label>

                <label className='flex flex-col' htmlFor='idVendedor'>
                    ID Vendedor
                    <input
                        name='idVendedor'
                        className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                        type='number'
                        placeholder='12345678'
                        required
                        onInput= {(e) => setIdEmpleadoConsultar(e.target.value)}
                    />
                </label>

                <label className='flex flex-col' htmlFor='vendedor'>
                    Vendedor
                    <input
                        name='vendedor'
                        className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                        type='text'
                        placeholder='Vendedor'
                        required
                        value={empleadoConsultado.nombre}
                    />
                </label>

                <button type='submit'
                    className='col-span-2 bg-green-400 p-2 rounded-full shadow-md hover:bg-green-600 text-white'>
                    Guardar Venta
                </button>
            </form>
        </div>
    );
};

export default Ventas;
