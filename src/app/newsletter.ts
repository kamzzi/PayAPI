import { VALID_EMAIL } from "./utils";

const newsletter = document.querySelectorAll<HTMLDivElement>(".newsletter");

const showError = (newsletter: HTMLDivElement, message: string) => {
  const error = newsletter.querySelector(".form-error");

  if (!error) return;

  newsletter?.classList.add("error");
  error.textContent = message;
};

const showSuccess = (newsletter: HTMLDivElement) => {
  const error = newsletter.querySelector(".form-error");
  const submitButton = newsletter.querySelector(".btn--submit");

  if (!error) return;

  newsletter?.classList.remove("error");
  error.textContent = "";

  if (!submitButton) return;

  submitButton?.classList.add("success");
  submitButton.textContent = "Succesful!";

  setTimeout(() => {
    setInitialState(newsletter);
  }, 1000);
};

const setInitialState = (newsletter: HTMLDivElement) => {
  const submitButton = newsletter.querySelector(".btn--submit");
  const emailInput =
    newsletter.querySelector<HTMLInputElement>(".newsletter__input");

  if (!submitButton) return;

  submitButton?.classList.remove("success");
  submitButton.textContent = "Schedule a demo!";

  if (!emailInput) return;

  emailInput.value = "";
};

const isValidEmail = (email: string) => {
  return String(email).toLowerCase().match(VALID_EMAIL);
};

const isValidInput = (newsletter: HTMLDivElement, value?: string) => {
  if (!value) {
    showError(newsletter, "Input is empty!");
    return false;
  }

  if (!isValidEmail(value)) {
    showError(newsletter, "Input is invalid!");
    return false;
  }

  return true;
};

newsletter.forEach((newsletter) =>
  newsletter?.addEventListener("submit", (ev) => {
    ev.preventDefault();

    const emailInput =
      newsletter.querySelector<HTMLInputElement>(".newsletter__input");

    if (!isValidInput(newsletter, emailInput?.value)) return;

    showSuccess(newsletter);
  })
);
