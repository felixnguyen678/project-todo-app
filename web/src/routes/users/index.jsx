import React, {useContext, useEffect, useState} from "react";
import DataContext from "../../contexts/data.context";
import {userService} from "../../services";
import UserRow from "../../components/user/UserRow";
import {useNavigate} from "react-router";

function Users(props) {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [isAllDataLoading, setIsAllDataLoading] = useContext(DataContext.context);
  const [isLoading, setIsLoading] = useState(false);

  async function getUsersFromDatabase() {
    setIsLoading(true);
    const dataFromDatabase = await userService.getAllUsers();
    setUsers(dataFromDatabase);
    setIsLoading(false);
  }

  useEffect(async () => {
    await getUsersFromDatabase()
  },[]);

  if(!users) return <></>;


  return (
    <>

      <div className="container mt-5">
        <div className="d-flex justify-content-end mb-4">
          <button className="btn btn-primary" onClick={() => navigate("/users/create")}>Add User<i className="ms-1 ri-user-add-line h5"></i></button>
        </div>
        <div className="row border-2 border-dark border-bottom p-2">
          <strong className="col-3 text-start">Username</strong>
          <strong className="col-3 text-start">Full Name</strong>
          <strong className="col-2 text-start">Status</strong>
          <strong className="col-2 text-start">Role</strong>
          <strong className="col-2 text-center">Action</strong>
        </div>
        {
          isLoading && (<div className="spinner-border mt-5 d-block mx-auto" role="status">
            <span className="visually-hidden"/>
          </div>)
        }
        {
          users.map(user => (
            <UserRow user={user}/>)
          )
        }
      </div>
    </>
  );
}

export default Users;