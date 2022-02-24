import React, {useContext, useEffect, useState} from "react";
import DataContext from "../../contexts/data.context";
import {userService} from "../../services";
import {UserRoleBadge, UserStatusBadge} from "./badges";
import {UserRole, UserStatus} from "../../models/user.model";

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
    <div className="row c-table__row">
      <span className="col-3 mt-2 text-start">{user.username}</span>
      <span className="col-3 mt-2 text-start"><div className="">{isEditing ? (<input type="text" className="form-control" value={user.fullName} onChange={(e) => setUser({...user, fullName: e.target.value})}/>) : user.fullName}</div></span>
      <span className="col-2 mt-2 text-start"><div className="">{isEditing ? (
        <select className="form-select" value={user.status} onChange={(e) => setUser({...user, status: e.target.value})}>
          <option value={UserStatus.ACTIVE}>{UserStatus.ACTIVE}</option>
          <option value={UserStatus.INACTIVE}>{UserStatus.INACTIVE}</option>
      </select>) : <UserStatusBadge status={user.status} /> }</div></span>
      <strong className="col-2 mt-2 text-start"><div>{isEditing ? (
        <select className="form-select" value={user.role} onChange={(e) => setUser({...user, role: e.target.value})}>
          <option value={UserRole.ADMIN}>{UserRole.ADMIN}</option>
          <option value={UserRole.USER}>{UserRole.USER}</option>
      </select>) : <UserRoleBadge role={user.role} /> }</div></strong>
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
          <i className="ri-delete-bin-6-line h5"></i>
        </button>

      </span>
    </div>
  )
}

export default UserRow;