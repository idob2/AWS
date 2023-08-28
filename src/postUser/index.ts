import { APIGatewayProxyHandler } from "aws-lambda";
import { tableName } from "../utils/constants";
import { getUser, postUser } from "../services/dynamoDB";
import { signUpUser } from "../services/cognito";
import {
  CognitoSignUpParams,
  CognitoUserAttribute,
} from "../types/cognitoTypes";
import { validator } from "../services/validator";

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

    await getUser(getParams);
    const signUpParams: CognitoSignUpParams = {
      ClientId: process.env.APP_CLIENT_ID!,
      Username: data.email,
      Password: data.password,
      UserAttributes: [
        { Name: "email", Value: data.email } as CognitoUserAttribute,
        { Name: "given_name", Value: data.firstName } as CognitoUserAttribute,
        { Name: "family_name", Value: data.lastName } as CognitoUserAttribute,
        { Name: "birthdate", Value: data.birthDate } as CognitoUserAttribute,
        {
          Name: "phone_number",
          Value: data.phoneNumber,
        } as CognitoUserAttribute,
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
