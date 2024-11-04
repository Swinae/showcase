import { useEffect, useState } from "react"
import { getUserTrips } from "../../services/api/Trips"
import { TripCard } from "../../components/Cards/TripCard";
import { css } from '@emotion/react';

export function MytripsPage() {
    const [trips, setTrips] = useState([])

    useEffect(() => {
        async function loadTrips() {
            try {
                const tripList = await getUserTrips()
                setTrips(tripList)
            } catch (error) {
                console.error(error)
            }
        }

        loadTrips()
    }, []);



    return (
        <>
            <h1>My trips</h1>
            
            <section>
                <ul 
                    css={css`
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: center;
                        gap: 1rem;
                    `}>
                    {trips.map((trip: any, index: number) => (
                        <li key={index}>
                            <TripCard tripInfo={trip} />
                        </li>
                    ))}
                </ul>
            </section>
        </>
    )
}