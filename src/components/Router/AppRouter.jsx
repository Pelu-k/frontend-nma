import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AboutUs from "../AboutUs/AboutUs";
import Error404 from "../Error404/Error404";
import Home from "../Home/Home";
import Login from "../Login/Login";
import User from "../User/User";

const AppRouter = () => {
  const [token, setToken] = useState(null);
  const [rol, setRol] = useState(null)

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setRol(localStorage.getItem('rol'))
  }, []);

  const protectedRoutes = {
    2: // Rutas protegidas profesional
    <>
      <Route path="/user" element={<User />} exact/>
    </>,
    3: <>
    
    </>
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas publicas */}
        <Route path="/" element={<Home />} exact />
        <Route path="/about-us" element={<AboutUs />} exact />
        {
          token 
            ? protectedRoutes[rol] //rutas protegidas
            : <Route path="/login" element={<Login />} exact /> //ruta publica
        }
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
