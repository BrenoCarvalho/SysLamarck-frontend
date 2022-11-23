import {
  BrowserRouter,
  Routes as RoutesComponent,
  Route,
} from "react-router-dom";
import Home from "./pages/home";
import LocadorRegister from "./pages/locadorRegister";
import ImovelRegister from "./pages/imovelRegister";

const Routes = () => {
  return (
    <BrowserRouter>
      <RoutesComponent>
        <Route path="/" element={<Home />} />
        <Route path="/locadorRegister" element={<LocadorRegister />} />
        <Route path="/imovelRegister" element={<ImovelRegister />} />
      </RoutesComponent>
    </BrowserRouter>
  );
};

export default Routes;
