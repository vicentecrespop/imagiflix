import React, { useEffect, useState } from 'react'

import { APIKEY, URL, EVENTS } from './data/constants';
import emmiter from './utils/eventEmmiter';

import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Carousel from './components/Carousel';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Footer from './components/Footer';
import Loading from './components/Loading';
import Modal from './components/Modal';

export enum TitleType {
  Movie = 'movie',
  Series = 'tv'
}

export interface Title {
  type: TitleType;
  id: number | string;
}


function App() {

  const [movies, setMovies] = useState()
  const [series, setSeries] = useState()
  const [title, setTitle] = useState({})
  const [loading, setLoading] = useState(true)
  const [searching, setSearching] = useState(false)

  const [showSeries, setShowSeries] = useState(false)
  const [showMovies, setShowMovies] = useState(false)
  const [genre, setGenre] = useState(0)
  const [genreName, setGenreName] = useState('')
  const [moviesByGenre, setMoviesByGenre] = useState([])
  const [seriesByGenre, setSeriesByGenre] = useState([])

  useEffect(() => {
    emmiter.addListener(EVENTS.PosterClick, getTitle)
    emmiter.addListener(EVENTS.ModalClose, () => setTitle({}))
    emmiter.addListener(EVENTS.ShowSearch, () => setSearching(true))
    emmiter.addListener(EVENTS.CloseSearch, () => setSearching(false))
    const fetchData = async () => {
      
      const movies = await fetch(`${URL}/discover/movie/?api_key=${APIKEY}&sort_by=popularity.desc`)
      const moviesData = await movies.json()
      setMovies(moviesData)

      const series = await fetch(`${URL}/discover/tv/?api_key=${APIKEY}&sort_by=popularity.desc`)
      const seriesData = await series.json()
      setSeries(seriesData)

      setLoading(false)      
    }

    fetchData()
  }, [])

  const getFeaturedMovie = () => moviesByGenre.length !== 0 ? moviesByGenre[0] : movies && movies['results'][0]

  const getFeaturedSeries = () => seriesByGenre.length !== 0 ? seriesByGenre[0] : series && series['results'][0]
  
  const featuredMovie = getFeaturedMovie() || {}

  const featuredSeries = getFeaturedSeries() || {}

  const getMoviesList = () => {
    if(movies) {
      const [ featured, ...moviesList ]: [Object, Object] = movies['results']
      let moviesNew: any[] = moviesList
      if(genre && moviesByGenre.length !== 0) {
        moviesNew = moviesByGenre
      }
      return moviesNew
    }
    return []
  }  

  const getSeriesList = () => {
    if(series) {
      const [ featured, ...seriesList ] : [Object, Object] = series['results']
      let seriesNew: any[] = seriesList
      if(genre && seriesByGenre.length !== 0) {
        seriesNew = seriesByGenre
      }
      return seriesNew
    }
    return []
  }

  const getTitle = async ({type, id}: Title) => {
      const title = await fetch(`${URL}/${type}/${id}?api_key=${APIKEY}`)
      const titleData = await title.json()
      setTitle(titleData)
  }

  return (
    <div className="text-white bg-black m-auto aintialised font-sans">
      
      {loading && (
        <>
          <Loading />
          <Navbar setShowSeries={setShowSeries} showSeries={showSeries} setShowMovies={setShowMovies} showMovies={showMovies} setGenre={setGenre} setGenreName={setGenreName}/>
        </>
      )}
      {!loading  && !showSeries && !showMovies && (
        <>
          <Navbar searching={searching} setSeriesByGenre={setSeriesByGenre} setMoviesByGenre={setMoviesByGenre} showSeries={showSeries} setShowSeries={setShowSeries} setShowMovies={setShowMovies} showMovies={showMovies} setGenre={setGenre} setGenreName={setGenreName}/>
          {!searching && (
            <>
              <Hero {...featuredMovie} type_movie={true}/>
              <Carousel title='Filmes populares' data={getMoviesList()} />
              {series && <Carousel title='Séries populares'data={series['results']} />}
            </>
          )}
        </>
      )}
      {!loading  && !showSeries && showMovies && (
        <>
          <Navbar searching={searching} setSeriesByGenre={setSeriesByGenre} setMoviesByGenre={setMoviesByGenre} showSeries={showSeries} setShowSeries={setShowSeries} setShowMovies={setShowMovies} showMovies={showMovies} setGenreName={setGenreName} setGenre={setGenre}/>
          {!searching && (
            <>
              <Hero {...featuredMovie} type_movie={true}/>
              <Carousel title='Filmes populares' data={getMoviesList()} genreName={genreName}  />
            </>
          )}
        </>
      )}
      {!loading  && showSeries && !showMovies && (
        <>
          <Navbar searching={searching} setSeriesByGenre={setSeriesByGenre} setMoviesByGenre={setMoviesByGenre} showSeries={showSeries} setShowSeries={setShowSeries} setShowMovies={setShowMovies} showMovies={showMovies} setGenre={setGenre} setGenreName={setGenreName}/>
          {!searching && (
            <>
              <Hero {...featuredSeries} type_movie={false}/>
              <Carousel title='Séries populares' data={getSeriesList()} genreName={genreName}/>
            </>
          )}
        </>
      )}
      <Footer />
      {Object.values(title).length  && <Modal {...title}/>}
    </div>
  );
}

export default App;
