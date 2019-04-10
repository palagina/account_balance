let incomes = [];
let expenses = [];
let balance = 0;

function addOperation() {
  const operationType = document.getElementById("operationType").selectedIndex;
  let description = document.getElementById("description").value;
  description = description !== "" ? description : "Something";
  let amount = parseFloat(document.getElementById("amount").value);
  amount = !isNaN(amount) ? amount : 0;
  const operation = { operationType, amount, description };
  const list = document.createElement("DIV");
  const timestamp = setDate();
  let line = document.createTextNode(`${description} ${amount}€ ${timestamp}`);
  list.appendChild(line);
  list.appendChild(deleteIcon(amount));
  switch (operationType) {
    case 0:
      incomes.push(operation);
      document.getElementById("incomeList").appendChild(list);
      document.getElementById("balance").innerHTML = getBalance(amount);
      break;
    case 1:
      expenses.push(operation);
      document.getElementById("expenseList").appendChild(list);
      document.getElementById("balance").innerHTML = getBalance(-amount);
      break;
    default:
      break;
  }
}

function deleteIcon(amount) {
  const deleteIcon = document.createElement("I");
  deleteIcon.innerText = "delete_forever";
  deleteIcon.classList.add("material-icons");
  deleteIcon.classList.add("delete-icon");
  deleteIcon.addEventListener("click", () => {
    if (deleteIcon.parentElement.parentElement.classList.contains("income")) {
      document.getElementById("balance").innerHTML = getBalance(-amount);
    } else if (deleteIcon.parentElement.parentElement.classList.contains("expense")) {
      document.getElementById("balance").innerHTML = getBalance(amount);
    }
    deleteIcon.parentElement.remove();
  });
  return deleteIcon;
}

function setDate() {
  const now = new Date();
  const date = `${now.getDate()}-${now.getMonth()}-${now.getFullYear()}`;
  const time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
  let timestamp = `${date} ${time}`;
  return timestamp;
}

function getBalance(amount) {
  balance = balance + amount;
  return balance + "€";
}