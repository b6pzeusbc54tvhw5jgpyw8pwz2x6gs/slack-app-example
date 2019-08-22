import AWS, { DynamoDB } from 'aws-sdk'
import { GetItemInput } from 'aws-sdk/clients/dynamodb';

const ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'})

export interface IChannelInfo {
  _id: number
  teamId: string
  channelId: string
  vpIdArr: string[]
  mustReplyCount: number
  // petitionLimitPerTimeRange: number // pertitionLimit 까지 글 작성 가능
  // resetTimeArr: number[]            // 3,6,9 하루 3시, 6시, 9시에 count reset. 다시 limit  까지 작성 가능
}
export const getChannelInfoByRawIds = async (teamId: string, channelId: string): IChannelInfo => {

  let input: GetItemInput = { TableName: '', Key: {teamId, channelId}, ConsistentRead: true }
  const ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'})

  return {}
}
export const getChannelInfo = (channelInfoId: number): IChannelInfo => {
  return {}
}
