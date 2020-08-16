'use strict';

//const uuid = require('uuid');
const AWS = require('aws-sdk'); 
const constante = require('./util/constantes');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = (event, context, callback) => {
  const timestamp = new Date().getTime();
  //const data = JSON.parse(event.body);
  const data = JSON.parse(event.body);
  if (typeof data.nombres !== 'string') {
    console.error('Validation Failed');
    callback(null, {
      statusCode: constante.ESTADO_RESPONSE.RES_400,
      headers: { 'Content-Type': 'text/plain' },
      body: constante.MENSAJE.ERROR_GENERAL,
    });
    return;
  }

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      //id: uuid.v1(),
      id: data.id,
      nombres: data.nombres,
      apellidos: data.apellidos,
      dni: data.dni,
      direccion: data.direccion,  
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