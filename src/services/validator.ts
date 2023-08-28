function isIsraeliIdValid(id: string) {
  if (typeof id !== "string") return false;
  const trimmed = id.trim();

  if (!trimmed) return false;
  if (!/^\d{9}$/.test(trimmed)) return false;

  let counter = 0;
  for (let i = 0; i < 9; i++) {
    let num = parseInt(trimmed[i]) * ((i % 2) + 1);
    if (num > 9) num -= 9;
    counter += num;
  }
  return counter % 10 === 0;
}

function isValidPhone(phone: string) {
  const pattern = /^\+9725\d{8}$/;
  return pattern.test(phone);
}

export const validator = {
  validate(data: {
    firstName: string;
    lastName: string;
    id: string;
    phone: string;
    password: string;
  }) {
    if (!data) {
      return { valid: false, error: "Data is empty." };
    }

    if (
      !data.firstName ||
      typeof data.firstName !== "string" ||
      data.firstName.length > 20
    ) {
      return { valid: false, error: "Invalid first name." };
    }

    if (
      !data.lastName ||
      typeof data.lastName !== "string" ||
      data.lastName.length > 20
    ) {
      return { valid: false, error: "Invalid last name." };
    }

    if (!data.id || !isIsraeliIdValid(data.id)) {
      return { valid: false, error: "Invalid Israeli ID." };
    }

    if (!data.phone || !isValidPhone(data.phone)) {
      return {
        valid: false,
        error:
          "Invalid phone number. It should be in the format +9725XXXXXXXX.",
      };
    }

    if (
      !data.password ||
      typeof data.password !== "string" ||
      data.password.length < 6
    ) {
      return {
        valid: false,
        error: "Password must be a minimum of 6 characters.",
      };
    }

    return { valid: true };
  },
};
