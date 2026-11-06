// =========================================================
// Category Definitions & Icons
// =========================================================
const CATEGORIES = {
  expense: [
    { name: 'Food & Dining', icon: '🍔' },
    { name: 'Shopping', icon: '🛍️' },
    { name: 'Housing & Rent', icon: '🏠' },
    { name: 'Transportation', icon: '🚗' },
    { name: 'Utilities', icon: '💡' },
    { name: 'Entertainment', icon: '🎬' },
    { name: 'Healthcare', icon: '💊' },
    { name: 'Other', icon: '📦' }
  ],
  income: [
    { name: 'Salary', icon: '💼' },
    { name: 'Freelance', icon: '💻' },
    { name: 'Investment', icon: '📈' },
    { name: 'Gift / Allowance', icon: '🎁' },
    { name: 'Other', icon: '💵' }
  ]
};

// Seed sample transactions if first visit
const DEFAULT_TRANSACTIONS = [
  { id: '1', type: 'income', description: 'Monthly Salary', amount: 3200, category: 'Salary', date: getFormattedDate(0) },
  { id: '2', type: 'expense', description: 'Apartment Rent', amount: 1100, category: 'Housing & Rent', date: getFormattedDate(-2) },
  { id: '3', type: 'expense', description: 'Grocery Market', amount: 145.50, category: 'Food & Dining', date: getFormattedDate(-1) },
  { id: '4', type: 'expense', description: 'Internet & Electric Bill', amount: 85.00, category: 'Utilities', date: getFormattedDate(0) }
];

function getFormattedDate(daysOffset = 0) {
  const d = new Date();
  d.setDate(d.getDate() + daysOffset);
  return d.toISOString().split('T')[0];
}

// =========================================================
// State Management
// =========================================================
let transactions = JSON.parse(localStorage.getItem('pg_transactions'));
if (!transactions || !Array.isArray(transactions)) {
  transactions = DEFAULT_TRANSACTIONS;
  saveTransactions();
}

let monthlyBudget = parseFloat(localStorage.getItem('pg_budget')) || 2000;
let currentFilter = 'all';

function saveTransactions() {
  localStorage.setItem('pg_transactions', JSON.stringify(transactions));
}

function saveBudget(val) {
  monthlyBudget = val;
  localStorage.setItem('pg_budget', val.toString());
}

// =========================================================
// DOM Elements
// =========================================================
const totalBalanceEl = document.getElementById('total-balance');
const totalIncomeEl = document.getElementById('total-income');
const totalExpenseEl = document.getElementById('total-expense');
const transactionCountEl = document.getElementById('transaction-count');
const todayDateEl = document.getElementById('today-date');

const transactionForm = document.getElementById('transaction-form');
const categorySelect = document.getElementById('category');
const dateInput = document.getElementById('date');
const formStatus = document.getElementById('form-status');

const budgetForm = document.getElementById('budget-form');
const budgetInput = document.getElementById('budget-input');
const budgetProgress = document.getElementById('budget-progress');
const budgetCaption = document.getElementById('budget-caption');
const categoryList = document.getElementById('category-list');

const transactionList = document.getElementById('transaction-list');
const emptyState = document.getElementById('empty-state');
const filterButtons = document.querySelectorAll('.filter-btn');
const historySubtitle = document.getElementById('history-subtitle');

const themeToggleBtn = document.getElementById('theme-toggle');
const mobileToggle = document.getElementById('mobile-toggle');
const navMenu = document.getElementById('nav-menu');

// =========================================================
// Initialize UI & Events
// =========================================================
function init() {
  // Set today's date
  const now = new Date();
  if (todayDateEl) {
    todayDateEl.textContent = now.toLocaleDateString(undefined, {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  // Set default date input
  if (dateInput) {
    dateInput.value = getFormattedDate(0);
  }

  // Initialize theme
  initTheme();

  // Populate categories for default selected radio (expense)
  updateCategoryDropdown('expense');

  // Load monthly budget into input
  if (budgetInput) {
    budgetInput.value = monthlyBudget;
  }

  // Render everything
  renderDashboard();
  renderTransactions();

  setupEventListeners();
}

// =========================================================
// Theme & Navigation
// =========================================================
function initTheme() {
  const savedTheme = localStorage.getItem('pg_theme') || 'light';
  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    if (themeToggleBtn) themeToggleBtn.textContent = '☀️';
  } else {
    document.documentElement.removeAttribute('data-theme');
    if (themeToggleBtn) themeToggleBtn.textContent = '🌙';
  }
}

function setupEventListeners() {
  // Theme toggle
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('pg_theme', 'light');
        themeToggleBtn.textContent = '🌙';
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('pg_theme', 'dark');
        themeToggleBtn.textContent = '☀️';
      }
    });
  }

  // Mobile navigation
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isActive = navMenu.classList.toggle('is-active');
      mobileToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('is-active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Radio button change for transaction type
  const typeRadios = document.querySelectorAll('input[name="type"]');
  typeRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      updateCategoryDropdown(e.target.value);
    });
  });

  // Add transaction
  if (transactionForm) {
    transactionForm.addEventListener('submit', handleAddTransaction);
  }

  // Set budget
  if (budgetForm) {
    budgetForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = parseFloat(budgetInput.value);
      if (val && val > 0) {
        saveBudget(val);
        renderDashboard();
      }
    });
  }

  // Filter clicks
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      renderTransactions();
    });
  });
}

function updateCategoryDropdown(type) {
  if (!categorySelect) return;
  categorySelect.innerHTML = '';
  const options = CATEGORIES[type] || CATEGORIES.expense;
  options.forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat.name;
    opt.textContent = `${cat.icon} ${cat.name}`;
    categorySelect.appendChild(opt);
  });
}

// =========================================================
// Form & Transaction Actions
// =========================================================
function handleAddTransaction(e) {
  e.preventDefault();

  const formData = new FormData(transactionForm);
  const type = formData.get('type');
  const description = formData.get('description')?.toString().trim();
  const amount = parseFloat(formData.get('amount'));
  const category = formData.get('category');
  const date = formData.get('date');

  if (!description || isNaN(amount) || amount <= 0 || !date) {
    showStatus('Please enter a valid description and positive amount.', '#ef4444');
    return;
  }

  const newTx = {
    id: Date.now().toString(),
    type,
    description,
    amount,
    category,
    date
  };

  transactions.unshift(newTx);
  saveTransactions();

  renderDashboard();
  renderTransactions();

  transactionForm.reset();
  const expenseRadio = transactionForm.querySelector('input[value="expense"]');
  if (expenseRadio) expenseRadio.checked = true;
  updateCategoryDropdown('expense');
  dateInput.value = getFormattedDate(0);

  showStatus('Transaction recorded successfully! 🎉', '#10b981');
}

function showStatus(msg, color) {
  if (!formStatus) return;
  formStatus.style.color = color;
  formStatus.textContent = msg;
  setTimeout(() => {
    formStatus.textContent = '';
  }, 4000);
}

window.deleteTransaction = function(id) {
  transactions = transactions.filter(t => t.id !== id);
  saveTransactions();
  renderDashboard();
  renderTransactions();
};

// =========================================================
// Dashboard & Analytics
// =========================================================
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}

function renderDashboard() {
  let income = 0;
  let expense = 0;
  const categoryTotals = {};

  transactions.forEach(t => {
    if (t.type === 'income') {
      income += t.amount;
    } else {
      expense += t.amount;
      categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
    }
  });

  const balance = income - expense;

  if (totalBalanceEl) totalBalanceEl.textContent = formatCurrency(balance);
  if (totalIncomeEl) totalIncomeEl.textContent = `+${formatCurrency(income)}`;
  if (totalExpenseEl) totalExpenseEl.textContent = `-${formatCurrency(expense)}`;
  if (transactionCountEl) transactionCountEl.textContent = `${transactions.length} transactions`;

  // Budget progress
  renderBudget(expense);

  // Category breakdown
  renderCategoryBreakdown(categoryTotals, expense);
}

function renderBudget(totalExpense) {
  if (!budgetProgress || !budgetCaption) return;

  const percent = monthlyBudget > 0 ? (totalExpense / monthlyBudget) * 100 : 0;
  const clampedPercent = Math.min(percent, 100);

  budgetProgress.style.width = `${clampedPercent}%`;
  budgetProgress.classList.remove('warning', 'danger');

  if (percent > 100) {
    budgetProgress.classList.add('danger');
    budgetCaption.innerHTML = `<span style="color: var(--expense-color); font-weight: 600;">Over budget!</span> Spent ${formatCurrency(totalExpense)} of ${formatCurrency(monthlyBudget)} (${percent.toFixed(0)}%)`;
  } else if (percent >= 80) {
    budgetProgress.classList.add('warning');
    budgetCaption.textContent = `Spent ${formatCurrency(totalExpense)} of ${formatCurrency(monthlyBudget)} (${percent.toFixed(0)}% used)`;
  } else {
    budgetCaption.textContent = `Spent ${formatCurrency(totalExpense)} of ${formatCurrency(monthlyBudget)} (${percent.toFixed(0)}% used)`;
  }
}

function renderCategoryBreakdown(categoryTotals, totalExpense) {
  if (!categoryList) return;
  categoryList.innerHTML = '';

  const entries = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1]);

  if (entries.length === 0) {
    categoryList.innerHTML = '<li style="color: var(--text-muted); font-size: 0.875rem;">No expenses recorded this period.</li>';
    return;
  }

  entries.slice(0, 5).forEach(([catName, amount]) => {
    const percent = totalExpense > 0 ? (amount / totalExpense) * 100 : 0;
    const catObj = CATEGORIES.expense.find(c => c.name === catName) || { icon: '🏷️' };

    const li = document.createElement('li');
    li.className = 'category-item';
    li.innerHTML = `
      <div class="category-row">
        <span class="category-name">${catObj.icon} ${catName}</span>
        <span class="category-sum">${formatCurrency(amount)} (${percent.toFixed(0)}%)</span>
      </div>
      <div class="category-bar-bg">
        <div class="category-bar-fill" style="width: ${percent}%;"></div>
      </div>
    `;
    categoryList.appendChild(li);
  });
}

// =========================================================
// History Render
// =========================================================
function renderTransactions() {
  if (!transactionList) return;
  transactionList.innerHTML = '';

  const filtered = transactions.filter(t => {
    if (currentFilter === 'all') return true;
    return t.type === currentFilter;
  });

  if (historySubtitle) {
    historySubtitle.textContent = `Showing ${filtered.length} of ${transactions.length} items`;
  }

  if (filtered.length === 0) {
    if (emptyState) emptyState.hidden = false;
    return;
  }

  if (emptyState) emptyState.hidden = true;

  filtered.forEach(tx => {
    const isIncome = tx.type === 'income';
    const catList = isIncome ? CATEGORIES.income : CATEGORIES.expense;
    const catObj = catList.find(c => c.name === tx.category) || { icon: isIncome ? '💵' : '🏷️' };

    const li = document.createElement('li');
    li.className = 'transaction-item';
    li.innerHTML = `
      <div class="transaction-left">
        <div class="transaction-icon-box">${catObj.icon}</div>
        <div>
          <div class="transaction-desc">${escapeHtml(tx.description)}</div>
          <div class="transaction-meta">
            <span>${tx.category}</span>
            <span>•</span>
            <span>${tx.date}</span>
          </div>
        </div>
      </div>
      <div class="transaction-right">
        <span class="transaction-amount ${isIncome ? 'positive' : 'negative'}">
          ${isIncome ? '+' : '-'}${formatCurrency(tx.amount)}
        </span>
        <button class="delete-btn" onclick="window.deleteTransaction('${tx.id}')" aria-label="Delete transaction" title="Delete">
          ✕
        </button>
      </div>
    `;
    transactionList.appendChild(li);
  });
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Run on load
document.addEventListener('DOMContentLoaded', init);
