import React, {useContext, useEffect, useState} from "react";
import {authService, userService} from "../services";
import AuthContext from "../contexts/auth.context";
import {useNavigate} from "react-router";
import useAuth from "../hooks/useAuth";

function SignIn(props) {
  const navigate = useNavigate();
  const auth = useAuth();
  const [userInformation, setUserInformation] = useState({
    username: '',
    password: '',
  })
  return (
    <>
      <div className="container mt-5">
        <div className="w-50 border p-5 mx-auto">
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username:</label>
            <input type="text" className="form-control" id="username" onChange={(e) => setUserInformation({...userInformation, username: e.target.value})}/>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password:</label>
            <input type="password" className="form-control" id="password"  onChange={(e) => setUserInformation({...userInformation, password: e.target.value})}/>
          </div>
          <div className="mb-3">
            <label htmlFor="signUp" className="form-label me-2">Dont have account?</label><a className="text-decoration-underline text-primary" onClick={() => navigate('/sign-up')}>Sign Up</a>
          </div>
          <button className="btn btn-primary" onClick={async () => {
            try {
              await authService.signIn(userInformation);
              window.location.href = '/';
            } catch(e) {
              console.error(e);
            }
          }}>Sign In</button>
        </div>
      </div>

    </>

  )
}

export default SignIn;