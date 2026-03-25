import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Briefcase, Eye, EyeOff, Loader2, X } from "lucide-react";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isReseting, setIsReseting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { loginWithEmail, signUpWithEmail, loginWithGoogle, resetPassword } = useAuth();
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
      setError("");
      
      // -- Domestic Validator Check -- 
      const allowedDomains = ["@gmail.com", "@outlook.com", "@yahoo.com", "@hotmail.com", "@icloud.com"];
      const isAllowed = allowedDomains.some(domain => email.toLowerCase().endsWith(domain));

      if (!isAllowed) {
        setError("Please use a trusted email provider (e.g., Gmail or Outlook).");
        return;
      }

      // -- Password Length Validator --
      if (!isLogin && password.length < 6) {
        setError("Password must be at least 6 characters long for security!");
        return;
      }

      setIsLoading(true);
    try {
      if (isLogin) {
        await loginWithEmail(email, password);
      } else {
        await signUpWithEmail(email, password, name);
      }
      navigate("/joblists", { replace: true });
    } catch (err) {
      console.error(err);
      if (err.code === "auth/user-not-found") {
        setError("No account found with this email. Please sign up first!");
      } else if (err.code === "auth/wrong-password") {
        setError("Incorrect password. Please try again.");
      } else if (err.code === "auth/invalid-credential") {
        // This is the common code for failed logins in newer Firebase versions
        
        setError("Email or password incorrect. If you haven't created an account, please Sign Up first!");
      } else if (err.code === "auth/email-already-in-use") {
        setError("An account already exists with this email address.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
      setError("");
      setIsLoading(true);
    try {
      await loginWithGoogle();
      navigate("/joblists", { replace: true });
    } catch (err) {
      console.error(err);
      setError("Failed to sign in with Google.");
    } finally {
        setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your email to reset password.");
      return;
    }
    setIsReseting(true);
    try {
      await resetPassword(email);
      alert("Password reset link sent to your email!");
      setError("");
    } catch (err) {
        console.error(err);
      setError("Failed to send reset email. Check if the email is correct.");
    } finally {
      setIsReseting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[75vh] w-full p-4">
      <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-xl w-full max-w-sm border border-zinc-100 dark:border-zinc-800 relative overflow-hidden transition-colors">
        {/* Close Button */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-xl transition-all"
          title="Back to Home"
        >
          <X size={20} />
        </button>

        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-500 to-indigo-700"></div>

        <div className="text-center mb-8">
          <div className="inline-flex p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl mb-4">
            <Briefcase className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            {isLogin ? "Sign In" : "Sign Up"}
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 font-medium">
            {isLogin ? "Welcome back to JobBoard" : "Create your free account today"}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-xl text-red-600 dark:text-red-400 text-xs font-bold animate-shake">
            {error}
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-5">
          {!isLogin && (
            <div className="space-y-1.5 animate-in fade-in slide-in-from-top-2 duration-300">
              <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 ml-1 uppercase tracking-wider">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full px-4 py-3 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-zinc-50 dark:bg-zinc-800/50 dark:text-white transition-all outline-none text-sm font-medium"
                placeholder="jack Dous"
                required={!isLogin}
              />
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 ml-1 uppercase tracking-wider">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-4 py-3 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-zinc-50 dark:bg-zinc-800/50 dark:text-white transition-all outline-none text-sm font-medium"
              placeholder="name@company.com"
              required
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center px-1">
              <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
                Password
              </label>
              {isLogin && (
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  disabled={isReseting}
                  className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline disabled:opacity-50"
                >
                  {isReseting ? "Sending..." : "Forgot password?"}
                </button>
              )}
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-4 py-3 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-zinc-50 dark:bg-zinc-800/50 dark:text-white transition-all outline-none text-sm font-medium"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-indigo-500 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 text-white py-3.5 rounded-xl font-bold text-sm hover:bg-zinc-800 dark:hover:bg-white transition-all shadow-lg active:scale-[0.98] flex items-center justify-center gap-2 group disabled:opacity-70"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : (isLogin ? "Sign In" : "Create Account")}
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-200 dark:border-zinc-800"></div>
            </div>
            <div className="relative flex justify-center text-[10px] items-center">
              <span className="px-3 bg-white dark:bg-zinc-900 text-zinc-400 font-bold uppercase tracking-[0.2em]">OR</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGoogleAuth}
            disabled={isLoading}
            className="w-full bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800 py-3 rounded-xl font-bold text-sm hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-all flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-70"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continue with Google
          </button>

          <p className="text-center text-xs font-medium text-zinc-500 dark:text-zinc-400 pt-2">
            {isLogin ? "Don't have a free account yet?" : "Already have an account?"}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              {isLogin ? "Create account" : "Sign in now"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
