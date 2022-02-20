import React, {useContext, useEffect, useState} from "react";
import DataContext from "../../contexts/data.context";
import {userService} from "../../services";
import {UserRoleBadge, UserStatusBadge} from "./badges";

function UserRow(props) {
  const [isEditing, setEditing] = useState(false);
  const [isAllDataFetched, setIsAllDataFetched] = useContext(DataContext.context);
  const [isChanging, setIsChanging] = useState(false);
  const [user, setUser] = useState();

  const getUserFromDb = async () => {
    const userFromDb = await userService.getUserByUsername(props.user.username);
    setUser(userFromDb);
  }
  useEffect(async () => {
    await getUserFromDb();
  }, [])
  if(!user) return <></>;

  return (
    <div className="row border-2 border-bottom p-2">
      <strong className="col-3 mt-2 text-start">{user.username}</strong>
      <strong className="col-3 mt-2 text-start"><div className="">{isEditing ? (<input type="text" className="form-control" value={user.fullName} onChange={(e) => setUser({...user, fullName: e.target.value})}/>) : user.fullName}</div></strong>
      <strong className="col-2 mt-2 text-start"><div className="">{isEditing ? (<input type="text" className="form-control" value={user.status} onChange={(e) => setUser({...user, status: e.target.value})}/>) : <UserStatusBadge status={user.status} /> }</div></strong>
      <strong className="col-2 mt-2 text-start"><div>{isEditing ? (<input type="text" className="form-control" value={user.role} onChange={(e) => setUser({...user, role: e.target.value})}/>) : <UserRoleBadge role={user.role} /> }</div></strong>
      <span className="col-2">
        {
          isEditing ? (<button type="button" className="btn btn-link" onClick={async () => {
            const data = await userService.updateUserByUsername(user.username, {fullName: user.fullName, status: user.status, role: user.role});
            setEditing(false);
          }}>Save</button>) : (
            <button type="button" className="btn btn-link" onClick={() => setEditing(true)}>Edit</button>
          )
        }

        <button type="button" className="btn btn-white text-danger" onClick={ async () => {
          await userService.deleteUserByUsername(user.username);
          await getUserFromDb();
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/></svg>
        </button>

      </span>
    </div>
  )
}

export default UserRow;