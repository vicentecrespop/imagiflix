import cover1 from '../assets/vingadores.jpg'
import cover2 from '../assets/mi.jpg'
import cover3 from '../assets/megatubarao.jpg'

export interface movie {
    title?: string,
    name?: string,
    cover?: string,
    poster_path?: string,
    vote_average?: number | string,
    id?: number
}

const mockData: movie[] = [
    {
        title: 'Avengers',
        cover: cover1 
    },
    {
        title: 'Mission Impossible',
        cover: cover2 
    },
    {
        title: 'Megalodoon',
        cover: cover3 
    },
]

export default mockData