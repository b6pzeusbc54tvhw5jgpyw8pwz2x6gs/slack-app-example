import AWSMock from "aws-sdk-mock"
import AWS from "aws-sdk"
import { find } from 'lodash'
import to from 'await-to-js'

import { getChannelInfo, getChannelInfoByRawIds, IChannelInfo } from './group'
import { GetItemInput, PutItemOutput, PutItemInput } from "aws-sdk/clients/dynamodb";
import { isArray } from "lodash";

const region = process.env.AWS_DEFAULT_REGION


interface IDB {
  Channel: IChannelInfo[]
}

const db: IDB = {
  Channel: [
    { teamId: 'ABC', channelId: 'CCC', vpIdArr: [], mustReplyCount: 3 },
    { teamId: 'ABC', channelId: 'DDD', vpIdArr: [], mustReplyCount: 3 },
    { teamId: 'AB2', channelId: 'AAA', vpIdArr: [], mustReplyCount: 3 },
    { teamId: 'AB2', channelId: 'BBB', vpIdArr: [], mustReplyCount: 3 },
  ]
}
test("getChannelInfo", () => {
  AWSMock.setSDKInstance(AWS);
  AWSMock.mock('DynamoDB', 'getItem', (params: GetItemInput, callback: Function) => {
    const { Key } = params
    const { _id } = Key

    const channelInfo = find(db, { _id: _id.S })
    console.log('DynamoDB', 'getItem', 'mock called')
    callback(null, {pk: "foo", sk: "bar"})
  })

  let input:GetItemInput = { TableName: '', Key: {} }
  const ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'})
  const rewired = require('./channelInfo')
  rewired.__set__('ddb',ddb)

  // expect(await dynamodb.getItem(input).promise()).toStrictEqual({ pk: 'foo', sk: 'bar' })
  expect(rewired.getChannelInfo()).toStrictEqual({ pk: 'foo', sk: 'bar' })
  const ci = getChannelInfo(1)
})


test("createGroupBySlackChannel", async () => {
  const TableName = 'Channel'
  const Item = { teamId: 'a', channelId: 'b', vpIdArr: [], mustReplyCount: 3 }
  const dd = new AWS.DynamoDB.DocumentClient({ region })
  const params = { TableName, Item }
  const [err, result] = await to(dd.put(params).promise())
  if (err || !result) throw new Error('err params')

  expect(result)
})

beforeAll(()=> {
  AWSMock.setSDKInstance(AWS);
  AWSMock.mock('DynamoDB.DocumentClient', 'put', (params: PutItemInput, callback: Function) => {
    const { TableName, Item } = params
    if (TableName !== 'Channel') return callback(null, null)
    if (!isChannel(Item)) return callback(null, null)

    const { Channel } = db
    Channel.push(Item)

    const { teamId, channelId } = Item
    const channel = find(Channel, { teamId, channelId })
    callback(null, channel)
  })
})
afterAll(() => {
  AWSMock.restore('DynamoDB')
})
