import restConnector from "../core/connectors/restConnector";
import Cookies from 'js-cookie';

const AUTHORIZATION_HEADER = 'Authorization';
export const ACCESS_TOKEN_COOKIE = 'jwt';

function AuthService(restConnector) {
  this.restConnector = restConnector;
  this.jwt = null;

  this.loadAccessToken = () => {
    // On browser, load access token from cookie storage.
    const accessToken = Cookies.get(ACCESS_TOKEN_COOKIE);
    this.jwt = accessToken;
    this.restConnector.defaults.headers[
      AUTHORIZATION_HEADER
      ] = `Bearer ${accessToken}`;
  }

  this.fetchUserInfo = async () => {
    this.jwt = Cookies.get(ACCESS_TOKEN_COOKIE);
    if (!this.jwt) {
    return null;
    }

    try {
      const resp = await this.restConnector.get('/users/me');
      return resp.data;
    } catch (e) {
      return null;
    }
  }
  this.setAccessToken = (token) =>{
    if (token) {
      this.jwt = token;
      Cookies.set(ACCESS_TOKEN_COOKIE, token);
      this.restConnector.defaults.headers[
        AUTHORIZATION_HEADER
        ] = `Bearer ${token}`;
    } else {
      this.jwt = null;
      Cookies.remove(ACCESS_TOKEN_COOKIE);
      delete this.restConnector.defaults.headers[AUTHORIZATION_HEADER];
    }
  }

  this.logout = () => {
    this.setAccessToken(null);
  }




  this.login = async (username, password) => {
    // Login with email and password.
    const {data} = await this.restConnector.post(
      '/accounts/login',
      {username, password},
    );

    // Store access token into cookie.
    this.setAccessToken(data.token);

    // Fetch login user info.
    return this.fetchUserInfo();
  }



  this.loadAccessToken();

}

export default AuthService;