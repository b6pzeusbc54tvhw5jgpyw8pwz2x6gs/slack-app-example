import { IGroup } from "./group";

const region = process.env.AWS_DEFAULT_REGION

export type TypeDB = {
  [key in string]?: any[]
}

const db: TypeDB = {
  'AnonymousPetition-Group': [
    { groupId: 'ABC', vpIdArr: [], mustReplyCount: 3 },
    { groupId: 'ABC', vpIdArr: [], mustReplyCount: 3 },
    { groupId: 'AB2', vpIdArr: [], mustReplyCount: 3 },
    { groupId: 'AB2', vpIdArr: [], mustReplyCount: 3 },
  ]
}

export default db
