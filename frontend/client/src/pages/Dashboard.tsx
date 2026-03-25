import DashboardLayout from "@/components/Layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Stethoscope, Calendar, FileText } from "lucide-react";

export default function Dashboard() {
  const stats = [
    {
      title: "Pacientes",
      value: "0",
      icon: Users,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Funcionários",
      value: "0",
      icon: Stethoscope,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Agendamentos",
      value: "0",
      icon: Calendar,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      title: "Prontuários",
      value: "0",
      icon: FileText,
      color: "bg-purple-100 text-purple-600",
    },
  ];

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Visão geral do sistema de clínica
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2 rounded-lg ${stat.color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    Total registrado
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Welcome Section */}
        <Card>
          <CardHeader>
            <CardTitle>Bem-vindo ao Sistema</CardTitle>
            <CardDescription>
              Utilize o menu lateral para acessar as diferentes seções do sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Este é um sistema de gestão de clínica que permite gerenciar pacientes,
              funcionários, agendamentos e prontuários médicos de forma integrada e eficiente.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
