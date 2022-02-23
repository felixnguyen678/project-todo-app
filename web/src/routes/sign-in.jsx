import React, {useContext, useState} from "react";
import {authService, userService} from "../services";
import AuthContext from "../contexts/auth.context";
import {useNavigate} from "react-router";

function SignIn(props) {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext.context)
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
          <button className="btn btn-primary" onClick={async () => {
            try {
              let data = await userService.signIn(userInformation);
              await authService.setAccessToken(data.token);
              await authContext.fetchLoginUser();
              navigate('/');
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