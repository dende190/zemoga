'use strict';

const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();

  let responseBody = '';
  let statusCode = 0;

  const id  = event['pathParameters']['id'];
  const { experience_summary } = JSON.parse(event.body);

  try {
    const dataUpdate = await (
      documentClient
      .update({
        TableName: 'users',
        Key: {
          id: parseInt(id),
        },
        UpdateExpression: 'SET experience_summary = :value',
        ExpressionAttributeValues: {
          ':value': experience_summary
        },
        ReturnValues: 'UPDATED_NEW'
      })
      .promise()
    );
    responseBody = JSON.stringify(dataUpdate);
    statusCode = 204;
  } catch(error) {
    responseBody = `Unable to update users: ${error}`;
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
