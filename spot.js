var Spotify = require('node-spotify-api');
require("dotenv").config();


var keys = require("./keys.js"); 
var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
  });
  spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

  
  
  console.log(`\nTrack: ${data.tracks.items[0].name}
               \nArtist: ${data.tracks.items[0].artists[0].name}
               \nAlbum: ${data.tracks.items[0].album.name}
               \nLink: ${data.tracks.items[0].external_urls.spotify}`);
 


  });