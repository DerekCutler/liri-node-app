console.log("keys.js is go");

// Targets API authentication info from .env file and exporting so liri.js can utilize 

exports.spotify = {
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
};

