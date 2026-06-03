'use client';

import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '../context/AuthContext';

export default function Settings() {
  const { user } = useAuth();
  const [actualBankBalance, setActualBankBalance] = useState('');
  const [actualInvestments, setActualInvestments] = useState('');
  const [actualCCDebt, setActualCCDebt] = useState('');
  const [showReconciliation, setShowReconciliation] = useState(false);

  const [expectedBankBalance, setExpectedBankBalance] = useState(100000);
  const [expectedInvestments, setExpectedInvestments] = useState(250000);
  const [expectedCCDebt, setExpectedCCDebt] = useState(55000);

  const [monthlyBudget, setMonthlyBudget] = useState('12000');
  const [netWorthGoal, setNetWorthGoal] = useState('800000');

  const [rent, setRent] = useState('24900');
  const [electricity, setElectricity] = useState('1250');
  const [maid, setMaid] = useState('3000');
  const [sip, setSip] = useState('30000');

  const [loading, setLoading] = useState(true);

  // Load settings from Firestore
  useEffect(() => {
    if (!user) return;

    const loadSettings = async () => {
      try {
        const settingsRef = doc(db, 'users', user.uid, 'data', 'settings');
        const settingsSnap = await getDoc(settingsRef);

        if (settingsSnap.exists()) {
          const data = settingsSnap.data();
          setMonthlyBudget(String(data.monthlyBudget || 12000));
          setNetWorthGoal(String(data.netWorthGoal || 800000));
          setExpectedBankBalance(data.bankBalance || 100000);
          setExpectedInvestments(data.investmentsValue || 250000);
          setExpectedCCDebt(data.creditCardDebt || 55000);
          setRent(String(data.rent || 24900));
          setElectricity(String(data.electricity || 1250));
          setMaid(String(data.maid || 3000));
          setSip(String(data.sip || 30000));
        }
      } catch (error) {
        console.error('Error loading settings:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, [user]);

  const handleSaveSettings = async () => {
    if (!user) return;

    try {
      const settingsRef = doc(db, 'users', user.uid, 'data', 'settings');
      await updateDoc(settingsRef, {
        monthlyBudget: parseFloat(monthlyBudget),
        netWorthGoal: parseFloat(netWorthGoal),
      });
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings. Please try again.');
    }
  };

  const handleSaveFixedExpenses = async () => {
    if (!user) return;

    try {
      const settingsRef = doc(db, 'users', user.uid, 'data', 'settings');
      await updateDoc(settingsRef, {
        rent: parseFloat(rent),
        electricity: parseFloat(electricity),
        maid: parseFloat(maid),
        sip: parseFloat(sip),
      });
      alert('Fixed expenses saved successfully!');
    } catch (error) {
      console.error('Error saving fixed expenses:', error);
      alert('Failed to save fixed expenses. Please try again.');
    }
  };

  const handleReconcile = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) return;

    const actualBank = parseFloat(actualBankBalance || '0');
    const actualInv = parseFloat(actualInvestments || '0');
    const actualCC = parseFloat(actualCCDebt || '0');

    try {
      const settingsRef = doc(db, 'users', user.uid, 'data', 'settings');
      await updateDoc(settingsRef, {
        bankBalance: actualBank,
        investmentsValue: actualInv,
        creditCardDebt: actualCC,
        netWorth: actualBank + actualInv - actualCC,
      });

      setExpectedBankBalance(actualBank);
      setExpectedInvestments(actualInv);
      setExpectedCCDebt(actualCC);
      setShowReconciliation(true);

      setTimeout(() => {
        setActualBankBalance('');
        setActualInvestments('');
        setActualCCDebt('');
        setShowReconciliation(false);
      }, 5000);
    } catch (error) {
      console.error('Error reconciling accounts:', error);
      alert('Failed to reconcile accounts. Please try again.');
    }
  };

  const bankDiff = actualBankBalance
    ? parseFloat(actualBankBalance) - expectedBankBalance
    : 0;
  const invDiff = actualInvestments
    ? parseFloat(actualInvestments) - expectedInvestments
    : 0;
  const ccDiff = actualCCDebt ? parseFloat(actualCCDebt) - expectedCCDebt : 0;
  const totalDiff = bankDiff + invDiff - ccDiff;

  return (
    <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
      {/* Budget Settings */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg dark:shadow-slate-900/30 p-4 sm:p-6 border border-gray-100 dark:border-slate-700">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">Budget Settings</h2>

        <div className="space-y-4">
          <div>
            <label htmlFor="monthlyBudget" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Monthly Discretionary Budget
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">₹</span>
              <input
                type="number"
                id="monthlyBudget"
                value={monthlyBudget}
                onChange={(e) => setMonthlyBudget(e.target.value)}
                className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent"
              />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              This is your monthly budget for food, shopping, entertainment, etc.
            </p>
          </div>

          <div>
            <label htmlFor="netWorthGoal" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Net Worth Goal
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">₹</span>
              <input
                type="number"
                id="netWorthGoal"
                value={netWorthGoal}
                onChange={(e) => setNetWorthGoal(e.target.value)}
                className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent"
              />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Target: March 2027</p>
          </div>

          <button
            type="button"
            onClick={handleSaveSettings}
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Save Settings
          </button>
        </div>
      </div>

      {/* Fixed Expenses */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg dark:shadow-slate-900/30 p-4 sm:p-6 border border-gray-100 dark:border-slate-700">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">Fixed Monthly Expenses</h2>

        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Rent</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">₹</span>
                <input
                  type="number"
                  value={rent}
                  onChange={(e) => setRent(e.target.value)}
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Electricity</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">₹</span>
                <input
                  type="number"
                  value={electricity}
                  onChange={(e) => setElectricity(e.target.value)}
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Maid</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">₹</span>
                <input
                  type="number"
                  value={maid}
                  onChange={(e) => setMaid(e.target.value)}
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">SIP/Investments</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">₹</span>
                <input
                  type="number"
                  value={sip}
                  onChange={(e) => setSip(e.target.value)}
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSaveFixedExpenses}
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Save Fixed Expenses
          </button>
        </div>
      </div>

      {/* Account Reconciliation */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg dark:shadow-slate-900/30 p-4 sm:p-6 border border-gray-100 dark:border-slate-700">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">Account Reconciliation</h2>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-4 sm:mb-6">
          Enter your actual account balances to ensure everything is tracked accurately
        </p>

        <form onSubmit={handleReconcile} className="space-y-4">
          <div>
            <label htmlFor="actualBank" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Actual Bank Balance
            </label>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
              <div className="relative flex-1 w-full sm:w-auto">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">₹</span>
                <input
                  type="number"
                  id="actualBank"
                  value={actualBankBalance}
                  onChange={(e) => setActualBankBalance(e.target.value)}
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent"
                  placeholder="0"
                />
              </div>
              <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                App thinks: ₹{expectedBankBalance.toLocaleString('en-IN')}
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="actualInvestments" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Actual Investments Value
            </label>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
              <div className="relative flex-1 w-full sm:w-auto">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">₹</span>
                <input
                  type="number"
                  id="actualInvestments"
                  value={actualInvestments}
                  onChange={(e) => setActualInvestments(e.target.value)}
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent"
                  placeholder="0"
                />
              </div>
              <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                App thinks: ₹{expectedInvestments.toLocaleString('en-IN')}
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="actualCC" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Actual Credit Card Debt
            </label>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
              <div className="relative flex-1 w-full sm:w-auto">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">₹</span>
                <input
                  type="number"
                  id="actualCC"
                  value={actualCCDebt}
                  onChange={(e) => setActualCCDebt(e.target.value)}
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent"
                  placeholder="0"
                />
              </div>
              <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                App thinks: ₹{expectedCCDebt.toLocaleString('en-IN')}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            Reconcile Accounts
          </button>
        </form>

        {/* Reconciliation Results */}
        {showReconciliation && (
          <div className="mt-6 space-y-3">
            <div className="bg-gray-50 dark:bg-slate-700/50 rounded-lg p-4 border border-gray-100 dark:border-slate-600">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Reconciliation Summary</h3>

              <div className="space-y-2">
                {bankDiff !== 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Bank Balance Difference</span>
                    <span
                      className={`text-sm font-semibold ${
                        bankDiff > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                      }`}
                    >
                      {bankDiff > 0 ? '+' : ''}₹{bankDiff.toLocaleString('en-IN')}
                    </span>
                  </div>
                )}

                {invDiff !== 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Investments Difference</span>
                    <span
                      className={`text-sm font-semibold ${
                        invDiff > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                      }`}
                    >
                      {invDiff > 0 ? '+' : ''}₹{invDiff.toLocaleString('en-IN')}
                    </span>
                  </div>
                )}

                {ccDiff !== 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-300">CC Debt Difference</span>
                    <span
                      className={`text-sm font-semibold ${
                        ccDiff < 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                      }`}
                    >
                      {ccDiff > 0 ? '+' : ''}₹{ccDiff.toLocaleString('en-IN')}
                    </span>
                  </div>
                )}

                <div className="border-t border-gray-200 dark:border-slate-600 pt-2 mt-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-900 dark:text-white">Total Difference</span>
                    <span
                      className={`font-bold ${
                        totalDiff > 0 ? 'text-green-600 dark:text-green-400' : totalDiff < 0 ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white'
                      }`}
                    >
                      {totalDiff > 0 ? '+' : ''}₹{totalDiff.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

              {Math.abs(totalDiff) > 100 && (
                <div className="mt-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 dark:border-yellow-600 p-3 rounded">
                  <p className="text-sm text-yellow-800 dark:text-yellow-300">
                    You have ₹{Math.abs(totalDiff).toLocaleString('en-IN')} untracked. Did you forget
                    to log something?
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
