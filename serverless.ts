import { functions } from "./src/serverless-config/functions";
import { AWS } from "@serverless/typescript";
// import {
//   cognitoCreateUserRoles,
//   cognitoListUserPoolPolicies,
// } from "./aws-config/roles";
import { resources } from "./src/serverless-config/resources";
import { mainRegion, tableName } from "./src/utils/constants";

const serverlessConfiguration = {
  service: "lambda", 
  frameworkVersion: "3",

  plugins: ["serverless-offline", "serverless-webpack"],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    region: mainRegion,
    stage: "DEV",
    profile: "default", 
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      APP_CLIENT_ID: "2cubv7u37i79t60193g5jg6kbv",
      DB_TABLE_NAME: tableName,
      USER_POOL_ID: "eu-west-1_uIwDSrVhT",
      LOGGER_ENABLE: "true",
      AUTH_FLOW_TYPE: "USER_PASSWORD_AUTH",
    },
    iam: {
      role: {
        statements: [
          // {
          //   Effect: 'Allow',
          //   Action: ['cognito-idp:InitiateAuth'],
          //   Resource: `arn:aws:cognito-idp:${secondaryRegion}:${process.env.ACCOUNT_ID}:userpool/${process.env.APP_CLIENT_ID}`
          // },
          {
            Effect: 'Allow',
            Action: ['dynamodb:PutItem'],
            Resource: `arn:aws:dynamodb:${mainRegion}:${process.env.ACCOUNT_ID}:table/${tableName}`
          }
          // ... other permissions ...
        ],
      },
    },
    
    // iam: {
    //   role: {
    //     statements: [cognitoListUserPoolPolicies, cognitoCreateUserRoles],
    //   },
    // },
  },
  functions,
  // resources,
};

module.exports = serverlessConfiguration;


