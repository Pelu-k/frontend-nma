import React, { useEffect, useState } from "react";
import ClientProfile from "./Client/Profile/ClientProfile";
import ProfessionalProfile from "./Professional/Profile/ProfessionalProfile";

const User = () => {
  const [rol, setRol] = useState();

  useEffect(() => {
    setRol(localStorage.getItem("rol"));
  }, []);

  const userUser = {
    2: <ProfessionalProfile />,
    3: <ClientProfile />,
  };

  return <div>{userUser[rol]}</div>;
};

export default User;
