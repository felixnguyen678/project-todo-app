import React, {useContext, useEffect, useState} from "react";
import DataContext from "../../contexts/data.context";
import {userService} from "../../services";
import UserRow from "../../components/user/UserRow";

function Users(props) {
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
    <div className="l-app">
      <header className="l-app__header">
        Todo App
      </header>
      {
        isLoading && (<div className="spinner-border mt-5" role="status">
          <span className="visually-hidden"/>
        </div>)
      }
      <div className="container mt-5">
        {/*<AddTaskForm />*/}
        <div className="row border-2 border-dark border-bottom p-2">
          <strong className="col-3 text-start">Username</strong>
          <strong className="col-3 text-start">Full Name</strong>
          <strong className="col-2 text-start">Status</strong>
          <strong className="col-2 text-start">Role</strong>
          <strong className="col-2 text-center">Action</strong>
        </div>
        {
          users.map(user => (
            <UserRow user={user}/>)
          )
        }
      </div>
    </div>
  );
}

export default Users;