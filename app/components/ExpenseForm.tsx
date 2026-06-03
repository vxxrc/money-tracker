'use client';

import { useState } from 'react';
import type { ExpenseCategory } from '@/lib/types';

export default function ExpenseForm() {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<ExpenseCategory>('food');
  const [notes, setNotes] = useState('');
  const [showOnlineGamblingWarning, setShowOnlineGamblingWarning] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Mock data - will connect to Firebase later
  const monthlyBudget = 12000;
  const currentSpent = 0;
  const categorySpending = {
    food: 0,
    shopping: 0,
    utility: 0,
    travel: 0,
    gambling: 0,
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    // Check for online gambling
    if (category === 'gambling' && notes.toLowerCase().includes('online')) {
      setShowOnlineGamblingWarning(true);
      return;
    }

    // TODO: Save to Firebase
    console.log('Saving expense:', {
      amount: amountNum,
      category,
      notes,
      date: new Date(),
    });

    // Show success message
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);

    // Reset form
    setAmount('');
    setNotes('');
  };

  const remaining = monthlyBudget - currentSpent;
  const remainingAfterExpense = remaining - parseFloat(amount || '0');

  const getCategoryIcon = (cat: ExpenseCategory) => {
    switch (cat) {
      case 'food':
        return '🍔';
      case 'shopping':
        return '🛍️';
      case 'utility':
        return '🛒';
      case 'travel':
        return '✈️';
      case 'gambling':
        return '🎲';
      default:
        return '💰';
    }
  };

  const getCategoryWarning = (cat: ExpenseCategory, amt: number) => {
    if (cat === 'food' && amt > 500) {
      return {
        level: 'warning',
        message: 'Food delivery over ₹500? Consider cooking at home to save money!',
      };
    }
    if (amt > 3000) {
      return {
        level: 'info',
        message: `This is a big one! You'll have ₹${remainingAfterExpense.toLocaleString('en-IN')} left for the rest of the month. Worth it?`,
      };
    }
    return null;
  };

  const warning = amount ? getCategoryWarning(category, parseFloat(amount)) : null;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg dark:shadow-slate-900/30 p-6 border border-gray-100 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Add Expense</h2>

        {/* Current Budget Status */}
        <div className="bg-gray-50 dark:bg-slate-700/50 rounded-lg p-4 mb-6 border border-gray-100 dark:border-slate-600">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">This Month's Budget</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                ₹{currentSpent.toLocaleString('en-IN')} / ₹{monthlyBudget.toLocaleString('en-IN')}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 dark:text-gray-300">Remaining</p>
              <p className={`text-2xl font-bold ${remaining > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                ₹{remaining.toLocaleString('en-IN')}
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Amount */}
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Amount *
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">₹</span>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent"
                placeholder="0"
                step="0.01"
                required
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Category *
            </label>
            <div className="grid grid-cols-2 gap-3">
              {(['food', 'shopping', 'utility', 'travel', 'gambling'] as ExpenseCategory[]).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    category === cat
                      ? 'border-blue-500 dark:border-blue-600 bg-blue-50 dark:bg-blue-900/30'
                      : 'border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700/50 hover:border-gray-300 dark:hover:border-slate-500'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{getCategoryIcon(cat)}</span>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white capitalize">{cat}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        ₹{categorySpending[cat].toLocaleString('en-IN')} spent
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Notes (optional)
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent"
              placeholder="Add a note about this expense..."
            />
          </div>

          {/* Warnings */}
          {warning && (
            <div
              className={`border-l-4 p-4 rounded ${
                warning.level === 'warning'
                  ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-500 dark:border-yellow-600'
                  : 'bg-blue-50 dark:bg-blue-900/20 border-blue-500 dark:border-blue-600'
              }`}
            >
              <p
                className={`text-sm font-medium ${
                  warning.level === 'warning' ? 'text-yellow-800 dark:text-yellow-300' : 'text-blue-800 dark:text-blue-300'
                }`}
              >
                {warning.message}
              </p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            Log Expense
          </button>
        </form>

        {/* Success Message */}
        {showSuccess && (
          <div className="mt-4 bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 dark:border-green-600 p-4 rounded">
            <p className="text-sm font-medium text-green-800 dark:text-green-300">
              Expense logged successfully! ₹{amount} added to {category}.
            </p>
          </div>
        )}

        {/* Online Gambling Warning Modal */}
        {showOnlineGamblingWarning && (
          <div className="fixed inset-0 bg-black/70 dark:bg-black/80 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 max-w-md border border-gray-200 dark:border-slate-700">
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/30 mb-4">
                  <svg
                    className="h-6 w-6 text-red-600 dark:text-red-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">DANGER ZONE</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
                  Online gambling is in your NO-GO zone. This is the loophole you wanted to avoid. Step
                  back and think about your ₹8L goal.
                </p>
                <button
                  onClick={() => {
                    setShowOnlineGamblingWarning(false);
                    setAmount('');
                    setNotes('');
                  }}
                  className="w-full bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  You're right, let me step back
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
