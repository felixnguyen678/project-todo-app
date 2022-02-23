import {useNavigate} from "react-router";
import useAuth from "./useAuth";
import {useEffect} from "react";
import {matchRole} from "../models/user.model";

function useProtection (options) {
  const navigate = useNavigate();
  const {loginUser, getLoginUser, loading} = useAuth();

  useEffect(() => {
    (async () => {
      if(options){
        if (!options?.redirect) {
          return;
        }

        const user = await getLoginUser();
        if (options.preventAuthenticatedUser) {
          if (user) {
            await navigate(options.redirect);
          }
        } else if (!user || !matchRole(user, options?.role)) {
          await navigate(options.redirect);
        }
      }
    })(),
      [
        getLoginUser,
        navigate,
        options.redirect,
        options.role,
        options.preventAuthenticatedUser,
      ];
  });

  return {loginUser, loading};
};
