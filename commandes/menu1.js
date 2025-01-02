const util = require('util');
const fs = require('fs-extra');
const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");
const more = String.fromCharCode(8206)
const readmore = more.repeat(4001)

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
        menuMsg += `*╭────✰${cat}`;
        for (const cmd of coms[cat]) {
            menuMsg += `  
*┊✞︎* ${cmd}`;
        }
        menuMsg += `
*╰═════════════✰* \n`
    }

    menuMsg += `
     *𝑯𝑨𝑵𝑺-𝑴𝑫-𝑩𝑶𝑻-2025*                                    
*✰════════════════✰*
`;

    var lien = mybotpic();
    const sourceUrl = "https://whatsapp.com/channel/0029VasiOoR3bbUw5aV4qB31";

    if (lien.match(/\.(mp4|gif)$/i)) {
        try {
            zk.sendMessage(dest, { 
                video: { url: lien }, 
                caption: infoMsg + menuMsg, 
                footer: "Je suis *HANS-MD*, développé par Hanstz++", 
                gifPlayback: true, 
                sourceUrl: sourceUrl // Adding the view channel URL
            }, { quoted: ms });
        } catch (e) {
            console.log("🥵🥵 Menu erreur " + e);
            repondre("🥵🥵 Menu erreur " + e);
        }
    } else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
        try {
            zk.sendMessage(dest, { 
                image: { url: lien }, 
                caption: infoMsg + menuMsg, 
                footer: "*HansTz*",
                sourceUrl: sourceUrl // Adding the view channel URL
            }, { quoted: ms });
        } catch (e) {
            console.log("🥵🥵 Menu erreur " + e);
            repondre("🥵🥵 Menu erreur " + e);
        }
    } else {
        repondre(infoMsg + menuMsg + "\nSource: " + sourceUrl);
    }
});
