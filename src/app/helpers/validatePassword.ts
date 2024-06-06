

export default function validatePassword(password:string) {
  // Criteria: at least 8 characters long, contains upper and lower case letters, numbers, and special characters
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}
