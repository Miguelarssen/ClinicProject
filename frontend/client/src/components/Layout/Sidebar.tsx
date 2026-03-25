import { Link } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import {
  Users,
  Stethoscope,
  Calendar,
  FileText,
  LogOut,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Sidebar() {
  const { logout, usuario } = useAuth();
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    {
      label: "Pacientes",
      href: "/pacientes",
      icon: Users,
    },
    {
      label: "Funcionários",
      href: "/funcionarios",
      icon: Stethoscope,
    },
    {
      label: "Agendamentos",
      href: "/agendamentos",
      icon: Calendar,
    },
    {
      label: "Prontuários",
      href: "/prontuarios",
      icon: FileText,
    },
  ];

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-primary text-primary-foreground"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 w-64 bg-card border-r border-border flex flex-col h-screen fixed lg:relative z-40`}
      >
        {/* Header */}
        <div className="p-6 border-b border-border">
          <h1 className="text-xl font-bold text-foreground">Clínica</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {usuario?.funcionario?.nome}
          </p>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href}>
                <a className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-accent text-foreground hover:text-accent-foreground transition-colors">
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </a>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <Button
            onClick={logout}
            variant="outline"
            className="w-full justify-start gap-2"
          >
            <LogOut className="h-4 w-4" />
            Sair
          </Button>
        </div>
      </aside>

      {/* Overlay mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
