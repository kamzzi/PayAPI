import { emailFn, minLengthFn, requiredFn } from "./validation";

type FormIndividualData = {
  item: HTMLInputElement;
  value: string;
  type: string;
  required: boolean;
  minLength: boolean;
  email: boolean;
};

const form = document.querySelector(".form");
const formInputs = form?.querySelectorAll<HTMLInputElement>(".form__input");
const formButton = document.querySelector(".btn--form");

const createInputsData = (inputs: NodeListOf<HTMLInputElement>) => {
  const data = [...inputs].map((input) => {
    const type = input.id;

    const minLengthInputs = ["name", "company", "title", "message"];

    const individualData = {
      item: input,
      value: input.value,
      type,
      required: true,
      minLength: minLengthInputs.includes(type),
      email: type === "email",
    };

    return individualData;
  });

  return data;
};

const inputValidation = ({
  item,
  value,
  required,
  minLength,
  email,
  type,
}: FormIndividualData) => {
  const transformedType = `${type[0].toUpperCase()}${type
    .slice(1)
    .toLowerCase()}`;

  if (required && !requiredFn(value)) {
    showError(item, `${transformedType} is required!`);
    return false;
  }

  if (minLength && !minLengthFn(value)) {
    showError(item, `${transformedType} must have minimum 3 characters!`);
    return false;
  }

  if (email && !emailFn(value)) {
    showError(item, `${transformedType} is invalid!`);
    return false;
  }

  hideError(item);

  return true;
};

form?.addEventListener("submit", (ev) => {
  ev.preventDefault();

  if (!formInputs) return;

  const inputsData = createInputsData(formInputs);

  const validation = inputsData.map((inputData) => inputValidation(inputData));

  const isInvalid = validation.includes(false);

  if (isInvalid) return;

  showSuccessUI();
});

const showSuccessUI = () => {
  if (!formButton) return;

  formButton?.classList.add("success");
  formButton.textContent = "Successfully sended email!";

  setTimeout(() => {
    setInitialUI();
  }, 1000);
};

const setInitialUI = () => {
  if (!formButton) return;

  formInputs?.forEach((input) => {
    const inputParentContainer = input.closest(".form__item");

    if (!inputParentContainer) return;

    input.value = "";
    inputParentContainer.classList.remove("form__item--success");
  });

  formButton?.classList.remove("success");
  formButton.textContent = "Submit";
};

const showError = (input: HTMLInputElement, message: string) => {
  const inputParentContainer = input.closest(".form__item");

  if (!inputParentContainer) return;

  const error = inputParentContainer.querySelector(".form__error");

  inputParentContainer?.classList.remove("form__item--success");
  inputParentContainer?.classList.add("form__item--error");

  if (!error) return;

  error.textContent = message;
};

const hideError = (input: HTMLInputElement) => {
  const inputParentContainer = input.closest(".form__item");

  if (!inputParentContainer) return;

  const error = inputParentContainer.querySelector(".form__error");

  inputParentContainer?.classList.remove("form__item--error");
  inputParentContainer?.classList.add("form__item--success");

  if (!error) return;

  error.textContent = "";
};
