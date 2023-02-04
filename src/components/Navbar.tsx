import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APIKEY, EVENTS } from '../data/constants';
import emmiter from '../utils/eventEmmiter';

import logo from '../assets/imagiflix-logo.png';
import { faSearch, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import user from '../assets/user.jpg';

import './Navbar.css';
import Searching from './Searching';

const Navbar = ({ searching = false, showSeries, setShowSeries, showMovies, setShowMovies, setGenre, setMoviesByGenre, setSeriesByGenre, setGenreName } : any) => {
    const [ showMenu, setShowMenu ] = useState(false)
    const [ search, setSearch ] = useState('')
    const [ searchResults, setSearchResults ] = useState(null)
    const [ seriesGenres, setSeriesGenres ] = useState([])
    const [ moviesGenres, setMoviesGenres ] = useState([])


    const getSearchResults = async () => {
        if(!search) {
            return emmiter.emit(EVENTS.CloseSearch)
        } 
        let multiUri = `https://api.themoviedb.org/3/search/multi?api_key=${APIKEY}&query=${search}`
        let moviesUri = `https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&query=${search}`
        let seriesUri = `https://api.themoviedb.org/3/search/tv?api_key=${APIKEY}&query=${search}`
        let uri = showSeries ? seriesUri : multiUri
        uri = showMovies ? moviesUri : uri
        const res = await fetch(uri)
        const data = await res.json()
        setSearchResults(data)
        emmiter.emit(EVENTS.ShowSearch)
    }

    useEffect(() => {
        getSearchResults()
        getGenres()
    },[search])

    const handleClick = () => {
        setShowMenu(!showMenu)
    }

    const selectMovies = () => {
        setShowMovies(true)
        setShowSeries(false)
        setGenre(0)
        setGenreName('')
        setSeriesByGenre([])
        setMoviesByGenre([])
    }

    const selectSeries = () => {
        setShowMovies(false)
        setShowSeries(true)
        setGenre(0)
        setGenreName('')
        setSeriesByGenre([])
        setMoviesByGenre([])
    }

    const getGenres = async () => {
        const seriesRes = await fetch(`https://api.themoviedb.org/3/genre/tv/list?api_key=${APIKEY}&language=pt-BR`)
        const series = await seriesRes.json()
        setSeriesGenres(series.genres)

        const moviesRes = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${APIKEY}&language=pt-BR`)
        const movies = await moviesRes.json()
        setMoviesGenres(movies.genres)
        
    }

    const selectSeriesGenre = async (id: number, name: string) => {
        setGenre(id)
        setGenreName(name)
        const genreRes = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${APIKEY}&language=pt-BR&sort_by=popularity.desc&with_genres=${id}`)
        const genreMovies = await genreRes.json()
        setMoviesByGenre(genreMovies.results)
    }

    const selectMoviesGenre = async (id: number, name: string) => {
        setGenre(id)
        setGenreName(name)
        const genreRes = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${APIKEY}&language=pt-BR&sort_by=popularity.desc&with_genres=${id}`)
        const genreSeries = await genreRes.json()
        setSeriesByGenre(genreSeries.results)
    }

    const toggleDropdown = () => {
        const dropdownContent = document.querySelector('div.dropdown-content')
        dropdownContent?.classList.toggle('hidden')
    }

    const getDropdownContent = () => {
        if(showSeries) {
            return (
                <div className='dropdown-content hidden absolute z-10 mt-4 bg-black w-96 p-4 grid grid-cols-3 gap-2'>
                    {seriesGenres.map((genre: any) => {
                        return <a href="#" key={genre.id} onClick={() => selectMoviesGenre(genre.id, genre.name)}>{genre.name}</a>
                    })}
                </div>
            )
        }
        if(showMovies) {
            return (
                <div className='dropdown-content hidden absolute z-10 mt-4 bg-black w-96 p-4 grid grid-cols-3 gap-2'>
                    {moviesGenres.map((genre: any) => {
                        return <a href="#" key={genre.id} onClick={() => selectSeriesGenre(genre.id, genre.name)}>{genre.name}</a>
                    })}
                </div>
            )
        }
        return (
            <div className='dropdown-content absolute z-10 mt-4 bg-black w-96 p-4 grid grid-cols-3 gap-2'>
                <a href='#'>Ação</a>
                <a href='#'>Comédia</a>
                <a href='#'>Suspense</a>
            </div>
        )
    }

    return (
    <>
        <nav className='navbar absolute top-0 left-0 grid grid-cols-2 items-center w-full p-8 z-20'>
            <div className=' justify-self-start grid grid-cols-3 gap-4 items-center'>
                <h1 className='hidden'>Imagiflix</h1>
                <img className='cursor-pointer' src={logo} alt="Imagiflix" onClick={() => document.location.reload()}/>
                <ul className='grid grid-flow-col gap-4'>
                    <li className='font-bold'><a href='#inicio'>Início</a></li>
                    <li><a href='#series' onClick={() => selectSeries()}>Séries</a></li>
                    <li><a href='#movies' onClick={() => selectMovies()}>Filmes</a></li>
                </ul>
                {(showMovies || showSeries) && (
                    <div className='dropdown relative' onClick={toggleDropdown}>
                        <button className='border w-fit p-2 flex items-center'>
                            Gêneros
                            <span className='ml-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
    <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
    </svg>
                            </span>
                        </button>
                        {getDropdownContent()}
                    </div>
                )
                }
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