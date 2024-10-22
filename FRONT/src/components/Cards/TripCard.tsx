import { NavLink } from 'react-router-dom'

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
            <article
                css={{
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: 'var(--second-bg-color)',
                    padding: '1rem',
                    borderRadius: 16,
                    gap: '0.5rem',
                    color: 'var(--second-font-color)',
                    maxWidth: 400,
                    
                    '& img': {
                        borderRadius: 14,
                    },

                    '& p': {
                        color: '#cecccc',
                        fontSize: 12,
                        fontWeight: 'lighter',
                    }
            }}>
                <img src={tripInfo.img} alt="test" />
                <h4>{tripInfo.title}</h4>
                <p>{start_date} - {end_date}</p>
            </article>
        </NavLink>


    )
}