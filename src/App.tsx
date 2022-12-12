import React, { useEffect, useState } from 'react';

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

  const getFeaturedMovie = () => movies && movies['results'][0]
  
  const featuredMovie = getFeaturedMovie() || {}

  const getMoviesList = () => {
    if(movies) {
      const [ featured, ...moviesList ]: [Object, Object] = movies['results']
      return moviesList
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
          <Navbar />
        </>
      )}
      {!loading  && (
        <>
          <Navbar searching={searching}/>
          {!searching && (
            <>
              <Hero {...featuredMovie}/>
              <Carousel title='Filmes populares' data={getMoviesList()} />
              {series && <Carousel title='Séries populares'data={series['results']}/>}
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
