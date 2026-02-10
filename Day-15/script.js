let balance = 1000;
const MASTER_PIN = "9999";
const SECRET_WORD = "core";

const output = document.getElementById("output");

function log(text) {
  output.textContent += text + "\n";
}

function startSystem() {
  output.textContent = "";
  log("BOOTING VIRTUAL CORE...\n");

  let attempts = 3;
  let accessGranted = false;

  while (attempts > 0) {
    let pin = prompt("ENTER MASTER PIN:");
    if (pin === MASTER_PIN) {
      accessGranted = true;
      break;
    } else {
      attempts--;
      alert(`WRONG PIN! Attempts left: ${attempts}`);
    }
  }

  if (!accessGranted) {
    log("SYSTEM SELF-DESTRUCT INITIATED 💥");
    return;
  }

  log("=================================");
  log(" Welcome to VIRTUAL CORE v1.0 ");
  log("=================================\n");

  mainKernel();
}

function mainKernel() {
  while (true) {
    let command = prompt(
      "[V-CORE]> Type command: (bank, shop, vault, exit)"
    );

    switch (command) {
      case "bank":
        bankModule();
        break;

      case "shop":
        shopModule();
        break;

      case "vault":
        vaultModule();
        break;

      case "exit":
        log("SYSTEM SHUTDOWN...");
        return;

      default:
        alert("UNKNOWN COMMAND");
    }
  }
}

/* 🔹 BANK MODULE */
function bankModule() {
  while (true) {
    let cmd = prompt(
      "[BANK]> deposit, withdraw, balance, back"
    );

    if (cmd === "deposit") {
      let amount = parseFloat(prompt("Enter amount:"));
      if (!isNaN(amount) && amount > 0) {
        balance += amount;
        alert(`Deposited ₹${amount}`);
      } else {
        alert("INVALID AMOUNT");
      }

    } else if (cmd === "withdraw") {
      let amount = parseFloat(prompt("Enter amount:"));
      if (amount > balance) {
        alert("INSUFFICIENT FUNDS");
      } else if (amount > 0) {
        balance -= amount;
        alert(`Withdrawn ₹${amount}`);
      } else {
        alert("INVALID AMOUNT");
      }

    } else if (cmd === "balance") {
      alert(`Current Balance: ₹${balance}`);

    } else if (cmd === "back") {
      return;

    } else {
      alert("INVALID BANK COMMAND");
    }
  }
}

/* 🛒 SHOP MODULE */
function shopModule() {
  const UNIT_PRICE = 50;
  let qty = parseInt(prompt("Enter quantity:"));

  if (isNaN(qty) || qty <= 0) {
    alert("INVALID QUANTITY");
    return;
  }

  let discount = 0;

  if (qty <= 5) {
    discount = 0;
  } else if (qty <= 10) {
    discount = 0.1;
  } else {
    discount = 0.2;
  }

  let total = qty * UNIT_PRICE;
  let finalPrice = total - total * discount;

  if (finalPrice > balance) {
    alert("INSUFFICIENT BALANCE");
    return;
  }

  balance -= finalPrice;
  alert(`Purchased ${qty} items\nFinal Price: ₹${finalPrice}`);
}

/* 🔐 VAULT MODULE */
function vaultModule() {
  alert("Hint: It's related to the system name 😉");
  let guess = prompt("Enter secret word:");

  if (guess === SECRET_WORD) {
    alert("🎉 ACCESS GRANTED!\nSecret Message: You cracked the Core!");
  } else {
    alert("ACCESS DENIED");
  }
}
