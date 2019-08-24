import AWS from 'aws-sdk'
import { isArray } from 'lodash';
import to from 'await-to-js';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

import { getBEHRError } from '../util';

const region = process.env.AWS_DEFAULT_REGION
const TableName = 'AnonymousPetition-Group'


// const ddc = new AWS.DynamoDB.DocumentClient({ region })
const endpoint = 'http://localhost:8000/'
const ddc = new AWS.DynamoDB.DocumentClient({ region, endpoint })

export interface IChannelInfo {
  teamId: string
  channelId: string
  vpIdArr: string[]
  mustReplyCount: number
  // petitionLimitPerTimeRange: number // pertitionLimit 까지 글 작성 가능
  // resetTimeArr: number[]            // 3,6,9 하루 3시, 6시, 9시에 count reset. 다시 limit  까지 작성 가능
}

export interface IGroup {
  groupId: string
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

export const isGroup = (item: any): item is IChannelInfo => {
  if (!item || typeof item !== 'object') return false
  
  const { groupId, vpIdArr, mustReplyCount } = item
  if (!groupId || typeof groupId !== 'string') return false
  if (!isArray(vpIdArr)) return false
  if (typeof mustReplyCount !== 'number') return false

  return true
}

export const getGroup = async (groupId: string) => {
  const params: DocumentClient.GetItemInput = {
    TableName,
    Key: { groupId },
  }
  const [err, result] = await to(ddc.get(params).promise())
  if (err || !result) throw getBEHRError(err, 'dd.get')

  console.log(result)
  const group = result.Item
  if (!isGroup(group)) throw new Error('can not get group by: ' + groupId)

  return result
}

export const createGroupBySlackChannel = async (teamId: string, channelId: string) => {
  const groupId = `${teamId}:${channelId}`
  const params: DocumentClient.PutItemInput = {
    TableName: 'AnonymousPetition-Group',
    Item: { groupId, vpIdArr: [], mustReplyCount: 4 },
  }
  const [err, result] = await to(ddc.put(params).promise())
  if (err || !result) throw getBEHRError(err, 'ddc.put')

  return groupId
}
