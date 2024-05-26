let myLead = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const saveTabBtn = document.getElementById("save-tab-btn");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLead"));

if (leadsFromLocalStorage) {
  myLead = leadsFromLocalStorage;
  renderLead();
}

const tabs = [{ url: "https://www.linkedin.com/in/per-harald-borgen/" }];

saveTabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLead.push(tabs[0].url);
    localStorage.setItem("myLead", JSON.stringify(myLead));
    renderLead();
  });
});

deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myLead = [];
  renderLead();
});

inputBtn.addEventListener("click", function () {
  myLead.push(inputEl.value);
  inputEl.value = "";

  localStorage.setItem("myLead", JSON.stringify(myLead));
  renderLead();
});

function renderLead() {
  let listItems = "";
  for (let i = 0; i < myLead.length; i++) {
    listItems += ` <li><a target='_blank' href=' ${myLead[i]} '> ${myLead[i]} </a></li>`;
    console.log(listItems);
  }
  ulEl.innerHTML = listItems;
}
