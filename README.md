# AWS Infrastructure for Thermostat Controller

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
