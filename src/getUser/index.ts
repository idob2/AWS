import { APIGatewayProxyHandler } from "aws-lambda";
import { tableName } from "../utils/constants";
import { getUser } from "../services/dynamoDB";

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const userId = event.pathParameters?.id;

    const params = {
      TableName: tableName,
      Key: {
        id: userId,
      },
    };

    const result = await getUser(params);
    if (result.Item) {
      return {
        statusCode: 200,
        body: JSON.stringify(result.Item),
      };
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "User not found" }),
      };
    }
  } catch (error: any) {
    console.error(error);

    return {
      statusCode: 400,
      body: JSON.stringify({ message: error.message }),
    };
  }
};
