import {tripCardFaker} from '../fakers/tripFaker'

export async function getUserTrips(): Promise<any> {
    const tripList = tripCardFaker
    return tripList
}