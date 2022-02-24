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
import EditActivityAdvisory from "../User/Professional/Advisory/EditActivityAdvisory"
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
      <Route exact path="/user/profile" element={<User />} />
      <Route exact path="/user/advisory/create" element={<CreateAdvisory />} />
      <Route exact path="/user/advisory/update" element={<UpdateAdvisory />} />
      <Route exact path="/user/advisory/activity" element={<ActivityAdvisory />} />
      <Route exact path="/user/advisory/activity/add/:id" element={<AddActivityAdvisory />} />
      <Route exact path="/user/advisory/activity/edit/:id" element={<EditActivityAdvisory />} />
    </>,
    3: 
    <>
      <Route exact path="/user/profile" element={<User />} />
    </>
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas publicas */}
        <Route exact path="/" element={<Home />} />
        <Route exact path="/about-us" element={<AboutUs />}  />
        {
          token 
            ? protectedRoutes[rol] //rutas protegidas
            : <Route exact path="/login" element={<Login />}  /> //ruta publica
        }
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
