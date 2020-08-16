'use strict';

const AWS = require('aws-sdk'); 
const swapi = require('swapi-node');// Usado para el consumo del SWAPI
const mapeo = require('./mapping/mapping.js');//Mapedo de campos del servicio
const constante = require('./util/constantes');

var transform = require("node-json-transform").transform; // Usado para tranformar modelo de Ingles a Español

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const params = {
  TableName: process.env.DYNAMODB_TABLE,
};

module.exports.list = (event, context, callback) => {

    swapi.getPerson().then((result) => {
        
        var res = trasformarModelo1(result.results);
        const response = {
          statusCode: constante.ESTADO_RESPONSE.RES_200,
          body: JSON.stringify(res),
        };
        callback(null, response);
    }).catch(error => {
      const response = {
          statusCode: constante.ESTADO_RESPONSE.RES_400,
          body: constante.MENSAJE.ERROR_GENERAL,
        };
        callback(null, response);
    });

};

function trasformarModelo1(data){
    var baseMap = mapeo;
    var res = transform(data, baseMap);
    return res;
}