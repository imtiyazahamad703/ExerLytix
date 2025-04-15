import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";

const Settings = () => {
  const { profile, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [privacyPublic, setPrivacyPublic] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300 text-slate-900 dark:text-slate-200">
      <div className="flex flex-1">
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        
        <div className="flex-1 px-4 sm:px-6 lg:px-10 py-8 max-w-4xl mx-auto w-full relative z-10">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-wide flex items-center">
                <svg className="w-8 h-8 text-neon-blue mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Account <span className="text-neon-blue ml-2">Settings</span>
              </h1>
              <p className="text-slate-500 dark:text-slate-400 mt-2">Manage your profile, preferences, and account security.</p>
            </div>
            
            <button 
              className="lg:hidden p-2 rounded-lg bg-white/80 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-neon-blue shadow-sm"
              onClick={() => setIsSidebarOpen(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>

          <div className="space-y-8">
            
            {/* Profile Section */}
            <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700/50">
              <h2 className="text-xl font-bold mb-6 text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-2">Profile Information</h2>
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-neon-blue to-neon-purple p-1 shrink-0">
                  <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden">
                    {profile?.profilePicture ? (
                       <img src={profile.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                       <span className="text-3xl text-white font-bold">{profile?.name?.charAt(0) || "U"}</span>
                    )}
                  </div>
                </div>
                <div className="flex-1 w-full space-y-4">
                  <div>
                    <label className="text-sm font-bold text-slate-500 dark:text-slate-400">Full Name</label>
                    <input type="text" readOnly value={profile?.name || ""} className="mt-1 w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg p-3 text-slate-900 dark:text-white opacity-70 cursor-not-allowed" />
                  </div>
                  <div>
                    <label className="text-sm font-bold text-slate-500 dark:text-slate-400">Email Address</label>
                    <input type="email" readOnly value={profile?.email || ""} className="mt-1 w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg p-3 text-slate-900 dark:text-white opacity-70 cursor-not-allowed" />
                  </div>
                  <p className="text-xs text-slate-500">Contact support to change your email address.</p>
                </div>
              </div>
            </div>

            {/* Notifications Section */}
            <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700/50">
              <h2 className="text-xl font-bold mb-6 text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-2">Preferences</h2>
              <div className="space-y-6">
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-800 dark:text-slate-200">Email Notifications</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Receive weekly summaries and tips.</p>
                  </div>
                  <button 
                    onClick={() => setEmailNotifications(!emailNotifications)}
                    className={`w-12 h-6 rounded-full transition-colors relative ${emailNotifications ? 'bg-neon-blue' : 'bg-slate-300 dark:bg-slate-600'}`}
                  >
                    <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${emailNotifications ? 'translate-x-6' : ''}`}></div>
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-800 dark:text-slate-200">Push Notifications</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Get alerted for workout reminders.</p>
                  </div>
                  <button 
                    onClick={() => setPushNotifications(!pushNotifications)}
                    className={`w-12 h-6 rounded-full transition-colors relative ${pushNotifications ? 'bg-neon-blue' : 'bg-slate-300 dark:bg-slate-600'}`}
                  >
                    <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${pushNotifications ? 'translate-x-6' : ''}`}></div>
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-800 dark:text-slate-200">Public Profile</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Allow other users to view your stats.</p>
                  </div>
                  <button 
                    onClick={() => setPrivacyPublic(!privacyPublic)}
                    className={`w-12 h-6 rounded-full transition-colors relative ${privacyPublic ? 'bg-neon-blue' : 'bg-slate-300 dark:bg-slate-600'}`}
                  >
                    <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${privacyPublic ? 'translate-x-6' : ''}`}></div>
                  </button>
                </div>

              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-red-50 dark:bg-red-900/10 p-6 sm:p-8 rounded-2xl shadow-xl border border-red-200 dark:border-red-500/30">
              <h2 className="text-xl font-bold mb-6 text-red-600 dark:text-red-400 border-b border-red-200 dark:border-red-500/30 pb-2">Danger Zone</h2>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="font-semibold text-slate-800 dark:text-slate-200">Log Out</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Sign out of your account securely.</p>
                </div>
                <button 
                  onClick={() => {
                    logout();
                    window.location.href = "/";
                  }}
                  className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg shadow-md transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
