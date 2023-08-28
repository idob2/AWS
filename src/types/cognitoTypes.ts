export type CognitoConfirmSignUpParams = {
  UserPoolId: string;
  Username: string;
};

export type CognitoUserAttribute = {
  Name: "email" | "given_name" | "family_name" | "birthdate" | "phone_number";
  Value: string;
};

export type CognitoSignUpParams = {
  ClientId: string;
  Username: string;
  Password: string;
  UserAttributes: CognitoUserAttribute[];
};

export type CognitoAuthParams = {
  AuthFlow: "USER_PASSWORD_AUTH";
  ClientId: string;
  AuthParameters: {
    USERNAME: string;
    PASSWORD: string;
  };
};
