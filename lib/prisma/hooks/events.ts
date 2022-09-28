import { Event } from '@prisma/client'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import axios from 'axios'
import { PassageUser } from '@passageidentity/passage-elements/passage-user'

const fetcher = (url) => {
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
    const events = data?.data?.events as any[];
    const formattedEvents = events.map((event)=>{
        return {
            ...event,
            start_time: new Date(event.start_time),
            end_time: event.end_time ? new Date(event.end_time) : null
        }
    })
    formattedEvents.sort((eventA, eventB) => { return eventA.start_time - eventB.start_time})
    return {
        events: formattedEvents as Event[],
    }
}