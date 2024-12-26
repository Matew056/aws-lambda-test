const AWS = require('aws-sdk');

    const getTasks = async (event) => {
            console.log('initializing function')

            const dynamodb = new AWS.DynamoDB.DocumentClient();

            console.log('dynamodb loaded')

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

console.log('about to export')

module.exports = {
    getTasks
}