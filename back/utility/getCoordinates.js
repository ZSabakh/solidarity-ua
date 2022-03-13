const { Client } = require("@googlemaps/google-maps-services-js");
const client = new Client({});

async function getCoordinates(placeId) {
  return client.placeDetails({
    params: {
      place_id: placeId,
      key: process.env.GOOGLE_MAPS_API_KEY,
    },
  });
}

module.exports = getCoordinates;
