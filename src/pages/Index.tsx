import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Lock, Shield, Zap } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-muted">
      <div className="max-w-2xl space-y-8 px-4 text-center">
        <div className="flex justify-center">
          <div className="rounded-full bg-primary/10 p-4">
            <Shield className="h-16 w-16 text-primary" />
          </div>
        </div>
        
        <div className="space-y-4">
          <h1 className="text-5xl font-bold tracking-tight">
            Secure Authentication
          </h1>
          <p className="text-xl text-muted-foreground">
            Modern authentication system powered by Supabase
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-border bg-card p-6">
            <Lock className="mx-auto mb-3 h-8 w-8 text-primary" />
            <h3 className="mb-2 font-semibold">Secure</h3>
            <p className="text-sm text-muted-foreground">
              Enterprise-grade security
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-6">
            <Zap className="mx-auto mb-3 h-8 w-8 text-primary" />
            <h3 className="mb-2 font-semibold">Fast</h3>
            <p className="text-sm text-muted-foreground">
              Lightning-fast authentication
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-6">
            <Shield className="mx-auto mb-3 h-8 w-8 text-primary" />
            <h3 className="mb-2 font-semibold">Reliable</h3>
            <p className="text-sm text-muted-foreground">
              99.9% uptime guaranteed
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button
            size="lg"
            onClick={() => navigate("/auth")}
            className="text-base"
          >
            Get Started
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate("/auth")}
            className="text-base"
          >
            Sign In
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
