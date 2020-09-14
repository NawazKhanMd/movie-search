import { home_action_types as action_types } from '../Actions & Constants/constants'
import { restApiUrls, RequestAPI } from '../../Utils/fetchInterceptor'

export const toogleLoader = (flag) => (dispatch) => {
  dispatch({
    type: action_types.loading,
    flag: flag
  })
}



export const updateFavMovies = (object) => (dispatch) => {
  dispatch({
    type: action_types.update_fav_movies,
    payload: object
  })
}
export const removeAllMoviesFromView = () => (dispatch) => {
  dispatch({
    type: action_types.get_movies_success,
    payload: { Search: [] },
    pageNumber: 1
  })
}
export const getSearchResults = (key, pageNumber = 1,) => (dispatch) => {
  dispatch(toogleLoader(true))
  let fetchObj = {
    url: restApiUrls.omdbapiURL.replace('{searchKey}', key).replace('{pageNumber}', pageNumber),
    method: 'GET'
  }
  return RequestAPI(fetchObj).then(resp => {
    dispatch(toogleLoader(false))
    if (resp.type == 'success') {
      if (resp.data.data.Response == 'True') {
        dispatch({
          type: action_types.get_movies_success,
          payload: resp.data.data,
          pageNumber: pageNumber
        })
      } else {
        dispatch({
          type: action_types.no_movies_found
        })
      }
    } else {
      dispatch(toogleLoader(false))
    }
  })
}
export const getAllFavMovies = () => (dispatch) => {
  dispatch(toogleLoader(true))
  dispatch(removeAllMoviesFromView());
  let FavMovieIDs = JSON.parse(localStorage.getItem('favMovies'));
  FavMovieIDs.forEach((id,index) => {
    let fetchObj = {
      url: restApiUrls.getMovieDetails.replace('{IMDBkey}', id),
      method: 'GET'
    }
    RequestAPI(fetchObj).then(resp => {
      dispatch(toogleLoader(false))
      if (resp.type == 'success') {
        if (resp.data.data.Response == 'True') {
          dispatch({
            type: action_types.get_movies_success,
            payload: {Search:[resp.data.data]},
            pageNumber: index + 2
          })
        } else {
          dispatch({
            type: action_types.no_movies_found
          })
        }
      } else {
        dispatch(toogleLoader(false))
      }
    })
  });
  
  
}
export const getMovieDetails = (imdbID) => (dispatch) => {
  dispatch(toogleLoader(true))
  let fetchObj = {
    url: restApiUrls.getMovieDetails.replace('{IMDBkey}', imdbID),
    method: 'GET'
  }
  return RequestAPI(fetchObj).then(resp => {
    dispatch(toogleLoader(false))
    if (resp.type == 'success') {
      if (resp.data.data.Response == 'True') {
        dispatch({
          type: action_types.get_movie_details,
          payload: resp.data.data
        })
      } else {
        dispatch({
          type: action_types.no_movies_found
        })
      }
    } else {
      dispatch(toogleLoader(false))
    }
  })
}

