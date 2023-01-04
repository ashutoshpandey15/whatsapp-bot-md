const axios = require("axios");
const { storeNewsTech } = require("../db/postTechDB");
const pvxtech = "919557666582-1551290369@g.us";

const postTechNews = async (bot, count) => {
  if (count > 10) {
    //10 times, already posted news comes up
    return;
  }
  console.log(`TECH NEWS FUNCTION ${count} times!`);

  let url = "https://pvx-api-vercel.vercel.app/api/news";
  let { data } = await axios.get(url);
  delete data["about"];

  let newsWeb = [
    "gadgets-ndtv",
    "gadgets-now",
    "inshorts",
    "beebom",
    "mobile-reuters",
    "techcrunch",
    "engadget",
  ];

  let randomWeb = newsWeb[Math.floor(Math.random() * newsWeb.length)]; //random website
  let index = Math.floor(Math.random() * data[randomWeb].length);

  let news = data[randomWeb][index];
  let techRes = await storeNewsTech(news);
  if (techRes) {
    console.log("NEW TECH NEWS!");
    bot.sendMessage(pvxtech, { text: `📰 ${news}` });
  } else {
    console.log("OLD TECH NEWS!");
    postTechNews(bot, count + 1);
  }
};

module.exports = { postTechNews };