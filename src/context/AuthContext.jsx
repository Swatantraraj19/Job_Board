import { createContext, useContext, useState, useEffect } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  sendPasswordResetEmail,
  updateProfile
} from "firebase/auth";
import { doc, onSnapshot, setDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { auth, db } from "../lib/firebase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [savedJobs, setSavedJobs] = useState([]);
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const [category, setCategory] = useState(() => localStorage.getItem("category") || "jobstories");

  // 1. Listen for Auth Changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // 2. Listen for Firestore Saved Jobs (Real-time)
  useEffect(() => {
    if (!user) {
      setSavedJobs([]);
      return;
    }

    const userRef = doc(db, "users", user.uid);
    const unsubscribe = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        setSavedJobs(docSnap.data().savedJobs || []);
      } else {
        // Initialize user document if it doesn't exist
        setDoc(userRef, { 
          email: user?.email,
          savedJobs: [] 
        }, { merge: true });
      }
    });

    return () => unsubscribe();
  }, [user]);

  // 3. Theme & Category (Keep in localStorage for non-auth preference)
  useEffect(() => {
    localStorage.setItem("category", category);
  }, [category]);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Actions
  const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

  const loginWithEmail = (email, password) => signInWithEmailAndPassword(auth, email, password);
  const signUpWithEmail = async (email, password, name) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(result.user, { displayName: name });
    return result;
  };
  const loginWithGoogle = () => signInWithPopup(auth, new GoogleAuthProvider());
  const logout = () => signOut(auth);
  const resetPassword = (email) => sendPasswordResetEmail(auth, email);

  const toggleSaveJob = async (jobId) => {
    if (!user) {
      alert("Please login first to save jobs!");
      return;
    }
    const userRef = doc(db, "users", user.uid);
    const isSaved = savedJobs.includes(jobId);

    try {
      // Use setDoc with merge: true to create the document if it doesn't exist
      await setDoc(userRef, {
        email: user?.email,
        savedJobs: isSaved ? arrayRemove(jobId) : arrayUnion(jobId),
      }, { merge: true });
    } catch (error) {
       console.error("Error updating saved jobs:", error);
    }
  };

  const value = {
    user,
    loading,
    loginWithEmail,
    signUpWithEmail,
    loginWithGoogle,
    logout,
    resetPassword,
    savedJobs,
    toggleSaveJob,
    category,
    setCategory,
    theme,
    toggleTheme,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
