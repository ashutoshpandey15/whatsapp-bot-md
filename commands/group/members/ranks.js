module.exports.command = () => {
  let cmd = ["ranks"];

  return { cmd, handler };
};

const handler = async (bot, msg, from, msgInfoObj) => {
  let { prefix, reply } = msgInfoObj;

  let text = `*─「 <{PVX}> RANKS 」 ─*

Send ${prefix}rank to know your rank (based on total messages in all PVX groups from 24 Nov 2021) and message count.

1-10 Prime 🔮
11-50 Diamond 💎
51-100 Platinum 🛡
101-500 - Elite 🔰
501-1000 Gold ⭐️ 
1001-1500 Silver ⚔️
1500+ Bronze ⚱️`;

  await reply(text);
};
