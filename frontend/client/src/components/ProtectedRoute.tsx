import { useAuth } from "@/contexts/AuthContext";
import { Redirect, Route, RouteProps } from "wouter";

interface ProtectedRouteProps {
  path: string;
  component: React.ComponentType<any>;
}

export function ProtectedRoute({ path, component: Component }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();

  console.log({ isLoading, isAuthenticated });
  return (
    <Route path={path}>
      {(params) => {
        if (isLoading) {
          return (
            <div className="flex items-center justify-center min-h-screen">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          );
        }


        if (!isAuthenticated) {

          return <Redirect to="/login" />;
        }

        return <Component {...params} />;
      }}
    </Route>
  );
}
