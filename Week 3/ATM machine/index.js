let balance = 10000;

const displayPrompt = document.getElementById("displayPrompt");
const amountInput = document.getElementById("amount");

function moneyWithdraw() {

  const withdrawAmount = Number(amountInput.value);

  // Check amount is multiple of 100
  if (withdrawAmount % 100 == 0) {

    const pinCode = 1234;

    const withdrawPin = Number(
      prompt("Enter Withdraw Pin Number:")
    );

    // Check PIN
    if (withdrawPin == pinCode) {

      // Check sufficient balance
      if (withdrawAmount <= balance) {

        balance = balance - withdrawAmount;

        displayPrompt.innerHTML =
          `Balance: Rs. ${balance}`;

      } else {

        displayPrompt.innerHTML =
          `Insufficient Balance`;
      }

    } else {

      displayPrompt.innerHTML =
        `Invalid Pin`;
    }

  } else {

    displayPrompt.innerHTML =
      `Amount must be a multiple of 100`;
  }
}

function moneyDeposit() {

  const depositAmount = Number(amountInput.value);

  // Check amount is multiple of 100
  if (depositAmount % 100 == 0) {

    const pinCode = 5678;

    const depositPin = Number(
      prompt("Enter Deposit Pin Number:")
    );

    // Check PIN
    if (depositPin === pinCode) {

      balance = balance + depositAmount;

      displayPrompt.innerHTML =
        `Balance: Rs. ${balance}`;

    } else {

      displayPrompt.innerHTML =
        `Invalid Pin`;
    }

  } else {

    displayPrompt.innerHTML =
      `Amount must be a multiple of 100`;
  }
}