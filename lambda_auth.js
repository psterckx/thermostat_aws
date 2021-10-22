// Adapted from https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-use-lambda-authorizer.html

exports.handler = function(event, _, callback) {        

  const headers = event.headers;
  const token = process.env.TOKEN;
   
  if (headers.authorization === token) {
    callback(null, generateAllow('Thermostat_Lambda_Authorizer', event.methodArn));
    } else {
    callback(null, generateDeny('Thermostat_Lambda_Authorizer', event.methodArn));
  }
};
   
const generatePolicy = function(principalId, effect, resource) {
  const authResponse = {
    principalId
  };
  if (effect && resource) {
      const policyDocument = {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: effect,
            Resource: resource
          }
        ]
      }
      authResponse.policyDocument = policyDocument;
  }
  return authResponse;
};
   
const generateAllow = (principalId, resource) => {
  return generatePolicy(principalId, 'Allow', resource);
};
   
const generateDeny = (principalId, resource) => {
  return generatePolicy(principalId, 'Deny', resource);
};