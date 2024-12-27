const AWS = require('aws-sdk')

const updateTask = async (event) => {
    
    const dynamodb = new AWS.DynamoDB.DocumentClient();

    const {id} = event.pathParameters;

    const { done, title, description } = JSON.parse(event.body)

    const data = JSON.parse(event.body);
    // reemplazar esto por un array de atributos

    if (!('done' in data) || 
    !('title' in data) || 
    !('description' in data)){
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: "Faltan datos en la solicitud",
            }),
        };
    }

    const updatedTask = await dynamodb.update({
        TableName: 'TaskTable',
        Key: {id},
        UpdateExpression: 'set done = :done, title = :title, description = :description, updateCount = updateCount + :number',
        ExpressionAttributeValues: {
            ':done': done,
            ':title': title,
            ':description': description,
            ':number': 1
        },
        ReturnValues: 'ALL_NEW'
    }).promise()

    return {
        status: 200,
        body: JSON.stringify({
            message: 'Tarea actualizada',
            updatedTask: updatedTask.Attributes
        })
    }
}

module.exports  = {
    updateTask
};