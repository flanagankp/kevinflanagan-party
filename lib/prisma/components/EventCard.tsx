import { Event } from '@prisma/client'
import type { NextPage } from 'next'

interface Props {
  event: Event
}

const EventCard: NextPage<Props> = (props) => {
    const { event } = props
    console.log(event)

  return (
    <div>
        <h3>{event.name}</h3>
        <div>{event.start_time.toDateString()}</div>
        <div>{event.description}</div>
    </div>
)
}

export default EventCard
