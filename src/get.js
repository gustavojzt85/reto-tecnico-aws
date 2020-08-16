'use strict';

const AWS = require('aws-sdk');
const constante = require('./util/constantes');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.get = (event, context, callback) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
  };

  
  dynamoDb.get(params, (error, result) => {
  
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || constante.ESTADO_RESPONSE.RES_501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t fetch the todo item.',
      });
      return;
    }

  
    const response = {
      statusCode: constante.ESTADO_RESPONSE.RES_200,
      body: JSON.stringify(result.Item),
    };
    callback(null, response);
  });
};