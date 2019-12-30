let queryObject = {};

let params = new URLSearchParams(window.location.search);

let entries = params.entries();

let baseURL = window.location.origin;

for (value of entries) {
  queryObject[value[0]] = value[1];
}

let card = document.getElementById("card");
let formContainer = document.getElementById("formContainer");

if (queryObject.to && queryObject.from) {
  card.classList.remove("not-show");
  formContainer.classList.add("not-show");
}

// console.log(queryObject)

let customizeMessage = () => {
  let toDetails = document.getElementById("to");
  let fromDetails = document.getElementById("from");
  let msg = document.getElementById("msg");
  toDetails.innerText = "To, " + queryObject.to;
  msg.innerText = queryObject.message || msg.innerText;
  fromDetails.innerText = "From, " + queryObject.from;
};

let toInput = document.getElementById("toInput");
let fromInput = document.getElementById("fromInput");
let message = document.getElementById("message");
let linkbox = document.getElementById("linkbox");
let form = document.getElementById("form");
let generatedLinkBox = document.getElementById("link");

form.addEventListener("submit", e => {
  e.preventDefault();
  let queryString = `?to=${encodeURIComponent(
    toInput.value
  )}&from=${encodeURIComponent(fromInput.value)}&message=${encodeURIComponent(
    message.value
  )}`;
  generatedLinkBox.innerText = baseURL + queryString;
  generatedLinkBox.setAttribute("href", generatedLinkBox.innerText);
  linkbox.classList.remove("not-show");
});

let copyLink = () => {
  let range = document.createRange();
  window.getSelection().removeAllRanges();
  range.selectNode(generatedLinkBox);
  window.getSelection().addRange(range);
  document.execCommand("copy");
  window.getSelection().removeAllRanges();
  alert("Link copied Successfully");
};

let clearLink = () => {
  toInput.value = "";
  fromInput.value = "";
  message.value = "";
  linkbox.classList.add("not-show");
};

let makeLink = () => {
  window.location.replace(baseURL);
};

customizeMessage();
