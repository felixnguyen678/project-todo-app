import React, {useState} from "react";
import {UserRole, UserStatus} from "../../models/user.model";
import {userService} from "../../services";

function CreateUser(props) {
  const [user, setUser] = useState({
    username: '',
    fullName: '',
    password: '',
    status: UserStatus.ACTIVE,
    role: UserRole.USER
  });

  const createUser = async () => {
    await userService.createUser(user);
  }


  return (
    <div className="container mt-5">
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
          <input type="text" className="form-control" id="password"  onChange={(e) => setUser({...user, password: e.target.value})}/>
        </div>
        <div className="mb-3 row">
          <div className="col-6 px-3">
            <div className="mb-3">
              <label htmlFor="status" className="form-label">Status:</label>
              <select id="status" className="form-select"  onChange={(e) => setUser({...user, status: e.target.value})}>
                <option value={UserStatus.ACTIVE}>active</option>
                <option value={UserStatus.INACTIVE}>inactive</option>
              </select>
            </div>
          </div>
          <div className="col-6 px-3">
            <div className="mb-3">
              <label htmlFor="role" className="form-label">Role:</label>
              <select id="role" className="form-select"  onChange={(e) => setUser({...user, role: e.target.value})}>
                <option value={UserRole.USER}>user</option>
                <option value={UserRole.ADMIN}>admin</option>
              </select>
            </div>
          </div>
        </div>
        <button className="btn btn-primary">Submit</button>
      </div>
    </div>
  )
}

export default CreateUser;