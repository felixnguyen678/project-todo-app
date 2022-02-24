import React, {useEffect} from "react";
import "./App.scss"
import useAuth from "./hooks/useAuth";
import Cookies from "js-cookie";
import AdminOnly from "./routes/adminOnly";
import GuestOnly from "./routes/guestOnly";
import {UserRole} from "./models/user.model";
import UserOnly from "./routes/UserOnly";
function App(props) {
  const auth = useAuth();

  useEffect(async () => {
    await auth.fetchLoginUser();
  }, [])
  console.log(auth);

  if(auth.isLoading) return <></>

  return (
    <>
      {
        !auth.loginUser ? <GuestOnly /> : auth.loginUser.role === UserRole.ADMIN ? <AdminOnly /> : <UserOnly />
      }
    </>
  )
}

export default App;