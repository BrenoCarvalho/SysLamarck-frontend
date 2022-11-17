import {
  BrowserRouter,
  Routes as RoutesComponent,
  Route,
} from "react-router-dom";
import Home from "./pages/home";
import LocadorRegister from "./pages/locadorRegister";

const Routes = () => {
  return (
    <BrowserRouter>
      <RoutesComponent>
        <Route path="/" element={<Home />} />
        <Route path="/locadorRegister" element={<LocadorRegister />} />
      </RoutesComponent>
    </BrowserRouter>
  );
};

export default Routes;
