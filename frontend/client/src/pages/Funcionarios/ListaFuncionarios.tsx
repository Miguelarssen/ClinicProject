import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Loader2 } from "lucide-react";
import { funcionariosService } from "@/services/funcionarios";
import { FuncionarioListagem, PageResponse } from "@/types";
import { toast } from "sonner";

export default function ListaFuncionarios() {
  const [, navigate] = useLocation();
  const [funcionarios, setFuncionarios] = useState<FuncionarioListagem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    carregarFuncionarios();
  }, [page]);

  const carregarFuncionarios = async () => {
    setIsLoading(true);
    try {
      const response: PageResponse<FuncionarioListagem> =
        await funcionariosService.listar(page, 10);
      setFuncionarios(response.content);
      setTotalPages(response.totalPages);
    } catch (error) {
      toast.error("Erro ao carregar funcionários");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getTipoLabel = (tipo: string) => {
    return tipo === "MEDICO" ? "Médico" : "Recepcionista";
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Funcionários</h1>
            <p className="text-muted-foreground mt-2">
              Gerenciar lista de funcionários
            </p>
          </div>
          <Button onClick={() => navigate("/funcionarios/novo")}>
            <Plus className="mr-2 h-4 w-4" />
            Novo Funcionário
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Lista de Funcionários</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : funcionarios.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  Nenhum funcionário cadastrado
                </p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>CPF</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {funcionarios.map((funcionario) => (
                        <TableRow key={funcionario.id}>
                          <TableCell className="font-medium">
                            {funcionario.nome}
                          </TableCell>
                          <TableCell>{funcionario.cpf}</TableCell>
                          <TableCell>{funcionario.email}</TableCell>
                          <TableCell>
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {getTipoLabel(funcionario.tipoFuncionario)}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                navigate(`/funcionarios/${funcionario.id}`)
                              }
                            >
                              Editar
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Paginação */}
                <div className="flex items-center justify-between mt-4">
                  <p className="text-sm text-muted-foreground">
                    Página {page + 1} de {totalPages}
                  </p>
                  <div className="space-x-2">
                    <Button
                      variant="outline"
                      disabled={page === 0}
                      onClick={() => setPage(page - 1)}
                    >
                      Anterior
                    </Button>
                    <Button
                      variant="outline"
                      disabled={page === totalPages - 1}
                      onClick={() => setPage(page + 1)}
                    >
                      Próximo
                    </Button>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
