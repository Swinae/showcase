import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getTripInfo } from "../../services/api/Trips"
import { Trip } from "../../services/interfaces/Trip"
import { DatePicker } from "../../components/DateSelector/DatePicker"

export function TripDetailsPage() {

    const {tripId} = useParams()
    const [tripInfo, setTripInfo] = useState<Trip>()

    useEffect(() => {
        const loadTrips = async () => {
            try {
                const trip = await getTripInfo(Number(tripId))
                setTripInfo(trip)
            } catch (error) {
                console.error(error);
            }
        }

        loadTrips()
    }, [tripId])

    return (
        <>
            <h1>{tripInfo?.title}</h1>
            <DatePicker dates = {{start_date: tripInfo?.start_date, end_date: tripInfo?.end_date}}/>
            <p>{tripInfo?.location}</p>
        </>
    )
}