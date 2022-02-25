import React, {useState} from "react";
import {userService} from "../services";
import {useNavigate} from "react-router";
import {toast} from "react-toastify";

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
      <div className="container">
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
          <button className="btn c-button" onClick={async () => {
            try {
              if(user.password !== confirmPassword){
                throw new Error('Password not match')
              }
              await userService.signUp(user);
              navigate("/sign-in");
            } catch (e) {
              toast.error('Sign up failed because password not match or username has existed, please check again', {
                position: "top-right", autoClose: 5000, hideProgressBar:true
              })
            }
            toast.success('Sign up successfully', {
              position: "top-right", autoClose: 5000, hideProgressBar:true
            })
          }}>Sign Up</button>
        </div>
      </div>

    </>
  )
}

export default SignUp;