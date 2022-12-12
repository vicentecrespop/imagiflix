import React from 'react';
import emmiter from '../utils/eventEmmiter';

import { IMAGEURL, EVENTS } from '../data/constants';
import { TitleType, Title } from '../App';

import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { movie } from '../data/mock';
import Score from './Score';

import './Poster.css';

const Poster = ({ cover, poster_path, title, name, vote_average, id } : movie, index: number) => {

    const handleClick = () => {
        const type = title ? TitleType.Movie : TitleType.Series

        emmiter.emit(EVENTS.PosterClick, { type, id })
    }

    return (
    <article key={index} className='relative transition-all duration-500 ease-in-out transform hover:scale-110 hover:z-10' onClick={handleClick}>
        <img src={poster_path ? `${IMAGEURL}/w200/${poster_path}` : cover} alt={title} />
        <div className='poster opacity-0 absolute inset-0 w-full h-full bg-black bg-opacity-75 transition-all duration-500 ease-in-out
            grid place-items-center py-8 px-4 text-center cursor-pointer leading-6'>
            <h2 className='text-2xl'>{title ? title : name}</h2>
            <FontAwesomeIcon icon={faPlayCircle} size='5x'/>
            <Score value={vote_average} />
        </div>
    </article>
)}

export default Poster