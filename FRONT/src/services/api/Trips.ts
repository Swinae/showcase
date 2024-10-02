import {tripFaker} from '../fakers/tripFaker'
import { Trip } from '../interfaces/Trip'

export async function getUserTrips(): Promise<any> {
    const tripList = tripFaker
    return tripList
}

export async function getTripInfo(id: number): Promise<Trip> {
    const tripInfo = tripFaker[id - 1]
    return tripInfo
}