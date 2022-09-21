// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma/prisma'
import { Event } from '@prisma/client';
import Passage from '@passageidentity/passage-node'

type Data = {
    events: Event[]
}

type Error = {
    error: string
}

const passage = new Passage({
  appID: process.env.PASSAGE_APP_ID,
  apiKey: process.env.PASSAGE_API_KEY,
  authStrategy: 'COOKIE' 
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) {
    // @ts-ignore
    const userID = await passage.authenticateRequest(req)
    if(!userID){
      res.status(401).send({error: 'Unauthorized'})
      return;
    }
    if (req.method === 'GET') {
        getEvents(userID, res)
        return;
    }
}

async function getEvents(userID: string, res: NextApiResponse<Data>) {
    const events = await prisma.event.findMany({
        where: {
          owner_id: userID
        }
    })
    res.status(200).send({ events })
}
