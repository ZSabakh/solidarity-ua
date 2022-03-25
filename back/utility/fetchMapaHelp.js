const axios = require("axios");
const NodeCache = require("node-cache");
const City = require("../models/city.model");
const HelpType = require("../models/help.types.model");
const PostsCache = new NodeCache({ stdTTL: 60 * 60 * 24 });

function getCity(address, Tbilisi) {
  if (address?.toLowerCase().includes("tbilisi")) {
    return Tbilisi;
  }
  return {
    name: {
      en: "Other",
      ka: "სხვა",
      ua: "Інше",
    },
  };
}

function getHelpType(category, helpTypes) {
  if (category === "Housing" || category === "Shelter") return helpTypes.find((type) => type.name === "Accomodation");
  if (category === "Transfer") return helpTypes.find((type) => type.name === "Transportation");
  return helpTypes.find((type) => type.name === "Other");
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
          mapa: true,
          _id: `mapa-${Math.random() * 1000000}`,
          title: { en: post.Name },
          description: { en: post.Services },
          location: {
            description: post.Address,
            lat: post.Lat,
            lng: post.Lng,
          },
          contact: {
            phone: { value: post.Phone, public: true },
            email: { value: post.Email, public: true },
            social: { value: post.SocialNetworks, public: true },
          },
          city: getCity(post.Address, Tbilisi),
          type: getHelpType(post.CategoryEn, HelpTypes),
          details: { ...post },
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
