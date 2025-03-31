const EMAIL_REGEX = /^\S+@\S+\.\S+$/;

function isEmpty(value?: string) {
  return !value?.trim();
}

function isValidEmail(email: string) {
  return EMAIL_REGEX.test(email.trim());
}

export { isEmpty, isValidEmail };
