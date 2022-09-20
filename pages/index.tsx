import type { NextPage } from 'next'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

interface Props {
  appID: string
}

const Home: NextPage<Props> = (props) => {
  const router = useRouter()

  useEffect(()=>{
    require('@passageidentity/passage-elements/passage-profile');
    const { PassageUser } = require('@passageidentity/passage-elements/passage-user')
    new PassageUser().getAuthToken().catch(()=>{
      localStorage.setItem('redirectURL', router.pathname)
      router.push('/login')
    })
  }, [])

  return (
    <div>
        <passage-profile app-id={props.appID}/>
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
