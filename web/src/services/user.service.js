import User from "../models/user.model";

export function UserService(restConnector) {
  this.restConnector = restConnector;

  this.getAllUsers = async () => {
    const {data} = await this.restConnector.get('/users');
    return data.map(user => new User(user._id, user.username, undefined, user.fullName, user.status, user.role));
  }

  this.getUserByUsername = async (username) => {
    const {data} = await this.restConnector.get(`/users/${username}`);
    return data ? new User(data._id, data.username, undefined, data.fullName, data.status, data.role) : undefined;
  }

  this.createUser = async (user) => {
    const {data} = await this.restConnector.post('/users', user);
    return data;
  }

  this.updateUserByUsername = async (username, updateInformation) => {
    const {data} = await this.restConnector.patch(`/users/${username}/update`, updateInformation);
    return data;
  }
  this.deleteUserByUsername = async (username) => {
    const {data} = await this.restConnector.delete(`/users/${username}/delete`);
    return data;
  }
}

export default UserService;