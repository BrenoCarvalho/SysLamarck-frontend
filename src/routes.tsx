import {
  BrowserRouter,
  Routes as RoutesComponent,
  Route,
} from "react-router-dom";
import Home from "./pages/home";
import LocatorRegister from "./pages/locatorRegister";
import ImmobileRegister from "./pages/immobileRegister";
import LocatarioRegister from "./pages/locatarioRegister";
import LocatorSearch from "./pages/locatorSearch";
import LocatorService from "./services/LocatorService";
import LocatorEdit from "./pages/locatorEdit";

const Routes = () => {
  const locatorService = new LocatorService();

  return (
    <BrowserRouter>
      <RoutesComponent>
        <Route path="/" element={<Home />} />
        <Route
          path="/cadastro/locador"
          element={<LocatorRegister service={locatorService} />}
        />
        <Route path="/cadastro/imovel" element={<ImmobileRegister />} />
        <Route path="/cadastro/locatario" element={<LocatarioRegister />} />
        <Route
          path="/consulta/locador"
          element={<LocatorSearch service={locatorService} />}
        />
        <Route
          path="/editar/locador/:id"
          element={<LocatorEdit service={locatorService} />}
        />
      </RoutesComponent>
    </BrowserRouter>
  );
};

export default Routes;
