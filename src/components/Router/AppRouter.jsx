import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AboutUs from "../AboutUs/AboutUs";
import Error404 from "../Error404/Error404";
import Home from "../Home/Home";
import Login from "../Login/Login";
import CreateAdvisory from "../User/Professional/Advisory/CreateAdvisory";
import UpdateAdvisory from "../User/Professional/Advisory/UpdateAdvisory";
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
      <Route path="/user/profile" element={<User />} exact/>
      <Route path="/user/advisory/create" element={<CreateAdvisory/>} exact/>
      <Route path="/user/advisory/update" element={<UpdateAdvisory/>} exact/>
    </>,
    3: 
    <>
      <Route path="/user/profile" element={<User />} exact/>
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
