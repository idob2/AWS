import { APIGatewayProxyHandler } from "aws-lambda";
import { tableName } from "../utils/constants";
import { updateUser } from "../services/dynamoDB";

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    console.log(event);

    const body = JSON.parse(event.body || "{}");
    const params = {
      TableName: tableName,
      Key: {
        id: body.id,
      },
      UpdateExpression:
        "set #firstName=:firstName, #lastName=:lastName, #email=:email, #password=:password",
      ExpressionAttributeNames: {
        "#firstName": "firstName",
        "#lastName": "lastName",
        "#email": "email",
        "#password": "password",
      },
      ExpressionAttributeValues: {
        ":firstName": body.firstName,
        ":lastName": body.lastName,
        ":email": body.email,
        ":password": body.password,
      },
      ReturnValues: "UPDATED_NEW",
    };

    await updateUser(params);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "User data updated" }),
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};
