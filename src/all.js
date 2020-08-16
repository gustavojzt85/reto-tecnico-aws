'use strict';

const AWS = require('aws-sdk'); 
const constante = require('./util/constantes');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const params = {
  TableName: process.env.DYNAMODB_TABLE,
};

module.exports.obtenertodos = (event, context, callback) => {
  
  dynamoDb.scan(params, (error, result) => {
    
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || constante.ESTADO_RESPONSE.RES_501,
        headers: { 'Content-Type': 'text/plain' },
        body: constante.ESTADO_ERROR.TIPO_MENSAJE,
      });
      return;
    }

    
    const response = {
      statusCode: constante.ESTADO_RESPONSE.RES_200,
      body: JSON.stringify(result.Items),
    };
    callback(null, response);
  });
};