import crypto from "crypto";

// Generate a random salt
export const generateSalt = () => {
  return crypto.randomBytes(16).toString("hex");
};

// Hash the password with the provided salt
export const hashPassword = (password: string, salt: string) => {
  return crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
};

// Compare entered password with stored hash
export const comparePassword = (enteredPassword: string, storedHash: string, salt: string) => {
  const hash = hashPassword(enteredPassword, salt);
  return hash === storedHash;
};
