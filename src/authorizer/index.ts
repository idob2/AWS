import { 
    APIGatewayAuthorizerResult, 
    APIGatewayTokenAuthorizerHandler, 
    APIGatewayTokenAuthorizerEvent 
  } from "aws-lambda";
  
  export const handler: APIGatewayTokenAuthorizerHandler = async (event: APIGatewayTokenAuthorizerEvent): Promise<APIGatewayAuthorizerResult> => {
      const token = event.authorizationToken;

      if (token) {
        
          return generatePolicy('user', 'Allow', event.methodArn);
      } else {
          console.log('No token found');
          return generatePolicy('user', 'Deny', event.methodArn);
      }
  };
  
  const generatePolicy = (principalId: string, effect: 'Allow' | 'Deny', resource: string): APIGatewayAuthorizerResult => {
      return {
          principalId: principalId,
          policyDocument: {
              Version: '2012-10-17',
              Statement: [{
                  Action: 'execute-api:Invoke',
                  Effect: effect,
                  Resource: resource
              }]
          }
      };
  };
  