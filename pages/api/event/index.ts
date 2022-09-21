// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma/prisma'
import Passage from '@passageidentity/passage-node'

type Data = {
  events: Event[]
}

interface Event {
    id: String,
    name: String,
    start_time: Date,
    end_time?: Date,
    description: String,
    owner_id: String,
    guest_ids: String[],
    attending_ids: String[],
    declined_ids: String[],
    maybe_ids: String[],
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
    if (req.method === 'GET') {
        getEvents(res)
        return;
    }
  //res.status(200).json({ name: 'John Doe' })
}

async function getEvents(res: NextApiResponse<Data>) {
    const events = await prisma.event.findMany({
        where: {

        }
    })
}
