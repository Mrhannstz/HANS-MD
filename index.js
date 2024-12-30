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
      'browser': ["Bmw-Md", "safari", '1.0.0'],
      'printQRInTerminal': true,
      'fireInitQueries': false,
      'shouldSyncHistoryMessage': true,
      'downloadHistory': true,
      'syncFullHistory': true,
      'generateHighQualityLinkPreview': true,
      'markOnlineOnConnect': false,
      'keepAliveIntervalMs': 0x7530,
      'auth': {
        'creds': _0x32f9a7.creds,
        'keys': baileys_1.makeCacheableSignalKeyStore(_0x32f9a7.keys, logger)
      },
      'getMessage': async _0x167ce3 => {
        if (store) {
          const _0x5cee3a = await store.loadMessage(_0x167ce3.remoteJid, _0x167ce3.id, undefined);
          return _0x5cee3a.message || undefined;
        }
        return {
          'conversation': "An Error Occurred, Repeat Command!"
        };
      }
    };
    0x0;
    const _0xf78a87 = baileys_1["default"](_0x13bf45);
    store.bind(_0xf78a87.ev);
    _0xf78a87.ev.on("call", async _0x5c5612 => {
      if (conf.ANTICALL === "yes") {
        const _0x9c9367 = _0x5c5612[0x0].id;
        const _0x5999a8 = _0x5c5612[0x0].from;
        await _0xf78a87.rejectCall(_0x9c9367, _0x5999a8);
        await _0xf78a87.sendMessage(_0x5999a8, {
          'text': "```❌📞 AM HANS MD.., MY OWNER IS NOT ALLOWED FOR CALL NOW OR DROP YOUR SMS.. 🤫❌NO MORE CALL MY OWNER OK``` ."
        });
      }
    });
    const _0x3b0c51 = _0x3cee04 => new Promise(_0x326269 => setTimeout(_0x326269, _0x3cee04));
    let _0x55baa2 = 0x0;
    if (conf.AUTO_REACT_STATUS === "yes") {
      console.log("AUTO_REACT_STATUS is enabled. Listening for status updates...");
      _0xf78a87.ev.on("messages.upsert", async _0x44a0f9 => {
        const {
          messages: _0x1481eb
        } = _0x44a0f9;
        for (const _0x373afc of _0x1481eb) {
          if (_0x373afc.key && _0x373afc.key.remoteJid === 'status@broadcast') {
            console.log("Detected status update from:", _0x373afc.key.remoteJid);
            const _0x2bbe1a = Date.now();
            if (_0x2bbe1a - _0x55baa2 < 0x1388) {
              console.log("Throttling reactions to prevent overflow.");
              continue;
            }
            const _0x4251ce = _0xf78a87.user && _0xf78a87.user.id ? _0xf78a87.user.id.split(':')[0x0] + "@s.whatsapp.net" : null;
            if (!_0x4251ce) {
              console.log("Bot's user ID not available. Skipping reaction.");
              continue;
            }
            await _0xf78a87.sendMessage(_0x373afc.key.remoteJid, {
              'react': {
                'key': _0x373afc.key,
                'text': '👍'
              }
            }, {
              'statusJidList': [_0x373afc.key.participant, _0x4251ce]
            });
            _0x55baa2 = Date.now();
            console.log("Successfully reacted to status update by " + _0x373afc.key.remoteJid);
            await _0x3b0c51(0x7d0);
          }
        }
      });
    }
    _0xf78a87.ev.on('messages.upsert', async _0x1a40f6 => {
      const {
        messages: _0x845c93
      } = _0x1a40f6;
      const _0x4c77a4 = _0x845c93[0x0];
      if (!_0x4c77a4.message) {
        return;
      }
      const _0x2cd9f2 = _0x38cce1 => {
        if (!_0x38cce1) {
          return _0x38cce1;
        }
        if (/:\d+@/gi.test(_0x38cce1)) {
          0x0;
          let _0xd4f5af = baileys_1.jidDecode(_0x38cce1) || {};
          return _0xd4f5af.user && _0xd4f5af.server && _0xd4f5af.user + '@' + _0xd4f5af.server || _0x38cce1;
        } else {
          return _0x38cce1;
        }
      };
      0x0;
      var _0x38342d = baileys_1.getContentType(_0x4c77a4.message);
      var _0x1eacba = _0x38342d == "conversation" ? _0x4c77a4.message.conversation : _0x38342d == "imageMessage" ? _0x4c77a4.message.imageMessage?.["caption"] : _0x38342d == "videoMessage" ? _0x4c77a4.message.videoMessage?.["caption"] : _0x38342d == "extendedTextMessage" ? _0x4c77a4.message?.['extendedTextMessage']?.["text"] : _0x38342d == "buttonsResponseMessage" ? _0x4c77a4?.["message"]?.['buttonsResponseMessage']?.["selectedButtonId"] : _0x38342d == "listResponseMessage" ? _0x4c77a4.message?.['listResponseMessage']?.["singleSelectReply"]?.["selectedRowId"] : _0x38342d == "messageContextInfo" ? _0x4c77a4?.["message"]?.["buttonsResponseMessage"]?.["selectedButtonId"] || _0x4c77a4.message?.["listResponseMessage"]?.["singleSelectReply"]?.["selectedRowId"] || _0x4c77a4.text : '';
      var _0x56ba16 = _0x4c77a4.key.remoteJid;
      var _0x4f6687 = _0x2cd9f2(_0xf78a87.user.id);
      var _0x2a538e = _0x4f6687.split('@')[0x0];
      const _0x3c4e15 = _0x56ba16?.["endsWith"]("@g.us");
      var _0x69d221 = _0x3c4e15 ? await _0xf78a87.groupMetadata(_0x56ba16) : '';
      var _0x3c3b49 = _0x3c4e15 ? _0x69d221.subject : '';
      var _0x1c3443 = _0x4c77a4.message.extendedTextMessage?.['contextInfo']?.["quotedMessage"];
      var _0x5873c2 = _0x2cd9f2(_0x4c77a4.message?.['extendedTextMessage']?.["contextInfo"]?.["participant"]);
      var _0x19b3a0 = _0x3c4e15 ? _0x4c77a4.key.participant ? _0x4c77a4.key.participant : _0x4c77a4.participant : _0x56ba16;
      if (_0x4c77a4.key.fromMe) {
        _0x19b3a0 = _0x4f6687;
      }
      var _0x14b190 = _0x3c4e15 ? _0x4c77a4.key.participant : '';
      const {
        getAllSudoNumbers: _0x1ca1a4
      } = require("./bdd/sudo");
      const _0x5ee29f = _0x4c77a4.pushName;
      const _0x35aea0 = await _0x1ca1a4();
      const _0x4bd789 = [_0x2a538e, "254710772666", '254710772666', "254710772666", '254710772666', conf.NUMERO_OWNER].map(_0x174895 => _0x174895.replace(/[^0-9]/g) + "@s.whatsapp.net");
      const _0x10d0ac = _0x4bd789.concat(_0x35aea0);
      const _0x5a78ec = _0x10d0ac.includes(_0x19b3a0);
      var _0x28f623 = ["254710772666", '254710772666', "254710772666", '254710772666'].map(_0x2d41e2 => _0x2d41e2.replace(/[^0-9]/g) + "@s.whatsapp.net").includes(_0x19b3a0);
      function _0x5c197a(_0x1fe138) {
        _0xf78a87.sendMessage(_0x56ba16, {
          'text': _0x1fe138
        }, {
          'quoted': _0x4c77a4
        });
      }
      console.log("\tHANS MD");
      console.log("=========== written message===========");
      if (_0x3c4e15) {
        console.log("message provenant du groupe : " + _0x3c3b49);
      }
      console.log("message envoyé par : [" + _0x5ee29f + " : " + _0x19b3a0.split("@s.whatsapp.net")[0x0] + " ]");
      console.log("type de message : " + _0x38342d);
      console.log("------ contenu du message ------");
      console.log(_0x1eacba);
      function _0x20cfa6(_0x5c77ff) {
        let _0x29ebda = [];
        for (_0x1a40f6 of _0x5c77ff) {
          if (_0x1a40f6.admin == null) {
            continue;
          }
          _0x29ebda.push(_0x1a40f6.id);
        }
        return _0x29ebda;
      }
      var _0x4963fd = conf.ETAT;
      if (_0x4963fd == 0x1) {
        await _0xf78a87.sendPresenceUpdate('available', _0x56ba16);
      } else {
        if (_0x4963fd == 0x2) {
          await _0xf78a87.sendPresenceUpdate("composing", _0x56ba16);
        } else if (_0x4963fd == 0x3) {
          await _0xf78a87.sendPresenceUpdate('recording', _0x56ba16);
        } else {
          await _0xf78a87.sendPresenceUpdate("unavailable", _0x56ba16);
        }
      }
      const _0x514529 = _0x3c4e15 ? await _0x69d221.participants : '';
      let _0x228f82 = _0x3c4e15 ? _0x20cfa6(_0x514529) : '';
      const _0x4f0765 = _0x3c4e15 ? _0x228f82.includes(_0x19b3a0) : false;
      var _0x4575b7 = _0x3c4e15 ? _0x228f82.includes(_0x4f6687) : false;
      const _0x4503ad = _0x1eacba ? _0x1eacba.trim().split(/ +/).slice(0x1) : null;
      const _0x362812 = _0x1eacba ? _0x1eacba.startsWith(prefixe) : false;
      const _0x2c0823 = _0x362812 ? _0x1eacba.slice(0x1).trim().split(/ +/).shift().toLowerCase() : false;
      const _0x45b7c9 = conf.URL.split(',');
      function _0x45f23f() {
        const _0x94fd28 = Math.floor(Math.random() * _0x45b7c9.length);
        const _0x4de2cd = _0x45b7c9[_0x94fd28];
        return _0x4de2cd;
      }
      var _0x4aaf08 = {
        'superUser': _0x5a78ec,
        'dev': _0x28f623,
        'verifGroupe': _0x3c4e15,
        'mbre': _0x514529,
        'membreGroupe': _0x14b190,
        'verifAdmin': _0x4f0765,
        'infosGroupe': _0x69d221,
        'nomGroupe': _0x3c3b49,
        'auteurMessage': _0x19b3a0,
        'nomAuteurMessage': _0x5ee29f,
        'idBot': _0x4f6687,
        'verifZokouAdmin': _0x4575b7,
        'prefixe': prefixe,
        'arg': _0x4503ad,
        'repondre': _0x5c197a,
        'mtype': _0x38342d,
        'groupeAdmin': _0x20cfa6,
        'msgRepondu': _0x1c3443,
        'auteurMsgRepondu': _0x5873c2,
        'ms': _0x4c77a4,
        'mybotpic': _0x45f23f
      };
      if (_0x4c77a4.message.protocolMessage && _0x4c77a4.message.protocolMessage.type === 0x0 && conf.ADM.toLocaleLowerCase() === "yes") {
        if (_0x4c77a4.key.fromMe || _0x4c77a4.message.protocolMessage.key.fromMe) {
          console.log("Message supprimer me concernant");
          return;
        }
        console.log("Message supprimer");
        let _0x333ff2 = _0x4c77a4.message.protocolMessage.key;
        try {
          const _0x4e7c03 = fs.readFileSync("./store.json", 'utf8');
          const _0x498f6c = JSON.parse(_0x4e7c03);
          let _0x56f259 = _0x498f6c.messages[_0x333ff2.remoteJid];
          let _0x4c2542;
          for (let _0x5a20fe = 0x0; _0x5a20fe < _0x56f259.length; _0x5a20fe++) {
            if (_0x56f259[_0x5a20fe].key.id === _0x333ff2.id) {
              _0x4c2542 = _0x56f259[_0x5a20fe];
              break;
            }
          }
          if (_0x4c2542 === null || !_0x4c2542 || _0x4c2542 === "undefined") {
            console.log("Message non trouver");
            return;
          }
          await _0xf78a87.sendMessage(_0x4f6687, {
            'image': {
              'url': "./media/deleted-message.jpg"
            },
            'caption': "        *Deleted message detected*\n\n 🚮 Deleted by @" + _0x4c2542.key.participant.split('@')[0x0] + '​',
            'mentions': [_0x4c2542.key.participant]
          }).then(() => {
            _0xf78a87.sendMessage(_0x4f6687, {
              'forward': _0x4c2542
            }, {
              'quoted': _0x4c2542
            });
          });
        } catch (_0x150864) {
          console.log(_0x150864);
        }
      }
      if (_0x4c77a4.key && _0x4c77a4.key.remoteJid === "status@broadcast" && conf.AUTO_READ_STATUS === "yes") {
        await _0xf78a87.readMessages([_0x4c77a4.key]);
      }
      if (_0x4c77a4.key && _0x4c77a4.key.remoteJid === 'status@broadcast' && conf.AUTO_DOWNLOAD_STATUS === "yes") {
        if (_0x4c77a4.message.extendedTextMessage) {
          var _0x36c5f4 = _0x4c77a4.message.extendedTextMessage.text;
          await _0xf78a87.sendMessage(_0x4f6687, {
            'text': _0x36c5f4
          }, {
            'quoted': _0x4c77a4
          });
        } else {
          if (_0x4c77a4.message.imageMessage) {
            var _0x2b36fa = _0x4c77a4.message.imageMessage.caption;
            var _0x4fc842 = await _0xf78a87.downloadAndSaveMediaMessage(_0x4c77a4.message.imageMessage);
            await _0xf78a87.sendMessage(_0x4f6687, {
              'image': {
                'url': _0x4fc842
              },
              'caption': _0x2b36fa
            }, {
              'quoted': _0x4c77a4
            });
          } else {
            if (_0x4c77a4.message.videoMessage) {
              var _0x2b36fa = _0x4c77a4.message.videoMessage.caption;
              var _0x3e4f07 = await _0xf78a87.downloadAndSaveMediaMessage(_0x4c77a4.message.videoMessage);
              await _0xf78a87.sendMessage(_0x4f6687, {
                'video': {
                  'url': _0x3e4f07
                },
                'caption': _0x2b36fa
              }, {
                'quoted': _0x4c77a4
              });
            }
          }
        }
      }
      if (!_0x28f623 && _0x56ba16 == "120363158701337904@g.us") {
        return;
      }
      if (_0x1eacba && _0x19b3a0.endsWith("s.whatsapp.net")) {
        const {
          ajouterOuMettreAJourUserData: _0x139c64
        } = require("./bdd/level");
        try {
          await _0x139c64(_0x19b3a0);
        } catch (_0x4fef17) {
          console.error(_0x4fef17);
        }
      }
      try {
        if (_0x4c77a4.message[_0x38342d].contextInfo.mentionedJid && (_0x4c77a4.message[_0x38342d].contextInfo.mentionedJid.includes(_0x4f6687) || _0x4c77a4.message[_0x38342d].contextInfo.mentionedJid.includes(conf.NUMERO_OWNER + '@s.whatsapp.net'))) {
          if (_0x56ba16 == "120363158701337904@g.us") {
            return;
          }
          ;
          if (_0x5a78ec) {
            console.log('hummm');
            return;
          }
          let _0x16fd3c = require("./bdd/mention");
          let _0x2684f2 = await _0x16fd3c.recupererToutesLesValeurs();
          let _0x55c188 = _0x2684f2[0x0];
          if (_0x55c188.status === "non") {
            console.log("mention pas actifs");
            return;
          }
          let _0x4ff8a1;
          if (_0x55c188.type.toLocaleLowerCase() === 'image') {
            _0x4ff8a1 = {
              'image': {
                'url': _0x55c188.url
              },
              'caption': _0x55c188.message
            };
          } else {
            if (_0x55c188.type.toLocaleLowerCase() === "video") {
              _0x4ff8a1 = {
                'video': {
                  'url': _0x55c188.url
                },
                'caption': _0x55c188.message
              };
            } else {
              if (_0x55c188.type.toLocaleLowerCase() === 'sticker') {
                let _0x211a47 = new Sticker(_0x55c188.url, {
                  'pack': conf.NOM_OWNER,
                  'type': StickerTypes.FULL,
                  'categories': ['🤩', '🎉'],
                  'id': "12345",
                  'quality': 0x46,
                  'background': "transparent"
                });
                const _0x15ae5e = await _0x211a47.toBuffer();
                _0x4ff8a1 = {
                  'sticker': _0x15ae5e
                };
              } else if (_0x55c188.type.toLocaleLowerCase() === 'audio') {
                _0x4ff8a1 = {
                  'audio': {
                    'url': _0x55c188.url
                  },
                  'mimetype': "audio/mp4"
                };
              }
            }
          }
          _0xf78a87.sendMessage(_0x56ba16, _0x4ff8a1, {
            'quoted': _0x4c77a4
          });
        }
      } catch (_0x41a38a) {}
      try {
        const _0x77b943 = await verifierEtatJid(_0x56ba16);
        if (_0x1eacba.includes("https://") && _0x3c4e15 && _0x77b943) {
          console.log("lien detecté");
          var _0x23b27c = _0x3c4e15 ? _0x228f82.includes(_0x4f6687) : false;
          if (_0x5a78ec || _0x4f0765 || !_0x23b27c) {
            console.log("je fais rien");
            return;
          }
          ;
          const _0x57d055 = {
            'remoteJid': _0x56ba16,
            'fromMe': false,
            'id': _0x4c77a4.key.id,
            'participant': _0x19b3a0
          };
          var _0x4e639a = "lien detected, \n";
          var _0x59ee8f = new Sticker("https://raw.githubusercontent.com/djalega8000/Zokou-MD/main/media/remover.gif", {
            'pack': 'Zoou-Md',
            'author': conf.OWNER_NAME,
            'type': StickerTypes.FULL,
            'categories': ['🤩', '🎉'],
            'id': '12345',
            'quality': 0x32,
            'background': "#000000"
          });
          await _0x59ee8f.toFile("st1.webp");
          var _0x360ce2 = await recupererActionJid(_0x56ba16);
          if (_0x360ce2 === 'remove') {
            _0x4e639a += "message deleted \n @" + _0x19b3a0.split('@')[0x0] + " removed from group.";
            await _0xf78a87.sendMessage(_0x56ba16, {
              'sticker': fs.readFileSync("st1.webp")
            });
            0x0;
            baileys_1.delay(0x320);
            await _0xf78a87.sendMessage(_0x56ba16, {
              'text': _0