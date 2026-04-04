import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ListaPacientes from "./pages/Pacientes/ListaPacientes";
import CadastroPacientes from "./pages/Pacientes/CadastroPacientes";
import ListaFuncionarios from "./pages/Funcionarios/ListaFuncionarios";
import CadastroFuncionarios from "./pages/Funcionarios/CadastroFuncionarios";
import ListaAgendamentos from "./pages/Agendamentos/ListaAgendamentos";
import CadastroAgendamentos from "./pages/Agendamentos/CadastroAgendamentos";
import ListaProntuarios from "./pages/Prontuarios/ListaProntuarios";
import DetalheProntuario from "./pages/Prontuarios/DetalheProntuario";
import CadastroProntuario from "./pages/Prontuarios/CadastroProntuario";
import Cadastro from "./pages/Cadastro";

import { ProtectedRoute } from "./components/ProtectedRoute";

function Router() {
  return (
    <Switch>
      <Route path={"/login"} component={Login} />
      <Route path={"/cadastro"} component={Cadastro} />

      <ProtectedRoute path={"/dashboard"} component={Dashboard} />
      <ProtectedRoute path={"/pacientes"} component={ListaPacientes} />
      <ProtectedRoute path={"/pacientes/novo"} component={CadastroPacientes} />
      <ProtectedRoute path={"/funcionarios"} component={ListaFuncionarios} />
      <ProtectedRoute path={"/funcionarios/novo"} component={CadastroFuncionarios} />
      <ProtectedRoute path={"/agendamentos"} component={ListaAgendamentos} />
      <ProtectedRoute path={"/agendamentos/novo"} component={CadastroAgendamentos} />
      <ProtectedRoute path={"/prontuarios"} component={ListaProntuarios} />
      <ProtectedRoute path={"/prontuarios/novo"} component={CadastroProntuario} />
      <ProtectedRoute path={"/prontuarios/:id"} component={DetalheProntuario} />
      <ProtectedRoute path={"/"} component={Dashboard} />

      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
      >
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
