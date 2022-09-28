import { Container } from '@mui/material'
import type { NextPage } from 'next'
import EventCard from '../components/EventCard'
import { useOwnedEvents } from '../lib/hooks/events'
import Grid from '@mui/material/Grid';


const Home: NextPage = () => {
  const {events} = useOwnedEvents()

  if(!events){
    return <div>Loading...</div>
  }

  const eventItems = events.map( event => {
    return (<Grid item xs={4} key={event.id}><EventCard event={event}/></Grid>)
  })

  return (
    <Container maxWidth="md">
      <h1>My Events</h1>
      <Grid container spacing={2}>
        {eventItems}
      </Grid>
    </Container>
)
}

export default Home
