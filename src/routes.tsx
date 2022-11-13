import React from "react";
import {
  BrowserRouter,
  Routes as RoutesComponent,
  Route,
} from "react-router-dom";
import Dashboard from "./pages/dashboard";

const Routes = () => {
  return (
    <BrowserRouter>
      <RoutesComponent>
        <Route path="/" element={<Dashboard />} />
      </RoutesComponent>
    </BrowserRouter>
  );
};

export default Routes;
