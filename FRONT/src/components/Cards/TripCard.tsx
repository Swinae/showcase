import { NavLink } from 'react-router-dom'
import './TripCard.css'

export function TripCard(props: any) {
    const {tripInfo} = props
    
    return (
        <NavLink to={`/mytrips/${tripInfo.id}`}> 
            <article>
                <img src={tripInfo.img} alt="test" />
                <h4>{tripInfo.title}</h4>
                <p>{tripInfo.start_date} - {tripInfo.end_date}</p>
            </article>
        </NavLink>


    )
}