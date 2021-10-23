import axios from 'axios'

export const obtenerProductos = async (setProductos, setEjecutarConsulta) => {
  const options = { method: 'GET', url: 'https://apiants.herokuapp.com/Productos' }
  await axios
    .request(options)
    .then(function (response) {
      setProductos(response.data)
    })
    .catch(function (error) {
      console.error(error)
    })
  setEjecutarConsulta(false)
}

export const obtenerProducto = async (idProductoConsultar, setProductoConsultado) => {
  const options = {
    method: 'GET',
    url: `https://apiants.herokuapp.com/Productos/${idProductoConsultar}`,
    headers: { 'Content-Type': 'application/json' }
  }
  await axios
    .request(options)
    .then(function (response) {
      setProductoConsultado(response.data)
    })
    .catch(function (error) {
      console.error(error)
    })
}

export const obtenerVentas = async (setVentas, setEjecutarConsulta) => {
  const options = { method: 'GET', url: 'https://apiants.herokuapp.com/Ventas' }
  await axios
    .request(options)
    .then(function (response) {
      setVentas(response.data)
    })
    .catch(function (error) {
      console.error(error)
    })
  setEjecutarConsulta(false)
}

export const obtenerUsuarios = async (setUsuarios, setEjecutarConsulta) => {
  const options = { method: 'GET', url: 'https://apiants.herokuapp.com/Usuarios' }
  await axios
    .request(options)
    .then(function (response) {
      setUsuarios(response.data)
    })
    .catch(function (error) {
      console.error(error)
    })
  setEjecutarConsulta(false)
}

export const obtenerUsuario= async (idEmpleadoConsultar, setEmpleadoConsultado) => {
  const options = {
    method: 'GET',
    url: `https://apiants.herokuapp.com/Usuarios/${idEmpleadoConsultar}`,
    headers: { 'Content-Type': 'application/json' }
  }
  await axios
    .request(options)
    .then(function (response) {
      setEmpleadoConsultado(response.data)
    })
    .catch(function (error) {
      console.error(error)
    })
}