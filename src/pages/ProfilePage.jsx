import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { User, Mail, Calendar, Bookmark, LogOut, ArrowLeft } from "lucide-react";

const ProfilePage = () => {
  const { user, savedJobs, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  // Format the creation date
  const joinDate = user.metadata.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Recently";

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto p-4 gap-8">
      {/* Back Button */}
      <div className="w-full">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-zinc-500 hover:text-indigo-600 transition-colors bg-white dark:bg-zinc-900 px-4 py-2 rounded-xl shadow-sm border border-zinc-100 dark:border-zinc-800"
        >
          <ArrowLeft size={18} />
          Go Back
        </button>
      </div>

      {/* Profile Card */}
      <div className="w-full bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-zinc-100 dark:border-zinc-800 overflow-hidden transition-colors">
        {/* Banner */}
        <div className="h-32 bg-gradient-to-r from-indigo-500 to-indigo-700"></div>

        <div className="px-8 pb-8">
          <div className="flex flex-col items-center -mt-16 mb-6">
            <div className="p-1 bg-white dark:bg-zinc-900 rounded-full shadow-lg border-4 border-indigo-50 dark:border-zinc-800">
              <div className="w-32 h-32 rounded-full bg-indigo-50 dark:bg-zinc-800/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <User size={64} />
              </div>
            </div>
            <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white mt-4">
              {user.displayName || "Anonymous User"}
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 font-medium">
              Member of JobBoard
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoBlock
              icon={<Mail size={18} className="text-indigo-500" />}
              label="Email Address"
              value={user.email}
            />
            <InfoBlock
              icon={<Calendar size={18} className="text-emerald-500" />}
              label="Joined On"
              value={joinDate}
            />
            <InfoBlock
              icon={<Bookmark size={18} className="text-amber-500" />}
              label="Saved Jobs"
              value={`${savedJobs.length} Positions`}
            />
          </div>

          <div className="mt-8 flex gap-4">
            <button
              onClick={() => navigate("/saved")}
              className="flex-1 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold transition-all shadow-lg shadow-indigo-200 dark:shadow-none active:scale-[0.98]"
            >
              View Saved Jobs
            </button>
            <button
              onClick={async () => {
                await logout();
                navigate("/", { replace: true });
              }}
              className="px-6 py-4 bg-zinc-100 dark:bg-zinc-800 hover:bg-red-50 dark:hover:bg-red-900/20 text-zinc-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-400 rounded-2xl font-bold transition-all active:scale-[0.98]"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoBlock = ({ icon, label, value }) => (
  <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-100 dark:border-zinc-800 flex items-start gap-4 transition-colors">
    <div className="p-2 bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-zinc-100 dark:border-zinc-700 mt-0.5">
      {icon}
    </div>
    <div>
      <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-0.5">
        {label}
      </p>
      <p className="text-sm font-extrabold text-zinc-700 dark:text-zinc-200 break-all">
        {value}
      </p>
    </div>
  </div>
);

export default ProfilePage;
