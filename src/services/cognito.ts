import { CognitoIdentityServiceProvider } from "aws-sdk";
import { secondaryRegion } from "../utils/constants";

const cognito = new CognitoIdentityServiceProvider({
  region: secondaryRegion,
});
export const loginUser = async (params: CognitoIdentityServiceProvider.InitiateAuthRequest) => {
  return await cognito.initiateAuth(params).promise();
};

export const confirmUser = async (params: CognitoIdentityServiceProvider.AdminConfirmSignUpRequest) => {
  return await cognito.adminConfirmSignUp(params).promise();
};

export const signUpUser = async (params: CognitoIdentityServiceProvider.SignUpRequest) => {
  return await cognito.signUp(params).promise();
};
