// importar uuid para generar ids unicas
const { v4 } = require('uuid');
// importar AWS
const AWS = require('aws-sdk');

// funcion principal
const addTask = async(event) => {
    // asignar dynamodb
    const dynamoDB = new AWS.DynamoDB.DocumentClient();

    // generar atributos de la tabla
    const { title, description } = JSON.parse(event.body);
    const createdAt = new Date()
    const id = v4()

    // crear la tabla con atributos
    const newTask = {
        id,
        title,
        description,
        createdAt,
        done : false,
        updateCount : 0
    }

    // enviar datos
    await dynamoDB.put({
        TableName: 'TaskTable',
        Item: newTask
    }).promise()

    //  EXTRA condicion 
    if (!('title' in JSON.parse(event.body)) || !('description' in JSON.parse(event.body))){
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: "Faltan datos en la solicitud",
            }),
        };
    }


    // convertir a json newtask
    return {
        status: 200,
        body: JSON.stringify(newTask)
    }
}

// fin 
module.exports = {
    addTask,
}