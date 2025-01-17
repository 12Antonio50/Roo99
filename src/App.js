import { v4 as uuidv4 } from 'uuid';
import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Restablecer from './pages/Restablecer/Restablecer';
import Login from './pages/Sesion/Login';
import Inicio from './pages/Inicio/Inicio';
import VistaGeneral from './pages/Vistas/VistaGeneral';
import Rentas from './Components/Renderizado/Rentas';
import RentasRetroactivas from './Components/Renderizado/RentasRetroactivas';
import Ingresos from './Components/Renderizado/Ingresos';
import Codigos from './Components/Renderizado/Codigos';
import EditarEspacios from './pages/Espacios/EditarEspacios';
import VistasCompras from './pages/Compra/VistaCompras';
import Usuarios from './pages/Editar/Usuarios';
import Cookies from 'js-cookie';
import ScrollToTop from './Components/Acciones/ScrollToTop';
import InicioRecepcion from './pages/Recepcion/Inicio';
import UsuarioAgregar from './Components/Acciones/UsuariosAgregar';
import InicioPublico from './pages/PublicoGeneral/Inicio';
import SobreNosotros from './pages/PublicoGeneral/SobreNosotros';
import Contacto from './pages/PublicoGeneral/Contacto';
import NuestrosServicios from './pages/PublicoGeneral/NuestrosServicios';

const NotFound = () => {
  return (
    <div className="error-404">
      <h1>404</h1>
    </div>
  );
};

const Loading = () => {
  return <div>Cargando...</div>;
};

function App() {
  // Generar o recuperar un identificador único para la sesión
  const [idUnico, setIdUnico] = useState(() => {
    const idGuardado = localStorage.getItem('idUnico');
    return idGuardado ? idGuardado : uuidv4(); // Si no existe, genera uno nuevo
  });

  const [autentificado, setAutentificado] = useState(!!Cookies.get('token'));
  const [usuarioRol, setUsuarioRol] = useState(Cookies.get('rol'));
  const [loading, setLoading] = useState(true);

  const comprobarAutenticacion = () => {
    const existeToken = Cookies.get('token');
    const existeRol = Cookies.get('rol');

    if (existeToken && existeRol) {
      setAutentificado(true);
      setUsuarioRol(existeRol);
    } else {
      setAutentificado(false);
      setUsuarioRol(null);
    }
  };

  useEffect(() => {
    comprobarAutenticacion();
    setLoading(false);

    // Guardar el identificador único en localStorage si no existe
    if (!localStorage.getItem('idUnico')) {
      localStorage.setItem('idUnico', idUnico);
    }
  }, [idUnico]);

  const getInitialRoute = () => {
    if (loading) {
      return <Loading />;
    }

    if (autentificado) {
      if (usuarioRol === 'A' || usuarioRol === 'AP') {
        return <Navigate to={`/home`} replace />; //<Navigate to={`/${idUnico}/home`} replace />;
      } else if (usuarioRol === 'R') {
        return <Navigate to={`/inicio`} replace />; //<Navigate to={`/${idUnico}/inicio`} replace />;
      } else {
        return <Navigate to="/404" replace />;
      }
    } else {
      return <Login setUsuarioRol={setUsuarioRol} setAutentificado={setAutentificado} />;
    }
  };

  const requiereRol = (componente, rolesPermitidos) => {
    return autentificado && rolesPermitidos.includes(usuarioRol)
      ? componente
      : <Navigate to="/404" replace />;
  };

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/ad/root-working/inicio-de-sesion" element={getInitialRoute()} />
        <Route path="/ad/root-working/restablecer" element={<Restablecer />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="/espacios" element={<VistaGeneral />} />
        <Route path="/espacio/:nombre" element={<VistasCompras />} />
        <Route path="/" element={<InicioPublico />} />
        <Route path="/nuestra-historia" element={<SobreNosotros />} />
        <Route path="/servicios" element={<NuestrosServicios />} />
        <Route path="/contacto" element={<Contacto />} />

        {autentificado && (
          <>
            {/*<Route path={`/${idUnico}/home`} element={requiereRol(<Inicio />, ['A', 'AP'])} />*/}
            <Route path={`/home`} element={requiereRol(<Inicio />, ['A', 'AP'])} />
            <Route path={`/rentas`} element={requiereRol(<Rentas />, ['A', 'AP'])} />
            <Route path={`/rentas-retroactivas`} element={requiereRol(<RentasRetroactivas />, ['A', 'AP'])} />
            <Route path={`/ingresos`} element={requiereRol(<Ingresos />, ['A', 'AP'])} />
            <Route path={`/codigos`} element={requiereRol(<Codigos />, ['A', 'AP'])} />
            <Route path={`/editar-espacios`} element={requiereRol(<EditarEspacios />, ['A', 'AP'])} />
            <Route path={`/configuracion`} element={requiereRol(<Usuarios />, ['A', 'AP', 'R'])} />
            <Route path={`/inicio`} element={requiereRol(<InicioRecepcion />, ['A', 'R', 'AP'])} />
            <Route path={`/agregar-usuarios`} element={requiereRol(<UsuarioAgregar />, ['A'])} />
          </>
        )}
        {!autentificado && <Route path="*" element={<Navigate to="/404" replace />} />}
      </Routes>
    </>
  );
}

export default App;