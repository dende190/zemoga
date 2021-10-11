'use strict';

const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();

  let responseBody = '';
  let statusCode = 0;

  try {
    const data = await (
      documentClient
      .scan({
        TableName: 'users'
      })
      .promise()
    );
    responseBody = JSON.stringify(data.Items);
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
