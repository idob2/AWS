import { moveoLambdaRole } from "../utils/constants";

export const functions = {
  userAuthorizer:{
    handler:"src/validateUser/index.handler",
    role: moveoLambdaRole,
    name: "skills-Ido-authUser",
  },
};
