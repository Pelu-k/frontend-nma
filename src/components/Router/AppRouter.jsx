import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AboutUs from "../AboutUs/AboutUs";
import Error404 from "../Error404/Error404";
import Home from "../Home/Home";
import Login from "../Login/Login";
import ActivityAdvisory from "../User/Professional/Advisory/ActivityAdvisory";
import AddActivityAdvisory from "../User/Professional/Advisory/AddActivityAdvisory";
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
      <Route path="user/profile" element={<User />} />
      <Route path="user/advisory/create" element={<CreateAdvisory />} />
      <Route path="user/advisory/update" element={<UpdateAdvisory />} />
      <Route path="user/advisory/activity" element={<ActivityAdvisory />} />
      <Route path="user/advisory/activity/add/:id" element={<AddActivityAdvisory />} />
    </>,
    3: 
    <>
      <Route path="/user/profile" element={<User />} />
    </>
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas publicas */}
        <Route exact path="/" element={<Home />} />
        <Route path="about-us" element={<AboutUs />}  />
        {
          token 
            ? protectedRoutes[rol] //rutas protegidas
            : <Route path="login" element={<Login />}  /> //ruta publica
        }
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
