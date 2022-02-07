import React from "react";

const Profile = () => {
  return (
    <div>
      <h2 className="text-center">
        Bienbenido {localStorage.getItem("nombre")}
      </h2>
    </div>
  );
};

export default Profile;
