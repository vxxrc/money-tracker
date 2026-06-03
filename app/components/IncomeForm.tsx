'use client';

import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '../context/AuthContext';
import type { IncomeType } from '@/lib/types';

export default function IncomeForm() {
  const { user } = useAuth();
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<IncomeType>('salary');
  const [notes, setNotes] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    try {
      // Save to Firestore
      await addDoc(collection(db, 'users', user!.uid, 'income'), {
        amount: amountNum,
        type,
        notes,
        date: new Date(),
        createdAt: new Date(),
      });

      // Show success message
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);

      // Reset form
      setAmount('');
      setNotes('');
    } catch (error) {
      console.error('Error saving income:', error);
      alert('Failed to save income. Please try again.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg dark:shadow-slate-900/30 p-6 border border-gray-100 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Add Income</h2>

        {/* Info Box */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 dark:border-blue-600 p-4 mb-6 rounded">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400 dark:text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                <strong>Salary</strong> is your base income (₹1,01,000/month) - the foundation of your plan.
                <br />
                <strong>Commissions</strong> are tracked separately as bonus income.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Income Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Income Type *</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setType('salary')}
                className={`p-4 rounded-lg border-2 text-left transition-all ${
                  type === 'salary'
                    ? 'border-blue-500 dark:border-blue-600 bg-blue-50 dark:bg-blue-900/30'
                    : 'border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700/50 hover:border-gray-300 dark:hover:border-slate-500'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">💼</span>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Salary</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Base monthly income</p>
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setType('commission')}
                className={`p-4 rounded-lg border-2 text-left transition-all ${
                  type === 'commission'
                    ? 'border-blue-500 dark:border-blue-600 bg-blue-50 dark:bg-blue-900/30'
                    : 'border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700/50 hover:border-gray-300 dark:hover:border-slate-500'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">💰</span>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Commission</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Bonus income</p>
                  </div>
                </div>
              </button>
            </div>
          </div>

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
            {type === 'salary' && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Expected: ₹1,01,000</p>
            )}
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
              placeholder="Add a note about this income..."
            />
          </div>

          {/* Commission Info */}
          {type === 'commission' && amount && (
            <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 dark:border-green-600 p-4 rounded">
              <p className="text-sm font-medium text-green-800 dark:text-green-300">
                Great! This ₹{parseFloat(amount).toLocaleString('en-IN')} commission can boost your
                savings or give you extra breathing room this month.
              </p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            Log Income
          </button>
        </form>

        {/* Success Message */}
        {showSuccess && (
          <div className="mt-4 bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 dark:border-green-600 p-4 rounded">
            <p className="text-sm font-medium text-green-800 dark:text-green-300">
              Income logged successfully! ₹{amount} added as {type}.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
