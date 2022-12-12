import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APIKEY, EVENTS } from '../data/constants';
import emmiter from '../utils/eventEmmiter';

import logo from '../assets/imagiflix-logo.png';
import { faSearch, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import user from '../assets/user.jpg';

import './Navbar.css';
import Searching from './Searching';

const Navbar = ({ searching = false }) => {
    const [ showMenu, setShowMenu ] = useState(false)
    const [ search, setSearch ] = useState('')
    const [ searchResults, setSearchResults ] = useState(null)

    const getSearchResults = async () => {
        if(!search) {
            return emmiter.emit(EVENTS.CloseSearch)
        } 
        let uri = `https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&query=${search}`
        const res = await fetch(uri)
        const data = await res.json()
        setSearchResults(data)
        emmiter.emit(EVENTS.ShowSearch)
    }

    useEffect(() => {
        getSearchResults()
    },[search])

    const handleClick = () => {
        setShowMenu(!showMenu)
    }

    return (
    <>
        <nav className='navbar absolute top-0 left-0 grid grid-cols-2 items-center w-full p-8 z-20'>
            <div className=' justify-self-start grid grid-cols-2 gap-4 items-center'>
                <h1 className='hidden'>Imagiflix</h1>
                <img className='cursor-pointer' src={logo} alt="Imagiflix" onClick={() => document.location.reload()}/>
                <ul className='grid grid-flow-col gap-4'>
                    <li className='font-bold'><a href='#inicio'>Início</a></li>
                    <li><a href='#series'>Séries</a></li>
                    <li><a href='#movies'>Filmes</a></li>
                </ul>
            </div>


            <div className='justify-self-end flex justify-items-end items-center'>
                <form className='relative w-64'>
                    <input className='w-full bg-black border border-white rounded py-1 px-3 transition-all duration-300 ease-in-out opacity-0 hover:opacity-100 focus:opacity-100'
                        type="text" placeholder='Títulos, gente e gêneros' value={search} onChange={e => setSearch(e.target.value)} />
                    <button className='absolute right-0 px-2 py-1' onClick={(e) => e.preventDefault()}>
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </form>
                <div className='relative flex ml-4'>
                    <img src={user} alt="Foto do usuário" onClick={handleClick} />
                    <button onClick={handleClick}>
                        <FontAwesomeIcon className='ml-2' icon={faCaretDown} />
                    </button>
                    <ul className={`${!showMenu && 'invisible opacity-0'} absolute right-0 top-0 mt-10 w-48 bg-black rounded p-4 transition-all duration-300 ease-in-out`}>
                        <li><a href='#account' onClick={handleClick}>Minha Conta</a></li>
                        <li><a href='#logout' onClick={handleClick}>Sair</a></li>
                    </ul>
                </div>
            </div>
        </nav>
        {searching && <Searching search={search} searchResults={searchResults} />}
    </>
)};

export default Navbar;