import React, {useState} from "react";
import {userService} from "../services";
import {useNavigate} from "react-router";

function SignUp(props) {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: '',
    password: '',
    fullName: ''
  });
  const [confirmPassword, setConfirmPassword] = useState('')
  return (
    <>
      <div className="container pt-5">
        <div className="w-50 border p-5 mx-auto">
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username:</label>
            <input type="text" className="form-control" id="username" onChange={(e) => setUser({...user, username: e.target.value})}/>
          </div>
          <div className="mb-3">
            <label htmlFor="fulName" className="form-label">Full Name:</label>
            <input type="text" className="form-control" id="fullName"  onChange={(e) => setUser({...user, fullName: e.target.value})}/>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password:</label>
            <input type="password" className="form-control" id="password"  onChange={(e) => setUser({...user, password: e.target.value})}/>
          </div>
          <div className="mb-3">
            <label htmlFor="confirmedPassword" className="form-label">Confirm Password:</label>
            <input type="password" className="form-control" id="confirmedPassword"  onChange={(e) => setConfirmPassword(e.target.value)}/>
          </div>
          <button className="btn btn-primary" onClick={async () => {
            await userService.signUp(user);
            navigate("/sign-in");
          }}>Sign Up</button>
        </div>
      </div>

    </>
  )
}

export default SignUp;