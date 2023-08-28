import { APIGatewayProxyHandler } from "aws-lambda";
import { tableName } from "../utils/constants";
import { getUser, postUser } from "../services/dynamoDB";
import { signUpUser } from "../services/cognito";
import { validator } from "../services/validator";
import { CognitoIdentityServiceProvider } from "aws-sdk";

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const data = JSON.parse(event.body || "{}");

    if (!validator.validate(data)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Invalid data" }),
      };
    }

    const params = {
      TableName: tableName!,
      Item: {
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        birthDate: data.birthDate,
        phone_number: data.phoneNumber,
      },
    };

    await postUser(params);

    const getParams = {
      TableName: params.TableName,
      Key: {
        id: params.Item.id,
      },
    };

    const userResponse = await getUser(getParams);
    if (userResponse.Item) {
      console.log("Item was inserted:", userResponse.Item);
    } else {
      console.log("Item was not found");
    }

    const signUpParams: CognitoIdentityServiceProvider.SignUpRequest = {
      ClientId: process.env.APP_CLIENT_ID!,
      Username: data.email,
      Password: data.password,
      UserAttributes: [
        { Name: "email", Value: data.email },
        { Name: "given_name", Value: data.firstName },
        { Name: "family_name", Value: data.lastName },
        { Name: "birthdate", Value: data.birthDate },
        {
          Name: "phone_number",
          Value: data.phoneNumber,
        },
      ],
    };

    await signUpUser(signUpParams);

    return {
      statusCode: 201,
      body: JSON.stringify({ id: data.id }),
    };
  } catch (error: any) {
    console.error(error);

    return {
      statusCode: 400,
      body: JSON.stringify({ message: error.message }),
    };
  }
};
