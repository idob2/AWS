import { APIGatewayProxyHandler } from "aws-lambda";
import { confirmUser } from "../services/cognito";

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const body = JSON.parse(event.body!);
    const { email } = body;

    const params = {
      UserPoolId: process.env.USER_POOL_ID!,
      Username: email,
    };

    await confirmUser(params);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "User confirmed successfully" }),
    };
  } catch (error: any) {
    console.error("Error confirming user:", error);
    return {
      statusCode: 400,
      body: JSON.stringify({ message: error.message }),
    };
  }
};
