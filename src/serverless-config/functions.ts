import { moveoLambdaRole } from "../utils/constants";

export const functions = {
  createUser: {
    handler: "src/postUser/index.handler",
    role: moveoLambdaRole,
    name: "skills-Ido-createUser",
    events: [
      {
        http: {
          path: "user",
          method: "post",
        },
      },
    ],
  },
  loginUser: {
    handler: "src/loginUser/index.handler",
    role: moveoLambdaRole,
    name: "skills-Ido-loginUser",
    events: [
      {
        http: {
          path: "user/login",
          method: "post",
        },
      },
    ],
  },
  confirmUser: {
    handler: "src/confirmUser/index.handler",
    role: moveoLambdaRole,
    name: "skills-Ido-confirmUser",
    events: [
      {
        http: {
          path: "user/confirm",
          method: "post",
        },
      },
    ],
  },
  updateUser: {
    handler: "src/updateUser/index.handler",
    role: moveoLambdaRole,
    name: "skills-Ido-updateUser",
    events: [
      {
        http: {
          path: "user",
          method: "put",
          authorizer: {
            type: "TOKEN",
            name: "authorizer", 
            arn: {
                "Fn::GetAtt": ["AuthorizerLambdaFunction", "Arn"]
              },
            identitySource: "method.request.header.Authorization",
            resultTtlInSeconds: 3600
          }
        },
      },
    ],
  },
  getUser: {
    handler: "src/getUser/index.handler",
    role: moveoLambdaRole,
    name: "skills-Ido-getUser",
    events: [
      {
        http: {
          path: "user/{id}",
          method: "get",
          authorizer: {
            type: "TOKEN",
            name: "authorizer", 
            arn: {
                "Fn::GetAtt": ["AuthorizerLambdaFunction", "Arn"]
              },
            identitySource: "method.request.header.Authorization",
            resultTtlInSeconds: 3600
          }
        },
      },
    ],
  },
  authorizer:{
    handler:"src/authorizer/index.handler",
    role: moveoLambdaRole,
    name: "skills-Ido-auth",
  },
};
