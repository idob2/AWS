export type DynamoDbUpdateParams = {
  TableName: string;
  Key: { [key: string]: any };
  UpdateExpression: string;
  ExpressionAttributeNames: { [key: string]: string };
  ExpressionAttributeValues: { [key: string]: any };
  ReturnValues?: string;
};
export type DynamoDbPutParams = {
  TableName: string;
  Item: {
    id: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    phone_number: string;
  };
};

export type DynamoDbGetParams = {
  TableName: string;
  Key: {
    id: string;
  };
};
