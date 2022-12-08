import {
  BrowserRouter,
  Routes as RoutesComponent,
  Route,
} from "react-router-dom";
import Home from "./pages/home";
import LocadorRegister from "./pages/locadorRegister";
import ImmobileRegister from "./pages/immobileRegister";
import LocatarioRegister from "./pages/locatarioRegister";

const Routes = () => {
  return (
    <BrowserRouter>
      <RoutesComponent>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro/locador" element={<LocadorRegister />} />
        <Route path="/cadastro/imovel" element={<ImmobileRegister />} />
        <Route path="/cadastro/locatario" element={<LocatarioRegister />} />
      </RoutesComponent>
    </BrowserRouter>
  );
};

export default Routes;
