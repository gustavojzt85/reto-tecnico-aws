'use strict';

//const uuid = require('uuid');
const AWS = require('aws-sdk'); 
const constante = require('./util/constantes');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = (event, context, callback) => {
  const timestamp = new Date().getTime();
  //const data = JSON.parse(event.body);
  const data = event;
  console.log('##########################################################################');
  console.log(event);
  console.log(data);
  console.log('##########################################################################');
  debugger;

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      //id: uuid.v1(),
      id: data.id,
      nombre: data.text,
      estado: 'activo',
      fechacreacion: timestamp,
      fechaactualizacion: timestamp,
    },
  };

  dynamoDb.put(params, (error) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: error+' Ocurrio un error',
      });
      return;
    }

    // create a response de registro de datos
    const response = {
      statusCode: 200,
      body: JSON.stringify(params.Item),
    };
    callback(null, response);
  });
};