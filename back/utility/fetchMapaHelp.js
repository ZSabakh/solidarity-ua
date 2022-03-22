const axios = require("axios");
const NodeCache = require("node-cache");
const City = require("../models/city.model");
const HelpType = require("../models/help.types.model");
const PostsCache = new NodeCache({ stdTTL: 60 * 60 * 24 });

function getHelpType(category, helpTypes) {
  if (category === "Housing" || category === "Shelter") return helpTypes.find((type) => type.name === "Accomodation")._id;
  if (category === "Transfer") return helpTypes.find((type) => type.name === "Transportation")._id;
  return helpTypes.find((type) => type.name === "Other")._id;
}

async function FetchMapaHelp() {
  const Tbilisi = await City.findOne({ "name.en": "Tbilisi" }).exec();
  const HelpTypes = await HelpType.find().exec();

  let posts = PostsCache.get("posts");
  if (posts) return posts;

  return axios
    .get("https://d2916ie68qiajx.cloudfront.net/mapka/organizations")
    .then((response) => {
      if (!Array.isArray(response.data.result)) throw new Error("Service error");

      let posts = response.data.result.filter((post) => {
        return post.Country === "Грузiя";
      });

      posts = posts.map((post) => {
        return {
          _id: Math.random() * 1000000,
          title: post.Name,
          description: post.Services,
          location: {
            lat: post.Lat,
            lng: post.Lng,
          },
          contact: {
            phone: post.Phone,
            email: post.Email,
          },
          city: post.Address?.includes("Tbilisi") ? Tbilisi._id : null,
          type: getHelpType(post.CategoryEn, HelpTypes),
        };
      });

      PostsCache.set("posts", posts);
      return posts;
    })
    .catch((error) => {
      return [];
    });
}
module.exports = { FetchMapaHelp };
