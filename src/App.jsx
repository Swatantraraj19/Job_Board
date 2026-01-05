import { useEffect } from "react";
import { Briefcase, LogIn, LogOut, Sun, Moon } from "lucide-react";
import JobLists from "./components/JobLists";
import { useNavigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import ItemDetails from "./components/ItemDetails";
import LoginPage from "./pages/LoginPage";
import { useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/Home";
import PublicRoute from "./components/PublicRoute";
import SavedJobs from "./components/SavedJobs";

function App() {
  const navigate = useNavigate();
  const { user, logout, theme, toggleTheme } = useAuth();

  // -- Initialization --
  // If the user visits the root '/' but is already logged in,
  // automatically redirect them to the main app ('/joblists').
  useEffect(() => {
    if (user && window.location.pathname === "/") {
      navigate("/joblists");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-start p-4 gap-6 transition-colors duration-200">
      <div className="w-full max-w-4xl flex justify-between items-center bg-white dark:bg-zinc-900 p-4 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 transition-colors duration-200">
        <div
          className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xl cursor-pointer"
          onClick={() => navigate("/")}
        >
          <Briefcase />
          <span>JobBoard</span>
        </div>
        <div className="flex items-center gap-4">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 transition-colors"
            title="Toggle Theme"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-zinc-600 dark:text-zinc-300 hidden md:inline">
                Welcome, <b>{user.name}</b>
              </span>
              <button
                onClick={() => navigate("/saved")}
                className="text-indigo-600 dark:text-indigo-400 font-medium text-sm hover:underline"
              >
                Saved Jobs
              </button>
              <button
                onClick={() => {
                  (logout(), navigate("/", { replace: true }));
                }}
                className="px-3 py-1 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-200 rounded-lg text-sm font-medium text-zinc-700 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition"
            >
              Login
            </button>
          )}
        </div>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />

        <Route
          path="/joblists"
          element={
            <ProtectedRoute>
              <JobLists />
            </ProtectedRoute>
          }
        />

        <Route
          path="/saved"
          element={
            <ProtectedRoute>
              <SavedJobs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/item/:id"
          element={
            <ProtectedRoute>
              <ItemDetails />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
