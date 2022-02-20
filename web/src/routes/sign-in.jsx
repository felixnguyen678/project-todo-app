import React, {useState} from "react";
import {userService} from "../services";

function SignIn(props) {
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
            let data = await userService.signIn(userInformation);
            console.log(data);
          }}>Sign In</button>
        </div>
      </div>

    </>

  )
}

export default SignIn;