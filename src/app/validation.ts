export const requiredFn = (value: string) => {
  if (value.trim().length === 0) {
    return false;
  }

  return true;
};

export const minLengthFn = (value: string) => {
  if (value.trim().length < 3) {
    return false;
  }

  return true;
};

export const emailFn = (value: string) => {
  return value
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
