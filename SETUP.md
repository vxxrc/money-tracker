# Money Tracker - Setup Guide

Your financial companion to help you reach ₹8L net worth by March 2027!

## 🎯 What's Built

A complete personal finance tracking app with:

- **Dashboard**: Real-time view of your spending, net worth progress, and credit card debt reduction
- **Expense Tracking**: Quick entry with categories (Food, Shopping, Utility, Travel, Gambling)
- **Income Tracking**: Separate tracking for salary and commissions
- **Settings & Reconciliation**: Compare actual vs tracked balances to stay accountable
- **Behavioral Controls**:
  - Credit card freeze mode warnings
  - Online gambling alerts (zero tolerance)
  - Spending warnings when approaching budget limits
  - Tips and motivational messages

## 🚀 Current Status

The app is **fully functional with mock data** right now. You can:
- Navigate between all tabs
- See your dashboard with progress bars
- Try adding expenses and see warnings
- Test the reconciliation feature
- Explore all the UI components

**The app is running at: http://localhost:3000**

## 📝 What's Next

To make the app save data permanently (not just mock data), you need to:

### 1. Set up Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project (or use existing one)
3. Enable **Firestore Database** and **Authentication**
4. Get your Firebase config credentials from Project Settings
5. Copy `.env.example` to `.env.local` and fill in your credentials

### 2. Data Structure (for Firebase)

The app is ready to use these Firestore collections:
- `expenses` - All your expense transactions
- `income` - Salary and commission entries
- `accounts` - Bank, investments, CC debt balances
- `userSettings` - Your budget settings and goals
- `monthlyBudgets` - Monthly spending summaries

### 3. Next Features to Build

Currently using mock data. To connect to Firebase:
- Add authentication (sign up/login)
- Connect all forms to save to Firestore
- Load actual data on dashboard
- Add transaction history view
- Add weekly summary feature
- Add graphs/charts for spending trends

## 🎨 Current Features

### Dashboard
- Monthly spending tracker (₹0 / ₹12,000 budget)
- Net worth progress (₹2.95L → ₹8L)
- Credit card debt reduction tracker
- Quick stats for all accounts
- Daily financial tips

### Expense Form
- Quick category selection (Food, Shopping, Utility, Travel, Gambling)
- Real-time warnings for overspending
- Special alert for online gambling (blocks it)
- Budget impact preview

### Income Form
- Separate tracking for salary vs commissions
- Base plan built on ₹1,01,000 salary
- Commissions tracked as bonus

### Settings
- Budget configuration
- Fixed expenses setup (Rent, Electricity, Maid, SIPs)
- Account reconciliation tool
- Detects untracked expenses

## 💡 Using the App Today (Demo Mode)

Since it's June 2026 demo month, you can:

1. Open http://localhost:3000
2. Navigate through all tabs
3. Try adding an expense (it won't save yet, just shows in console)
4. Try adding a large expense (₹3,000+) to see warnings
5. Try adding "online gambling" to see the danger zone alert
6. Check Settings tab and try reconciliation
7. All UI is working, just not persisting to database yet

## 🔧 Making Changes

The app structure:
```
money-tracker/
├── app/
│   ├── page.tsx           # Main page with tabs
│   └── components/
│       ├── Dashboard.tsx   # Main dashboard view
│       ├── ExpenseForm.tsx # Expense entry
│       ├── IncomeForm.tsx  # Income entry
│       └── Settings.tsx    # Settings & reconciliation
├── lib/
│   ├── firebase.ts        # Firebase config
│   └── types.ts           # TypeScript types
└── .env.local            # Firebase credentials
```

To make changes:
1. Edit the component files in `app/components/`
2. The app will auto-reload (hot reload enabled)
3. Check the console for any errors

## 📊 Your Financial Plan

**Current**: ₹2.95L net worth
**Goal**: ₹8L by March 2027 (9 months)
**Monthly Budget**: ₹10-12k discretionary spending
**Fixed Costs**: ₹76.65k (first 3 months with CC payment)

The app is designed around this plan and will help you stay on track!

## 🎯 Key Features Built

✅ Dashboard with all progress trackers
✅ Expense entry with category tracking
✅ Income tracking (salary + commissions)
✅ Account reconciliation
✅ Credit card freeze mode
✅ Online gambling blocker
✅ Budget warnings and tips
✅ All UI components styled and responsive

## ⏭️ To-Do (When You're Ready)

- [ ] Set up Firebase project
- [ ] Add authentication
- [ ] Connect forms to Firebase
- [ ] Add transaction history
- [ ] Add weekly summaries
- [ ] Add spending graphs
- [ ] Deploy to production

## 🚀 Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Questions?

The app is fully functional with UI - just need to connect Firebase for data persistence. Everything else is ready to go!
