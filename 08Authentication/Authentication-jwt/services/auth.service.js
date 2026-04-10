import bcrypt from "bcrypt";

export const hashPassword = async (myPassword) => {
  const saltRounds = 10;

  const hashedPassword = await bcrypt.hash(myPassword, saltRounds);
  console.log(hashedPassword);
  return hashedPassword;
};

export const compareHashedPassword = async (
  password,
  hashedPassword,
) => {
  const isCorrect = await bcrypt.compare(password, hashedPassword);
  return isCorrect;
};
