import React from "react";
import {UserRole, UserStatus} from "../../../models/user.model";

export const UserStatusBadge = ({status}) => {
  let color;
  switch(status){
    case UserStatus.ACTIVE:
      color = 'bg-success';
      break;
    case UserStatus.INACTIVE:
      color = 'bg-secondary';
      break;
    default:
      color = 'bg-dark';
      break;
  }
  return(
    <span className={`badge c-badge ${color}`}>{status}</span>
  )
}

export const UserRoleBadge = ({role}) => {
  let color;
  switch(role){
    case UserRole.ADMIN:
      color = 'bg-danger';
      break;
    case UserRole.USER:
      color = 'bg-info';
      break;
    default:
      color = 'bg-warning';
      break;
  }
  return(
    <span className={`badge c-badge ${color}`}>{role}</span>
  )
}