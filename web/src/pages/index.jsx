import React, {useEffect} from "react";
import useAuth from "../hooks/useAuth";
import {useNavigate} from "react-router";

function Home(props) {
  const {loginUser, fetchLoginUser} = useAuth();
  const navigate = useNavigate();

  useEffect(async () => {
    await fetchLoginUser();
    if(!loginUser) {
      navigate('/sign-in');
    } else {
      navigate('/projects');
    }
  }, [])
  return (
    <></>
  )
}

export default Home;