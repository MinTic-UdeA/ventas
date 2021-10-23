import axios from 'axios'

const getToken = () => {
  return `Bearer ${localStorage.getItem('token')}`
}

export const obtenerProductos = async (setProductos, setEjecutarConsulta) => {
  const options = {
    method: 'GET',
    url: 'https://apiants.herokuapp.com/Productos/',
    headers: {
      Authorization: getToken(),
      'Content-Type': 'application/json'
    }
  }
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
    headers: { Authorization: getToken(), 'Content-Type': 'application/json' }
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
  const options = {
    method: 'GET',
    url: 'https://apiants.herokuapp.com/Ventas/',
    headers: {
      Authorization: getToken(),
      'Content-Type': 'application/json'
    }
  }
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
  const options = {
    method: 'GET',
    url: 'https://apiants.herokuapp.com/Usuarios/',
    headers: {
      Authorization: getToken(),
      'Content-Type': 'application/json'
    }
  }
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
    headers: { Authorization: getToken(), 'Content-Type': 'application/json' }
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