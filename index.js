const readline = require("readline");
const {
  addExpense,
  listEx,
  deleteEx,
  getSummary,
} = require("./expenseManager");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question) {
  return new Promise(function (resolve) {
    rl.question(question, function (answer) {
      resolve(answer);
    });
  });
}

async function addCommand() {
  const employee = await ask("Employee Name : ");
  const title = await ask("Expense Name : ");
  const category = await ask("Enter Category : ");
  const Amount = await ask("Enter amount : ");
  const amount = Number(Amount);

  addExpense(employee, title, category, amount);

  rl.close();
}

function main() {
  const command = process.argv[2];

  if (command === "add") {
    addCommand();
    return;
  } else if (command === "list") {
    listEx();
  } else if (command === "summary") {
    getSummary();
    return;
  } else if (command === "delete") {
    const id = process.argv[3];
    if (!id) {
      console.log("Enter Id");
    } else {
      deleteEx(id);
    }
    rl.close();
  } else {
    console.log(`
Employee Expense Tracker

Commands:

node index.js add
node index.js list
node index.js summary
node index.js delete <expenseId>
        `);

    rl.close();
  }
}

main();
