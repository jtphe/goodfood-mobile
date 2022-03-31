export const checkPasswordLength = (pwd) => {
  return pwd.trim().length >= 8;
};

export const checkPasswordSame = (pwd, pwdToCheck) => {
  return pwd.trim() === pwdToCheck.trim();
};
