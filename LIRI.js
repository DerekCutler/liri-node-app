// INSTRUCTIONS at: https://utah.bootcampcontent.com/utah-coding-bootcamp/UTAHSAN201810FSF2/blob/master/10-nodejs/02-Homework/Instructions/homework_instructions.md

// Command Line Interface App 

//  Send requests using the axios package to the Spotify, Bands in Town & OMDB APIs

// DONE:  npm install


// START KEYS INFO

// DONE:  npm install dotenv
require("dotenv").config();

// Link to keys.JS
let keys = require("./keys.js");
// console.log(process.env)
// DONE:  npm install --save node-spotify-api
let Spotify = require("node-spotify-api");

// DONE:  npm install axios
let axios = require("axios");


// DONE:  npm install FS
let fs = require("fs");

// DONE:  npm install moment
let moment = require("moment");

// END KEYS INFO


// START COMMAND LINE STUFF

// Arguments Input 
let appCommand = process.argv[2];
// console.log("appCommand: " + appCommand);

// USE SLICE FOR SEARCH STARTING WITH INDEX 3 OR MORE
let userSearch = process.argv.slice(3).join(" ");
// console.log("userSearch: " + userSearch);

// END appCommand LINE STUFF


// START SWITCH STUFF

function liriRun() {
  switch (appCommand) {
    case "spotify-this-song":
      getSpotify(userSearch);
      break;

    case "concert-this":
      getBandsInTown(userSearch);
      break;

    case "movie-this":
      getOMDB(userSearch);
      break;
  }
}

liriRun();
// END SWITCH STUFF


// START SPOTIFY FUNCTION
function getSpotify(songName) {
  // Spotify API stuff
  // console.log("JSON.stringify(keys): " + JSON.stringify(keys));
  let spotify = new Spotify(keys.spotify);

  if (!songName) {
    songName = "When the Levee Breaks";
    console.log("songName:" + songName);
  };

  spotify.search({ type: 'track', query: songName }, function (err, data) {
    if (err) {
      console.log("I'm sorry Dave, I'm afraid I can't do that for the following reason: " + err);
      return;
    }
    // Line break for ease of differentiating
    console.log("======= Start Spotify Log Entry =======");
    //return artist
    console.log("Artist: " + data.tracks.items[0].album.artists[0].name + "\r\n");
    // return song name
    console.log("Song: " + data.tracks.items[0].name + "\r\n");
    // return album name
    console.log("Album: " + data.tracks.items[0].album.name + "\r\n");
    // return preview link
    console.log("Preview Link: " + data.tracks.items[0].href + "\r\n");
    // Line break for ease of differentiating
    console.log("======= End Spotify Log Entry =======");

    // Append to log.txt
    let logSong = "\n======= Start Spotify Log Entry =======" +
      "\nArtist: " + data.tracks.items[0].album.artists[0].name +
      "\nSong: " + data.tracks.items[0].name +
      "\nAlbum: " + data.tracks.items[0].album.name +
      "\nPreview Link: " + data.tracks.items[0].href +
      "\n======= End Spotify Log Entry =======\n"

    fs.appendFile("log.txt", logSong, function (err) {
      if (err) throw err;
    });

  });

};

// END SPOTIFY FUNCTION

// START BANDS IN TOWN FUNCTION

function getBandsInTown(artist) {
  // Default Artist is Clutch
  if (!artist) {
    artist = "Clutch";
  }
  let bandQueryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

  axios.get(bandQueryURL).then(
    function (response) {
      // Line break for ease of differentiating
      console.log("======= Start Bands In Town Log Entry =======");
      // log response
      console.log("Artist: " + artist + "\r\n");
      console.log("Venue: " + response.data[0].venue.name + "\r\n");
      console.log("City: " + response.data[0].venue.city + "\r\n");
      console.log("Date: " + moment(response.data[0].datetime).format("MM/DD/YYYY") + "\r\n");
      // Line break for ease of differentiating
      console.log("======= End Bands In Town Log Entry =======");

      // Append to log.txt
      let logConcert = "\n======= Start Bands In Town Log Entry =======" +
        "\nArtist: " + artist +
        "\nVenue: " + response.data[0].venue.name +
        "\nCity: " + response.data[0].venue.city +
        "\nDate: " + moment(response.data[0].datetime).format("MM-DD-YYYY") +
        "\n======= End Bands In Town Log Entry =======\n"

      fs.appendFile("log.txt", logConcert, function (err) {
        if (err) throw err;
      });

    });

};

// END BANDS IN TOWN FUNCTION

// START OMDB FUNCTION

function getOMDB(movie) {
  // console.log("Movie: " + movie)
  // Default Move is the Empire Strikes Back
  if (!movie) {
    movie = "the Empire Strikes Back";
  }
  let movieQueryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
  // console.log("movieQueryURL: " + movieQueryURL)

  axios.get(movieQueryURL).then(
    function (response) {
      // Line break for ease of differentiating
      // console.log(response)
      console.log("======= Start Online Movie DataBase Log Entry =======");
      // log response
      console.log("Title: " + response.data.Title + "\r\n");
      console.log("Year Released: " + response.data.Year + "\r\n");
      console.log("IMDB Rating: " + response.data.imdbRating + "\r\n");
      console.log("Rotten Tomatos Rating: " + response.data.Ratings[1].Value + "\r\n");
      console.log("Country Where Produced: " + response.data.Country + "\r\n");
      console.log("Language: " + response.data.Language + "\r\n");
      console.log("Plot: " + response.data.Plot + "\r\n");
      console.log("Actors: " + response.data.Actors + "\r\n");
      // Line break for ease of differentiating
      console.log("======= End Online Movie DataBase Log Entry =======");

      // Append to log.txt
      let logMovie = "\n======= Start Online Movie Database Log Entry =======" +
        "\nTitle: " + response.data.Title +
        "\nYear Released: " + response.data.Year +
        "\nIMDB Rating: " + response.data.imdbRating +
        "\nRotten Tomatos Rating: " + response.data.Ratings[1].Value +
        "\nCountry Where Produced: " + response.data.Country +
        "\nLanguage: " + response.data.Language +
        "\nPlot: " + response.data.Plot +
        "\nActors: " + response.data.Actors +
        "\n======= End Online Movie Database Log Entry =======\n"

      fs.appendFile("log.txt", logMovie, function (err) {
        if (err) throw err;
      });

    });
};

// END OMDB FUNCTION