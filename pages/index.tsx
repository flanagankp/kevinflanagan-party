import type { NextPage } from 'next'
import { useOwnedEvents } from '../lib/prisma/hooks/events'

interface Props {
  appID: string
}

const Home: NextPage<Props> = (props) => {
  const {events} = useOwnedEvents()

  return (
    <div>
        {JSON.stringify(events)}
    </div>
)
}

export async function getStaticProps(){
  return {
    props: {
      appID: process.env.PASSAGE_APP_ID
    }
  };
}

export default Home
