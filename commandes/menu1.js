zokou({ nomCom: "me2", categorie: "General" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre, prefixe, nomAuteurMessage, mybotpic } = commandeOptions;
    let { cm } = require(__dirname + "/../framework//zokou");
    var coms = {};
    var mode = "public";

    if ((s.MODE).toLocaleLowerCase() != "yes") {
        mode = "private";
    }

    cm.map(async (com, index) => {
        if (!coms[com.categorie])
            coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault('EAT');
    const temps = moment().format('HH:mm:ss');
    const date = moment().format('DD/MM/YYYY');

    let infoMsg =  `
╭─────𝐇𝐀𝐍𝐒-𝐌𝐃──────✰
┊✰───────────────✰
┊➪┊ *𝙐𝙎𝙀𝙍* : ${s.OWNER_NAME}
┊➪┊ *𝙈𝙊𝘿𝙀* : ${mode}
┊✰───────────────✰
┊➪┊ *𝙏𝙄𝙈𝙀* : ${temps}  
┊➪┊ *𝙍𝘼𝙈* : ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
┊✰───────────────✰
╰─────────────────✰ \n\n`;

    let menuMsg=`  
  *𝐇𝐀𝐍𝐒-𝐌𝐃  𝘾𝙊𝙈𝙈𝘼𝙉𝘿𝙎*
`;

    for (const cat in coms) {
        menuMsg += `*╭────✰* *${cat}* **`;
        for (const cmd of coms[cat]) {
            menuMsg += `  
*┊✞︎* ${cmd}`;
        }
        menuMsg += `
*╰═════════════✰* \n`
    }

    menuMsg += `
       ◇          ◇
*—————🎗️🎗️🎗️🎗️—————*

    *𝑯𝑨𝑵𝑺-𝑴𝑫-𝑩𝑶𝑻-2025*                                         
*╰═════════════✰*
`;

    const buttons = [
        {
            buttonId: 'view_channel',
            buttonText: { displayText: 'View Channel' },
            type: 2,
            url: 'https://whatsapp.com/channel/0029VasiOoR3bbUw5aV4qB31' // Correct URL integration
        }
    ];

    const templateMessage = {
        text: infoMsg + menuMsg,
        footer: 'Je suis *Zokou-MD*, développé par Djalega++',
        templateButtons: buttons
    };

    try {
        // Send the template message with the clickable URL
        zk.sendMessage(dest, templateMessage, { quoted: ms });
    } catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
});
