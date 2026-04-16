import { useAuth } from "@/contexts/AuthContext";
import { Bell, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const { usuario } = useAuth();

  return (
    <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between">
      <div>
        <h2 className="text-lg font-semibold text-foreground">
          Bem-vindo, {usuario?.funcionario?.nome}
        </h2>
        <p className="text-sm text-muted-foreground">
          {usuario?.funcionario?.tipoFuncionario === "MEDICO"
            ? "Médico"
            : "Recepcionista"}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
