// Get DOM objects to manage
const reserveForm = document.querySelector("#reserve");
const inputs = document.querySelectorAll("#reserve input");

// init global of form and errors objects
let formData = {};
let errors = {};

// handle changes in inputs to modify formData content and relaunch error checking
const handleChange = ({ target: { name, type, value, checked } }) => {
  if (type === "checkbox") formData[name] = checked;
  else formData[name] = value;

  // if errors is superior to 0 we run validate function
  if (Object.keys(errors).length > 0) validate();
};

// function that sets errors if needed and in case of no errors it displays the success modal
const handleSubmit = (e) => {
  e.preventDefault();

  validate();

  // if errors is superior to 0 we stop and get out of the function
  if (Object.keys(errors).length > 0) return;

  // if no errors, we replace the content of the modal by the success message
  reserveForm.parentElement.innerHTML = `
        <div class="success">
            <h2>Thank you! Your reservation was received.</h2>
        </div>
        <button
        id="btn-close"
        class="btn-submit"
        type="submit"
      > Close </button>
    `;

  // add close event on button
  const closeButton = document.querySelector("#btn-close");
  closeButton.addEventListener("click", closeModal);
};

// add event management to inputs
inputs.forEach((input) => {
  input.addEventListener("change", handleChange);
  input.addEventListener("keyup", handleChange);
});

// Check if there's errors and sets 'has-error' class and text errors
const validate = () => {
  // this part removes all the error messages and 'has-error' class
  document.querySelectorAll("input.has-error").forEach((input) => {
    if (Object.keys(errors).includes(input.name)) {
      if (input.name === "location" || input.name === "toc") {
        document
          .querySelector(`input[name="${input.name}"]`)
          .classList.remove("has-error");
        document.querySelector(
          `input[name="${input.name}"] + label + p`
        ).innerText = "";
      } else {
        document.querySelector(`#${input.name}`).classList.remove("has-error");
        document.querySelector(`#${input.name} + p`).innerText = "";
      }
    }

    // this part deletes the input from the object errors
    delete errors[input.name];
  });

  // here we check all inputs in form, if there's an error we add an attibute to errors object corresponding to input in error with the error message as value
  if (formData.first?.length < 2)
    errors.first = "First name must have more than 2 characters.";
  if (!formData.first) errors.first = "First name field cannot be blank.";
  if (formData.last?.length < 2)
    errors.last = "Last name must have more than 2 characters.";
  if (!formData.last) errors.last = "Last name field cannot be blank.";
  if (ValidateEmail(formData.email))
    errors.email = "You have to enter a valid email";
  if (!formData.email) errors.email = "Email field cannot be blank.";
  if (!formData.birthdate)
    errors.birthdate = "You must enter your date of birth.";
  if (isNaN(formData.quantity))
    errors.quantity = "You must enter a valid number.";
  if (!formData.location) errors.location = "You must choose a location.";
  if (!formData.toc) errors.toc = "You must accept our terms.";

  // if there's an error on a input we add the class 'has-error' to it and we add the error message
  Object.keys(errors).forEach((error) => {
    if (error === "location" || error === "toc") {
      document
        .querySelector(`input[name="${error}"]`)
        .classList.add("has-error");
      document.querySelector(`input[name="${error}"] + label + p`).innerText =
        errors[error];
    } else {
      document.querySelector(`#${error}`).classList.add("has-error");
      document.querySelector(`#${error} + p`).innerText = errors[error];
    }
  });
};

// email validation function
const ValidateEmail = (mail) => {
  var re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return !re.test(mail);
};

// add submit event management on the submit button
reserveForm.addEventListener("submit", handleSubmit);
