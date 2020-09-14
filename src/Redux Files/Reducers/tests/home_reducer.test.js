import { home, initialState } from '../home_reducers';
import { home_action_types } from '../../Actions & Constants/constants';
//import { dummyVariousContent } from '../types/contentTypes';

describe('Home Reducer', () => {
    it('Handles default case', () => {
        const state = home(undefined, {});
        expect(state).toEqual(initialState);
    });
    it('Handles load 1 movie ', () => {
        const data = {
            "Search": [
                {
                    "Title": "Spider-Man",
                    "Year": "2002",
                    "imdbID": "tt0145487",
                    "Type": "movie",
                    "Poster": "https://m.media-amazon.com/images/M/MV5BZDEyN2NhMjgtMjdhNi00MmNlLWE5YTgtZGE4MzNjMTRlMGEwXkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_SX300.jpg"
                }
            ], "totalResults": "490", "Response": "True"
        }
        const action = { type: home_action_types.get_movies_success, payload: data, pageNumber: 1 };
        const state = home(undefined, action);
        expect(state).toMatchSnapshot();
    });
    it('Handles concatenates 2 movie objects ', () => {
        const data = {
            "Search": [
                {
                    "Title": "Spider-Man 2",
                    "Year": "2002",
                    "imdbID": "tt0145487",
                    "Type": "movie",
                    "Poster": "https://m.media-amazon.com/images/M/MV5BZDEyN2NhMjgtMjdhNi00MmNlLWE5YTgtZGE4MzNjMTRlMGEwXkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_SX300.jpg"
                }
            ], "totalResults": "490", "Response": "True"
        }
        const action = { type: home_action_types.get_movies_success, payload: data, pageNumber: 2 };
        const state = home(undefined, action);
        expect(state).toMatchSnapshot();
    });
    it('Removes Movies from Array', () => {
        const action = { type: home_action_types.no_movies_found };
        const state = home(undefined, action);
        expect(state).toMatchSnapshot();
    });
    it('updates Favourite Movies Array', () => {
        const data = {
            "Title": "Spider-Man 2",
            "Year": "2002",
            "imdbID": "tt0145487",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BZDEyN2NhMjgtMjdhNi00MmNlLWE5YTgtZGE4MzNjMTRlMGEwXkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_SX300.jpg"
        }

        const action = { type: home_action_types.update_fav_movies, payload: data };
        const state = home(undefined, action);
        expect(state).toMatchSnapshot();
    });
    it('updates removes movie Favourite Movies Array', () => {
        const data1 = {
            "Title": "Spider-Man 2",
            "Year": "2002",
            "imdbID": "tt0145487",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BZDEyN2NhMjgtMjdhNi00MmNlLWE5YTgtZGE4MzNjMTRlMGEwXkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_SX300.jpg"
        }

        const action = { type: home_action_types.update_fav_movies, payload: data1 };
        // const state = home(undefined, action);
        const data2 = {
            "Title": "Spider-Man 2",
            "Year": "2002",
            "imdbID": "tt0145487",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BZDEyN2NhMjgtMjdhNi00MmNlLWE5YTgtZGE4MzNjMTRlMGEwXkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_SX300.jpg"
        }

        const action2 = { type: home_action_types.update_fav_movies, payload: data2 };
        const state = home(undefined, action,action2);
        expect(state).toMatchSnapshot();
    });
    it('updates selected movie details', () => {
        // const state = home(undefined, action);
        const data2 = {"Title":"Spider-Man",
        "Year":"2002",
        "Rated":"PG-13",
        "Released":"03 May 2002",
        "Runtime":"121 min",
        "Genre":"Action, Adventure, Sci-Fi","Director":"Sam Raimi",
        "Writer":"Stan Lee (Marvel comic book),Steve Ditko (Marvel comic book), David Koepp (screenplay)",
        "Actors":"Tobey Maguire, Willem Dafoe, Kirsten Dunst, James Franco",
        "Plot":"Based on Marvel Comics",
        "Language":"English",
        "Country":"USA",
        "Awards":"Nominated for 2 Oscars. Another 16 wins & 61 nominations.",
        "Poster":"https://m.media-amazon.com/images/M/MV5BZDEyN2NhMjgtMjdhNi00MmNlLWE5YTgtZGE4MzNjMTRlMGEwXkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_SX300.jpg",
        "Ratings":[{"Source":"Internet Movie Database","Value":"7.3/10"},{"Source":"Rotten Tomatoes","Value":"90%"},{"Source":"Metacritic","Value":"73/100"}],
        "Metascore":"73",
        "imdbRating":"7.3",
        "imdbVotes":"674,123",
        "imdbID":"tt0145487",
        "Type":"movie",
        "DVD":"01 Nov 2002",
        "BoxOffice":"$403,706,375",
        "Production":"Columbia Pictures",
        "Website":"N/A",
        "Response":"True"
    }
        

        const action2 = { type: home_action_types.get_movie_details, payload: data2 };
        const state = home(undefined,action2);
        expect(state).toMatchSnapshot();
    });
    // it('Handles load delays ', () => {
    //     const delays = [{ "cor": "9", "date": "04-30-18" }]
    //     let sorted_delays = delays.reduce((acc, val) => {
    //         acc[val.date] = val.cor;
    //         return acc
    //       }, {})
    //     const action = { type: home_action_types.get_delays_success, delays: sorted_delays };
    //     const state = home(undefined, action);
    //     expect(state).toMatchSnapshot();
    // });
    // it('Handles load streets ', () => {
    //     let street1 = {
    //         streetName: '148th Avenue Southeast',
    //         cor: 25,
    //         path: [
    //             {
    //                 'lat': 47.580725569999998,
    //                 'lng': -122.1412285
    //             },
    //             {
    //                 'lat': 47.585360440000002,
    //                 'lng': -122.1428461
    //             },
    //             {
    //                 'lat': 47.589032889999999,
    //                 'lng': -122.14273470000001
    //             },
    //             {
    //                 'lat': 47.596341019999997,
    //                 'lng': -122.142674
    //             },
    //             {
    //                 'lat': 47.60259559,
    //                 'lng': -122.14280979999999
    //             },
    //             {
    //                 'lat': 47.609862249999999,
    //                 'lng': -122.1429724
    //             },
    //         ]
    //     };
    //     const streets = [street1]
    //     const action = { type: home_action_types.get_streets_success, streets: streets };
    //     const state = home(undefined, action);
    //     expect(state).toMatchSnapshot();
    // });
});