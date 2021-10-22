// Adapted from https://aws.amazon.com/blogs/compute/building-an-aws-iot-core-device-using-aws-serverless-and-an-esp32/

const AWS = require('aws-sdk');
const iot = new AWS.Iot();
const thingName = 'thermostat_controller_esp32';

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Authorization, Content-Type",
}

exports.handler = (event, _, callback) => {

  if (event.httpMethod === 'GET') {
    getShadow(thingName, (err, res) => {
      callback(null, {
        statusCode: err ? '400' : '200', 
        body: err ? err.message : JSON.stringify(JSON.parse(res.payload)),
        headers
      });
    });
  } else if (event.httpMethod === 'POST') {
    updateShadow(thingName, event.body, (err, res) => {
      callback(null, {
        statusCode: err ? '400' : '200',
        body: JSON.stringify({
          message: err ? err.message : `Published update shadow to ${thingName}`,
        }),
        headers
      });
    });
  }
};

const getShadow = (thingName, callback) => {
  iot.describeEndpoint({}, (err, data) => {
    if (err) callback(err);
    const iotData = new AWS.IotData({endpoint: data.endpointAddress});
    iotData.getThingShadow({thingName}, (err, data) => {
      if (err) callback(err);
      callback(null, data);
    });
  });
};

const updateShadow = (thingName, payload, callback) => {
  iot.describeEndpoint({}, (err, data) => {
    if (err) callback(err);
    const iotData = new AWS.IotData({endpoint: data.endpointAddress});
    iotData.updateThingShadow({thingName, payload}, (err, data) => {
      if (err) callback({err: {message: 'error'}});
      callback(null, data);
    });
  });
};
