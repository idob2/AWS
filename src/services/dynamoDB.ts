import { DynamoDB } from "aws-sdk";
import { mainRegion } from "../utils/constants";
import {
  DynamoDbPutParams,
  DynamoDbUpdateParams,
  DynamoDbGetParams,
} from "../types/dynamoDBTypes";

export const dynamoDb = new DynamoDB.DocumentClient({
  region: mainRegion,
});
export const postUser = async (params: DynamoDbPutParams) => {
  const result = await dynamoDb.put(params).promise();
  console.log("Post successful:", result);
};

export const updateUser = async (params: DynamoDbUpdateParams) => {
  const result = await dynamoDb.update(params).promise();
};

export const getUser = async (params: DynamoDbGetParams) => {
  const response = await dynamoDb.get(params).promise();
  if (response.Item) {
    console.log("Item was inserted:", response.Item);
  } else {
    console.log("Item was not found");
  }
};
