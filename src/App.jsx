
//import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './styles/App.css';
import PrivateLayout from 'layouts/PrivateLayout';
import AuthLayout from 'layouts/AuthLayout';
import PublicLayout from 'layouts/PublicLayout';
import Index from 'pages/Index';
import Admin from 'pages/admin/Index';
import Productos from 'pages/admin/Productos';
import Usuarios from 'pages/admin/Usuarios';
import Ventas from 'pages/admin/Ventas'
import Login from 'pages/auth/Login';
import Registro from 'pages/auth/Registro';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path={['/admin/', '/admin/Productos', '/admin/Usuarios', '/admin/Ventas']}>
            <PrivateLayout>
              <Switch>
                <Route path='/admin/Productos'>
                  <Productos />
                </Route>
                <Route path='/admin/Usuarios'>
                  <Usuarios />
                </Route>
                <Route path='/admin/Ventas'>
                  <Ventas />
                </Route>
                <Route path='/admin'>
                  <Admin />
              </Route>
              </Switch>
            </PrivateLayout>
          </Route>
          <Route path={['/Login', '/Registro']}>
            <AuthLayout>
              <Switch>
                <Route path='/Login'>
                  <Login />
                </Route>
                <Route path='/Registro'>
                  <Registro />
                </Route>
              </Switch>
            </AuthLayout>
          </Route>
          <Route path={['/']}>
            <PublicLayout>
              <Switch>
              <Route path='/'>
                  <Index />
                </Route>
              </Switch>
            </PublicLayout>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
