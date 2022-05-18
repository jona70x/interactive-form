"use strict";

//Selecting elements
const form = document.querySelector("form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const jobRoles = document.querySelector("#title");
const otherJobRoleInput = document.querySelector("#other-job-role");
const shirtColors = document.querySelector("#shirt-colors");
const shirtDesign = document.querySelector("#design");
const activities = document.querySelector("#activities");
const activitiesContainer = document.querySelector("#activities-box");
const activitiesCost = document.querySelector("#activities-cost");
const checkboxes = document.querySelectorAll("#activities input");
const emailErrorMessage = document.querySelector("#email-hint");
let activitiesTotal = 0;
//Payment elements
const paymentMethod = document.querySelector("#payment");
const creditCardContainter = document.querySelector("#credit-card");
const paypalContainer = document.querySelector("#paypal");
const bitcoinContainer = document.querySelector("#bitcoin");
//Credit card elements
const creditCardNumber = document.querySelector("#cc-num");
const creditCardZip = document.querySelector("#zip");
const creditCardCVV = document.querySelector("#cvv");

//Functions
//Initializes the form
const initApp = function () {
  //Focusing name input
  nameInput.focus();
  //Hiding other job input field
  otherJobRoleInput.classList.add("hidden");
  //Hidding shirt colors box
  shirtColors.classList.add("hidden");
  //Hiding payment methods
  creditCardContainter.classList.add("hidden");
  paypalContainer.classList.add("hidden");
  bitcoinContainer.classList.add("hidden");
};
initApp();

//Show color dropdown options
const showColorOptions = function (e) {
  //removing hidden class
  shirtColors.classList.remove("hidden");

  //variable to store selected shirt option
  const shirtThemeOption = e.target.value;
  //Selecting color options
  const colorOptions = document.querySelectorAll("#color option");

  //iterating over color options
  for (let i = 0; i < colorOptions.length; i++) {
    const currentColor = colorOptions[i];
    //checking if color option includes data attribute selected
    if (shirtThemeOption === currentColor.dataset.theme) {
      //adding and removing color options
      currentColor.selected = true;
      currentColor.hidden = false;
    } else {
      currentColor.hidden = true;
      currentColor.selected = false;
    }
  }
};

//Show other job input field if selected
const showInputField = function (e) {
  const target = e.target.value;
  if (target === "other") otherJobRoleInput.classList.remove("hidden");
  else otherJobRoleInput.classList.add("hidden");
};

//Modify activity cost
const changeActivityCost = function (e) {
  const target = e.target;
  const isChecked = target.checked;

  if (isChecked) activitiesTotal += +target.dataset.cost;
  else activitiesTotal -= +target.dataset.cost;

  activitiesCost.innerText = `Total $${activitiesTotal}`;
};
//Shows and hide selected payment method
const changePaymentMethod = function (e) {
  const paymentOption = e.target.value;

  if (paymentOption === "credit-card") {
    creditCardContainter.classList.remove("hidden");
    paypalContainer.classList.add("hidden");
    bitcoinContainer.classList.add("hidden");
  }

  if (paymentOption === "paypal") {
    paypalContainer.classList.remove("hidden");
    bitcoinContainer.classList.add("hidden");
    creditCardContainter.classList.add("hidden");
  }

  if (paymentOption === "bitcoin") {
    bitcoinContainer.classList.remove("hidden");
    paypalContainer.classList.add("hidden");
    creditCardContainter.classList.add("hidden");
  }
};
//Adds visual aid to field when validation is successful
const validationSuccess = function (element) {
  const parentElement = element.parentElement;
  parentElement.classList.add("valid");
  parentElement.classList.remove("not-valid");
  parentElement.lastElementChild.style.display = "none";
};
//Adds visual aid to field when validation has an error
const validationError = function (element) {
  const parentElement = element.parentElement;
  parentElement.classList.add("not-valid");
  parentElement.classList.remove("valid");
  parentElement.lastElementChild.style.display = "block";
};

//Validates name
const nameValidation = function () {
  if (nameInput.value.length < 0) {
    return false;
  }
  const isValidName = /^[a-zA-Z]+ ?[a-zA-Z]*?$/.test(nameInput.value);

  if (isValidName) validationSuccess(nameInput);
  else validationError(nameInput);

  return isValidName;
};
//Validates email
const emailValidation = function () {
  const isValidEmail = /^[^@]+@[^@.]+\.com$/i.test(emailInput.value);

  if (isValidEmail) {
    validationSuccess(emailInput);
  } else if (!isValidEmail && emailInput.value.length === 0) {
    //Adding conditional message
    emailErrorMessage.textContent = "Email field cannot be blank";
    validationError(emailInput);
  } else {
    emailErrorMessage.textContent = "Email address must be formatted correctly";
    validationError(emailInput);
  }

  return isValidEmail;
};
//Validates activities
const activitiesValidation = function () {
  if (activitiesTotal === 0) {
    validationError(activitiesContainer);
    return false;
  } else {
    validationSuccess(activitiesContainer);
    return true;
  }
};

const creditCardNumberValidation = function () {
  const isValidCreditCardNumber = /^\d{13,16}$/.test(+creditCardNumber.value);

  if (isValidCreditCardNumber) validationSuccess(creditCardNumber);
  else validationError(creditCardNumber);

  return isValidCreditCardNumber;
};

const creditCardZipValidation = function () {
  const isValidZip = /^\d{5}$/.test(+creditCardZip.value);
  if (isValidZip) validationSuccess(creditCardZip);
  else validationError(creditCardZip);

  return isValidZip;
};
const creditCardCVVValidation = function () {
  const isValidCVV = /^\d{3}$/.test(+creditCardCVV.value);
  if (isValidCVV) validationSuccess(creditCardCVV);
  else validationError(creditCardCVV);

  return isValidCVV;
};

//Event Listeners

//show other job input field
jobRoles.addEventListener("change", showInputField);
//Conditional shows color shirts
shirtDesign.addEventListener("change", showColorOptions);
activitiesContainer.addEventListener("change", changeActivityCost);
paymentMethod.addEventListener("change", changePaymentMethod);

//Validating form
form.addEventListener("submit", (e) => {
  if (!nameValidation()) {
    e.preventDefault();
  }
  if (!emailValidation()) {
    e.preventDefault();
  }
  if (!activitiesValidation()) {
    e.preventDefault();
  }

  if (
    !creditCardNumberValidation() &&
    !creditCardContainter.classList.contains("hidden")
  ) {
    e.preventDefault();
  }
  if (
    !creditCardZipValidation() &&
    !creditCardContainter.classList.contains("hidden")
  ) {
    e.preventDefault();
  }
  if (
    !creditCardCVVValidation() &&
    !creditCardContainter.classList.contains("hidden")
  ) {
    e.preventDefault();
  }
});

//Focusing selected checkbox
for (let i = 0; i < checkboxes.length; i++) {
  checkboxes[i].addEventListener("focus", () =>
    checkboxes[i].parentElement.classList.add("focus")
  );
  checkboxes[i].addEventListener("blur", () => {
    if (checkboxes[i].parentElement.classList.contains("focus"))
      checkboxes[i].parentElement.classList.remove("focus");
  });
}

//Enabling/ Disabling conflicting activities //Function made taking inspiration from Checkboxes 3 warm-up from https://teamtreehouse.com/
activities.addEventListener("change", function (e) {
  const clicked = e.target;
  //Getting date and time of the element that was clicked
  const clickedDateAndTime = clicked.dataset.dayAndTime;

  for (let i = 0; i < checkboxes.length; i++) {
    const checkBoxDateAndTime = checkboxes[i].dataset.dayAndTime;
    if (
      checkBoxDateAndTime === clickedDateAndTime &&
      clicked !== checkboxes[i]
    ) {
      if (clicked.checked) {
        checkboxes[i].disabled = true;
        checkboxes[i].parentElement.classList.add("disabled");
      } else {
        checkboxes[i].disabled = false;
        checkboxes[i].parentElement.classList.remove("disabled");
      }
    }
  }
});

//Real time error  while typing feedback for name and email
nameInput.addEventListener("keyup", nameValidation);
emailInput.addEventListener("keyup", emailValidation);
activities.addEventListener("change", activitiesValidation);
creditCardNumber.addEventListener("keyup", creditCardNumberValidation);
creditCardZip.addEventListener("keyup", creditCardZipValidation);
creditCardCVV.addEventListener("keyup", creditCardCVVValidation);
