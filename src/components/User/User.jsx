import React, { useEffect, useState } from "react";
import ProfessionalProfile from "./Professional/Profile/ProfessionalProfile";

const User = () => {
  const [rol, setRol] = useState();

  useEffect(() => {
    setRol(localStorage.getItem("rol"));
  }, []);

  const userUser = {
    2: <ProfessionalProfile />,
    3: <h2>Perfil cliente</h2>,
  };

  return <div className="mt-5">{userUser[rol]}</div>;
};

export default User;
