import AWSMock from "aws-sdk-mock"
import AWS from "aws-sdk"

import { getChannelInfo, getChannelInfoByRawIds, IChannelInfo } from './channelInfo'
import { GetItemInput } from "aws-sdk/clients/dynamodb";

const db: IChannelInfo[] = [
  { _id: 1, teamId: 'ABC', channelId: 'CCC', vpIdArr: [], mustReplyCount: 3 },
  { _id: 1, teamId: 'ABC', channelId: 'DDD', vpIdArr: [], mustReplyCount: 3 },
  { _id: 1, teamId: 'AB2', channelId: 'AAA', vpIdArr: [], mustReplyCount: 3 },
  { _id: 1, teamId: 'AB2', channelId: 'BBB', vpIdArr: [], mustReplyCount: 3 },
]

test("getChannelInfo", () => {
  AWSMock.setSDKInstance(AWS);
  AWSMock.mock('DynamoDB', 'getItem', (params: GetItemInput, callback: Function) => {
    const { } = params
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
  expect(ci._id).toBe(1)
})


afterAll(() => {
  AWSMock.restore('DynamoDB')
})
