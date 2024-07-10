import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/login/login";
import Dashboard from "./pages/dashboard/dashboard";
import Clients from "./pages/clients/clients";
import Provider from "./pages/providers/provider";
import Products from "./pages/products/products";
import Users from "./pages/users/users";
import ErrorPage from "./pages/notFound/errorPage";
import { Toaster } from "sonner";
import { AuthContextProvider } from "./context/authContext";
import PublicRoute from "./router/PublicRoute";
import PrivateRoute from "./router/PrivateRoute";

function App() {
  return (
    <>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<PublicRoute />}>
            <Route index element={<Login />} />
          </Route>
          <Route path="/dashboard" element={<PrivateRoute />}>
            <Route index element={<Dashboard />} />
            <Route path="/dashboard/clients" element={<Clients />} />
            <Route path="/dashboard/provider" element={<Provider />} />
            <Route path="/dashboard/products" element={<Products />} />
            <Route path="/dashboard/users" element={<Users></Users>} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </AuthContextProvider>
      <Toaster richColors></Toaster>
    </>
  );
}

export default App;
