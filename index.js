var __createBinding = this && this.__createBinding || (Object.create ? function (_0x2ec542, _0x343352, _0x509ecb, _0x3fbc7a) {
  if (_0x3fbc7a === undefined) {
    _0x3fbc7a = _0x509ecb;
  }
  var _0x10699e = Object.getOwnPropertyDescriptor(_0x343352, _0x509ecb);
  if (!_0x10699e || ("get" in _0x10699e ? !_0x343352.__esModule : _0x10699e.writable || _0x10699e.configurable)) {
    _0x10699e = {
      'enumerable': true,
      'get': function () {
        return _0x343352[_0x509ecb];
      }
    };
  }
  Object.defineProperty(_0x2ec542, _0x3fbc7a, _0x10699e);
} : function (_0x5ab263, _0x22ff5c, _0x357afc, _0x53931b) {
  if (_0x53931b === undefined) {
    _0x53931b = _0x357afc;
  }
  _0x5ab263[_0x53931b] = _0x22ff5c[_0x357afc];
});
var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (_0x3e8010, _0x206e93) {
  Object.defineProperty(_0x3e8010, "default", {
    'enumerable': true,
    'value': _0x206e93
  });
} : function (_0x45b5e0, _0x39e8b4) {
  _0x45b5e0['default'] = _0x39e8b4;
});
var __importStar = this && this.__importStar || function (_0x109aba) {
  if (_0x109aba && _0x109aba.__esModule) {
    return _0x109aba;
  }
  var _0x2de687 = {};
  if (_0x109aba != null) {
    for (var _0x2c671e in _0x109aba) if (_0x2c671e !== "default" && Object.prototype.hasOwnProperty.call(_0x109aba, _0x2c671e)) {
      __createBinding(_0x2de687, _0x109aba, _0x2c671e);
    }
  }
  __setModuleDefault(_0x2de687, _0x109aba);
  return _0x2de687;
};
var __importDefault = this && this.__importDefault || function (_0x1edd0a) {
  return _0x1edd0a && _0x1edd0a.__esModule ? _0x1edd0a : {
    'default': _0x1edd0a
  };
};
Object.defineProperty(exports, "__esModule", {
  'value': true
});
const baileys_1 = __importStar(require("@whiskeysockets/baileys"));
const logger_1 = __importDefault(require("@whiskeysockets/baileys/lib/Utils/logger"));
const logger = logger_1['default'].child({});
logger.level = "silent";
const pino = require("pino");
const boom_1 = require('@hapi/boom');
const conf = require("./set");
let fs = require("fs-extra");
let path = require("path");
const FileType = require('file-type');
const {
  Sticker,
  createSticker,
  StickerTypes
} = require("wa-sticker-formatter");
const {
  verifierEtatJid,
  recupererActionJid
} = require("./bdd/antilien");
const {
  atbverifierEtatJid,
  atbrecupererActionJid
} = require("./bdd/antibot");
let evt = require(__dirname + "/framework/zokou");
const {
  isUserBanned,
  addUserToBanList,
  removeUserFromBanList
} = require("./bdd/banUser");
const {
  addGroupToBanList,
  isGroupBanned,
  removeGroupFromBanList
} = require("./bdd/banGroup");
const {
  isGroupOnlyAdmin,
  addGroupToOnlyAdminList,
  removeGroupFromOnlyAdminList
} = require("./bdd/onlyAdmin");
let {
  reagir
} = require(__dirname + "/framework/app");
var session = conf.session.replace(/Zokou-MD-WHATSAPP-BOT;;;=>/g, '');
const prefixe = conf.PREFIXE;
async function authentification() {
  try {
    if (!fs.existsSync(__dirname + "/scan/creds.json")) {
      console.log("connexion en cour ...");
      await fs.writeFileSync(__dirname + "/scan/creds.json", atob(session), "utf8");
    } else if (fs.existsSync(__dirname + "/scan/creds.json") && session != "zokk") {
      await fs.writeFileSync(__dirname + "/scan/creds.json", atob(session), "utf8");
    }
  } catch (_0x18ab95) {
    console.log("Session Invalid " + _0x18ab95);
    return;
  }
}
authentification();
0x0;
const store = baileys_1.makeInMemoryStore({
  'logger': pino().child({
    'level': "silent",
    'stream': "store"
  })
});
setTimeout(() => {
  async function _0x4b6795() {
    0x0;
    const {
      version: _0x34ccc2,
      isLatest: _0x1cf390
    } = await baileys_1.fetchLatestBaileysVersion();
    0x0;
    const {
      state: _0x32f9a7,
      saveCreds: _0x5171fb
    } = await baileys_1.useMultiFileAuthState(__dirname + "/scan");
    0x0;
    const _0x13bf45 = {
      'version': _0x34ccc2,
      'logger': pino({
        'level': "silent"
      }),
      'browser': ["ALPHA-MD", "safari", "1.0.0"],
      'printQRInTerminal': true,
      'fireInitQueries': false,
      'shouldSyncHistoryMessage': true,
      'downloadHistory': true,
      'syncFullHistory': true,
      'generateHighQualityLinkPreview': true,
      'markOnlineOnConnect': false,
      'keepAliveIntervalMs': 0x7530,
      'auth': {
        'creds': _0x4a6310.creds,
        'keys': baileys_1.makeCacheableSignalKeyStore(_0x4a6310.keys, logger)
      },
      'getMessage': async _0x3de30d => {
        if (store) {
          const _0x22f242 = await store.loadMessage(_0x3de30d.remoteJid, _0x3de30d.id, undefined);
          return _0x22f242.message || undefined;
        }
        const _0x6b0a19 = {
          conversation: "An Error Occurred, Repeat Command!"
        };
        return _0x6b0a19;
      }
    };
    0;
    const _0x1d8fe1 = baileys_1["default"](_0x11205e);
    store.bind(_0x1d8fe1.ev);
    setInterval(() => {
      store.writeToFile("store.json");
    }, 3000);
    _0x1d8fe1.ev.on("call", async _0x26a5a2 => {
      if (conf.ANTICALL === "yes") {
        const _0x4c38af = _0x26a5a2[0].id;
        const _0x1a89d0 = _0x26a5a2[0].from;
        await _0x1d8fe1.rejectCall(_0x4c38af, _0x1a89d0);
        const _0x3eade1 = {
          text: "```❗📵I AM ALPHA MD | I REJECT THIS CALL BECAUSE MY OWNER IS BUSY.KINDLY SEND TEXT INSTEAD``` ."
        };
        await _0x1d8fe1.sendMessage(_0x1a89d0, _0x3eade1);
      }
    });
    let _0x4d8780 = new Set();
    _0x1d8fe1.ev.on("messages.upsert", async _0x3905a0 => {
      const {
        messages: _0x23b79a
      } = _0x3905a0;
      const _0x28a916 = _0x23b79a[0];
      if (!_0x28a916.message) {
        return;
      }
      const _0x393d08 = _0x28a916.message.conversation || _0x28a916.message.extendedTextMessage?.["text"] || '';
      const _0x13d30e = _0x28a916.key.remoteJid;
      const _0x4b1d57 = _0x28a916.key.remoteJid;
      const _0x266456 = _0x4b1d57.split('@')[0];
      auto_reply_message = "Hello @" + _0x266456 + ", my owner is unavailable right now kindly leave a message.";
      if (_0x393d08.match(/^[^\w\s]/) && _0x28a916.key.fromMe) {
        const _0x38a253 = _0x393d08[0];
        const _0x3d0ed9 = _0x393d08.slice(1).split(" ")[0];
        const _0x4671ac = _0x393d08.slice(_0x38a253.length + _0x3d0ed9.length).trim();
        if (_0x3d0ed9 === "setautoreply" && _0x4671ac) {
          auto_reply_message = _0x4671ac;
          const _0xbfeec3 = {
            text: "Auto-reply message has been updated to:\n\"" + auto_reply_message + "\""
          };
          await _0x1d8fe1.sendMessage(_0x13d30e, _0xbfeec3);
          return;
        }
      }
      if (conf.AUTO_REPLY === "yes" && !_0x4d8780.has(_0x13d30e) && !_0x28a916.key.fromMe && !_0x13d30e.includes("@g.us")) {
        const _0x2103a7 = {
          text: auto_reply_message,
          mentions: [_0x4b1d57]
        };
        await _0x1d8fe1.sendMessage(_0x13d30e, _0x2103a7);
        _0x4d8780.add(_0x13d30e);
      }
    });
    async function _0x456d32(_0x1816e8) {
      const _0x450487 = Object.keys(_0x1816e8)[0].replace("Message", '');
      const _0x2bda56 = await baileys.downloadContentFromMessage(_0x1816e8[_0x450487], _0x450487);
      let _0x5e0069 = Buffer.from([]);
      try {
        for await (const _0xd35bf4 of _0x2bda56) {
          _0x5e0069 = Buffer.concat([_0x5e0069, _0xd35bf4]);
        }
        return _0x5e0069;
      } catch (_0x31f7d9) {
        console.error("Error downloading media:", _0x31f7d9);
        return null;
      }
    }
    function _0x2a8914(_0x2019ab) {
      const _0x3c3368 = _0x2019ab.key.participant || _0x2019ab.key.remoteJid;
      let _0x494534 = "*😈ALPHA ANTIDELETE👿*\n\n";
      _0x494534 += "*Time deleted🥀:* " + new Date().toLocaleString() + "\n\n";
      _0x494534 += "*Deleted by🌷:* @" + _0x3c3368.split('@')[0] + "\n\n\n*powered by Keithkeizzah*";
      return _0x494534;
    }
    _0x1d8fe1.ev.on("messages.upsert", async _0x45f453 => {
      if (conf.ADM === "yes") {
        const {
          messages: _0x2e4813
        } = _0x45f453;
        const _0x42f081 = _0x2e4813[0];
        if (!_0x42f081.message) {
          return;
        }
        const _0x318f35 = _0x42f081.key;
        const _0x18af94 = _0x318f35.remoteJid;
        if (!store.chats[_0x18af94]) {
          store.chats[_0x18af94] = [];
        }
        store.chats[_0x18af94].push(_0x42f081);
        if (_0x42f081.message.protocolMessage && _0x42f081.message.protocolMessage.type === 0) {
          const _0x3f8517 = _0x42f081.message.protocolMessage.key;
          const _0x2e7dfb = store.chats[_0x18af94];
          const _0x49c66c = _0x2e7dfb.find(_0x4881ee => _0x4881ee.key.id === _0x3f8517.id);
          if (_0x49c66c) {
            try {
              const _0x3b2d1a = _0x2a8914(_0x49c66c);
              if (_0x49c66c.message.conversation) {
                await _0x1d8fe1.sendMessage(_0x18af94, {
                  'text': _0x3b2d1a + ("*Message:* " + _0x49c66c.message.conversation),
                  'mentions': [_0x49c66c.key.participant]
                });
              } else {
                if (_0x49c66c.message.imageMessage || _0x49c66c.message.videoMessage || _0x49c66c.message.documentMessage || _0x49c66c.message.audioMessage || _0x49c66c.message.stickerMessage || _0x49c66c.message.voiceMessage) {
                  const _0x2da526 = await _0x456d32(_0x49c66c.message);
                  if (_0x2da526) {
                    const _0x5963a8 = {
                      _0x13ba27: _0x2da526,
                      caption: _0x3b2d1a,
                      mentions: [_0x49c66c.key.participant]
                    };
                    await _0x1d8fe1.sendMessage(_0x18af94, _0x5963a8);
                  }
                }
              }
            } catch (_0xa726f1) {
              console.error("Error handling deleted message:", _0xa726f1);
            }
          }
        }
      }
    });
    if (conf.AUTO_REACT === "yes") {
      _0x1d8fe1.ev.on("messages.upsert", async _0x537989 => {
        const {
          messages: _0x49de4e
        } = _0x537989;
        const _0x29f754 = path.resolve(__dirname, "database", "emojis.json");
        let _0xdb2330 = [];
        try {
          const _0x25c2d2 = fs.readFileSync(_0x29f754, "utf8");
          _0xdb2330 = JSON.parse(_0x25c2d2);
        } catch (_0x211def) {
          console.error("Error reading emojis file:", _0x211def);
          return;
        }
        for (const _0x5d5c8d of _0x49de4e) {
          if (!_0x5d5c8d.key.fromMe) {
            const _0x2bd8db = _0xdb2330[Math.floor(Math.random() * _0xdb2330.length)];
            await _0x1d8fe1.sendMessage(_0x5d5c8d.key.remoteJid, {
              'react': {
                'text': _0x2bd8db,
                'key': _0x5d5c8d.key
              }
            });
          }
        }
      });
    }
    const _0x20c2eb = _0xa44406 => new Promise(_0x2b6053 => setTimeout(_0x2b6053, _0xa44406));
    let _0x2ab10e = 0;
    const _0x4457d1 = ['❤️', '💖', '💘', '💝', '💓', '💌', '💕', '😎', '🔥', '💥', '💯', '✨', '🌟', '🌈', '⚡', '💎', '🌀', '👑', '🎉', '🎊', '🦄', '👽', '🛸', '🚀', '🦋', '💫', '🍀', '🎶', '🎧', '🎸', '🎤', '🏆', '🏅', '🌍', '🌎', '🌏', '🎮', '🎲', '💪', "🏋️", '🥇', '👟', '🏃', '🚴', '🚶', '🏄', '⛷️', "🕶️", '🧳', '🍿', '🍿', '🥂', '🍻', '🍷', '🍸', '🥃', '🍾', '🎯', '⏳', '🎁', '🎈', '🎨', '🌻', '🌸', '🌺', '🌹', '🌼', '🌞', '🌝', '🌜', '🌙', '🌚', '🍀', '🌱', '🍃', '🍂', '🌾', '🐉', '🐍', '🦓', '🦄', '🦋', '🦧', '🦘', '🦨', '🦡', '🐉', '🐅', '🐆', '🐓', '🐢', '🐊', '🐠', '🐟', '🐡', '🦑', '🐙', '🦀', '🐬', '🦕', '🦖', '🐾', '🐕', '🐈', '🐇', '🐾'];
    if (conf.AUTO_LIKE_STATUS === "yes") {
      console.log("AUTO_LIKE_STATUS is enabled. Listening for status updates...");
      _0x1d8fe1.ev.on("messages.upsert", async _0x184045 => {
        const {
          messages: _0x1f1e24
        } = _0x184045;
        for (const _0x10404f of _0x1f1e24) {
          if (_0x10404f.key && _0x10404f.key.remoteJid === "status@broadcast") {
            console.log("Detected status update from:", _0x10404f.key.remoteJid);
            const _0x57adee = Date.now();
            if (_0x57adee - _0x2ab10e < 5000) {
              console.log("Throttling reactions to prevent overflow.");
              continue;
            }
            const _0x214fce = _0x1d8fe1.user && _0x1d8fe1.user.id ? _0x1d8fe1.user.id.split(':')[0] + "@s.whatsapp.net" : null;
            if (!_0x214fce) {
              console.log("Bot's user ID not available. Skipping reaction.");
              continue;
            }
            const _0x27a7c9 = _0x4457d1[Math.floor(Math.random() * _0x4457d1.length)];
            await _0x1d8fe1.sendMessage(_0x10404f.key.remoteJid, {
              'react': {
                'key': _0x10404f.key,
                'text': _0x27a7c9
              }
            }, {
              'statusJidList': [_0x10404f.key.participant]
            });
            _0x2ab10e = Date.now();
            console.log("Successfully reacted to status update by " + _0x10404f.key.remoteJid + " with " + _0x27a7c9);
            await _0x20c2eb(2000);
          }
        }
      });
    }
    _0x1d8fe1.ev.on("messages.upsert", async _0x2f6478 => {
      const {
        messages: _0x3b5369
      } = _0x2f6478;
      const _0x337901 = _0x3b5369[0];
      if (!_0x337901.message) {
        return;
      }
      const _0x381ebe = _0x11516d => {
        if (!_0x11516d) {
          return _0x11516d;
        }
        if (/:\d+@/gi.test(_0x11516d)) {
          0;
          let _0x5a8693 = baileys_1.jidDecode(_0x11516d) || {};
          return _0x5a8693.user && _0x5a8693.server && _0x5a8693.user + '@' + _0x5a8693.server || _0x11516d;
        } else {
          return _0x11516d;
        }
      };
      0;
      var _0x2cfb50 = baileys_1.getContentType(_0x337901.message);
      var _0x4beeef = _0x2cfb50 == "conversation" ? _0x337901.message.conversation : _0x2cfb50 == "imageMessage" ? _0x337901.message.imageMessage?.["caption"] : _0x2cfb50 == "videoMessage" ? _0x337901.message.videoMessage?.["caption"] : _0x2cfb50 == "extendedTextMessage" ? _0x337901.message?.["extendedTextMessage"]?.["text"] : _0x2cfb50 == "buttonsResponseMessage" ? _0x337901?.["message"]?.["buttonsResponseMessage"]?.["selectedButtonId"] : _0x2cfb50 == "listResponseMessage" ? _0x337901.message?.["listResponseMessage"]?.["singleSelectReply"]?.["selectedRowId"] : _0x2cfb50 == "messageContextInfo" ? _0x337901?.["message"]?.["buttonsResponseMessage"]?.["selectedButtonId"] || _0x337901.message?.["listResponseMessage"]?.["singleSelectReply"]?.["selectedRowId"] || _0x337901.text : '';
      var _0x7e6874 = _0x337901.key.remoteJid;
      var _0x2f449a = _0x381ebe(_0x1d8fe1.user.id);
      var _0x1a609a = _0x2f449a.split('@')[0];
      const _0xdd939b = _0x7e6874?.["endsWith"]("@g.us");
      var _0x33577e = _0xdd939b ? await _0x1d8fe1.groupMetadata(_0x7e6874) : '';
      var _0x439878 = _0xdd939b ? _0x33577e.subject : '';
      var _0xdda40c = _0x337901.message.extendedTextMessage?.["contextInfo"]?.["quotedMessage"];
      var _0x48585a = _0x381ebe(_0x337901.message?.["extendedTextMessage"]?.["contextInfo"]?.["participant"]);
      var _0x22f68c = _0xdd939b ? _0x337901.key.participant ? _0x337901.key.participant : _0x337901.participant : _0x7e6874;
      if (_0x337901.key.fromMe) {
        _0x22f68c = _0x2f449a;
      }
      var _0x370691 = _0xdd939b ? _0x337901.key.participant : '';
      const {
        getAllSudoNumbers: _0x35a928
      } = require("./bdd/sudo");
      const _0x5aeacc = _0x337901.pushName;
      const _0x530c37 = await _0x35a928();
      const _0x56949c = [_0x1a609a, "254748387615", "254110190196", "254748387615", "254796299159", "254752925938", conf.NUMERO_OWNER].map(_0x25900e => _0x25900e.replace(/[^0-9]/g) + "@s.whatsapp.net");
      const _0x31d690 = _0x56949c.concat(_0x530c37);
      const _0x1b21c7 = _0x31d690.includes(_0x22f68c);
      var _0x13fc1f = ["254110190196", "254748387615", "254796299159", "254752925938"].map(_0x1c16f1 => _0x1c16f1.replace(/[^0-9]/g) + "@s.whatsapp.net").includes(_0x22f68c);
      function _0xcfffa2(_0x1dedfd) {
        const _0x29bc09 = {
          text: _0x1dedfd
        };
        const _0x4aacb2 = {
          quoted: _0x337901
        };
        _0x1d8fe1.sendMessage(_0x7e6874, _0x29bc09, _0x4aacb2);
      }
      console.log("\t [][]...{Alpha-Md}...[][]");
      console.log("=========== New message ===========");
      if (_0xdd939b) {
        console.log("message sent from : " + _0x439878);
      }
      console.log("message from : [" + _0x5aeacc + " : " + _0x22f68c.split("@s.whatsapp.net")[0] + " ]");
      console.log("type of message : " + _0x2cfb50);
      console.log("------end of your messages ------");
      console.log(_0x4beeef);
      function _0x31dfe4(_0x11d01e) {
        let _0x4e05b8 = [];
        for (_0x2f6478 of _0x11d01e) {
          if (_0x2f6478.admin == null) {
            continue;
          }
          _0x4e05b8.push(_0x2f6478.id);
        }
        return _0x4e05b8;
      }
      var _0x4f3cc3 = conf.ETAT;
      if (_0x4f3cc3 == 1) {
        await _0x1d8fe1.sendPresenceUpdate("available", _0x7e6874);
      } else {
        if (_0x4f3cc3 == 2) {
          await _0x1d8fe1.sendPresenceUpdate("composing", _0x7e6874);
        } else {
          if (_0x4f3cc3 == 3) {
            await _0x1d8fe1.sendPresenceUpdate("recording", _0x7e6874);
          } else {
            await _0x1d8fe1.sendPresenceUpdate("unavailable", _0x7e6874);
          }
        }
      }
      const _0x49314f = _0xdd939b ? await _0x33577e.participants : '';
      let _0x3fc815 = _0xdd939b ? _0x31dfe4(_0x49314f) : '';
      const _0x53556c = _0xdd939b ? _0x3fc815.includes(_0x22f68c) : false;
      var _0x132d02 = _0xdd939b ? _0x3fc815.includes(_0x2f449a) : false;
      const _0x34ad05 = _0x4beeef ? _0x4beeef.trim().split(/ +/).slice(1) : null;
      const _0x5b963a = _0x4beeef ? _0x4beeef.startsWith(prefixe) : false;
      const _0x5d6c7a = _0x5b963a ? _0x4beeef.slice(1).trim().split(/ +/).shift().toLowerCase() : false;
      const _0x4fcdb3 = conf.URL.split(',');
      function _0x3c2005() {
        const _0x10476c = Math.floor(Math.random() * _0x4fcdb3.length);
        const _0xdb7f60 = _0x4fcdb3[_0x10476c];
        return _0xdb7f60;
      }
      const _0x3eb6eb = {
        superUser: _0x1b21c7,
        dev: _0x13fc1f,
        verifGroupe: _0xdd939b,
        mbre: _0x49314f,
        membreGroupe: _0x370691,
        verifAdmin: _0x53556c,
        infosGroupe: _0x33577e
      };
      _0x3eb6eb.nomGroupe = _0x439878;
      _0x3eb6eb.auteurMessage = _0x22f68c;
      _0x3eb6eb.nomAuteurMessage = _0x5aeacc;
      _0x3eb6eb.idBot = _0x2f449a;
      _0x3eb6eb.verifZokouAdmin = _0x132d02;
      _0x3eb6eb.prefixe = prefixe;
      _0x3eb6eb.arg = _0x34ad05;
      _0x3eb6eb.repondre = _0xcfffa2;
      _0x3eb6eb.mtype = _0x2cfb50;
      _0x3eb6eb.groupeAdmin = _0x31dfe4;
      _0x3eb6eb.msgRepondu = _0xdda40c;
      _0x3eb6eb.auteurMsgRepondu = _0x48585a;
      _0x3eb6eb.ms = _0x337901;
      _0x3eb6eb.mybotpic = _0x3c2005;
      if (_0x7e6874 === "120363244435092946@g.us") {
        return;
      }
      if (conf.AUTO_READ_MESSAGES === "yes") {
        _0x1d8fe1.ev.on("messages.upsert", async _0x4f6405 => {
          const {
            messages: _0x5290a1
          } = _0x4f6405;
          for (const _0x1a8695 of _0x5290a1) {
            if (!_0x1a8695.key.fromMe) {
              await _0x1d8fe1.readMessages([_0x1a8695.key]);
            }
          }
        });
      }
      if (_0x337901.message?.["viewOnceMessage"] || _0x337901.message?.["viewOnceMessageV2"] || _0x337901.message?.["viewOnceMessageV2Extension"]) {
        if (conf.ANTI_VV.toLowerCase() === "yes" && !_0x337901.key.fromMe) {
          const _0x3e5697 = _0x337901.message[_0x2cfb50];
          if (_0x3e5697.imageMessage) {
            const _0x538ef1 = await _0x1d8fe1.downloadAndSaveMediaMessage(_0x3e5697.imageMessage);
            const _0x432041 = _0x3e5697.imageMessage.caption;
            const _0x1a5856 = {
              url: _0x538ef1
            };
            const _0x1815e8 = {
              image: _0x1a5856,
              caption: _0x432041
            };
            const _0x2311e2 = {
              quoted: _0x337901
            };
            await _0x1d8fe1.sendMessage(_0x2f449a, _0x1815e8, _0x2311e2);
          } else {
            if (_0x3e5697.videoMessage) {
              const _0x24470b = await _0x1d8fe1.downloadAndSaveMediaMessage(_0x3e5697.videoMessage);
              const _0x3d8b28 = _0x3e5697.videoMessage.caption;
              const _0x1591de = {
                url: _0x24470b
              };
              const _0x71dcd4 = {
                video: _0x1591de,
                caption: _0x3d8b28
              };
              const _0x48bbd1 = {
                quoted: _0x337901
              };
              await _0x1d8fe1.sendMessage(_0x2f449a, _0x71dcd4, _0x48bbd1);
            } else {
              if (_0x3e5697.audioMessage) {
                const _0x192c6e = await _0x1d8fe1.downloadAndSaveMediaMessage(_0x3e5697.audioMessage);
                const _0x56bab4 = {
                  url: _0x192c6e
                };
                const _0x6a6381 = {
                  audio: _0x56bab4,
                  mymetype: "audio/mp4"
                };
                const _0x3c7de1 = {
                  quoted: _0x337901,
                  ptt: false
                };
                await _0x1d8fe1.sendMessage(_0x2f449a, _0x6a6381, _0x3c7de1);
              }
            }
          }
        }
      }
      if (_0x337901.message?.["imageMessage"] || _0x337901.message?.["audioMessage"] || _0x337901.message?.["videoMessage"] || _0x337901.message?.["stickerMessage"] || _0x337901.message?.["documentMessage"]) {
        let _0x2258d4;
        if (_0x337901.has("antispam")) {
          _0x2258d4 = _0x337901.get("antispam").includes(_0x7e6874);
        } else {
          const _0x56ae1d = await antispamFunctions();
          _0x2258d4 = _0x56ae1d.includes(_0x7e6874);
          _0x337901.set("antispam", _0x56ae1d);
        }
        if (_0xdd939b && _0x2258d4 && !_0x1b21c7 && !_0x53556c) {
          console.warn("------------------Media------sent--------------------");
          const _0x28e1fc = spamCache.get(_0x22f68c + '_' + _0x7e6874);
          if (_0x28e1fc) {
            if (_0x28e1fc.length >= 4) {
              _0x28e1fc.push(_0x337901.key);
              _0x28e1fc.forEach(_0xc67975 => {
                const _0xf72503 = {
                  "delete": _0xc67975
                };
                _0x1d8fe1.sendMessage(_0x7e6874, _0xf72503);
              });
              _0x1d8fe1.groupParticipantsUpdate(_0x7e6874, [_0x22f68c], "remove").then(() => {
                _0x1d8fe1.sendMessage(_0x7e6874, {
                  'text': '@' + _0x22f68c.split('@')[0] + " removed because of spamming in group",
                  'mentions': [_0x22f68c]
                });
              })["catch"](_0x15f168 => console.log(_0x15f168));
            } else {
              _0x28e1fc.push(_0x337901.key);
              spamCache.set(_0x22f68c + '_' + _0x7e6874, _0x28e1fc, 120);
            }
          } else {
            spamCache.set(_0x22f68c + '_' + _0x7e6874, [_0x337901.key]);
          }
        }
      }
      if (_0x337901.key && _0x337901.key.remoteJid === "status@broadcast" && conf.AUTO_READ_STATUS === "yes") {
        await _0x1d8fe1.readMessages([_0x337901.key]);
      }
      if (conf.ANTILINK === "yes") {
        _0x1d8fe1.ev.on("messages.upsert", async _0x452293 => {
          const {
            messages: _0x3d6433
          } = _0x452293;
          const _0x267479 = _0x3d6433[0];
          if (!_0x267479.message) {
            return;
          }
          const _0x25e9bc = _0x267479.message.conversation || _0x267479.message.extendedTextMessage?.["text"] || '';
          const _0x4b38c2 = _0x267479.key;
          const _0x4fcb64 = _0x4b38c2.remoteJid;
          if (!store.chats[_0x4fcb64]) {
            store.chats[_0x4fcb64] = [];
          }
          store.chats[_0x4fcb64].push(_0x267479);
          if (_0x25e9bc.includes("chat.whatsapp.com") && !conf.superUser.includes(_0x267479.key.participant) && conf.verifAdmin && !conf.groupeAdmin.includes(_0x267479.key.participant) && _0x267479.key.remoteJid.includes("@g.us")) {
            _0xcfffa2("_Group link detected_");
            const _0x193952 = _0x267479.key.participant || _0x267479.key.remoteJid;
            const _0x171961 = _0x267479.key.remoteJid;
            await _0x1d8fe1.sendMessage(_0x171961, {
              'delete': {
                'remoteJid': _0x171961,
                'fromMe': false,
                'id': _0x267479.key.id,
                'participant': _0x193952
              }
            });
            await _0x1d8fe1.groupParticipantsUpdate(_0x171961, [_0x193952], "remove");
            const _0x50440e = {
              quoted: _0x267479
            };
            await _0x1d8fe1.sendMessage(_0x171961, {
              'text': "Removed!\n\n@" + _0x193952.split('@')[0] + " sending group links is prohibited!",
              'contextInfo': {
                'mentionedJid': [_0x193952]
              }
            }, _0x50440e);
          }
        });
      }
      if (_0x337901.key && _0x337901.key.remoteJid === "status@broadcast" && conf.AUTO_DOWNLOAD_STATUS === "yes") {
        try {
          if (_0x337901.message.extendedTextMessage) {
            const _0x420b05 = _0x337901.message.extendedTextMessage.text;
            const _0xd892c7 = {
              text: _0x420b05
            };
            const _0x4121b3 = {
              quoted: _0x337901
            };
            await _0x1d8fe1.sendMessage(_0x2f449a, _0xd892c7, _0x4121b3);
          } else {
            if (_0x337901.message.imageMessage) {
              const _0x71e1f0 = _0x337901.message.imageMessage.caption || "No caption";
              const _0x454356 = await _0x1d8fe1.downloadAndSaveMediaMessage(_0x337901.message.imageMessage);
              const _0x2fc1ca = {
                url: _0x454356
              };
              const _0x4fc881 = {
                image: _0x2fc1ca,
                caption: _0x71e1f0
              };
              const _0x399df5 = {
                quoted: _0x337901
              };
              await _0x1d8fe1.sendMessage(_0x2f449a, _0x4fc881, _0x399df5);
            } else {
              if (_0x337901.message.videoMessage) {
                const _0x260c27 = _0x337901.message.videoMessage.caption || "No caption";
                const _0x2ae009 = await _0x1d8fe1.downloadAndSaveMediaMessage(_0x337901.message.videoMessage);
                const _0x4181d7 = {
                  url: _0x2ae009
                };
                const _0x417b84 = {
                  video: _0x4181d7,
                  caption: _0x260c27
                };
                const _0x34648d = {
                  quoted: _0x337901
                };
                await _0x1d8fe1.sendMessage(_0x2f449a, _0x417b84, _0x34648d);
              }
            }
          }
        } catch (_0x1833c3) {
          console.error("Error in downloading or sending status:", _0x1833c3);
        }
      }
      if (!_0x13fc1f && _0x7e6874 === "120363158701337904@g.us") {
        return;
      }
      if (_0x4beeef && _0x22f68c.endsWith("s.whatsapp.net")) {
        const {
          ajouterOuMettreAJourUserData: _0x349eb0
        } = require("./bdd/level");
        try {
          await _0x349eb0(_0x22f68c);
        } catch (_0x3e22b3) {
          console.error(_0x3e22b3);
        }
      }
      try {
        if (_0x337901.message[_0x2cfb50].contextInfo.mentionedJid && (_0x337901.message[_0x2cfb50].contextInfo.mentionedJid.includes(_0x2f449a) || _0x337901.message[_0x2cfb50].contextInfo.mentionedJid.includes(conf.NUMERO_OWNER + "@s.whatsapp.net"))) {
          if (_0x7e6874 == "120363158701337904@g.us") {
            return;
          }
          ;
          if (_0x1b21c7) {
            console.log("hummm");
            return;
          }
          let _0x2d97f6 = require("./bdd/mention");
          let _0x43b2fb = await _0x2d97f6.recupererToutesLesValeurs();
          let _0x349b2a = _0x43b2fb[0];
          if (_0x349b2a.status === "non") {
            console.log("mention pas actifs");
            return;
          }
          let _0x421ec9;
          if (_0x349b2a.type.toLocaleLowerCase() === "image") {
            const _0x54c849 = {
              url: _0x349b2a.url
            };
            const _0x39a839 = {
              image: _0x54c849,
              caption: _0x349b2a.message
            };
            _0x421ec9 = _0x39a839;
          } else {
            if (_0x349b2a.type.toLocaleLowerCase() === "video") {
              const _0x57abaa = {
                url: _0x349b2a.url
              };
              const _0x8ff2e8 = {
                video: _0x57abaa,
                caption: _0x349b2a.message
              };
              _0x421ec9 = _0x8ff2e8;
            } else {
              if (_0x349b2a.type.toLocaleLowerCase() === "sticker") {
                const _0x58e6ce = {
                  pack: conf.NOM_OWNER,
                  type: StickerTypes.FULL,
                  categories: ['🤩', '🎉'],
                  id: "12345",
                  quality: 0x46,
                  background: "transparent"
                };
                let _0x293aa0 = new Sticker(_0x349b2a.url, _0x58e6ce);
                const _0x284739 = await _0x293aa0.toBuffer();
                const _0x1344b5 = {
                  sticker: _0x284739
                };
                _0x421ec9 = _0x1344b5;
              } else {
                if (_0x349b2a.type.toLocaleLowerCase() === "audio") {
                  const _0x101f75 = {
                    url: _0x349b2a.url
                  };
                  const _0x38c4ee = {
                    audio: _0x101f75,
                    mimetype: "audio/mp4"
                  };
                  _0x421ec9 = _0x38c4ee;
                }
              }
            }
          }
          const _0x4d36f4 = {
            quoted: _0x337901
          };
          _0x1d8fe1.sendMessage(_0x7e6874, _0x421ec9, _0x4d36f4);
        }
      } catch (_0x15187b) {}
      try {
        const _0x5adf31 = _0x337901.key?.['id']?.["startsWith"]("BAES") && _0x337901.key?.['id']?.["length"] === 16;
        const _0x3320b7 = _0x337901.key?.['id']?.["startsWith"]("BAE5") && _0x337901.key?.['id']?.["length"] === 16;
        if (_0x5adf31 || _0x3320b7) {
          if (_0x2cfb50 === "reactionMessage") {
            console.log("Je ne reagis pas au reactions");
            return;
          }
          ;
          const _0x85ed55 = await atbverifierEtatJid(_0x7e6874);
          if (!_0x85ed55) {
            return;
          }
          ;
          if (_0x53556c || _0x22f68c === _0x2f449a) {
            console.log("je fais rien");
            return;
          }
          ;
          const _0x461a49 = {
            remoteJid: _0x7e6874,
            fromMe: false,
            id: _0x337901.key.id,
            participant: _0x22f68c
          };
          var _0x3cbdff = "bot detected, \n";
          var _0x47f092 = new Sticker("https://raw.githubusercontent.com/djalega8000/Zokou-MD/main/media/remover.gif", {
            'pack': "Alpha-Md",
            'author': conf.OWNER_NAME,
            'type': StickerTypes.FULL,
            'categories': ['🤩', '🎉'],
            'id': "12345",
            'quality': 0x32,
            'background': "#000000"
          });
          await _0x47f092.toFile("st1.webp");
          var _0x371aa2 = await atbrecupererActionJid(_0x7e6874);
          if (_0x371aa2 === "remove") {
            _0x3cbdff += "message deleted \n @" + _0x22f68c.split('@')[0] + " removed from group.";
            await _0x1d8fe1.sendMessage(_0x7e6874, {
              'sticker': fs.readFileSync("st1.webp")
            });
            0;
            baileys_1.delay(800);
            const _0x1405ec = {
              text: _0x3cbdff,
              mentions: [_0x22f68c]
            };
            const _0x2c9a80 = {
              quoted: _0x337901
            };
            await _0x1d8fe1.sendMessage(_0x7e6874, _0x1405ec, _0x2c9a80);
            try {
              await _0x1d8fe1.groupParticipantsUpdate(_0x7e6874, [_0x22f68c], "remove");
            } catch (_0x28308a) {
              console.log("antibot ") + _0x28308a;
            }
            const _0x3d1845 = {
              "delete": _0x461a49
            };
            await _0x1d8fe1.sendMessage(_0x7e6874, _0x3d1845);
            await fs.unlink("st1.webp");
          } else {
            if (_0x371aa2 === "delete") {
              _0x3cbdff += "message delete \n @" + _0x22f68c.split('@')[0] + " Avoid sending link.";
              const _0x2e48d1 = {
                text: _0x3cbdff,
                mentions: [_0x22f68c]
              };
              const _0x262265 = {
                quoted: _0x337901
              };
              await _0x1d8fe1.sendMessage(_0x7e6874, _0x2e48d1, _0x262265);
              const _0x51708b = {
                "delete": _0x461a49
              };
              await _0x1d8fe1.sendMessage(_0x7e6874, _0x51708b);
              await fs.unlink("st1.webp");
            } else {
              if (_0x371aa2 === "warn") {
                const {
                  getWarnCountByJID: _0x43b81d,
                  ajouterUtilisateurAvecWarnCount: _0x3338bf
                } = require("./bdd/warn");
                let _0x45cf0d = await _0x43b81d(_0x22f68c);
                let _0x110014 = conf.WARN_COUNT;
                if (_0x45cf0d >= _0x110014) {
                  const _0x349c94 = {
                    text: "bot detected ;you will be remove because of reaching warn-limit",
                    mentions: [_0x22f68c]
                  };
                  const _0x52b619 = {
                    quoted: _0x337901
                  };
                  await _0x1d8fe1.sendMessage(_0x7e6874, _0x349c94, _0x52b619);
                  await _0x1d8fe1.groupParticipantsUpdate(_0x7e6874, [_0x22f68c], "remove");
                  const _0x4c70a5 = {
                    "delete": _0x461a49
                  };
                  await _0x1d8fe1.sendMessage(_0x7e6874, _0x4c70a5);
                } else {
                  var _0x264710 = _0x110014 - _0x45cf0d;
                  await _0x3338bf(_0x22f68c);
                  const _0x54db84 = {
                    text: "bot detected , your warn_count was upgrade ;\n rest : " + _0x264710 + " ",
                    mentions: [_0x22f68c]
                  };
                  const _0x5940e2 = {
                    quoted: _0x337901
                  };
                  await _0x1d8fe1.sendMessage(_0x7e6874, _0x54db84, _0x5940e2);
                  const _0x71ce1d = {
                    "delete": _0x461a49
                  };
                  await _0x1d8fe1.sendMessage(_0x7e6874, _0x71ce1d);
                }
              }
            }
          }
        }
      } catch (_0x5048b5) {
        console.log(".... " + _0x5048b5);
      }
      if (_0x5b963a) {
        const _0x15db38 = evt.cm.find(_0x53f97b => _0x53f97b.nomCom === _0x5d6c7a || _0x53f97b.nomCom === _0x5d6c7a || _0x53f97b.aliases && _0x53f97b.aliases.includes(_0x5d6c7a));
        if (_0x15db38) {
          try {
            if (conf.MODE.toLocaleLowerCase() != "yes" && !_0x1b21c7) {
              return;
            }
            if (!_0x1b21c7 && _0x7e6874 === _0x22f68c && conf.PM_PERMIT === "yes") {
              _0xcfffa2("SORRY!! ❌ You don't have acces to commands here idiot");
              return;
            }
            if (!_0x1b21c7 && _0xdd939b) {
              let _0x1f647d = await isGroupBanned(_0x7e6874);
              if (_0x1f647d) {
                return;
              }
            }
            if (!_0x53556c && _0xdd939b) {
              let _0x187daa = await isGroupOnlyAdmin(_0x7e6874);
              if (_0x187daa) {
                return;
              }
            }
            if (!_0x1b21c7) {
              let _0x42ee2b = await isUserBanned(_0x22f68c);
              if (_0x42ee2b) {
                _0xcfffa2("You are banned from bot commands");
                return;
              }
            }
            reagir(_0x7e6874, _0x1d8fe1, _0x337901, _0x15db38.reaction);
            _0x15db38.fonction(_0x7e6874, _0x1d8fe1, _0x3eb6eb);
          } catch (_0x585f0d) {
            console.log("😡😡 " + _0x585f0d);
            const _0x13c5b3 = {
              quoted: _0x337901
            };
            _0x1d8fe1.sendMessage(_0x7e6874, {
              'text': "😡😡 " + _0x585f0d
            }, _0x13c5b3);
          }
        }
      }
    });
    const {
      recupevents: _0x224d48
    } = require("./bdd/welcome");
    _0x1d8fe1.ev.on("group-participants.update", async _0x275e94 => {
      console.log(_0x275e94);
      let _0x206d3f;
      try {
        _0x206d3f = await _0x1d8fe1.profilePictureUrl(_0x275e94.id, "image");
      } catch {
        _0x206d3f = "https://ibb.co/7SKY0tg";
      }
      try {
        const _0x324d4e = await _0x1d8fe1.groupMetadata(_0x275e94.id);
        if (_0x275e94.action == "add" && (await _0x224d48(_0x275e94.id, "welcome")) == 'on') {
          let _0x3aed07 = "👋 Hello\n";
          let _0x86ff90 = _0x275e94.participants;
          for (let _0x196351 of _0x86ff90) {
            _0x3aed07 += " *@" + _0x196351.split('@')[0] + "* Welcome to Our Official Group,";
          }
          _0x3aed07 += "You might want to read the group Description to avoid getting removed...";
          const _0x1cc535 = {
            url: _0x206d3f
          };
          const _0x3e1453 = {
            image: _0x1cc535,
            caption: _0x3aed07,
            mentions: _0x86ff90
          };
          _0x1d8fe1.sendMessage(_0x275e94.id, _0x3e1453);
        } else {
          if (_0x275e94.action == "remove" && (await _0x224d48(_0x275e94.id, "goodbye")) == 'on') {
            let _0xa03eb3 = "one or somes member(s) left group;\n";
            let _0x2454cb = _0x275e94.participants;
            for (let _0x2e49e4 of _0x2454cb) {
              _0xa03eb3 += '@' + _0x2e49e4.split('@')[0] + "\n";
            }
            const _0x15e311 = {
              text: _0xa03eb3,
              mentions: _0x2454cb
            };
            _0x1d8fe1.sendMessage(_0x275e94.id, _0x15e311);
          } else {
            if (_0x275e94.action == "promote" && (await _0x224d48(_0x275e94.id, "antipromote")) == 'on') {
              if (_0x275e94.author == _0x324d4e.owner || _0x275e94.author == conf.NUMERO_OWNER + "@s.whatsapp.net" || _0x275e94.author == decodeJid(_0x1d8fe1.user.id) || _0x275e94.author == _0x275e94.participants[0]) {
                console.log("Cas de superUser je fais rien");
                return;
              }
              ;
              await _0x1d8fe1.groupParticipantsUpdate(_0x275e94.id, [_0x275e94.author, _0x275e94.participants[0]], "demote");
              _0x1d8fe1.sendMessage(_0x275e94.id, {
                'text': '@' + _0x275e94.author.split('@')[0] + " has violated the anti-promotion rule, therefore both " + _0x275e94.author.split('@')[0] + " and @" + _0x275e94.participants[0].split('@')[0] + " have been removed from administrative rights.",
                'mentions': [_0x275e94.author, _0x275e94.participants[0]]
              });
            } else {
              if (_0x275e94.action == "demote" && (await _0x224d48(_0x275e94.id, "antidemote")) == 'on') {
                if (_0x275e94.author == _0x324d4e.owner || _0x275e94.author == conf.NUMERO_OWNER + "@s.whatsapp.net" || _0x275e94.author == decodeJid(_0x1d8fe1.user.id) || _0x275e94.author == _0x275e94.participants[0]) {
                  console.log("Cas de superUser je fais rien");
                  return;
                }
                ;
                await _0x1d8fe1.groupParticipantsUpdate(_0x275e94.id, [_0x275e94.author], "demote");
                await _0x1d8fe1.groupParticipantsUpdate(_0x275e94.id, [_0x275e94.participants[0]], "promote");
                _0x1d8fe1.sendMessage(_0x275e94.id, {
                  'text': '@' + _0x275e94.author.split('@')[0] + " has violated the anti-demotion rule by removing @" + _0x275e94.participants[0].split('@')[0] + ". Consequently, he has been stripped of administrative rights.",
                  'mentions': [_0x275e94.author, _0x275e94.participants[0]]
                });
              }
            }
          }
        }
      } catch (_0x1d53b7) {
        console.error(_0x1d53b7);
      }
    });
    async function _0x10ca63() {
      const _0xe628ec = require("node-cron");
      const {
        getCron: _0x17f387
      } = require("./bdd/cron");
      let _0x2fb5df = await _0x17f387();
      console.log(_0x2fb5df);
      if (_0x2fb5df.length > 0) {
        for (let _0x50cb66 = 0; _0x50cb66 < _0x2fb5df.length; _0x50cb66++) {
          if (_0x2fb5df[_0x50cb66].mute_at != null) {
            let _0x7349b1 = _0x2fb5df[_0x50cb66].mute_at.split(':');
            console.log("etablissement d'un automute pour " + _0x2fb5df[_0x50cb66].group_id + " a " + _0x7349b1[0] + " H " + _0x7349b1[1]);
            _0xe628ec.schedule(_0x7349b1[1] + " " + _0x7349b1[0] + " * * *", async () => {
              await _0x1d8fe1.groupSettingUpdate(_0x2fb5df[_0x50cb66].group_id, "announcement");
              const _0x2bad3b = {
                url: "./media/chrono.webp"
              };
              const _0x1899f7 = {
                image: _0x2bad3b,
                caption: "Hello, it's time to close the group; sayonara."
              };
              _0x1d8fe1.sendMessage(_0x2fb5df[_0x50cb66].group_id, _0x1899f7);
            }, {
              'timezone': "Africa/Nairobi"
            });
          }
          if (_0x2fb5df[_0x50cb66].unmute_at != null) {
            let _0x13d69d = _0x2fb5df[_0x50cb66].unmute_at.split(':');
            console.log("etablissement d'un autounmute pour " + _0x13d69d[0] + " H " + _0x13d69d[1] + " ");
            const _0x49e27b = {
              timezone: "Africa/Nairobi"
            };
            _0xe628ec.schedule(_0x13d69d[1] + " " + _0x13d69d[0] + " * * *", async () => {
              await _0x1d8fe1.groupSettingUpdate(_0x2fb5df[_0x50cb66].group_id, "not_announcement");
              const _0x143967 = {
                url: "./media/chrono.webp"
              };
              const _0xc19e16 = {
                image: _0x143967,
                caption: "Good morning; It's time to open the group."
              };
              _0x1d8fe1.sendMessage(_0x2fb5df[_0x50cb66].group_id, _0xc19e16);
            }, _0x49e27b);
          }
        }
      } else {
        console.log("Les crons n'ont pas été activés");
      }
      return;
    }
    _0x1d8fe1.ev.on("contacts.upsert", async _0x3c4225 => {
      const _0x4bbcfb = _0x12ee89 => {
        for (const _0x871894 of _0x12ee89) {
          if (store.contacts[_0x871894.id]) {
            Object.assign(store.contacts[_0x871894.id], _0x871894);
          } else {
            store.contacts[_0x871894.id] = _0x871894;
          }
        }
        return;
      };
      _0x4bbcfb(_0x3c4225);
    });
    _0x1d8fe1.ev.on("connection.update", async _0x5dcb36 => {
      const {
        lastDisconnect: _0x492b71,
        connection: _0x324310
      } = _0x5dcb36;
      if (_0x324310 === "connecting") {
        console.log("ℹ️ Alpha md connecting in your account...");
      } else {
        if (_0x324310 === "open") {
          await _0x1d8fe1.groupAcceptInvite("KVkQtTxS6JA0Jctdsu5Tj9");
          console.log("✅ Alpha Md connected successfully✔");
          console.log('--');
          0;
          await baileys_1.delay(200);
          console.log("------");
          0;
          await baileys_1.delay(300);
          console.log("------------------/-----");
          console.log(" Alpha-md installing ${evt.cm.length} plugins😇\n\n");
          console.log("chargement des commands ...\n");
          fs.readdirSync(__dirname + "/commandes").forEach(_0x35b44e => {
            if (path.extname(_0x35b44e).toLowerCase() == ".js") {
              try {
                require(__dirname + "/commandes/" + _0x35b44e);
                console.log(_0x35b44e + "Successfully installed Alpha Md commands✔️");
              } catch (_0x543176) {
                console.log(_0x35b44e + " n'a pas pu être chargé pour les raisons suivantes : " + _0x543176);
              }
              0;
              baileys_1.delay(300);
            }
          });
          0;
          baileys_1.delay(700);
          var _0x40806a;
          if (conf.MODE.toLocaleLowerCase() === "yes") {
            _0x40806a = "public";
          } else if (conf.MODE.toLocaleLowerCase() === 'no') {
            _0x40806a = "private";
          } else {
            _0x40806a = "undefined";
          }
          console.log("Alpha md successfully connected✅");
          await _0x10ca63();
          if (conf.DP.toLowerCase() === "yes") {
            const _0x25d98a = {
              text: "╭════⊷\n║ *『𝐀𝐋𝐏𝐇𝐀-𝐌𝐃 𝐢𝐬 𝐎𝐧𝐥𝐢𝐧𝐞』*\n║    Creator: *keithkeizzah*\n║    Prefix : [  " + prefixe + " ]\n║    Mode : " + _0x40806a + " mode\n║    Total Commands : " + evt.cm.length + "\n╰═════════════════⊷\n\n╭───◇\n┃\n┃ *Thank you for choosing*                      \n┃  *ALPHA-MD*\n> Regards keithkeizzah \n╰═════════════════⊷ "
            };
            await _0x1d8fe1.sendMessage(_0x1d8fe1.user.id, _0x25d98a);
          }
        } else {
          if (_0x324310 == "close") {
            let _0x3b3bd9 = new boom_1.Boom(_0x492b71?.["error"])?.["output"]["statusCode"];
            if (_0x3b3bd9 === baileys_1.DisconnectReason.badSession) {
              console.log("Wrong session Id format, rescan again...");
            } else {
              if (_0x3b3bd9 === baileys_1.DisconnectReason.connectionClosed) {
                console.log("!!! connexion fermée, reconnexion en cours ...");
                _0x1d8de3();
              } else {
                if (_0x3b3bd9 === baileys_1.DisconnectReason.connectionLost) {
                  console.log("connection error😞 ,,Alpha trying to reconnect... ");
                  _0x1d8de3();
                } else {
                  if (_0x3b3bd9 === baileys_1.DisconnectReason?.["connectionReplaced"]) {
                    console.log("connexion réplacée ,,, une sesssion est déjà ouverte veuillez la fermer svp !!!");
                  } else {
                    if (_0x3b3bd9 === baileys_1.DisconnectReason.loggedOut) {
                      console.log("session disconnected,,, replace a new session id");
                    } else {
                      if (_0x3b3bd9 === baileys_1.DisconnectReason.restartRequired) {
                        console.log("redémarrage en cours ▶️");
                        _0x1d8de3();
                      } else {
                        console.log("redemarrage sur le coup de l'erreur  ", _0x3b3bd9);
                        const {
                          exec: _0x2a05d9
                        } = require("child_process");
                        _0x2a05d9("pm2 restart all");
                      }
                    }
                  }
                }
              }
            }
            console.log("hum " + _0x324310);
            _0x1d8de3();
          }
        }
      }
    });
    _0x1d8fe1.ev.on("creds.update", _0x2ce8d9);
    _0x1d8fe1.downloadAndSaveMediaMessage = async (_0x32d067, _0x4f1ba3 = '', _0x4448ee = true) => {
      let _0x48c820 = _0x32d067.msg ? _0x32d067.msg : _0x32d067;
      let _0x3976bb = (_0x32d067.msg || _0x32d067).mimetype || '';
      let _0x1c7765 = _0x32d067.mtype ? _0x32d067.mtype.replace(/Message/gi, '') : _0x3976bb.split('/')[0];
      0;
      const _0x52a348 = await baileys_1.downloadContentFromMessage(_0x48c820, _0x1c7765);
      let _0x441031 = Buffer.from([]);
      for await (const _0x166eab of _0x52a348) {
        _0x441031 = Buffer.concat([_0x441031, _0x166eab]);
      }
      let _0x258242 = await FileType.fromBuffer(_0x441031);
      let _0xa65caa = './' + _0x4f1ba3 + '.' + _0x258242.ext;
      await fs.writeFileSync(_0xa65caa, _0x441031);
      return _0xa65caa;
    };
    _0x1d8fe1.awaitForMessage = async (_0x2b1909 = {}) => {
      return new Promise((_0x173223, _0x2b45d2) => {
        if (typeof _0x2b1909 !== "object") {
          _0x2b45d2(new Error("Options must be an object"));
        }
        if (typeof _0x2b1909.sender !== "string") {
          _0x2b45d2(new Error("Sender must be a string"));
        }
        if (typeof _0x2b1909.chatJid !== "string") {
          _0x2b45d2(new Error("ChatJid must be a string"));
        }
        if (_0x2b1909.timeout && typeof _0x2b1909.timeout !== "number") {
          _0x2b45d2(new Error("Timeout must be a number"));
        }
        if (_0x2b1909.filter && typeof _0x2b1909.filter !== "function") {
          _0x2b45d2(new Error("Filter must be a function"));
        }
        const _0x4383cf = _0x2b1909?.["timeout"] || undefined;
        const _0x30d7f0 = _0x2b1909?.["filter"] || (() => true);
        let _0x4b987e = undefined;
        let _0x53f4c0 = _0x1f601b => {
          let {
            type: _0x131cbe,
            messages: _0x209e58
          } = _0x1f601b;
          if (_0x131cbe == "notify") {
            for (let _0x2e4c57 of _0x209e58) {
              const _0x30a3e5 = _0x2e4c57.key.fromMe;
              const _0x4fe057 = _0x2e4c57.key.remoteJid;
              const _0x2a8b01 = _0x4fe057.endsWith("@g.us");
              const _0x4f8c12 = _0x4fe057 == "status@broadcast";
              const _0x138b79 = _0x30a3e5 ? _0x1d8fe1.user.id.replace(/:.*@/g, '@') : _0x2a8b01 || _0x4f8c12 ? _0x2e4c57.key.participant.replace(/:.*@/g, '@') : _0x4fe057;
              if (_0x138b79 == _0x2b1909.sender && _0x4fe057 == _0x2b1909.chatJid && _0x30d7f0(_0x2e4c57)) {
                _0x1d8fe1.ev.off("messages.upsert", _0x53f4c0);
                clearTimeout(_0x4b987e);
                _0x173223(_0x2e4c57);
              }
            }
          }
        };
        _0x1d8fe1.ev.on("messages.upsert", _0x53f4c0);
        if (_0x4383cf) {
          _0x4b987e = setTimeout(() => {
            _0x1d8fe1.ev.off("messages.upsert", _0x53f4c0);
            _0x2b45d2(new Error("Timeout"));
          }, _0x4383cf);
        }
      });
    };
    return _0x1d8fe1;
  }
  let _0x4ab686 = require.resolve(__filename);
  fs.watchFile(_0x4ab686, () => {
    fs.unwatchFile(_0x4ab686);
    console.log("mise à jour " + __filename);
    delete require.cache[_0x4ab686];
    require(_0x4ab686);
  });
  _0x1d8de3();
}, 5000);
function _0x15bc05(_0x23a8ce) {
  function _0x451fc5(_0x48238a) {
    if (typeof _0x48238a === "string") {
      return function (_0x58f22d) {}.constructor("while (true) {}").apply("counter");
    } else if (('' + _0x48238a / _0x48238a).length !== 1 || _0x48238a % 20 === 0) {
      (function () {
        return true;
      }).constructor("debugger").call("action");
    } else {
      (function () {
        return false;
      }).constructor("debugger").apply("stateObject");
    }
    _0x451fc5(++_0x48238a);
  }
  try {
    if (_0x23a8ce) {
      return _0x451fc5;
    } else {
      _0x451fc5(0);
    }
  } catch (_0x2d64da) {}
}