export type ExpenseCategory = 'food' | 'shopping' | 'utility' | 'travel' | 'gambling';

export type IncomeType = 'salary' | 'commission';

export interface Expense {
  id: string;
  amount: number;
  category: ExpenseCategory;
  notes?: string;
  date: Date;
  userId: string;
  createdAt: Date;
}

export interface Income {
  id: string;
  amount: number;
  type: IncomeType;
  notes?: string;
  date: Date;
  userId: string;
  createdAt: Date;
}

export interface Account {
  id: string;
  userId: string;
  bankBalance: number;
  creditCardDebt: number;
  investmentsValue: number;
  lastUpdated: Date;
}

export interface MonthlyBudget {
  id: string;
  userId: string;
  month: string; // Format: "YYYY-MM"
  totalBudget: number;
  spent: number;
  categorySpending: {
    food: number;
    shopping: number;
    utility: number;
    travel: number;
    gambling: number;
  };
}

export interface UserSettings {
  id: string;
  userId: string;
  monthlyDiscretionaryBudget: number;
  netWorthGoal: number;
  goalDeadline: Date;
  fixedExpenses: {
    rent: number;
    electricity: number;
    maid: number;
    sip: number;
  };
  creditCardFreezeMode: boolean;
}
