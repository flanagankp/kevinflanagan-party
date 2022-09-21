import { Event } from '@prisma/client'
import useSWR from 'swr'
import axios from 'axios'
import { useRouter } from 'next/router'

const fetcher = (url) => {
    const { PassageUser } = require('@passageidentity/passage-elements/passage-user')
    const user = new PassageUser()
    return user.getAuthToken().then((authToken) =>
        axios.get(url, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        }),
    )
}

export function useOwnedEvents(): { events: Event[] } {
    const router = useRouter()
    const { data, error } = useSWR('api/event/owned', fetcher)
    if(error){
        localStorage.setItem('redirectURL', router.pathname)
        router.push('/login')
    }
    return {
        events: data?.data as Event[],
    }
}