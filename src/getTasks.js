const AWS = require('aws-sdk');

// console logs usados para debugear
    const getTasks = async (event) => {
            console.log('initializing function')

            const dynamodb = new AWS.DynamoDB.DocumentClient();

            console.log('dynamodb loaded')

            //metodo scan devuelve todos los elementos de la tabla
            const result = await dynamodb.scan({
                TableName: 'TaskTable'
            }).promise()

            console.log('result loaded')

            const tasks = result.Items

            console.log('const tasks loaded')

            return {
                status: 200,
                body: tasks
            }
    }

console.log('ready to export')

module.exports = {
    getTasks
}