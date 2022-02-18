function User(_id, username, password, fullName, status, role) {
  this._id = _id;
  this.username = username;
  this.password = password;
  this.fullName = fullName;
  this.status = status;
  this.role = role;
}

export default User;