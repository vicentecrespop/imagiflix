import React from 'react';
import Slick from 'react-slick';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import mockData, { movie } from '../data/mock';
import Poster from './Poster';

import './Carousel.css';


interface CarouselData {
    title?: string,
    data?: movie[],
}

const Carousel = ({ title = 'Filmes em destaque', data = mockData }: CarouselData) => {
    enum Direction {
        left,
        right
    }

    const SlickArrow = ({ direction, onClick }: { direction: Direction, onClick?: () => void }) => (
        <button type='button' onClick={onClick} className={`absolute w-16 h-full z-10 bg-black bg-opacity-50 top-0 ${direction ? 'left-0' : 'right-0'}`}>
            <FontAwesomeIcon icon={direction ? faChevronLeft : faChevronRight} size='3x'/>
        </button>
    )

    const options = {
        infinite: true,
        slidesToScroll: 1,
        variableWidth: true,
        prevArrow: <SlickArrow direction={Direction.right} />,
        nextArrow: <SlickArrow direction={Direction.left}/>,
    }

    return (
        <section className='carousel'>
            <h2 className='relative z-10 font-bold text-2xl ml-8'>{title}</h2>
            <Slick className='relative mb-8' {...options}>
                {data.map((movie, index) => Poster(movie, index))}
            </Slick>
        </section>
    )
}

export default Carousel