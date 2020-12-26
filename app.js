let items = [];
let itemHTMLComponent;
let dayDifference;

function addItem() {
  let itemValue = document.getElementById("todo-input").value;
  items.push(itemValue);
  displayAllItems();
  document.getElementById("todo-input").value = "";
}
let itemsDate = [];
function addDate() {
  let dateValue = document.getElementById("due-date").value;
  itemsDate.push(dateValue);
  displayAllItems();
}

//have I do so many variables || is there a way to cut my code ??

function displayAllItems() {
  let itemContainerText = document.getElementById("todo-container");
  itemContainerText.innerHTML = "";

  for (let index = 0; index < items.length; index++) {
    //add number of row
    let htmlTrComponent = document.createElement("tr");
    let numberOfRow = document.createElement("td");
    let textNumberRow = document.createTextNode(index + 1);
    numberOfRow.appendChild(textNumberRow);
    htmlTrComponent.appendChild(numberOfRow);
    document.getElementById("todo-container").appendChild(htmlTrComponent);
    let item = items[index];
    let itemDate = new Date(itemsDate[index]);

    //creating text field
    itemHTMLComponent = document.createElement("td");
    htmlTrComponent.appendChild(itemHTMLComponent);
    let listItemTextNode = document.createTextNode(item);
    itemHTMLComponent.appendChild(listItemTextNode);

    //calculate days beetwen
    dayDifference = calculateDaysBetween(itemDate);
    console.log(dayDifference);

    //checking if urgent
    itemHTMLComponent = document.createElement("td");
    setColoring(index, htmlTrComponent, itemsDate);
  }
}

function calculateDaysBetween(itemDate) {
  let currentDate = new Date();
  let ddCurrent = currentDate.getTime();
  let deadLine = itemDate;
  let ddDedline = deadLine.getTime();
  let dateDifference = ddDedline - ddCurrent;
  let days = 1000 * 3600 * 24;
  let dayDifference = Math.ceil(dateDifference / days);
  return dayDifference;
}

function setColoring(index, htmlTrComponent, itemsDate) {
  if (dayDifference <= 2) {
    //creat data field
    htmlTrComponent.appendChild(itemHTMLComponent);
    listItemTextNode = document.createTextNode(itemsDate[index]);
    itemHTMLComponent.appendChild(listItemTextNode);
    document.getElementById("due-date").value = "";

    //creating urgent
    let textUrgent = document.createTextNode("URGENT");
    let spamElement = document.createElement("spam");
    spamElement.appendChild(textUrgent);
    htmlTrComponent.appendChild(spamElement);
    htmlTrComponent.classList.add("tableUrgent");
  } else {
    //creat data field
    htmlTrComponent.appendChild(itemHTMLComponent);
    listItemTextNode = document.createTextNode(itemsDate[index]);
    itemHTMLComponent.appendChild(listItemTextNode);
    document.getElementById("due-date").value = "";
    htmlTrComponent.classList.add("tableNotUrgent");
  }
}