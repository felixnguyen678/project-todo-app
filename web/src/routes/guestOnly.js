import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "../pages";
import SignIn from "../pages/sign-in";
import SignUp from "../pages/sign-up";

const GuestOnly = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  )
}

export default GuestOnly;