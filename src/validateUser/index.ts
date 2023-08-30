export const handler = async (event: {
  request: {
    userAttributes: {
      birthdate: string;
      phone_number: string;
      given_name: string;
      family_name: string;
      email: string;
    };
  };
}) => {
  try {
    const userAttributes = event.request.userAttributes;
    const firstName = userAttributes.given_name;
    const lastName = userAttributes.family_name;
    const phone = userAttributes.phone_number;
    const email = userAttributes.email;

    if (!firstName || typeof firstName !== "string" || firstName.length > 20) {
      throw new Error("Invalid first name");
    }

    if (!lastName || typeof lastName !== "string" || lastName.length > 20) {
      throw new Error("Invalid last name");
    }

    if (!email || !isValidEmail(email)) {
      throw new Error("Invalid Email");
    }

    if (!phone || !isValidPhone(phone)) {
      throw new Error("Invalid phone number");
    }
    return event;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const isValidPhone = (phone: string) => {
  return /^\+9725\d{8}$/.test(phone);
};

const isValidEmail = (email: string) => {
  return email.includes("@");
};
