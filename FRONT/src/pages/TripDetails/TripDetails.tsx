import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getTripInfo } from "../../services/api/Trips"
import { Trip } from "../../services/interfaces/Trip"
import { DatePicker } from "../../components/DatePicker/DatePicker"
import { css } from "@emotion/react"

interface TripDates {
    selection: {
        startDate: Date,
        endDate: Date,
        key: string
    }
}

export function TripDetailsPage() {

    const { tripId } = useParams()
    const [tripInfo, setTripInfo] = useState<Trip>()
    const [tripDates, setTripDates] = useState<TripDates>()

    /* LOAD TRIP INFO */
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


    /* DATE RANGE */
    const handleTripDates = (dates: TripDates): void => {
        setTripDates(dates)
    }

    const [newStartDate, setNewStartDate] = useState<string | undefined>('')
    const [newEndDate, setNewEndDate] = useState<string | undefined>('')

    useEffect(() => {
        setNewStartDate(tripDates?.selection.startDate.toLocaleDateString())
        setNewEndDate(tripDates?.selection.endDate.toLocaleDateString())
    }, [tripDates])

    /* HANDLE CALANDAR VISIBILITY */
    const [showCalandar, setShowCalandar] = useState(false)
    const toggleCalandarVisibility = () => {
        setShowCalandar(!showCalandar)
    }

    /*---STYLE--- */
    const calandarDisplay = css`
        text-align: center;

        .displayNone {
            display: none;
        }

        .displayBlock {
            display: block;

        }
    `

    const dateDisplayStyle = css`
        .date-display-wrapper {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1rem;
            width: 100%;
            color: #1d1d1d;
            border: none;
            border-radius: 4rem;
            box-shadow: 0px 0px 6px 5px rgba(0,0,0,0.10);
            padding: 1rem 0;
            font-size: 20px;
        }

        & input {
            font-size: inherit;
            border: none;
            outline: none;
            cursor: pointer;
            width: 100px;
            color: #1d1d1d; //TO CHECK: COLOR IS NOT TAKEN INTO ACCOUNT FOR SOME REASON
            text-align: center;
        }
    `

    return (
        <>
            <div css={dateDisplayStyle}>
                <h1>{tripInfo?.title}</h1>
                <div className="date-display-wrapper">
                    <i className="fa-solid fa-calendar-days"></i>
                    <input readOnly type="text" placeholder={tripDates ? `${newStartDate}` : 'Start'} onClick={toggleCalandarVisibility} alt="Select the starting date of your trip" />
                    <i className="fa-solid fa-arrow-right"></i>
                    <input readOnly type="text" placeholder={tripDates ? `${newEndDate}` : 'End'} onClick={toggleCalandarVisibility} alt="Select the ending date of your trip" />
                </div>

                <div css={calandarDisplay}>
                    <div className={showCalandar ? "displayBlock" : "displayNone"}>
                        <DatePicker newTripDates={handleTripDates} />
                    </div>
                </div>
                <p>{tripInfo?.location}</p>
            </div>

        </>
    )
}