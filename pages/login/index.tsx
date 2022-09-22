import { authResult, PassageElement } from '@passageidentity/passage-elements'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Container } from '@mui/material';

const Login: NextPage<{appID: string}> = (props)=>{
    const router = useRouter()
    const onSuccess = (authResult: authResult) => {
        const redirectURL = localStorage.getItem('redirectURL') ?? authResult.redirect_url
        router.push(redirectURL)
    }
    const passageAuth = useRef<PassageElement>()

    useEffect(()=>{
        require('@passageidentity/passage-elements/passage-auth');
        if(passageAuth.current){
            passageAuth.current.onSuccess = onSuccess
        }
    }, [])

    return (
        <Container maxWidth="xs" sx={{padding: '25px'}}>
            <Card sx={{ minWidth: 400}}>
                <CardContent>
                    <passage-auth app-id={props.appID} ref={passageAuth}/>
                </CardContent>
            </Card>
        </Container>
    )
}

export async function getStaticProps(){
    return {
      props: {
        appID: process.env.PASSAGE_APP_ID
      }
    };
  }

export default Login
