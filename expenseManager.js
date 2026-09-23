const { v4: uuidv4 } = require("uuid");

const { readData, writeData } = require("./fileManager");
const { exit, exitCode } = require("node:process");

function addExpense(employee, title, category, amount) {
  if (employee.trim() === "") {
    console.log("Employee Name cannot be Empty...");
    return;
  }
  if (title.trim() === "") {
    console.log("Expense name cannot be empty..");
    return;
  }
  const categories = ["Food", "Travel", "Office", "Other"];

  if (!categories.includes(category)) {
    console.log(" Invalid category");
    return;
  }

  amount = Number(amount);
  if (isNaN(amount) || amount < 0) {
    console.log("Please Enter amount..");
    return;
  }

  const expenses = readData();
  const newExpense = {
    id: uuidv4(),
    employee: employee,
    title: title,
    category: category,
    amount: amount,
    createdAt: new Date().toISOString(),
  };

  expenses.push(newExpense);

  writeData(expenses);
  console.log("expense add Successfully");
}

function listEx() {
  const expenses = readData();

  if (expenses.length === 0) {
    console.log("No Expense Find..");
    return;
  }

  console.log("Expenses\n");

  console.log("id\t\tEmployee\ttitle\tcategory\tamount");

  expenses.forEach((data) => {
    console.log(
      `${data.id}\t\t${data.employee}\t${data.title}\t${data.category}\t${data.amount}`,
    );
  });
  exit();
}
function getSummary() {
  const expenses = readData();

  let totalExpenses = 0;

  let food = 0;
  let travel = 0;
  let office = 0;
  let other = 0;

  let highestExpense = null;

  expenses.forEach(function (expense) {
    totalExpenses += expense.amount;

    if (expense.category === "Food") {
      food += expense.amount;
    }

    if (expense.category === "Travel") {
      travel += expense.amount;
    }

    if (expense.category === "Office") {
      office += expense.amount;
    }

    if (expense.category === "Other") {
      other += expense.amount;
    }

    if (highestExpense === null || expense.amount > highestExpense.amount) {
      highestExpense = expense;
    }
  });

  console.log("\nFINANCE SUMMARY\n");

  console.log(`Total Expenses : ₹${totalExpenses}`);

  console.log(`Total Records  : ${expenses.length}`);

  console.log("\nCategory Breakdown");

  console.log(`Food   : ₹${food}`);
  console.log(`Travel : ₹${travel}`);
  console.log(`Office : ₹${office}`);
  console.log(`Other  : ₹${other}`);

  console.log("\nHighest Expense");

  if (highestExpense === null) {
    console.log("No expenses found");
  } else {
    console.log(`${highestExpense.employee} — ₹${highestExpense.amount}`);
  }
  exit();
}

function deleteEx(id) {
  const expense = readData();

  const newExpense = expense.filter((ex) => {
    return ex.id !== id;
  });
  if (newExpense.length === expense.length) {
    console.log("No Expense Found");
    return;
  }

  writeData(newExpense);

  console.log("Expense Delete Successfully");
}

module.exports = {
  addExpense,
  listEx,
  deleteEx,
  getSummary,
};
