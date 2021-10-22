# Thermostat Controller - AWS Lambdas

AWS Lambda for my [Thermostat Controller Project](https://gist.github.com/psterckx/7c476532f7399b15b974ee3dff919d3f).

## Lambda Authorizer

Authorizes a request based on the provided token in the 'authorization' header.

## Lambda IoT

Proxy between the client and AWS IoT Core. There is one endpoint with two methods:

- thermostat/state
  - GET - get the thermostat shadow document
  - POST - update the thermostat shadow document

## Other AWS services used
- AWS IoT Core
- API Gatway
