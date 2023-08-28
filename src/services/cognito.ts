import { CognitoIdentityServiceProvider } from "aws-sdk";
import { secondaryRegion } from "../utils/constants";
import {
  CognitoAuthParams,
  CognitoConfirmSignUpParams,
  CognitoSignUpParams,
} from "../types/cognitoTypes";

const cognito = new CognitoIdentityServiceProvider({
  region: secondaryRegion,
});
export const loginUser = async (params: CognitoAuthParams) => {
  const loginResponse = await cognito.initiateAuth(params).promise();
  return loginResponse;
};

export const confirmUser = async (params: CognitoConfirmSignUpParams) => {
  await cognito.adminConfirmSignUp(params).promise();
};

export const signUpUser = async (params: CognitoSignUpParams) => {
  await cognito.signUp(params).promise();
};
