import { tableName } from "../utils/constants";

export const resources = {
  Resources: {
    UserTable: {
      Type: "AWS::DynamoDB::Table",
      Properties: {
        TableName: tableName,
        AttributeDefinitions: [{ AttributeName: "id", AttributeType: "S" }],
        KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
        ProvisionedThroughput: {
          ReadCapacityUnits: 1,
          WriteCapacityUnits: 1,
        },
      },
    },
  },
};
