import React, {useEffect} from "react";
import useAuth from "../hooks/useAuth";
import {useNavigate} from "react-router";

function Home(props) {
  const {loginUser} = useAuth();
  const navigate = useNavigate();
  if(!loginUser) {
    navigate('/sign-in');
  } else {
    navigate('/projects');
  }
  return (
    <></>
  )
}

export default Home;