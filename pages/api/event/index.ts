// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma/prisma'
import { Event } from '@prisma/client';
import Passage from '@passageidentity/passage-node'

type Data = {
  event: Event
}

const passage = new Passage({
  appID: process.env.PASSAGE_APP_ID,
  apiKey: process.env.PASSAGE_API_KEY,
  authStrategy: 'COOKIE' 
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    // @ts-ignore
    const userID = await passage.authenticateRequest(req)
    if(!userID){
      res.status(401)
      return;
    }
    if (req.method === 'GET') {
        getEvent(req.body.id, userID, res)
        return;
    }
}

async function getEvent(eventID: string, userID: string, res: NextApiResponse<Data>) {
    const event = await prisma.event.findUnique({
        where: {
          id: eventID
        },
    })
    if(event.owner_id !== userID && !event.guest_ids.includes(userID)){
      // unauthorized
      res.status(401)
      return;
    }
    res.status(200).json({ event })
}
