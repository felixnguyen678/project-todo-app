import {useContext} from "react";
import AuthContext from "../contexts/auth.context"

function useAuth() {
  const authContext = useContext(AuthContext.context);

  return authContext;
}

export default useAuth;