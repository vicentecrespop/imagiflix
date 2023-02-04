const URL = 'https://api.themoviedb.org/3'
const IMAGEURL = 'https://image.tmdb.org/t/p'
const APIKEY = process.env.REACT_APP_APIKEY
const EVENTS = {
    PosterClick: 'PosterClick',
    ModalClose: 'ModalClose',
    ShowSearch: 'ShowSearch',
    CloseSearch: 'CloseSearch',
}

export {URL, EVENTS, IMAGEURL, APIKEY}