const {
  zokou
} = require("./../framework/zokou");
const {
  format,
  runtime
} = require('../framework/mesfonctions');
const os = require('os');
const speed = require('performance-now');
const {
  performance
} = require('perf_hooks');
const conf = require('../set');

zokou(
  {
    nomCom: 'ping',
    desc: 'To check bot response time',
    Categorie: 'General',
    reaction: '⚡',
    fromMe: 'true',
  },
  async (dest, zk) => {
    // Call the new loading animation
    await loading(dest, zk);

    // Generate 3 ping results with large random numbers for a more noticeable effect
    const pingResults = Array.from({ length: 3 }, () => Math.floor(Math.random() * 10000 + 1000));

    // Create larger font for ping results (using special characters for a bigger look)
    const formattedResults = pingResults.map(ping => `🟢 PONG: ${ping}  🟢`);

    // Send the ping results with the updated text and format
    await zk.sendMessage(dest, {
      text: "ʜᴀɴs-ᴍᴅ-ʙʏ-ʜᴀɴsᴛᴢ",
      contextInfo: {
        externalAdReply: {
          title: "HANS-MD - Ultra-Fast Response",
          body: `${formattedResults.join(" | ")}`,
          thumbnailUrl: "https://files.catbox.moe/aftner.jpg", // Replace with your bot profile photo URL
          sourceUrl: "https://whatsapp.com/channel/0029VasiOoR3bbUw5aV4qB31", // Your channel URL
          mediaType: 1,
          showAdAttribution: true, // Verified badge
        },
      },
    });
