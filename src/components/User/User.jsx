import React, { useEffect, useState } from "react";
import Professional from "./Professional/Professional";

const User = () => {
  const [rol, setRol] = useState();

  useEffect(() => {
    setRol(localStorage.getItem("rol"));
  }, []);

  const userUser = {
    2: <Professional />,
    3: <h2>Perfil cliente</h2>,
  };

  return <div>{userUser[rol]}</div>;
};

export default User;
