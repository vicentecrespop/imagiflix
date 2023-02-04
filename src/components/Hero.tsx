import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPlus } from '@fortawesome/free-solid-svg-icons';

import { IMAGEURL } from "../data/constants";

import placeholder from '../assets/hero.jpg'
import Score from "./Score";

const Hero = ({ type_movie = true, backdrop_path = null, name = 'The Office', title = 'Avenger Endgame', vote_average = 10 }) => {

    return (
    <header className="box-border relative min-h-screen -mb-32">
        <img className="object-cover object-center h-auto w-full" src={backdrop_path ? `${IMAGEURL}/original/${backdrop_path}` : placeholder} alt='Filme em destaque' />
        <div className="absolute w-full left-0 bottom-0 h-full bg-gradient-to-b from-transparent to-black"></div>
        <article className="absolute bottom-0 mb-64 px-8">
            <p className="text-3xl">Assista agora:</p>
            <h2 className="text-6xl font-black">{type_movie ? title : name}</h2>
            <p className="text-base">
                Nota <Score value={vote_average} />
            </p>
            <button className="text-base rounded bg-black bg-opacity-50 py-2 px-8 mr-2 mt-8 hover:bg-white hover:text-black hover:bg-opacity-75 transition-all duration-300 ease-in-out">
                <FontAwesomeIcon className="mr-2" icon={faPlay} /> Assistir
            </button>
            <button className="text-base rounded bg-black bg-opacity-50 py-2 px-8 mr-2 mt-8 hover:bg-white hover:text-black hover:bg-opacity-75 transition-all duration-300 ease-in-out">
                <FontAwesomeIcon className="mr-2" icon={faPlus} /> Minha Lista
            </button>
        </article>
    </header>
)};

export default Hero