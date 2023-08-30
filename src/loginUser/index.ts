import { APIGatewayProxyHandler } from "aws-lambda";
import { loginUser } from "../services/cognito";
import { CognitoIdentityServiceProvider } from "aws-sdk";

export const handler: APIGatewayProxyHandler = async (event) => {
  const data = JSON.parse(event.body || "{}");

  const { email, password } = data;

  try {
    const params: CognitoIdentityServiceProvider.InitiateAuthRequest = {
      AuthFlow: "USER_PASSWORD_AUTH",
      ClientId: process.env.APP_CLIENT_ID!,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
      },
    };

    const loginResponse = await loginUser(params);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Login successful!",
        accessToken: loginResponse.AuthenticationResult?.AccessToken,
      }),
    };
  } catch (error: any) {
    console.error(error);
    return {
      statusCode: 400,
      body: JSON.stringify({ message: error.message }),
    };
  }
};
