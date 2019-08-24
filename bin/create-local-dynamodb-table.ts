import AWS from 'aws-sdk'
import { CreateTableInput } from 'aws-sdk/clients/dynamodb';

const region = process.env.AWS_DEFAULT_REGION
const endpoint = 'http://localhost:8000/'
const ddb = new AWS.DynamoDB({apiVersion: '2012-08-10', region, endpoint });
const params: CreateTableInput = {
  AttributeDefinitions: [
    { AttributeName: 'groupId', AttributeType: 'S' },
  ],
  KeySchema: [
    { AttributeName: 'groupId', KeyType: 'HASH' },
  ],
  BillingMode: 'PAY_PER_REQUEST',
  TableName: 'AnonymousPetition-Group',
  StreamSpecification: {
    StreamEnabled: false
  },
}

// Call DynamoDB to create the table
ddb.createTable(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Table Created", data);
  }
})

