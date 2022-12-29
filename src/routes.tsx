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
import LocatorEdit from "./pages/locatorEdit";
import Login from "./pages/login";
import { Context } from "./context/AuthContext";
import { useContext } from "react";
import PropertySearch from "./pages/propertySearch";
import PropertyEdit from "./pages/propertyEdit";

const Private = ({ Item }: any) => {
  const { authenticated } = useContext(Context);
  return authenticated ? <Item /> : <Login />;
};

const Routes = () => {
  return (
    <BrowserRouter>
      <RoutesComponent>
        <Route path="/" element={<Private Item={Home} />} />
        <Route
          path="/cadastro/locador"
          element={<Private Item={LocatorRegister} />}
        />
        <Route
          path="/cadastro/imovel"
          element={<Private Item={ImmobileRegister} />}
        />
        <Route
          path="/cadastro/locatario"
          element={<Private Item={LocatarioRegister} />}
        />
        <Route
          path="/consulta/locador"
          element={<Private Item={LocatorSearch} />}
        />
        <Route
          path="/consulta/imovel"
          element={<Private Item={PropertySearch} />}
        />
        <Route
          path="/editar/locador/:id"
          element={<Private Item={LocatorEdit} />}
        />
        <Route
          path="/editar/imovel/:id"
          element={<Private Item={PropertyEdit} />}
        />
      </RoutesComponent>
    </BrowserRouter>
  );
};

export default Routes;
