import { VALID_EMAIL } from "./utils";

const newsletter = document.querySelector(".newsletter");
const emailInput =
  document.querySelector<HTMLInputElement>(".newsletter__input");
const error = document.querySelector(".form-error");

const submitButton = document.querySelector(".btn--submit");

const showError = (message: string) => {
  if (!error) return;

  newsletter?.classList.add("error");
  error.textContent = message;
};

const showSuccess = () => {
  if (!error) return;

  newsletter?.classList.remove("error");
  error.textContent = "";

  if (!submitButton) return;

  submitButton?.classList.add("success");
  submitButton.textContent = "Succesful!";

  setTimeout(() => {
    setInitialState();
  }, 1000);
};

const setInitialState = () => {
  if (!submitButton) return;

  submitButton?.classList.remove("success");
  submitButton.textContent = "Schedule a demo!";

  if (!emailInput) return;

  emailInput.value = "";
};

const isValidEmail = (email: string) => {
  return String(email).toLowerCase().match(VALID_EMAIL);
};

const isValidInput = (value?: string) => {
  if (!value) {
    showError("Input is empty!");
    return false;
  }

  if (!isValidEmail(value)) {
    showError("Input is invalid!");
    return false;
  }

  return true;
};

newsletter?.addEventListener("submit", (ev) => {
  ev.preventDefault();

  if (!isValidInput(emailInput?.value)) return;

  showSuccess();
});

/* 
    Pobieram wartość z inputa
    Sprawdza, jeżeli jest nie poprawny to wyswietl komunikat
    Jezeli ok to wyswietl komunikat i zniknij po chwili.
*/
