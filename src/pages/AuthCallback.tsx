import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const code = searchParams.get("code");
    const error = searchParams.get("error");

    if (error) {
      toast({
        title: "Authentication Failed",
        description: "There was an error logging in with DAuth.",
        variant: "destructive",
      });
      navigate("/");
      return;
    }

    if (code) {
      const exchangeToken = async () => {
        try {
          const params = new URLSearchParams();
          params.append('client_id', import.meta.env.VITE_DAUTH_CLIENT_ID);
          params.append('client_secret', import.meta.env.VITE_DAUTH_CLIENT_SECRET);
          params.append('grant_type', 'authorization_code');
          params.append('code', code);
          params.append('redirect_uri', import.meta.env.VITE_DAUTH_REDIRECT_URI);

          // Exchange Code for Token (Using Proxy)
          const tokenResponse = await fetch("/api/dauth/oauth/token", { 
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: params,
          });

          if (!tokenResponse.ok) throw new Error("Failed to exchange token");
          const tokenData = await tokenResponse.json();

          // Fetch User Details (Using Proxy)
          const userResponse = await fetch("/api/dauth/resources/user", {
            method: "POST",
            headers: { "Authorization": `Bearer ${tokenData.access_token}` },
          });

          if (!userResponse.ok) throw new Error("Failed to fetch user data");
          const userData = await userResponse.json();

          // Save Session
          localStorage.setItem("dauth_user", JSON.stringify(userData));
          setUser(userData);
          
          toast({
            title: "Welcome!",
            description: `Logged in as ${userData.name}`,
          });

          // REDIRECT LOGIC:
          // Check if we have a saved return path
          const returnTo = sessionStorage.getItem("loginRedirect");
          sessionStorage.removeItem("loginRedirect"); // Clean up
          
          // Navigate to the return path, or default to dashboard
          navigate(returnTo || "/student/dashboard");

        } catch (err) {
          console.error(err);
          toast({
            title: "Login Error",
            description: "Could not verify your session.",
            variant: "destructive",
          });
          navigate("/");
        }
      };

      exchangeToken();
    }
  }, [searchParams, navigate, setUser, toast]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-4">
      <Loader2 className="w-12 h-12 animate-spin text-primary" />
      <h2 className="text-xl font-medium font-display">Verifying credentials...</h2>
    </div>
  );
};

export default AuthCallback;