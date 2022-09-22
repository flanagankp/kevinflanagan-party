import type { NextPage } from 'next'
import EventCard from '../lib/prisma/components/EventCard'
import { useOwnedEvents } from '../lib/prisma/hooks/events'

const Home: NextPage = () => {
  const {events} = useOwnedEvents()

  if(!events){
    return <div>Loading...</div>
  }

  const eventItems = events.map( event => {
    return <EventCard event={event} key={event.id}/>
  })

  return (
    <div>
      <h1>My Events</h1>
      {eventItems}
    </div>
)
}

export default Home
