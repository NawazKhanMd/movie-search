import { home_action_types as atn_typ } from '../Actions & Constants/constants'

console.log()

export const initialState = {
    loading: false,
    movies: [],
    favMovies: localStorage.getItem('favMovies') == null ? [] : JSON.parse(localStorage.getItem('favMovies')),
    selectedMovie: {}
};


export const home = (state = initialState, action) => {

    switch (action.type) {
        case atn_typ.get_movies_success:
            state.noMoviesFound = false;
            if (action.pageNumber == 1) {
                state.movies = [...action.payload.Search]
            } else {
                state.movies = [...state.movies, ...action.payload.Search]
            }
            return { ...state }
        case atn_typ.no_movies_found:
            state.noMoviesFound = true;
            state.movies = [];
            return { ...state }
        case atn_typ.update_fav_movies:
            let indexOfFavMov = state.favMovies.findIndex(num => num == action.payload.imdbID)
            if (indexOfFavMov == -1) {
                state.favMovies.push(action.payload.imdbID)
            } else {
                state.favMovies.splice(indexOfFavMov, 1)
            }
            localStorage.setItem('favMovies', JSON.stringify(state.favMovies));
            state.movies = [...state.movies]
            return { ...state }
        case atn_typ.get_movie_details:
            state.selectedMovie = { ...action.payload }
            return { ...state }
        case atn_typ.loading:
            state.loading = action.flag
            return { ...state }
        default:
            return state
    }
}
