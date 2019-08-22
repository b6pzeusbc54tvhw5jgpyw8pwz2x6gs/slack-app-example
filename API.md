# Slack interface

## pp msg

```
const channelInfoId = getChannelInfoByRawIds(teamId, channelId)
const petition = createPetition(body.text, channelInfoId)
chat.postMessage({ })
```

## click like

```
const petition = getPetition(body.id)

const updatedPetition = // TODO add into or remove from `userLikeArr`

const renewPetition = updatePetition(updatedPetition)
chat.postMessage({ })
```

## update channelInfo









# API


## create petition
type createPetition = (content: string, channelInfoId: number) => Petition


## get petition
type getPetition = (id: number) => Petition

## update petition
type updatePetition = (petition: Petition) => Petition



## delete petition
type (petitionId: number) => boolean


## get channelInfo
type getChannelInfoByRawIds = (teamId: string, channelId: string) => ChannelInfo
type getChannelInfo = (channelInfoId: number) => ChannelInfo

## update channelInfo


## delete channelInfo



# DB Scheme

```
interface ChannelInfo {
  _id: number
  teamId: string
  channelId: string
  vpIdArr: string[]
  mustReplyCount: number
  // petitionLimitPerTimeRange: number // pertitionLimit 까지 글 작성 가능
  // resetTimeArr: number[]            // 3,6,9 하루 3시, 6시, 9시에 count reset. 다시 limit  까지 작성 가능
}

interface Petition {
  _id: number
  content: string
  userLikeArr: string[]
  userDislikeArr: string[]
  channelInfoId: number
  messageTs: date or string
  deleteYN: 'Y' | 'N'
}
```

