// Mock Database
const tasks = [
  { name: "AI Mini Project", status: "Completed" },
  { name: "Web Dashboard", status: "Pending" },
  { name: "ML Assignment", status: "Completed" },
  { name: "Database Design", status: "Pending" }
];

const prices = [1200, 2500, 1800];
const expenses = [5000, 3000, 4000, 2500];

// FILTER: Separate completed and pending tasks
function filterTasks() {
  const completedTasks = tasks.filter(task => task.status === "Completed");
  const pendingTasks = tasks.filter(task => task.status === "Pending");

  document.getElementById("completed").innerText =
    "✅ Completed: " + completedTasks.map(t => t.name).join(", ");

  document.getElementById("pending").innerText =
    "⏳ Pending: " + pendingTasks.map(t => t.name).join(", ");
}

// MAP: Add 10% tax to prices
function calculateTax() {
  const taxRate = 0.10;
  const updatedPrices = prices.map(price => price + price * taxRate);

  const list = document.getElementById("priceList");
  list.innerHTML = "";

  updatedPrices.forEach(price => {
    const li = document.createElement("li");
    li.innerText = "₹ " + price.toFixed(2);
    list.appendChild(li);
  });
}

// REDUCE: Calculate total budget
function calculateBudget() {
  const totalBudget = expenses.reduce((total, amount) => total + amount, 0);
  document.getElementById("budget").innerText =
    "💰 Total Company Budget: ₹ " + totalBudget;
}
