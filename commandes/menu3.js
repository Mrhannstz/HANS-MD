zokou({
  name: "hansmd",
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
