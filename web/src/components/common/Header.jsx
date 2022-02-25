import React from "react";
import useAuth from "../../hooks/useAuth";

const Header = () => {
  const {loginUser} = useAuth();
  return(
    <header className="l-app__header">
      {
        <>
          <div className="text-center c-home-nav"><h1>Todo App</h1></div>


        </>

      }
    </header>
  )
}

export default Header;