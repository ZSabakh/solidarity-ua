const { Client } = require("@googlemaps/google-maps-services-js");
const client = new Client({});

async function getCoordinates() {
  client
    .placeDetails({
      params: {
        place_id: "ChIJN1t_tDeuEmsRUsoyG83frY4",
        key: process.env.GOOGLE_MAPS_API_KEY,
      },
    })
    .then((res) => {
      return res.data.result.geometry.location;
    })
    .catch((err) => {
      console.log(err);
    });
}

getCoordinates();

module.exports = getCoordinates;
