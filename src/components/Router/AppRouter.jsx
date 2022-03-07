import React, { useEffect, useState }   from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Error404                         from "../Error404/Error404";
import Home                             from "../Home/Home";
import Login                            from "../Login/Login";
import User                             from "../User/User";
import ActivityAdvisory                 from "../User/Professional/Advisory/ActivityAdvisory";
import AddActivityAdvisory              from "../User/Professional/Advisory/AddActivityAdvisory";
import CreateAdvisory                   from "../User/Professional/Advisory/CreateAdvisory";
import UpdateAdvisory                   from "../User/Professional/Advisory/UpdateAdvisory";
import EditActivityAdvisory             from "../User/Professional/Advisory/EditActivityAdvisory"
import CreateTraining                   from "../User/Professional/Training/CreateTraining";
import UpdateTraining                   from "../User/Professional/Training/UpdateTraining";
import ActivityTraining                 from "../User/Professional/Training/ActivityTraining";
import RequestTraining                  from "../User/Client/Training/RequestTraining";
import ReportAccident                   from "../User/Client/Accident/ReportAccident";
import RequestAdvisory                  from "../User/Client/Advisory/RequestAdvisory";
import AddActivityTraining              from "../User/Professional/Training/AddActivityTraining";
import EditActivityTraining             from "../User/Professional/Training/EditActivityTraining";
import GetAllAdvisory                   from "../User/Client/Advisory/GetAllAdvisory";
import GetAllTraining                   from "../User/Client/Training/GetAllTraining";
import ViewRequest                      from "../User/Client/Request/ViewRequest";

const AppRouter = () => {
  const [token, setToken] = useState(null);
  const [rol, setRol]     = useState(null)

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setRol(localStorage.getItem('rol'))
  }, []);

  const protectedRoutes = {
    2: // Rutas protegidas profesional
    <>
      <Route exact path="/user/profile"                    element={<User />} />
      <Route exact path="/user/advisory/create"            element={<CreateAdvisory />} />
      <Route exact path="/user/advisory/update"            element={<UpdateAdvisory />} />
      <Route exact path="/user/advisory/activity"          element={<ActivityAdvisory />} />
      <Route exact path="/user/advisory/activity/add/:id"  element={<AddActivityAdvisory />} />
      <Route exact path="/user/advisory/activity/edit/:id" element={<EditActivityAdvisory />} />
      <Route exact path="/user/training/create"            element={<CreateTraining />} />
      <Route exact path="/user/training/update"            element={<UpdateTraining />} />
      <Route exact path="/user/training/activity"          element={<ActivityTraining />} />
      <Route exact path="/user/training/activity/add/:id"  element={<AddActivityTraining />} />
      <Route exact path="/user/training/activity/edit/:id" element={<EditActivityTraining />} />
    </>,
    3: 
    <>
      <Route exact path="/user/profile"                    element={<User />} />
      <Route exact path="/user/advisory/request"           element={<RequestAdvisory />} />
      <Route exact path="/user/advisory/getAll"            element={<GetAllAdvisory />} />
      <Route exact path="/user/training/request"           element={<RequestTraining />} />
      <Route exact path="/user/training/getAll"            element={<GetAllTraining />} />
      <Route exact path="/user/request/all"                element={<ViewRequest />} />
      <Route exact path="/user/accident/report"            element={<ReportAccident />} />
    </>
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas publicas */}
        <Route exact path="/"            element={<Home />} />
        {
          token 
            ? protectedRoutes[rol] //rutas protegidas
            : <Route exact path="/login" element={<Login />}  /> //ruta publica
        }
        <Route path="*"                  element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
