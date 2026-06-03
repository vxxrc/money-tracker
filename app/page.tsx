'use client';

import { useState } from 'react';
import Dashboard from './components/Dashboard';
import ExpenseForm from './components/ExpenseForm';
import IncomeForm from './components/IncomeForm';
import Settings from './components/Settings';
import Auth from './components/Auth';
import { useTheme } from './context/ThemeContext';
import { useAuth } from './context/AuthContext';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'expense' | 'income' | 'settings'>('dashboard');
  const { isDark, toggleTheme } = useTheme();
  const { user, loading, signOut } = useAuth();

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Show Auth component if not logged in
  if (!user) {
    return <Auth />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 shadow-sm border-b border-gray-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0 flex-1">
              <h1 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white truncate">Money Tracker</h1>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 hidden sm:block">Your financial companion to ₹8L</p>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
              {/* User Email - Hidden on very small screens */}
              <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 hidden md:block truncate max-w-[150px] lg:max-w-none">
                {user.email}
              </span>
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleTheme}
                className="p-1.5 sm:p-2 rounded-lg bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
                aria-label="Toggle dark mode"
              >
                {isDark ? (
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
              {/* Logout Button */}
              <button
                onClick={signOut}
                className="px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="flex justify-between sm:justify-start sm:space-x-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`py-3 sm:py-4 px-2 sm:px-1 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap transition-colors flex-1 sm:flex-none ${
                activeTab === 'dashboard'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('expense')}
              className={`py-3 sm:py-4 px-2 sm:px-1 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap transition-colors flex-1 sm:flex-none ${
                activeTab === 'expense'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <span className="hidden sm:inline">Add </span>Expense
            </button>
            <button
              onClick={() => setActiveTab('income')}
              className={`py-3 sm:py-4 px-2 sm:px-1 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap transition-colors flex-1 sm:flex-none ${
                activeTab === 'income'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <span className="hidden sm:inline">Add </span>Income
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`py-3 sm:py-4 px-2 sm:px-1 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap transition-colors flex-1 sm:flex-none ${
                activeTab === 'settings'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              Settings
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 pb-6">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'expense' && <ExpenseForm />}
        {activeTab === 'income' && <IncomeForm />}
        {activeTab === 'settings' && <Settings />}
      </main>
    </div>
  );
}
