import {
  BrowserRouter,
  Routes as RoutesComponent,
  Route,
} from "react-router-dom";
import Home from "./pages/home";
import LocatorCreation from "./pages/locator/locatorCreation";
import PropertyCreation from "./pages/property/propertyCreation";
import TenantCreation from "./pages/tenant/tenantCreation";
import LocatorSearch from "./pages/locator/locatorSearch";
import LocatorEdit from "./pages/locator/locatorEdit";
import Login from "./pages/login";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import PropertySearch from "./pages/property/propertySearch";
import PropertyEdit from "./pages/property/propertyEdit";
import TenantSearch from "./pages/tenant/tenantSearch";
import TenantEdit from "./pages/tenant/tenantEdit";
import Reports from "./pages/reports";
import Movimentation from "./pages/cashier/movimentation";
import ReceiveRent from "./pages/cashier/rent/receiveRent";
import TransferRent from "./pages/cashier/rent/transferRent";
import RentInstallments from "./pages/rentInstallments";
import ViewCashier from "./pages/cashier/viewCashier";
import { CashierProvider } from "./context/CashierContext";

const Private = ({ Item }: any) => {
  const { user } = useContext(AuthContext);
  return user ? <Item /> : <Login />;
};

const Routes = () => {
  return (
    <BrowserRouter>
      <RoutesComponent>
        <Route path="/" element={<Private Item={Home} />} />
        <Route
          path="/cadastro/locador"
          element={<Private Item={LocatorCreation} />}
        />
        <Route
          path="/cadastro/imovel"
          element={<Private Item={PropertyCreation} />}
        />
        <Route
          path="/cadastro/locatario"
          element={<Private Item={TenantCreation} />}
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
          path="/consulta/locatario"
          element={<Private Item={TenantSearch} />}
        />
        <Route
          path="/editar/locador/:id"
          element={<Private Item={LocatorEdit} />}
        />
        <Route
          path="/editar/imovel/:id"
          element={<Private Item={PropertyEdit} />}
        />
        <Route
          path="/editar/locatario/:id"
          element={<Private Item={TenantEdit} />}
        />
        <Route path="/parcelas" element={<Private Item={RentInstallments} />} />
        <Route path="/relatorios" element={<Private Item={Reports} />} />
        <Route
          path="/caixa/movimentacoes"
          element={
            <CashierProvider>
              <Private Item={Movimentation} />
            </CashierProvider>
          }
        />
        <Route
          path="/caixa/aluguel/recebimento"
          element={
            <CashierProvider>
              <Private Item={ReceiveRent} />
            </CashierProvider>
          }
        />
        <Route
          path="/caixa/aluguel/repasse"
          element={
            <CashierProvider>
              <Private Item={TransferRent} />
            </CashierProvider>
          }
        />
        <Route
          path="/caixa/visualizar"
          element={<Private Item={ViewCashier} />}
        />
      </RoutesComponent>
    </BrowserRouter>
  );
};

export default Routes;
