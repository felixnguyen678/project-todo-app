import React, {useState} from "react";
import {authService} from "../services";

const context = React.createContext(null);

export function AuthProvider ({children}) {
  const [loginUser, setLoginUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchLoginUser = async () => {
    const fetchedLoginUser = await authService.fetchUserInfo();
    setLoginUser(fetchedLoginUser);

    if(loading){
      setLoading(false);
    }

    return fetchedLoginUser;
  }

  const getLoginUser = async () => {
    if(!loginUser){
      return await fetchLoginUser();
    }
    return loginUser;
  }

  return (
    <context.Provider value={{
      loginUser,
      setLoginUser,
      loading,
      fetchLoginUser,
      getLoginUser
    }}>
      {children}
    </context.Provider>
  )
}

export default {
  context,
  Provider: AuthProvider,
  Consumer: context.Consumer
}