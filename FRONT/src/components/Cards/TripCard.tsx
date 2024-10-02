import { NavLink } from 'react-router-dom'
import './TripCard.css'

export function TripCard(props: any) {
    const { tripInfo } = props

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-gb', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
    };

    const start_date = formatDate(tripInfo.start_date)
    const end_date = formatDate(tripInfo.end_date)

    return (
        <NavLink to={`/mytrips/${tripInfo.id}`}>
            <article>
                <img src={tripInfo.img} alt="test" />
                <h4>{tripInfo.title}</h4>
                <p>{start_date} - {end_date}</p>
            </article>
        </NavLink>


    )
}