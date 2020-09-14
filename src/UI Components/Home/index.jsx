import React, { useState } from 'react';
import {  Row, Col, Card, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {  getSearchResults, updateFavMovies, getMovieDetails, getAllFavMovies, removeAllMoviesFromView } from '../../Redux Files/Actions & Constants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
export const Home = () => {
  const dispatch = useDispatch();

  const showLoader = useSelector(state => state.home.loading);              // If you want a loader, this is the flag to show/hide
  const movies = useSelector(state => state.home.movies);                   // main list of Movies to Iterate in UI
  const noMoviesFound = useSelector(state => state.home.noMoviesFound);     // Handling if there are no Movies found show/Hide View in UI
  const favMovies = useSelector(state => state.home.favMovies);             // Your selected Fav movies IMDB ID's
  const selectedMovie = useSelector(state => state.home.selectedMovie);     // Once you select a movie card this object will hold the data
  
  const [searching, setSearchingFlag] = useState(false);               //This is callback if you started the search true = Search started
  const [showDetails, setDetailsView] = useState(false);               // Show/Hide the Movie Details banner, if you click on the Movie card this will become true anf will slideup the movie details banner
  const [showFavMovies, setFavMoviesView] = useState(false);           // Show/Hide Fav Movies list , if this is true it will load all the fav movies 
  const [searchBy, setSearchBy] = useState('');                        // Search text inputs value is saved into this state
  const [pageNumber, setPageNumber] = useState(1);                     // keeping record of page number for infinite scrolling

  //Form Sumbit / search button callback to search for the movie name
  const handleSubmit = (e) => {
    const form = new FormData(e.target);
    const key = form.get("Search");
    setSearchBy(key)
    setSearchingFlag(true)
    setFavMoviesView(false)
    dispatch(getSearchResults(key, 1))
    setPageNumber(1)
    e.preventDefault();
  }
  // ToggleFav will updated Favourite Movies List and updates the icon Color
  const toggleFav = (movie) => {
    dispatch(updateFavMovies(movie))
  }
  // For Infinie scrolling till the search results length
  const handleScroll = (e) => {
    if (!showFavMovies) {
      const target = e.target;
      if (Math.round(Number(target.scrollHeight) - Number(target.scrollTop)) === target.clientHeight || Math.round(Number(target.scrollHeight) - Number(target.scrollTop)) === target.clientHeight+1) {
        dispatch(getSearchResults(searchBy, pageNumber + 1))
        setPageNumber(pageNumber + 1)
      }
    }
  }
  // opens Movie Details slide View
  const openModal = (movie) => {
    setTimeout(() => {
      setDetailsView(true)
    }, 200); 
    dispatch(getMovieDetails(movie.imdbID))
  }
  // slides back the movie details View
  const closeModal = () => {
    setDetailsView(false)
  }
  //Gets all your fav movies and renders in a list
  const getFavMovies = () => {
    const favMovies = localStorage.getItem('favMovies');
    if(favMovies != null){
    setSearchingFlag(true)
    setFavMoviesView(true)
    dispatch(getAllFavMovies())
  }else{
    alert('Please select some fav movies')
  }
  }
  //remove the fevourite movie View selection back to original page with text input
  const removeFavMovieView = () => {
    if (showFavMovies) {
      
    setSearchingFlag(false)
    setFavMoviesView(false)
    dispatch(removeAllMoviesFromView())
    }
  }

  return (
    <div className="home-container">
     
     
      {/* This is for Showing FavMovies show/hide buttons */}
     <diV className="fav-movies-btn" >
        {showFavMovies && <FontAwesomeIcon onClick={removeFavMovieView} className="close-button" icon={faTimes} />}
        {!showFavMovies && <FontAwesomeIcon onClick={getFavMovies} className="small-fav-button" icon={faHeart} />}
      </diV>
      

      {/* This is form to handle Search input View and it moves up as the search results load */}
      <div className={searching ? "input-container  move" : "input-container  dontMove"}>
        <form onSubmit={handleSubmit} autocomplete="off">
          <Row className="justify-content-md-center margin0">
            <Col xs={10} md={12} lg={12} >
              <div className="input-card">
                <input placeholder="Search for a movie" name="Search" type="text-input" ></input>
                <button type="submit" className="search-btn">
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>
              {/* <FontAwesomeIcon icon={faSearch} /> */}
            </Col>
          </Row>
        </form>

      </div>
      

      {/* This is to show the selected movies Details in a sliding view moves up/down depending on button clicks */}
      <div className={showDetails ? "slide-panel  slideUp" : "slide-panel  slideDown"}>
        <div className="slide-panel-imageBoard" style={{ backgroundImage: "url(" + selectedMovie['Poster'] + ")" }}>
          <FontAwesomeIcon onClick={closeModal} className="close-button" icon={faTimes} />
          <FontAwesomeIcon onClick={() => toggleFav(selectedMovie)} className={favMovies.indexOf(selectedMovie.imdbID) == -1 ? "small-un-fav-button" : "small-fav-button"} icon={faHeart} />
          <Row className="margin0">
            <Col xs={2} md={2} lg={2}>
              <Card>
                <Card.Img variant="top" src={selectedMovie['Poster']} />
              </Card>
            </Col>
          </Row>
        </div>
        <div className="slide-panel-detailsBoard">
          <Row className="margin0">
            <Col xs={12} md={{ span: 9, offset: 3 }} lg={{ span: 9, offset: 3 }}>
              <div className="one-line"><h3>{selectedMovie.Title} </h3> <p>({selectedMovie.Type})</p> </div>
              {selectedMovie.Director != 'N/A' && <p>Director :  <b>{selectedMovie.Director}</b></p>}
              {selectedMovie.Writer != 'N/A' && <p>Writer :  <b>{selectedMovie.Writer}</b></p>}
              <p>IMDB Rating: <b>{selectedMovie.imdbRating}</b>, Released: <b>{selectedMovie.Released}</b>{selectedMovie.Type == 'series' && <span>, Run Duration: <b>{selectedMovie.Year}</b></span>}</p>
              <div className="one-line">
                <p>Cast: </p>
                <p><b>{selectedMovie.Actors}</b></p>
              </div>
              <div className="one-line">
                <p>Plot: </p>
                <p><b>{selectedMovie.Plot}</b></p>
              </div>
              {/* Actors: "Kevin Conroy, Efrem Zimbalist Jr., Bob Hastings"
Awards: "Won 1 Primetime Emmy. Another 4 wins & 19 nominations."
Country: "USA"
Director: "N/A"
Genre: "Animation, Action, Adventure, Family, Sci-Fi"
Language: "English"
Metascore: "N/A"
Plot: "Heir to the Wayne family fortune, Bruce Wayne lives by day as a seemingly lavish playboy millionaire socialite, but by night assumes the role of his crime-fighting alter-ego: the caped crusader known as Batman. Throughout the Animated Series, Batman receives help from sidekicks Robin and Batgirl, as well as Police Commissioner Gordon, in protecting the streets of Gotham City from a large rogue's gallery of criminals, lunatics and nemeses."
Poster: "https://m.media-amazon.com/images/M/MV5BOTM3MTRkZjQtYjBkMy00YWE1LTkxOTQtNDQyNGY0YjYzNzAzXkEyXkFqcGdeQXVyOTgwMzk1MTA@._V1_SX300.jpg"
Rated: "TV-PG"
Ratings: [{…}]
Released: "05 Sep 1992"
Response: "True"
Runtime: "23 min"
Title: "Batman: The Animated Series"
Type: "series"
Writer: "Bob Kane, Eric Radomski, Bruce Timm, Paul Dini, Bill Finger"
Year: "1992–1995"
imdbID: "tt0103359"
imdbRating: "9.0"
imdbVotes: "84,064"
totalSeasons: "4" */}
            </Col>
          </Row>
        </div>
      </div>
      
      
      {/*If there is a error from api or we dont have movies, handling such issues for user */}
      {noMoviesFound && <div className="no-movie-container">
          <img src={require('../../images/no_data.jpg')} />
          <p>Sorry we did not find anything</p>
        </div> }


      {/*Iterates Cards as the movies api returns list of movies, slides up and becomes 80% of the screen */}
      <div className="movies-container" onScroll={handleScroll}>
      {showFavMovies && <h5 className="orange-text text-center">Your Favourite Movies</h5>}
        <Row className="justify-content-md-center margin0">
          {movies.map((movie, index) =>
            <Col key={index} xs={12} md={4} lg={2}>
              <Card style={{ margin: '10px' }}>
                <FontAwesomeIcon onClick={() => toggleFav(movie)} className={favMovies.indexOf(movie.imdbID) == -1 ? "un-fav-button" : "fav-button"} icon={faHeart} />
                <Card.Img onClick={() => openModal(movie)} variant="top" src={movie.Poster} />
                <Card.Body>
                  <Card.Title onClick={() => openModal(movie)} >{movie.Title}</Card.Title>
                  <Card.Text>Year:</Card.Text>
                  <Card.Text>{movie.Year}</Card.Text>
                </Card.Body>
              </Card>
              {/* <div className="movie-card">
            <img src={movie.Poster} />
            </div> */}
            </Col>
          )}
        </Row>

      </div>
    </div>
  );
}