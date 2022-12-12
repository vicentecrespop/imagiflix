import React from 'react';
import emmiter from '../utils/eventEmmiter';

import { IMAGEURL, EVENTS } from '../data/constants';
import Score from './Score';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';


const Modal = ({ poster_path, title, original_title, overview, vote_average, runtime, name, number_of_seasons, original_name }: any) => {

    const handleClick = () => {
        emmiter.emit(EVENTS.ModalClose)
    }

    return (
    <div className='fixed top-0 left-0 z-10 w-full h-screen grid place-items-center'>
        <div className='w-4/5 h-4/5 grid grid-cols-[500px_1fr] place-items-center p-4 gap-4 bg-black shadow-2xl opacity-90'>
            <img className='justify-self-start' src={`${IMAGEURL}/w500/${poster_path}`} alt={title ? title : name} />
            <div className='relative w-full h-full justify-self-start'>
                <FontAwesomeIcon onClick={handleClick} className='cursor-pointer absolute top-0 right-0' icon={faTimesCircle} size="2x"/>
                <h2 className='text-3xl font-bold'>{title ? title : name}</h2>
                <h6 className='font-bold italic'>{original_title ? original_title : original_name}</h6>
                <p className='my-8'>{overview}</p>
                <Score value={vote_average} />
                <span className='bg-red-600 rounded py-2 px-4 ml-2'>{runtime ? `${runtime} min` : `${number_of_seasons} temporadas`}</span>
            </div>
        </div>
    </div>
)}

export default Modal