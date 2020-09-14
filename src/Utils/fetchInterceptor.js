const key = JSON.parse(process.env.REACT_APP_SECRETS).REACT_APP_API_KEY
export const restApiUrls = {
omdbapiURL:`https://www.omdbapi.com/?s={searchKey}&apikey=${key}&page={pageNumber}`,
getMovieDetails :`https://www.omdbapi.com/?i={IMDBkey}&apikey=${key}&plot=full`
}
const axios = require('axios');

export const RequestAPI = (fetchObj, typeOfRequest) => {
 let url = '';
 let method = '';
 let headerObj = {};
 let bodyObj = {};

url = fetchObj.url;
 return axios.get(url)
 .then(function (response) {
  return  { 'type': 'success', 'data': response } 
 })
 .catch(function (error) {

  return  { 'type': 'failed', 'data': error }   // console.log(error);
 })
 .finally(function () {
   // always executed
 });
}