const ytdl = require("ytdl-core");
const fs = require("fs");

const getRandom = (ext) => {
  return `${Math.floor(Math.random() * 10000)}${ext}`;
};

module.exports.command = () => {
  let cmd = ["ytv", "yt"];

  return { cmd, handler };
};

const handler = async (bot, msg, from, msgInfoObj) => {
  let { prefix, reply, args } = msgInfoObj;

  try {
    if (args.length === 0) {
      await reply(`❌ URL is empty! \nSend ${prefix}ytv url`);
      return;
    }
    let urlYt = args[0];
    if (!urlYt.startsWith("http")) {
      await reply(`❌ Give youtube link!`);
      return;
    }
    let infoYt = await ytdl.getInfo(urlYt);
    //30 MIN
    if (infoYt.videoDetails.lengthSeconds >= 1800) {
      await reply(`❌ Video file too big!`);
      return;
    }
    let titleYt = infoYt.videoDetails.title;
    let randomName = getRandom(".mp4");

    const stream = ytdl(urlYt, {
      filter: (info) => info.itag == 22 || info.itag == 18,
    }).pipe(fs.createWriteStream(`./${randomName}`));
    //22 - 1080p/720p and 18 - 360p
    console.log("Video downloading ->", urlYt);
    // await reply("Downloading.. This may take upto 5 min!");
    await new Promise((resolve, reject) => {
      stream.on("error", reject);
      stream.on("finish", resolve);
    });

    let stats = fs.statSync(`./${randomName}`);
    let fileSizeInBytes = stats.size;
    // Convert the file size to megabytes (optional)
    let fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
    console.log("Video downloaded ! Size: " + fileSizeInMegabytes);
    if (fileSizeInMegabytes <= 40) {
      await bot.sendMessage(
        from,
        {
          video: fs.readFileSync(`./${randomName}`),
          caption: `${titleYt}`,
        },
        { quoted: msg }
      );
    } else {
      await reply(`❌ File size bigger than 40mb.`);
    }

    fs.unlinkSync(`./${randomName}`);
  } catch (err) {
    console.log(err);
    reply(err.toString());
  }
};
