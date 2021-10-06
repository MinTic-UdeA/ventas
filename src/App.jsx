
//import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import 'styles/App.css';
import PrivateLayout from 'layouts/PrivateLayout';
import AuthLayout from 'layouts/AuthLayout';
import PublicLayout from 'layouts/PublicLayout';
import Index from 'pages/Index';
import Productos from 'pages/admin/Productos';
import Ventas from 'pages/admin/Ventas'
import Usuarios from 'pages/admin/Usuarios';
import Login from 'pages/auth/Login';
import Registro from 'pages/auth/Registro';
import Dashboard from 'pages/admin/Dashboard'

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
                  <Dashboard />
              </Route>
              </Switch>
            </PrivateLayout>
          </Route>
          <Route path={['/auth/', '/auth/Login', '/auth/Registro']}>
            <AuthLayout>
              <Switch>
                <Route path='/auth/Login'>
                  <Login />
                </Route>
                <Route path='/auth/Registro'>
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
