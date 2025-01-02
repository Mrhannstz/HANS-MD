const axios = require("axios");
const { zokou } = require(__dirname + '/../framework/zokou'); // Import 'zokou' framework
const { format } = require(__dirname + '/../framework/mesfonctions'); // Import format function
const os = require('os'); // Import OS module
const moment = require("moment-timezone"); // Import moment-timezone for date and time formatting
const s = require(__dirname + "/../set"); // Import settings

// Style definitions for text transformation
const styles = {
  0xa: {
    '0': '0', '1': '1', '2': '2', '3': '3', '4': '4', '5': '5', '6': '6', '7': '7', 
    '8': '8', '9': '9', 'a': 'ᴀ', 'b': 'ʙ', 'c': 'ᴄ', 'd': 'ᴅ', 'e': 'ᴇ', 'f': 'ғ', 
    'g': 'ɢ', 'h': 'ʜ', 'i': 'ɪ', 'j': 'ᴊ', 'k': 'ᴋ', 'l': 'ʟ', 'm': 'ᴍ', 'n': 'ɴ', 
    'o': 'ᴏ', 'p': 'ᴘ', 'q': 'ϙ', 'r': 'ʀ', 's': 's', 't': 'ᴛ', 'u': 'ᴜ', 'v': 'v', 
    'w': 'ᴡ', 'x': 'x', 'y': 'ʏ', 'z': 'ᴢ', 'A': 'ᴀ', 'B': 'ʙ', 'C': 'ᴄ', 'D': 'ᴅ', 
    'E': 'ᴇ', 'F': 'ғ', 'G': 'ɢ', 'H': 'ʜ', 'I': 'ɪ', 'J': 'ᴊ', 'K': 'ᴋ', 'L': 'ʟ', 
    'M': 'ᴍ', 'N': 'ɴ', 'O': 'ᴏ', 'P': 'ᴘ', 'Q': 'ϙ', 'R': 'ʀ', 'S': 's', 'T': 'ᴛ', 
    'U': 'ᴜ', 'V': 'v', 'W': 'ᴡ', 'X': 'x', 'Y': 'ʏ', 'Z': 'ᴢ'
  }
};

// Function to apply text transformation based on styles
const applyStyle = (text, styleCode) => {
  const styleMap = styles[styleCode];
  return text.split('').map(char => styleMap[char] || char).join('');
};

// Read more separator using invisible characters
const more = String.fromCharCode(0x200e);
const readmore = more.repeat(4001);

// Function to calculate and format runtime
const runtime = function (seconds) {
  seconds = Number(seconds);
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const dayString = days > 0 ? `${days} day${days === 1 ? "" : "s"}, ` : '';
  const hourString = hours > 0 ? `${hours} hour${hours === 1 ? "" : "s"}, ` : '';
  const minuteString = minutes > 0 ? `${minutes} minute${minutes === 1 ? "" : "s"}, ` : '';
  const secondString = remainingSeconds > 0 ? `${remainingSeconds} second${remainingSeconds === 1 ? "" : "s"}` : '';

  return dayString + hourString + minuteString + secondString;
};

// Fetch GitHub repository stats
const fetchGitHubStats = async () => {
  try {
    const response = await axios.get("https://api.github.com/repos/mrhannstz/HANS-MD");
    const forks = response.data.forks_count;
    const stars = response.data.stargazers_count;
    const totalUsers = forks * 2 + stars * 2;
    return { forks, stars, totalUsers };
  } catch (error) {
    console.error("Error fetching GitHub stats:", error);
    return { forks: 0, stars: 0, totalUsers: 0 };
  }
};

// Define a menu command using the zokou framework
zokou({
  name: "me2",
  category: "General"
}, async (chatId, message, options) => {
  let { ms, reply, prefix, senderName } = options;
  const { commands } = require(__dirname + "/../framework/zokou");

  let categorizedCommands = {};
  let mode = s.MODE.toLowerCase() !== "public" ? "Private" : "Public";

  commands.forEach(command => {
    const category = command.category.toUpperCase();
    if (!categorizedCommands[category]) {
      categorizedCommands[category] = [];
    }
    categorizedCommands[category].push(command.name.toUpperCase());
  });

  moment.tz.setDefault(s.TZ);
  const currentTime = moment().format('HH:mm:ss');
  const currentDate = moment().format("DD/MM/YYYY");
  const currentHour = moment().hour();

  let greeting = "Good Night";
  if (currentHour >= 0 && currentHour <= 11) greeting = "Good Morning";
  else if (currentHour >= 12 && currentHour <= 15) greeting = "Good Afternoon";
  else if (currentHour >= 16 && currentHour <= 19) greeting = "Good Evening";

  const { totalUsers } = await fetchGitHubStats();
  const totalUsersFormatted = totalUsers.toLocaleString();

  const header = `
*${greeting} ${senderName}*

╭──✰𝑯𝐀𝑁𝑆-𝑀𝑫-𝐵𝑶𝐓✰───✰
║✰║──────────✰
║✰║ *User:* ${s.OWNER_NAME}
║✰║ *Prefix:* ${s.PREFIXES}
║✰║ *Time:* ${currentTime}
║✰║ *Date:* ${currentDate}
║✰║ *Mode:* ${mode}
║✰║ *Time Zone:* ${s.TZ}
║✰║ *Total Users:* ${totalUsersFormatted}
║✰║ *RAM:* ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
║✰║ *Uptime:* ${runtime(process.uptime())}
║✰║──────────✰
╰───────────────✰
`;

  let commandMenu = "*𝑯𝑨𝑵𝑺-𝑴𝑫-𝑪𝑶𝑴𝑴𝑨𝑵𝑫𝑬𝑺*\n\n" + readmore;
  Object.keys(categorizedCommands).sort().forEach((category, index) => {
    commandMenu += `
*╭───✰ ${applyStyle(category.toUpperCase(), 0xa)} ✰ ────*
║╭──────────✰`;
    categorizedCommands[category].sort().forEach((command, cmdIndex) => {
      commandMenu += `\n║➪║ ${index + cmdIndex + 1}. ${applyStyle(command, 0xa)}`;
    });
    commandMenu += "\n║╰──────────✰\n╰────────────✰✰✰\n";
  });

  commandMenu += `
${readmore}

     𝑯𝑨𝑵𝑺-𝑴𝑫-𝑾𝑯𝑨𝑻𝑺𝑨𝑷𝑷-𝑩𝑶𝑻

    _𝑇𝐻𝐴𝑁𝐾𝑆 𝐹𝑂𝑅 𝐶𝐻𝑂𝑂𝑆𝐼𝑁𝐺 𝐻𝐴𝑁𝑆-𝑀𝐷_

     𝐜𝐫𝐞𝐚𝐭𝐞𝐝 𝐁𝐲 𝐇𝐚𝐧𝐬𝐓𝐳

     *𝑲𝑬𝑬𝑷 𝑼𝑺𝑰𝑵𝑮 𝑯𝑨𝑵𝑺-𝑴𝑫*
`;

  try {
    await message.sendMessage(chatId, {
      text: header + commandMenu,
      contextInfo: {
        mentionedJid: [senderName],
        externalAdReply: {
          title: "THIS IS HANS-MD MULTI DEVICE",
          body: "POWERED BY HANS TZ",
          thumbnailUrl: "https://files.catbox.moe/79jj3e.jpg",
          sourceUrl: "https://whatsapp.com/channel/0029VasiOoR3bbUw5aV4qB31",
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    });
  } catch (error) {
    console.log("🥵🥵 Menu error " + error);
    reply("🥵🥵 Menu error " + error);
  }
});
