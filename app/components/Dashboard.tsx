'use client';

import { useState } from 'react';

export default function Dashboard() {
  // Mock data for now - will connect to Firebase later
  const [monthlyBudget] = useState(12000);
  const [spent] = useState(0);
  const [netWorth] = useState(295000);
  const [netWorthGoal] = useState(800000);
  const [bankBalance] = useState(100000);
  const [investmentsValue] = useState(250000);
  const [creditCardDebt] = useState(55000);

  const remaining = monthlyBudget - spent;
  const spentPercentage = (spent / monthlyBudget) * 100;
  const netWorthProgress = ((netWorth / netWorthGoal) * 100).toFixed(1);
  const netWorthRemaining = netWorthGoal - netWorth;

  // Calculate CC debt progress (showing reduction as positive)
  const originalCCDebt = 55000;
  const ccPaidOff = originalCCDebt - creditCardDebt;
  const ccProgress = ((ccPaidOff / originalCCDebt) * 100).toFixed(1);

  const getCurrentMonth = () => {
    const now = new Date();
    return now.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });
  };

  return (
    <div className="space-y-6">
      {/* Month Header */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg dark:shadow-slate-900/30 p-6 border border-gray-100 dark:border-slate-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{getCurrentMonth()} (Demo Month)</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Getting started - tracking your spending patterns</p>
      </div>

      {/* This Month's Spending */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg dark:shadow-slate-900/30 p-6 border border-gray-100 dark:border-slate-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">This Month's Reality</h3>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-baseline mb-2">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                ₹{spent.toLocaleString('en-IN')} / ₹{monthlyBudget.toLocaleString('en-IN')}
              </span>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {spentPercentage.toFixed(0)}%
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-4 overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  spentPercentage >= 100
                    ? 'bg-red-500 dark:bg-red-600'
                    : spentPercentage >= 80
                    ? 'bg-yellow-500 dark:bg-yellow-600'
                    : 'bg-blue-500 dark:bg-blue-600'
                }`}
                style={{ width: `${Math.min(spentPercentage, 100)}%` }}
              />
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
              {remaining > 0 ? (
                <span className="text-green-600 dark:text-green-400 font-medium">
                  ₹{remaining.toLocaleString('en-IN')} left for this month
                </span>
              ) : (
                <span className="text-red-600 dark:text-red-400 font-medium">
                  Over budget by ₹{Math.abs(remaining).toLocaleString('en-IN')}
                </span>
              )}
            </p>
          </div>

          {/* CC Freeze Warning */}
          <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 dark:border-red-600 p-4 rounded">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400 dark:text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-red-800 dark:text-red-300">
                  Credit Card: FREEZE MODE
                </p>
                <p className="text-sm text-red-700 dark:text-red-400 mt-1">
                  Paying down ₹{creditCardDebt.toLocaleString('en-IN')} debt - No new charges!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Net Worth Progress */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg dark:shadow-slate-900/30 p-6 border border-gray-100 dark:border-slate-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Net Worth Journey</h3>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-baseline mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-300">
                ₹{netWorth.toLocaleString('en-IN')} → ₹{netWorthGoal.toLocaleString('en-IN')}
              </span>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {netWorthProgress}%
              </span>
            </div>

            <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-4 overflow-hidden">
              <div
                className="h-full bg-green-500 dark:bg-green-600 transition-all duration-300"
                style={{ width: `${netWorthProgress}%` }}
              />
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
              ₹{netWorthRemaining.toLocaleString('en-IN')} to go
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              On track to finish by March 2027
            </p>
          </div>
        </div>
      </div>

      {/* Credit Card Debt Destroyer */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg dark:shadow-slate-900/30 p-6 border border-gray-100 dark:border-slate-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Credit Card Debt Destroyer</h3>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-baseline mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-300">
                ₹{originalCCDebt.toLocaleString('en-IN')} → ₹0
              </span>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {ccProgress}% cleared
              </span>
            </div>

            <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-4 overflow-hidden">
              <div
                className="h-full bg-purple-500 dark:bg-purple-600 transition-all duration-300"
                style={{ width: `${ccProgress}%` }}
              />
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
              ₹{creditCardDebt.toLocaleString('en-IN')} remaining
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Cleared by September!
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg dark:shadow-slate-900/30 p-6 border border-gray-100 dark:border-slate-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Stats</h3>

        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-slate-700">
            <span className="text-sm text-gray-600 dark:text-gray-300">Bank Balance</span>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">₹{bankBalance.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-slate-700">
            <span className="text-sm text-gray-600 dark:text-gray-300">Investments</span>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">₹{investmentsValue.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-slate-700">
            <span className="text-sm text-gray-600 dark:text-gray-300">CC Debt</span>
            <span className="text-sm font-semibold text-red-600 dark:text-red-400">-₹{creditCardDebt.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between items-center py-3 bg-gray-50 dark:bg-slate-700/50 -mx-6 px-6 rounded-b-lg">
            <span className="text-base font-semibold text-gray-900 dark:text-white">Net Worth</span>
            <span className="text-base font-bold text-gray-900 dark:text-white">₹{netWorth.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>

      {/* Tip of the Day */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 dark:border-blue-600 p-4 rounded">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400 dark:text-blue-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-blue-800 dark:text-blue-300">
              Tip of the Day
            </p>
            <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
              The 24-hour rule: Wait 24 hours before any purchase over ₹2,000. You'll be surprised how many impulse buys you'll skip!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
