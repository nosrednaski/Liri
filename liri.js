 
var fs = require("fs");
var request = require("request");
var keys = require("./keys.js");



var Spotify = require('node-spotify-api');
var spotify = new Spotify({
  id: keys.spotify.id,
  secret: keys.spotify.secret
});
 




var action = process.argv[2];
var nodeArgs = process.argv;

if (action === "movie-this") {
  if (process.argv[3] === "") {
    var queryUrl = "http://www.omdbapi.com/?t=Mr.+Nobody&y=&plot=short&apikey=trilogy";
    console.log(queryUrl);
    request(queryUrl, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        console.log(`\nTitle: ${JSON.parse(body).Title}
                      \nRelease Year: ${JSON.parse(body).Year}
                      \nIMDB Rating: ${JSON.parse(body).imdbRating}
                      \nRotten Tomatoes Rating: ${JSON.parse(body).Ratings[2].Value}
                      \nCountry: ${JSON.parse(body).Country}
                      \nLanguage: ${JSON.parse(body).Language}
                      \nPlot: ${JSON.parse(body).Plot}
                      \nActors: ${JSON.parse(body).Actors}`);
      };
    });
  } else {
  var movieName = "";
  for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
      movieName = movieName + "+" + nodeArgs[i];
    } else {
      movieName += nodeArgs[i];
    }
  };
  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
  console.log(queryUrl);
  request(queryUrl, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log(`\nTitle: ${JSON.parse(body).Title}
                    \nRelease Year: ${JSON.parse(body).Year}
                    \nIMDB Rating: ${JSON.parse(body).imdbRating}
                    \nRotten Tomatoes Rating: ${JSON.parse(body).Ratings[2].Value}
                    \nCountry: ${JSON.parse(body).Country}
                    \nLanguage: ${JSON.parse(body).Language}
                    \nPlot: ${JSON.parse(body).Plot}
                    \nActors: ${JSON.parse(body).Actors}`);
    };
  });
 }
} else if (action === "spotify-this-song") {
  var songName = "";
  for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
      songName = songName + "+" + nodeArgs[i];
    } else {
      songName += nodeArgs[i];
    }
  };
  spotify.search({ type: 'track', query: songName }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
  console.log(data); 
  });  
};

fs.appendFile("log.txt", console, function(err) {
  if (err) {
    return console.log(err);
  }
});

