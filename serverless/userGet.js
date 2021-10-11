'use strict';

const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();

  let responseBody = '';
  let statusCode = 0;
  let params = {
    TableName: 'users',
    Key: {
      "id": parseInt(event['pathParameters']['id'])
    }
  };

  try {
    const data = await documentClient.get(params).promise();
    responseBody = JSON.stringify(data.Item);
    statusCode = 200;
  } catch(error) {
    responseBody = `Unable to get users: ${error}`;
    statusCode = 403;
  }

  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'access-control-allow-origin': '*'
    },
    body: responseBody
  }
};
