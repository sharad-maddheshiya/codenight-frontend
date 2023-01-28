const getAllTransactions = () => {
  var getAllTransactionForm = document.getElementById("getAllTransactionForm");

  var customerId = getAllTransactionForm["customerId"].value;
  var accountId = getAllTransactionForm["accountId"].value;

  if (customerId != "" && customerId != "") {
    var body = {
      customerId: customerId,
      accountId: accountId,
    };

    fetchAllTransactions(body);
    getAllTransactionForm.reset();
  }
};

const fetchAllTransactions = (body) => {
  fetch(path + "/account/get/transaction/history", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((transactions) => {
      if ("error" in transactions) {
        alert("Wrong Account ID or Customer ID");
      } else {
        if (transactions != undefined) {
          populateTransactionTable(transactions);
        }
      }
    })
    .then((error) => {

      return;
    });
};

const populateTransactionTable = (transactions) => {
  var tableBody = document.getElementById("transactions");

  for (var index = 0; index < transactions.length; index++) {
    console.log(transactions[index]);
    tableBody.appendChild(
      createRowTransactionTable(index + 1, transactions[index])
    );
  }
};

const createRowTransactionTable = (srno, transaction) => {
  var tr = document.createElement("tr");
  var tdSrno = document.createElement("td");
  tdSrno.innerHTML = srno;
  tr.appendChild(tdSrno);

  var tdAmount = document.createElement("td");
  if (transaction.amount != null) tdAmount.innerHTML = transaction.amount;
  else tdAmount.innerHTML = "amount";
  tr.appendChild(tdAmount);

  var tdDate = document.createElement("td");
  if (transaction.date != null) tdDate.innerHTML = transaction.date;
  else tdDate.innerHTML = "date";
  tr.appendChild(tdDate);

  return tr;
};

const addMoney = () => {
  var addMoneyForm = document.getElementById("addMoneyForm");

  var customerId = addMoneyForm["customerId"].value;
  var accountId = addMoneyForm["accountId"].value;
  var amount = addMoneyForm["amount"].value;

  if (customerId != "" && customerId != "" && amount) {
    var body = {
      customerId: customerId,
      accountId: accountId,
      amount: amount,
    };

    saveAddMoney(body);
    addMoneyForm.reset();
  }
};

const saveAddMoney = (body) => {
  console.log(body);
  fetch(path + "/account/add/money", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((response) => {
      if ("error" in response) {
        alert("Wrong Account ID or Customer ID");
      } else {
        document.getElementById("currentBalance").innerHTML =
          response.currentBalance;
      }
    })
    .then((error) => {

      return;
    });
};

const withdrawMoney = () => {
  var withdrawMoneyForm = document.getElementById("withdrawMoneyForm");

  var customerId = withdrawMoneyForm["customerId"].value;
  var accountId = withdrawMoneyForm["accountId"].value;
  var amount = withdrawMoneyForm["amount"].value;

  if (customerId != "" && customerId != "" && amount) {
    var body = {
      customerId: customerId,
      accountId: accountId,
      amount: amount,
    };

    saveWithdrawMoney(body);
    withdrawMoneyForm.reset();
  }
};

const saveWithdrawMoney = (body) => {
  console.log(body);
  fetch(path + "/account/withdraw/money", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((response) => {
      if ("error" in response) {
        alert("Wrong Account ID or Customer ID");
      } else {
        document.getElementById("currentBalance").innerHTML =
          response.currentBalance;
      }
    })
    .then((error) => {

      return;
    });
};

const getCurrentBalance = () => {
  var getCurrentBalanceForm = document.getElementById("getCurrentBalanceForm");

  var customerId = getCurrentBalanceForm["customerId"].value;
  var accountId = getCurrentBalanceForm["accountId"].value;

  if (customerId != "" && customerId != "") {
    var body = {
      customerId: customerId,
      accountId: accountId,
    };

    fetchCurrentBalance(body);
    getCurrentBalanceForm.reset();
  }
};

const fetchCurrentBalance = (body) => {
  console.log(body);
  fetch(path + "/account/get/current/balance", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())

    .then((response) => {
      if (typeof response === "object" && "error" in response) {
        alert("Wrong Account ID or Customer ID");
      } else {
        document.getElementById("currentBalance").innerHTML = response;
      }
    })
    .then((error) => {

      return;
    });
};
