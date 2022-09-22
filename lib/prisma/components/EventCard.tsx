import { Event } from '@prisma/client'
import type { NextPage } from 'next'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import styles from '../../../styles/EventCard.module.scss'

interface Props {
  event: Event
}

const EventCard: NextPage<Props> = (props) => {
    const { event } = props

    return (
        <Card sx={{ minWidth: 275, height: '100%' }} className={styles.eventCard} >
            <CardContent>
                <Typography variant="h5" component="div">{event.name}</Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">{event.start_time.toDateString()}</Typography>
                <Typography variant="body2">{event.description}</Typography>
            </CardContent>
        </Card>
    )
}

export default EventCard
