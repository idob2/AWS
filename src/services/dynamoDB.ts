import { DynamoDB } from "aws-sdk";
import { mainRegion } from "../utils/constants";

export const dynamoDb = new DynamoDB.DocumentClient({
  region: mainRegion,
});

export const postUser = async (
  params: DynamoDB.DocumentClient.PutItemInput
) => {
  return await dynamoDb.put(params).promise();
};

export const updateUser = async (
  params: DynamoDB.DocumentClient.UpdateItemInput
) => {
  return await dynamoDb.update(params).promise();
};

export const getUser = async (params: DynamoDB.DocumentClient.GetItemInput) => {
  return await dynamoDb.get(params).promise();
};
