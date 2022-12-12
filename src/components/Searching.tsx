import React, { useEffect } from 'react'

import Carousel from './Carousel'

const Searching = ({ search = '', searchResults }: (any)) => {

    const data = searchResults ? searchResults.results : []

    useEffect(() => {
        console.log(data)
    },[search])

    return (
        <div className='h-screen w-full flex items-center'>
            <div className='w-screen'>
                {search && <Carousel title={search} data={data}/>}
            </div>
        </div>
    )
}

export default Searching