import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { User, Session } from "@supabase/supabase-js";
import { Loader2, LogOut, User as UserIcon } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (event === 'SIGNED_OUT') {
          navigate("/auth");
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (!session) {
        navigate("/auth");
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    setLoggingOut(true);
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      toast({
        title: "Logout failed",
        description: error.message,
        variant: "destructive",
      });
      setLoggingOut(false);
    } else {
      toast({
        title: "Logged out",
        description: "You've been successfully logged out.",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-muted">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-4">
      <div className="mx-auto max-w-4xl space-y-6 pt-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Button
            onClick={handleLogout}
            variant="outline"
            disabled={loggingOut}
          >
            {loggingOut ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Logging out...
              </>
            ) : (
              <>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </>
            )}
          </Button>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-primary/10 p-3">
                <UserIcon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle>Welcome back!</CardTitle>
                <CardDescription>
                  You're successfully authenticated
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-muted p-4">
              <h3 className="mb-2 font-semibold">User Information</h3>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-medium">Email:</span>{" "}
                  <span className="text-muted-foreground">{user?.email}</span>
                </p>
                <p>
                  <span className="font-medium">User ID:</span>{" "}
                  <span className="text-muted-foreground">{user?.id}</span>
                </p>
                <p>
                  <span className="font-medium">Name:</span>{" "}
                  <span className="text-muted-foreground">
                    {user?.user_metadata?.name || "Not provided"}
                  </span>
                </p>
                <p>
                  <span className="font-medium">Account created:</span>{" "}
                  <span className="text-muted-foreground">
                    {user?.created_at
                      ? new Date(user.created_at).toLocaleDateString()
                      : "N/A"}
                  </span>
                </p>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-card p-4">
              <h3 className="mb-2 font-semibold">Session Status</h3>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span className="text-sm text-muted-foreground">
                  Active session
                </span>
              </div>
            </div>

            <div className="rounded-lg bg-accent/50 p-4">
              <p className="text-sm text-accent-foreground">
                🎉 Your authentication is fully functional and connected to Supabase!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
