import React from "react";
import NavBar from "../component/NavBar/NavBar";
import { Outlet } from "react-router-dom";

export default function MainLayouts() {
  return <>
    <NavBar />
    <Outlet/>
  </>;
}
