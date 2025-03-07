import {tripFaker} from '../fakers/tripFaker'
import { Trip } from '../interfaces/Trip'
import { useApi } from '../hooks/useAPI'

const api = useApi()

export async function getUserTrips(): Promise<Trip[]> {
    let {data} = await api.get('/mytrips')
    return data
}

export async function getTripInfo(id: number): Promise<Trip> {
    const tripInfo = tripFaker[id - 1]
    return tripInfo
}