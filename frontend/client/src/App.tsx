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

function Router() {
  return (
    <Switch>
      <Route path={"/login"} component={Login} />
      <Route path={"/dashboard"} component={Dashboard} />
      <Route path={"/pacientes"} component={ListaPacientes} />
      <Route path={"/pacientes/novo"} component={CadastroPacientes} />
      <Route path={"/funcionarios"} component={ListaFuncionarios} />
      <Route path={"/funcionarios/novo"} component={CadastroFuncionarios} />
      <Route path={"/agendamentos"} component={ListaAgendamentos} />
      <Route path={"/agendamentos/novo"} component={CadastroAgendamentos} />
      <Route path={"/prontuarios"} component={ListaProntuarios} />
      <Route path={"/prontuarios/novo"} component={CadastroProntuario} />
      <Route path={"/prontuarios/:id"} component={DetalheProntuario} />
      <Route path={"/"} component={Dashboard} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
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
