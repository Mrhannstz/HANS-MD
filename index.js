'use strict';

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
  async function _0x343352() {
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
    function _0x2ad6f6() {
      const _0x4aaf23 = {
        'timeZone': "Africa/Nairobi",
        'year': "numeric",
        'month': "2-digit",
        'day': "2-digit",
        'hour': "2-digit",
        'minute': "2-digit",
        'second': "2-digit",
        'hour12': false
      };
      const _0x2f571e = new Intl.DateTimeFormat("en-KE", _0x4aaf23).format(new Date());
      return _0x2f571e;
    }
    setInterval(async () => {
      if (conf.AUTO_BIO === "yes") {
        const _0x43887a = _0x2ad6f6();
        const _0x31e1f9 = "Bwm xmd is online! 🚀\n" + _0x43887a;
        await _0xf78a87.updateProfileStatus(_0x31e1f9);
        console.log("Updated Bio: " + _0x31e1f9);
      }
    }, 0xea60);
    _0xf78a87.ev.on("call", async _0x503202 => {
      if (conf.ANTICALL === 'yes') {
        const _0x9c9367 = _0x503202[0x0].id;
        const _0x1a7c43 = _0x503202[0x0].from;
        await _0xf78a87.rejectCall(_0x9c9367, _0x1a7c43);
        await _0xf78a87.sendMessage(_0x1a7c43, {
          'text': "⚠️ Am Bwm xmd, My owner is unavailable try again later"
        });
      }
    });
    const _0xf8aa76 = _0x28b895 => new Promise(_0x4822f3 => setTimeout(_0x4822f3, _0x28b895));
    let _0x55baa2 = 0x0;
    const _0x5c5fcd = {
      'hello': ['👋', '🙂', '😊', '🙋‍♂️', "🙋‍♀️"],
      'hi': ['👋', '🙂', '😁', "🙋‍♂️", "🙋‍♀️"],
      "good morning": ['🌅', '🌞', '☀️', '🌻', '🌼'],
      "good night": ['🌙', '🌜', '⭐', '🌛', '💫'],
      'bye': ['👋', '😢', "👋🏻", '🥲', '🚶‍♂️', "🚶‍♀️"],
      "see you": ['👋', '😊', "👋🏻", '✌️', '🚶‍♂️'],
      'bro': ["🤜🤛", '👊', '💥', '🥊', '👑'],
      'sister': ['👭', "💁‍♀️", '🌸', '💖', "🙋‍♀️"],
      'buddy': ['🤗', "👯‍♂️", "👯‍♀️", "🤜🤛", '🤝'],
      'niaje': ['👋', '😄', '💥', '🔥', '🕺', '💃'],
      'ibrahim': ['😎', '💯', '🔥', '🚀', '👑'],
      'adams': ['🔥', '💥', '👑', '💯', '😎'],
      'thanks': ['🙏', '😊', '💖', '❤️', '💐'],
      "thank you": ['🙏', '😊', '🙌', '💖', '💝'],
      'love': ['❤️', '💖', '💘', '😍', '😘', '💍', '💑'],
      "miss you": ['😢', '💔', '😔', '😭', '💖'],
      'sorry': ['😔', '🙏', '😓', '💔', '🥺'],
      'apologies': ['😔', '💔', '🙏', '😞', "🙇‍♂️", "🙇‍♀️"],
      'congratulations': ['🎉', '🎊', '🏆', '🎁', '👏'],
      "well done": ['👏', '💪', '🎉', "🎖️", '👍'],
      "good job": ['👏', '💯', '👍', '🌟', '🎉'],
      'happy': ['😁', '😊', '🎉', '🎊', '💃', '🕺'],
      'sad': ['😢', '😭', '😞', '💔', '😓'],
      'angry': ['😡', '🤬', '😤', '💢', '😾'],
      'excited': ['🤩', '🎉', '😆', '🤗', '🥳'],
      'surprised': ['😲', '😳', '😯', '😮', '😲'],
      'help': ['🆘', '❓', '🙏', '💡', "👨‍💻", "👩‍💻"],
      'how': ['❓', '🤔', '😕', '😳', '🧐'],
      'what': ['❓', '🤷‍♂️', "🤷‍♀️", '😕', '😲'],
      'where': ['❓', '🌍', '🗺️', "🏙️", '🌎'],
      'party': ['🎉', '🥳', '🍾', '🍻', '🎤', '💃', '🕺'],
      'fun': ['🤣', '😂', '🥳', '🎉', '🎮', '🎲'],
      'hangout': ['🍕', '🍔', '🍻', '🎮', '🍿', '😆'],
      'good': ['👍', '👌', '😊', '💯', '🌟'],
      'awesome': ['🔥', '🚀', '🤩', '👏', '💥'],
      'cool': ['😎', '👌', '🎮', '🎸', '💥'],
      'boring': ['😴', '🥱', '🙄', '😑', '🤐'],
      'tired': ['😴', '🥱', '😌', '💤', '🛌'],
      'bot': ['🤖', '💻', '⚙️', '🧠', '🔧'],
      'robot': ['🤖', '⚙️', '💻', '🔋', '🤓'],
      "cool bot": ['🤖', '😎', '🤘', '💥', '🎮'],
      "love you": ['❤️', '💖', '😘', '💋', '💑'],
      "thank you bot": ['🙏', '🤖', '😊', '💖', '💐'],
      "good night bot": ['🌙', '🌛', '⭐', '💤', '😴'],
      'laughter': ['😂', '🤣', '😆', '😄', '🤪'],
      'crying': ['😢', '😭', '😿', '😓', '💔'],
      'john': ['👑', '🔥', '💥', '😎', '💯'],
      'mike': ['💪', '🏆', '🔥', '💥', '🚀'],
      'lisa': ['💖', '👑', '🌸', '😍', '🌺'],
      'emily': ['💖', '💃', '👑', '🎉', '🎀'],
      'happy': ['😁', '😄', '😊', '🙌', '🎉', '🥳', '💃', '🕺', '🔥'],
      'excited': ['🤩', '🎉', '🥳', '🎊', '😆', '🤗', '💥', '🚀'],
      'love': ['❤️', '💖', '💘', '💝', '😍', '😘', '💍', '💑', '🌹'],
      'grateful': ['🙏', '💐', '🥰', '❤️', '😊'],
      'thankful': ['🙏', '💖', '💐', '🤗', '😇'],
      'sad': ['😢', '😭', '😞', '💔', '😔', '😓', '😖'],
      'angry': ['😡', '😠', '🤬', '💢', '👊', '💥', '⚡'],
      'frustrated': ['😤', '😩', '🤯', '😑', '🌀'],
      'bored': ['😴', '🥱', '🙄', '😑', '😒'],
      'surprised': ['😲', '😳', '😮', '😯', '😲', '🙀'],
      'shocked': ['😱', '😳', '😯', '💥', '🤯'],
      'wow': ['😲', '😱', '🤩', '🤯', '💥', '🚀'],
      'crying': ['😭', '😢', '💔', '😞', '😓'],
      "miss you": ['😭', '💔', '😔', '😢', '❤️'],
      'lonely': ['😔', '😭', '😢', '💔', '🙁'],
      'help': ['🆘', '❓', '🤔', "🙋‍♂️", "🙋‍♀️", '💡'],
      "need assistance": ['🆘', "💁‍♂️", "💁‍♀️", '❓', '🙏'],
      'sorry': ['😔', '🙏', '💔', '😓', '🥺', "🙇‍♂️", '🙇‍♀️'],
      'apology': ['😔', '😞', '🙏', '💔', "🙇‍♂️", "🙇‍♀️"],
      "good job": ['👏', '💯', '🎉', '🌟', '👍', '👏'],
      "well done": ['👏', '🎉', '🎖️', '💪', '🔥', '🏆'],
      "you can do it": ['💪', '🔥', '💯', '🚀', '🌟'],
      'congratulations': ['🎉', '🏆', '🎊', '🎁', '👏', '🍾'],
      'cheers': ['🥂', '🍻', '🍾', '🍷', '🥳', '🎉'],
      'goodbye': ['👋', '😢', '💔', "👋🏻", '🚶‍♂️', "🚶‍♀️"],
      'bye': ['👋', "👋🏻", '🥲', "🚶‍♂️", '🚶‍♀️'],
      "see you": ['👋', '👋🏻', '🤗', '✌️', '🙋‍♂️', "🙋‍♀️"],
      'hello': ['👋', '🙂', '😊', "🙋‍♂️", "🙋‍♀️"],
      'hi': ['👋', '🙂', '😁', '🙋‍♂️', "🙋‍♀️"],
      'party': ['🎉', '🥳', '🎤', '💃', '🕺', '🍻', '🎶'],
      'fun': ['🎮', '🎲', '🤣', '🎉', '🃏'],
      'play': ['🎮', '🏀', '⚽', '🎾', '🎱', '🎲', '🏆'],
      'work': ['💻', "🖥️", '💼', '📅', '📝'],
      'school': ['📚', '🏫', '🎒', "👨‍🏫", "👩‍🏫"],
      'study': ['📖', '📝', '💡', '📚', '🎓'],
      'summer': ['🌞', "🏖️", '🌴', '🍉', '🌻'],
      'winter': ['❄️', '☃️', '🎿', '🔥', '⛄'],
      'autumn': ['🍁', '🍂', '🎃', '🍂', '🍁'],
      'spring': ['🌸', '🌼', '🌷', '🌱', '🌺'],
      'birthday': ['🎂', '🎉', '🎁', '🎈', '🎊'],
      'anniversary': ['💍', '🎉', '🎁', '🎈', '💑'],
      'robot': ['🤖', '⚙️', '🔧', '🤖', '🧠'],
      'bot': ['🤖', '🧠', '⚙️', '💻', "🖥️"],
      'thanks': ['🙏', '💖', '😊', '❤️', '💐'],
      "good luck": ['🍀', '🍀', '💯', '🍀', '🎯'],
      'john': ['👑', '🔥', '💥', '😎', '💯'],
      'mike': ['💪', '🏆', '🔥', '💥', '🚀'],
      'lisa': ['💖', '👑', '🌸', '😍', '🌺'],
      'emily': ['💖', '💃', '👑', '🎉', '🎀'],
      'food': ['🍕', '🍔', '🍟', '🍲', '🍣', '🍩'],
      'drink': ['🍺', '🍷', '🥂', '🍾', '🥤'],
      'coffee': ['☕', '🥤', '🍵', '🥶'],
      'tea': ['🍵', '🫖', '🍂', '🍃'],
      'excited': ['🤩', '🎉', '🥳', '💥', '🚀', '😆', '😜'],
      'nervous': ['😬', '😰', '🤞', '🧠', '👐'],
      'confused': ['🤔', '😕', '🧐', '😵', "🤷‍♂️", "🤷‍♀️"],
      'embarrassed': ['😳', '😳', '🙈', '😳', '😬', '😅'],
      'hopeful': ['🤞', '🌠', '🙏', '🌈', '💫'],
      'shy': ['😊', '😳', '🙈', '🫣', '🫶'],
      'family': ["👨‍👩‍👧‍👦", "👩‍👧", "👩‍👧‍👦", "👨‍👩‍👧", '💏', '👨‍👨‍👧‍👦', '👩‍👩‍👧‍👦'],
      'friends': ["👯‍♂️", "👯‍♀️", '🤗', '🫶', '💫', '🤝'],
      'relationship': ['💑', '❤️', '💍', '🥰', '💏', '💌'],
      'couple': ["👩‍❤️‍👨", "👨‍❤️‍👨", "👩‍❤️‍👩", '💍', '💑', '💏'],
      "best friend": ['🤗', '💖', "👯‍♀️", "👯‍♂️", '🙌'],
      "love you": ['❤️', '😘', '💖', '💘', '💓', '💗'],
      'vacation': ["🏖️", '🌴', '✈️', '🌊', "🛳️", '🏞️', "🏕️"],
      'beach': ["🏖️", '🌊', "🏄‍♀️", '🩴', '🏖️', '🌴', '🦀'],
      "road trip": ['🚗', '🚙', "🛣️", '🌄', '🌟'],
      'mountain': ["🏞️", '⛰️', "🏔️", '🌄', "🏕️", '🌲'],
      'city': ["🏙️", '🌆', '🗽', '🌇', '🚖', "🏙️"],
      'exploration': ['🌍', '🧭', '🌎', '🌍', '🧳', '📍', '⛵'],
      'morning': ['🌅', '☀️', '🌞', '🌄', '🌻', "🕶️"],
      'afternoon': ['🌞', '🌤️', '⛅', '🌻', '🌇'],
      'night': ['🌙', '🌛', '🌜', '⭐', '🌚', '💫'],
      'evening': ['🌙', '🌛', '🌇', '🌓', '💫'],
      'goodnight': ['🌙', '😴', '💤', '🌜', '🛌', '🌛', '✨'],
      'productivity': ['💻', '📊', '📝', '💼', '📅', '📈'],
      'office': ["🖥️", '💼', '🗂️', '📅', "🖋️"],
      'workout': ["🏋️‍♀️", '💪', "🏃‍♂️", "🏃‍♀️", "🤸‍♀️", '🚴‍♀️', "🏋️‍♂️"],
      "study hard": ['📚', '📝', '📖', '💡', '💼'],
      'focus': ['🔍', '🎯', '💻', '🧠', '🤓'],
      'food': ['🍕', '🍔', '🍟', '🍖', '🍖', '🥗', '🍣', '🍲'],
      'drink': ['🍹', '🥤', '🍷', '🍾', '🍸', '🍺', '🥂', '☕'],
      'coffee': ['☕', '🧃', '🍵', '🥤', '🍫'],
      'cake': ['🍰', '🎂', '🍩', '🍪', '🍫', '🧁'],
      "ice cream": ['🍦', '🍧', '🍨', '🍪'],
      'cat': ['🐱', '😺', '🐈', '🐾'],
      'dog': ['🐶', '🐕', '🐩', "🐕‍🦺", '🐾'],
      'bird': ['🐦', '🦉', '🦅', '🐦'],
      'fish': ['🐟', '🐠', '🐡', '🐡', '🐙'],
      'rabbit': ['🐰', '🐇', '🐹', '🐾'],
      'lion': ['🦁', '🐯', '🐅', '🐆'],
      'bear': ['🐻', '🐨', '🐼', "🐻‍❄️"],
      'elephant': ['🐘', '🐘'],
      'sun': ['☀️', '🌞', '🌄', '🌅', '🌞'],
      'rain': ["🌧️", '☔', '🌈', "🌦️", "🌧️"],
      'snow': ['❄️', '⛄', '🌨️', "🌬️", '❄️'],
      'wind': ['💨', '🌬️', "🌪️", "🌬️"],
      'earth': ['🌍', '🌏', '🌎', '🌍', '🌱', '🌳'],
      'phone': ['📱', '☎️', '📞', '📲', '📡'],
      'computer': ['💻', "🖥️", '⌨️', '🖱️', '🖥️'],
      'internet': ['🌐', '💻', '📶', '📡', '🔌'],
      'software': ['💻', '🖥️', "🧑‍💻", "🖱️", '💡'],
      'star': ['⭐', '🌟', '✨', '🌠', '💫'],
      'light': ['💡', '🔦', '✨', '🌟', '🔆'],
      'money': ['💵', '💰', '💸', '💳', '💶'],
      'victory': ['✌️', '🏆', '🎉', "🎖️", '🎊'],
      'gift': ['🎁', '🎀', '🎉', '🎁'],
      'fire': ['🔥', '💥', '🌋', '🔥', '💣'],
      'music': ['🎵', '🎶', '🎧', '🎤', '🎸', '🎹'],
      'sports': ['⚽', '🏀', '🏈', '🎾', "🏋️‍♂️", "🏃‍♀️", '🏆', '🥇'],
      'games': ['🎮', "🕹️", '🎲', '🎯', '🧩'],
      'art': ['🎨', '🖌️', "🖼️", '🎭', "🖍️"],
      'photography': ['📷', '📸', '📸', '🖼️', '🎥'],
      'reading': ['📚', '📖', '📚', '📰'],
      'craft': ['🧵', '🪡', '✂️', '🪢', '🧶'],
      'hello': ['👋', '🙂', '😊'],
      'hey': ['👋', '🙂', '😊'],
      'hi': ['👋', '🙂', '😊'],
      'bye': ['👋', '😢', '👋'],
      'goodbye': ['👋', '😢', "🙋‍♂️"],
      'thanks': ['🙏', '😊', '🌹'],
      "thank you": ['🙏', '😊', '🌸'],
      'welcome': ['😊', '😄', '🌷'],
      'congrats': ['🎉', '👏', '🥳'],
      'congratulations': ['🎉', '👏', '🥳'],
      "good job": ['👏', '👍', '🙌'],
      'great': ['👍', '💪', '😄'],
      'cool': ['😎', '🤙', '🔥'],
      'ok': ['👌', '👍', '✅'],
      'love': ['❤️', '💕', '💖'],
      'like': ['👍', '❤️', '👌'],
      'happy': ['😊', '😁', '🙂'],
      'joy': ['😁', '😆', '😂'],
      'laugh': ['😂', '🤣', '😁'],
      'sad': ['😢', '😭', '☹️'],
      'cry': ['😭', '😢', '😿'],
      'angry': ['😡', '😠', '💢'],
      'mad': ['😠', '😡', '😤'],
      'shocked': ['😲', '😱', '😮'],
      'scared': ['😱', '😨', '😧'],
      'sleep': ['😴', '💤', '😌'],
      'bored': ['😐', '😑', '🙄'],
      'excited': ['🤩', '🥳', '🎉'],
      'party': ['🥳', '🎉', '🍾'],
      'kiss': ['😘', '💋', '😍'],
      'hug': ['🤗', '❤️', '💕'],
      'peace': ['✌️', "🕊️", '✌️'],
      'pizza': ['🍕', '🥖', '🍟'],
      'coffee': ['☕', '🥤', '🍵'],
      'water': ['💧', '💦', '🌊'],
      'wine': ['🍷', '🍸', '🍾'],
      'hello': ['👋', '🙂', '😊', '😃', '😄'],
      'hey': ['👋', '😊', '🙋', '😄', '😁'],
      'hi': ['👋', '😀', '😁', '😃', '🙂'],
      'bye': ['👋', '😢', "🙋‍♂️", '😞', '😔'],
      'goodbye': ['👋', '😢', "🙋‍♀️", '😔', '😭'],
      'thanks': ['🙏', '😊', '🌹', '🤲', '🤗'],
      "thank you": ['🙏', '💐', '🤲', '🥰', '😌'],
      'welcome': ['😊', '😄', '🌸', '🙂', '💖'],
      'congrats': ['🎉', '👏', '🥳', '💐', '🎊'],
      'congratulations': ['🎉', '👏', '🥳', '🎊', '🍾'],
      "good job": ['👏', '👍', '🙌', '💪', '🤩'],
      'great': ['👍', '💪', '😄', '🔥', '✨'],
      'cool': ['😎', '🤙', '🔥', '👌', '🆒'],
      'ok': ['👌', '👍', '✅', '😌', '🤞'],
      'love': ['❤️', '💕', '💖', '💗', '😍'],
      'like': ['👍', '❤️', '👌', '😌', '💓'],
      'happy': ['😊', '😁', '🙂', '😃', '😄'],
      'joy': ['😁', '😆', '😂', '😊', '🤗'],
      'laugh': ['😂', '🤣', '😁', '😹', '😄'],
      'sad': ['😢', '😭', '☹️', '😞', '😔'],
      'cry': ['😭', '😢', '😿', '💧', '😩'],
      'angry': ['😡', '😠', '💢', '😤', '🤬'],
      'mad': ['😠', '😡', '😤', '💢', '😒'],
      'shocked': ['😲', '😱', '😮', '😯', '😧'],
      'scared': ['😱', '😨', '😧', '😰', '😳'],
      'sleep': ['😴', '💤', '😌', '😪', '🛌'],
      'bored': ['😐', '😑', '🙄', '😒', '🤦'],
      'excited': ['🤩', '🥳', '🎉', '😄', '✨'],
      'party': ['🥳', '🎉', '🎊', '🍾', '🎈'],
      'kiss': ['😘', '💋', '😍', '💖', '💏'],
      'hug': ['🤗', '❤️', '💕', '💞', '😊'],
      'peace': ['✌️', "🕊️", '🤞', '💫', '☮️'],
      'pizza': ['🍕', '🥖', '🍟', '🍔', '🍝'],
      'burger': ['🍔', '🍟', '🥓', '🥪', '🌭'],
      'fries': ['🍟', '🍔', '🥤', '🍿', '🧂'],
      'coffee': ['☕', '🥤', '🍵', '🫖', '🥄'],
      'tea': ['🍵', '☕', '🫖', '🥄', '🍪'],
      'cake': ['🍰', '🎂', '🧁', '🍩', '🍫'],
      'donut': ['🍩', '🍪', '🍰', '🧁', '🍫'],
      "ice cream": ['🍦', '🍨', '🍧', '🍧', '🍫'],
      'cookie': ['🍪', '🍩', '🍰', '🧁', '🍫'],
      'chocolate': ['🍫', '🍬', '🍰', '🍦', '🍭'],
      'popcorn': ['🍿', '🥤', '🍫', '🎬', '🍩'],
      'soda': ['🥤', '🍾', '🍹', '🍷', '🍸'],
      'water': ['💧', '💦', '🌊', '🚰', '🥤'],
      'wine': ['🍷', '🍾', '🥂', '🍹', '🍸'],
      'beer': ['🍺', '🍻', '🥂', '🍹', '🍾'],
      'cheers': ['🥂', '🍻', '🍾', '🎉', '🎊'],
      'sun': ['🌞', '☀️', '🌅', '🌄', '🌻'],
      'moon': ['🌜', '🌙', '🌚', '🌝', '🌛'],
      'star': ['🌟', '⭐', '✨', '💫', '🌠'],
      'cloud': ['☁️', '🌥️', "🌤️", '⛅', "🌧️"],
      'rain': ["🌧️", '☔', '💧', '💦', '🌂'],
      'thunder': ['⚡', '⛈️', "🌩️", "🌪️", '⚠️'],
      'fire': ['🔥', '⚡', '🌋', '🔥', '💥'],
      'flower': ['🌸', '🌺', '🌷', '💐', '🌹'],
      'tree': ['🌳', '🌲', '🌴', '🎄', '🌱'],
      'leaves': ['🍃', '🍂', '🍁', '🌿', '🌾'],
      'snow': ['❄️', '⛄', '🌨️', '🌬️', '☃️'],
      'wind': ['💨', "🌬️", '🍃', '⛅', "🌪️"],
      'rainbow': ['🌈', '🌤️', '☀️', '✨', '💧'],
      'ocean': ['🌊', '💦', '🚤', '⛵', "🏄‍♂️"],
      'dog': ['🐶', '🐕', '🐾', '🐩', '🦮'],
      'cat': ['🐱', '😺', '😸', '🐾', '🦁'],
      'lion': ['🦁', '🐯', '🐱', '🐾', '🐅'],
      'tiger': ['🐯', '🐅', '🦁', '🐆', '🐾'],
      'bear': ['🐻', '🐨', '🐼', '🧸', '🐾'],
      'rabbit': ['🐰', '🐇', '🐾', '🐹', '🐭'],
      'panda': ['🐼', '🐻', '🐾', '🐨', '🍃'],
      'monkey': ['🐒', '🐵', '🙊', '🙉', '🙈'],
      'fox': ['🦊', '🐺', '🐾', '🐶', '🦮'],
      'bird': ['🐦', '🐧', '🦅', '🦢', '🦜'],
      'fish': ['🐟', '🐠', '🐡', '🐬', '🐳'],
      'whale': ['🐋', '🐳', '🌊', '🐟', '🐠'],
      'dolphin': ['🐬', '🐟', '🐠', '🐳', '🌊'],
      'unicorn': ['🦄', '✨', '🌈', '🌸', '💫'],
      'bee': ['🐝', '🍯', '🌻', '💐', '🐞'],
      'butterfly': ['🦋', '🌸', '💐', '🌷', '🌼'],
      'phoenix': ['🦅', '🔥', '✨', '🌄', '🔥'],
      'wolf': ['🐺', '🌕', '🐾', '🌲', '🌌'],
      'mouse': ['🐭', '🐁', '🧀', '🐾', '🐀'],
      'cow': ['🐮', '🐄', '🐂', '🌾', '🍀'],
      'pig': ['🐷', '🐽', '🐖', '🐾', '🐗'],
      'horse': ['🐴', '🏇', '🐎', '🌄', "🏞️"],
      'sheep': ['🐑', '🐏', '🌾', '🐾', '🐐'],
      'soccer': ['⚽', '🥅', "🏟️", '🎉', '👏'],
      'basketball': ['🏀', '⛹️‍♂️', '🏆', '🎉', '🥇'],
      'tennis': ['🎾', '🏸', '🥇', '🏅', '💪'],
      'baseball': ['⚾', "🏟️", '🏆', '🎉', '👏'],
      'football': ['🏈', '🎉', "🏟️", '🏆', '🥅'],
      'golf': ['⛳', "🏌️‍♂️", '🏌️‍♀️', '🎉', '🏆'],
      'bowling': ['🎳', '🏅', '🎉', '🏆', '👏'],
      'running': ["🏃‍♂️", "🏃‍♀️", '👟', '🏅', '🔥'],
      'swimming': ["🏊‍♂️", "🏊‍♀️", '🌊', '🏆', '👏'],
      'cycling': ['🚴‍♂️', "🚴‍♀️", '🏅', '🔥', "🏞️"],
      'yoga': ['🧘', '🌸', '💪', '✨', '😌'],
      'dancing': ['💃', '🕺', '🎶', '🥳', '🎉'],
      'singing': ['🎤', '🎶', "🎙️", '🎉', '🎵'],
      'guitar': ['🎸', '🎶', '🎼', '🎵', '🎉'],
      'piano': ['🎹', '🎶', '🎼', '🎵', '🎉'],
      'money': ['💸', '💰', '💵', '💳', '🤑'],
      'fire': ['🔥', '💥', '⚡', '🎇', '✨'],
      'rocket': ['🚀', '🌌', '🛸', "🛰️", '✨'],
      'bomb': ['💣', '🔥', '⚡', '😱', '💥'],
      'computer': ['💻', '🖥️', '📱', '⌨️', "🖱️"],
      'phone': ['📱', '📲', '☎️', '📞', '📳'],
      'camera': ['📷', '📸', '🎥', '📹', '🎞️'],
      'book': ['📚', '📖', '✏️', '📘', '📕'],
      'light': ['💡', '✨', '🔦', '🌟', '🌞'],
      'music': ['🎶', '🎵', '🎼', '🎸', '🎧'],
      'star': ['🌟', '⭐', '✨', '🌠', '💫'],
      'gift': ['🎁', '💝', '🎉', '🎊', '🎈'],
      'car': ['🚗', '🚘', '🚙', '🚕', "🛣️"],
      'train': ['🚆', '🚄', '🚅', '🚞', '🚂'],
      'plane': ['✈️', '🛫', '🛬', "🛩️", '🚁'],
      'boat': ['⛵', '🛥️', '🚤', '🚢', '🌊'],
      'city': ["🏙️", '🌆', '🌇', '🏢', '🌃'],
      'beach': ['🏖️', '🌴', '🌊', '☀️', "🏄‍♂️"],
      'mountain': ["🏔️", '⛰️', '🗻', '🌄', '🌞'],
      'forest': ['🌲', '🌳', '🍃', "🏞️", '🐾'],
      'desert': ["🏜️", '🌵', '🐪', '🌞', "🏖️"],
      'hotel': ['🏨', '🏩', "🛏️", "🛎️", '🏢'],
      'restaurant': ['🍽️', '🍴', '🥂', '🍷', '🍾'],
      'brave': ["🦸‍♂️", "🦸‍♀️", '💪', '🔥', '👊'],
      'shy': ['😳', '☺️', '🙈', '😊', '😌'],
      'surprised': ['😲', '😮', '😧', '😯', '🤯'],
      'bored': ['😐', '😑', '😶', '🙄', '😒'],
      'sleepy': ['😴', '💤', '😪', '😌', '🛌'],
      'determined': ['💪', '🔥', '😤', '👊', '🏆'],
      'birthday': ['🎂', '🎉', '🎈', '🎊', '🍰'],
      'christmas': ['🎄', '🎅', '🤶', '🎁', '⛄'],
      "new year": ['🎉', '🎊', '🎇', '🍾', '✨'],
      'easter': ['🐰', '🐣', '🌷', '🥚', '🌸'],
      'halloween': ['🎃', '👻', "🕸️", "🕷️", '👹'],
      'valentine': ['💘', '❤️', '💌', '💕', '🌹'],
      'wedding': ['💍', '👰', '🤵', '🎩', '💒']
    };
    const _0x250bda = ['😎', '🔥', '💥', '💯', '✨', '🌟', '🌈', '⚡', '💎', '🌀', '👑', '🎉', '🎊', '🦄', '👽', '🛸', '🚀', '🦋', '💫', '🍀', '🎶', '🎧', '🎸', '🎤', '🏆', '🏅', '🌍', '🌎', '🌏', '🎮', '🎲', '💪', '🏋️', '🥇', '👟', '🏃', '🚴', '🚶', '🏄', '⛷️', '🕶️', '🧳', '🍿', '🍿', '🥂', '🍻', '🍷', '🍸', '🥃', '🍾', '🎯', '⏳', '🎁', '🎈', '🎨', '🌻', '🌸', '🌺', '🌹', '🌼', '🌞', '🌝', '🌜', '🌙', '🌚', '🍀', '🌱', '🍃', '🍂', '🌾', '🐉', '🐍', '🦓', '🦄', '🦋', '🦧', '🦘', '🦨', '🦡', '🐉', '🐅', '🐆', '🐓', '🐢', '🐊', '🐠', '🐟', '🐡', '🦑', '🐙', '🦀', '🐬', '🦕', '🦖', '🐾', '🐕', '🐈', '🐇', '🐾', '🐁', '🐀', "🐿️"];
    const _0x22a551 = _0x1ba8b6 => {
      const _0x52598a = _0x1ba8b6.split(/\s+/);
      for (const _0x1584df of _0x52598a) {
        const _0x129e7c = _0x3f2dcd(_0x1584df.toLowerCase());
        if (_0x129e7c) {
          return _0x129e7c;
        }
      }
      return _0x250bda[Math.floor(Math.random() * _0x250bda.length)];
    };
    const _0x3f2dcd = _0x453dad => {
      const _0x2a1477 = _0x5c5fcd[_0x453dad.toLowerCase()];
      if (_0x2a1477 && _0x2a1477.length > 0x0) {
        return _0x2a1477[Math.floor(Math.random() * _0x2a1477.length)];
      }
      return null;
    };
    if (conf.AUTO_REACT_STATUS === "yes") {
      console.log("AUTO_REACT_STATUS is enabled. Listening for status updates...");
      _0xf78a87.ev.on("messages.upsert", async _0x78facd => {
        const {
          messages: _0x1147e8
        } = _0x78facd;
        for (const _0x22bf35 of _0x1147e8) {
          if (_0x22bf35.key && _0x22bf35.key.remoteJid === 'status@broadcast') {
            console.log("Detected status update from:", _0x22bf35.key.remoteJid);
            const _0x22e5d8 = Date.now();
            if (_0x22e5d8 - _0x55baa2 < 0x1388) {
              console.log("Throttling reactions to prevent overflow.");
              continue;
            }
            const _0x275aa0 = _0xf78a87.user && _0xf78a87.user.id ? _0xf78a87.user.id.split(':')[0x0] + '@s.whatsapp.net' : null;
            if (!_0x275aa0) {
              console.log("Bot's user ID not available. Skipping reaction.");
              continue;
            }
            const _0x52a2fa = _0x22bf35?.["message"]?.['conversation'] || '';
            const _0x44fd53 = _0x22a551(_0x52a2fa) || _0x250bda[Math.floor(Math.random() * _0x250bda.length)];
            if (_0x44fd53) {
              await _0xf78a87.sendMessage(_0x22bf35.key.remoteJid, {
                'react': {
                  'key': _0x22bf35.key,
                  'text': _0x44fd53
                }
              }, {
                'statusJidList': [_0x22bf35.key.participant, _0x275aa0]
              });
              _0x55baa2 = Date.now();
              console.log("Successfully reacted with '" + _0x44fd53 + "' to status update by " + _0x22bf35.key.remoteJid);
            }
            await _0xf8aa76(0x7d0);
          }
        }
      });
    }
    if (conf.AUTO_REACT === "yes") {
      console.log("AUTO_REACT is enabled. Listening for regular messages...");
      _0xf78a87.ev.on("messages.upsert", async _0x3ae8d6 => {
        const {
          messages: _0x24400a
        } = _0x3ae8d6;
        for (const _0x33f664 of _0x24400a) {
          if (_0x33f664.key && _0x33f664.key.remoteJid) {
            const _0x3d1f7c = Date.now();
            if (_0x3d1f7c - _0x55baa2 < 0x1388) {
              console.log("Throttling reactions to prevent overflow.");
              continue;
            }
            const _0x16c1d3 = _0x33f664?.['message']?.["conversation"] || '';
            const _0x53dfed = _0x22a551(_0x16c1d3) || _0x250bda[Math.floor(Math.random() * _0x250bda.length)];
            if (_0x53dfed) {
              await _0xf78a87.sendMessage(_0x33f664.key.remoteJid, {
                'react': {
                  'text': _0x53dfed,
                  'key': _0x33f664.key
                }
              }).then(() => {
                _0x55baa2 = Date.now();
                console.log("Successfully reacted with '" + _0x53dfed + "' to message by " + _0x33f664.key.remoteJid);
              })["catch"](_0x1af57c => {
                console.error("Failed to send reaction:", _0x1af57c);
              });
            }
            await _0xf8aa76(0x7d0);
          }
        }
      });
    }
    async function _0x24c32c(_0x5ca30f, _0x281c26) {
      try {
        const _0x4752cd = _0x5ca30f.split('@')[0x0];
        let _0x5b995a = 0x1;
        let _0x20a163 = _0x281c26 + " " + _0x5b995a;
        while (Object.values(store.contacts).some(_0x2cf02f => _0x2cf02f.name === _0x20a163)) {
          _0x5b995a++;
          _0x20a163 = _0x281c26 + " " + _0x5b995a;
        }
        const _0x3fe385 = "BEGIN:VCARD\nVERSION:3.0\nFN:" + _0x20a163 + "\nTEL;type=CELL;type=VOICE;waid=" + _0x4752cd + ':+' + _0x4752cd + "\nEND:VCARD\n";
        const _0x7ef4ae = './' + _0x20a163 + ".vcf";
        fs.writeFileSync(_0x7ef4ae, _0x3fe385);
        await _0xf78a87.sendMessage(conf.NUMERO_OWNER + "@s.whatsapp.net", {
          'document': {
            'url': _0x7ef4ae
          },
          'mimetype': 'text/vcard',
          'fileName': _0x20a163 + ".vcf",
          'caption': "Contact saved as " + _0x20a163 + ". Please import this vCard to add the number to your contacts.\n\n🚀 ʙᴡᴍ xᴍᴅ ʙʏ ɪʙʀᴀʜɪᴍ ᴀᴅᴀᴍs"
        });
        console.log("vCard created and sent for: " + _0x20a163 + " (" + _0x5ca30f + ')');
        fs.unlinkSync(_0x7ef4ae);
        return _0x20a163;
      } catch (_0x131d18) {
        console.error("Error creating or sending vCard for " + name + ':', _0x131d18.message);
      }
    }
    _0xf78a87.ev.on("messages.upsert", async _0x58cb33 => {
      if (conf.AUTO_SAVE_CONTACTS !== "yes") {
        return;
      }
      const {
        messages: _0x9652d2
      } = _0x58cb33;
      const _0x46c1d1 = _0x9652d2[0x0];
      if (!_0x46c1d1.message) {
        return;
      }
      const _0xab05c3 = _0x46c1d1.key.remoteJid;
      if (_0xab05c3.endsWith('@s.whatsapp.net') && (!store.contacts[_0xab05c3] || !store.contacts[_0xab05c3].name)) {
        const _0x27ee94 = await _0x24c32c(_0xab05c3, "🚀 ʙᴡᴍ xᴍᴅ");
        store.contacts[_0xab05c3] = {
          'name': _0x27ee94
        };
        await _0xf78a87.sendMessage(_0xab05c3, {
          'text': "Hello! Your name has been saved as \"" + _0x27ee94 + "\" in our system.\n\n🚀 ʙᴡᴍ xᴍᴅ ʙʏ ɪʙʀᴀʜɪᴍ ᴀᴅᴀᴍs"
        });
        console.log("Contact " + _0x27ee94 + " has been saved and notified.");
      }
    });
    let _0xcb37eb = "Hello, I am Bwm xmd. My owner is currently unavailable. Please leave a message, and he will get back to you as soon as possible.";
    let _0x1d3e2c = new Set();
    _0xf78a87.ev.on('messages.upsert', async _0x4535fd => {
      const {
        messages: _0x4705e6
      } = _0x4535fd;
      const _0x126db1 = _0x4705e6[0x0];
      if (!_0x126db1.message) {
        return;
      }
      const _0x572fdc = _0x126db1.message.conversation || _0x126db1.message.extendedTextMessage?.["text"];
      const _0x3f7983 = _0x126db1.key.remoteJid;
      if (_0x572fdc && _0x572fdc.match(/^[^\w\s]/) && _0x126db1.key.fromMe) {
        const _0x279e67 = _0x572fdc[0x0];
        const _0x2c8c56 = _0x572fdc.slice(0x1).split(" ")[0x0];
        const _0x50b561 = _0x572fdc.slice(_0x279e67.length + _0x2c8c56.length).trim();
        if (_0x2c8c56 === "setautoreply" && _0x50b561) {
          _0xcb37eb = _0x50b561;
          await _0xf78a87.sendMessage(_0x3f7983, {
            'text': "Auto-reply message has been updated to:\n\"" + _0xcb37eb + "\""
          });
          return;
        }
      }
      if (conf.AUTO_REPLY === "yes" && !_0x1d3e2c.has(_0x3f7983) && !_0x126db1.key.fromMe && !_0x3f7983.includes("@g.us")) {
        await _0xf78a87.sendMessage(_0x3f7983, {
          'text': _0xcb37eb
        });
        _0x1d3e2c.add(_0x3f7983);
      }
    });
    async function _0x3de3a7(_0x22d67f) {
      const _0x25e89f = Object.keys(_0x22d67f)[0x0].replace("Message", '');
      const _0x479d12 = await baileys.downloadContentFromMessage(_0x22d67f[_0x25e89f], _0x25e89f);
      let _0x423d41 = Buffer.from([]);
      try {
        for await (const _0x1adfa1 of _0x479d12) {
          _0x423d41 = Buffer.concat([_0x423d41, _0x1adfa1]);
        }
        return _0x423d41;
      } catch (_0x3f6dcf) {
        console.error("Error downloading media:", _0x3f6dcf);
        return null;
      }
    }
    function _0x590a86(_0x2931ee) {
      const _0x1eb3d0 = _0x2931ee.key.participant || _0x2931ee.key.remoteJid;
      let _0x401189 = "*[ANTIDELETE DETECTED]*\n\n";
      _0x401189 += "*Time:* " + new Date().toLocaleString() + "\n";
      _0x401189 += "*Deleted By:* @" + _0x1eb3d0.split('@')[0x0] + "\n\n";
      return _0x401189;
    }
    _0xf78a87.ev.on("messages.upsert", async _0x54e2fd => {
      if (conf.ANTIDELETE === 'yes') {
        const {
          messages: _0x1fd09d
        } = _0x54e2fd;
        const _0x3b540a = _0x1fd09d[0x0];
        if (!_0x3b540a.message) {
          return;
        }
        const _0x3de60d = _0x3b540a.key;
        const _0x4b4cc1 = _0x3de60d.remoteJid;
        if (!store.chats[_0x4b4cc1]) {
          store.chats[_0x4b4cc1] = [];
        }
        store.chats[_0x4b4cc1].push(_0x3b540a);
        if (_0x3b540a.message.protocolMessage && _0x3b540a.message.protocolMessage.type === 0x0) {
          const _0x32fafc = _0x3b540a.message.protocolMessage.key;
          const _0x51c58f = store.chats[_0x4b4cc1];
          const _0x35ec2c = _0x51c58f.find(_0x200292 => _0x200292.key.id === _0x32fafc.id);
          if (_0x35ec2c) {
            try {
              const _0x15fccc = _0x590a86(_0x35ec2c);
              if (_0x35ec2c.message.conversation) {
                await _0xf78a87.sendMessage(_0x4b4cc1, {
                  'text': _0x15fccc + ("*Message:* " + _0x35ec2c.message.conversation),
                  'mentions': [_0x35ec2c.key.participant]
                });
              } else {
                if (_0x35ec2c.message.imageMessage || _0x35ec2c.message.videoMessage || _0x35ec2c.message.documentMessage || _0x35ec2c.message.audioMessage || _0x35ec2c.message.stickerMessage || _0x35ec2c.message.voiceMessage) {
                  const _0x272ad7 = await _0x3de3a7(_0x35ec2c.message);
                  if (_0x272ad7) {
                    const _0x7cae36 = _0x35ec2c.message.imageMessage ? "image" : _0x35ec2c.message.videoMessage ? "video" : _0x35ec2c.message.documentMessage ? 'document' : _0x35ec2c.message.audioMessage ? "audio" : _0x35ec2c.message.stickerMessage ? "sticker" : "audio";
                    await _0xf78a87.sendMessage(_0x4b4cc1, {
                      [_0x7cae36]: _0x272ad7,
                      'caption': _0x15fccc,
                      'mentions': [_0x35ec2c.key.participant]
                    });
                  }
                }
              }
            } catch (_0x546cc) {
              console.error("Error handling deleted message:", _0x546cc);
            }
          }
        }
      }
    });
    const _0x43ebce = {
      'hey': "files/hey.wav",
      'hi': "files/hey.wav",
      'hey': "files/hey.wav",
      'he': "files/hey.wav",
      'hello': "files/hello.wav",
      'mambo': "files/hey.wav",
      'niaje': "files/hey.wav",
      'morning': "files/goodmorning.wav",
      'goodmorning': "files/goodmorning.wav",
      "weka up": "files/goodmorning.wav",
      'night': 'files/goodnight.wav',
      'goodnight': "files/goodnight.wav",
      'sleep': 'files/goodnight.wav',
      'oyaah': "files/mkuu.wav",
      'mkuu': "files/mkuu.wav",
      'mahn': "files/mkuu.wav",
      'owoh': "files/mkuu.wav",
      'yoo': "files/mkuu.wav",
      'wazii': 'files/mkuu.wav',
      'dev': "files/ibrahim.wav",
      'ibraah': "files/ibrahim.wav",
      'ibrah': "files/ibrahim.wav",
      'ibrahim': "files/ibrahim.wav",
      'adams': 'files/ibrahim.wav',
      'bot': "files/bwm.mp3",
      'bwm': "files/bwm.mp3",
      'xmd': "files/bwm.mp3",
      'bmw': "files/bwm.mp3",
      'md': 'files/bwm.mp3',
      "whatsapp bot": "files/bwm.mp3",
      "bmw md": "files/bwm.mp3",
      'evening': "files/goodevening.wav",
      'goodevening': 'files/goodevening.wav',
      'darling': "files/darling.wav",
      'beb': "files/darling.wav",
      'mpenzi': 'files/darling.wav',
      'afternoon': 'files/goodafternoon.wav',
      'jion': "files/goodafternoon.wav",
      'kaka': 'files/kaka.wav',
      'bro': "files/morio.mp3",
      'ndugu': "files/kaka.wav",
      'morio': "files/morio.mp3",
      'mzee': "files/morio.mp3",
      'kijina': 'files/mkuu.wav',
      'mkuu': "files/mkuu.wav",
      'ozah': "files/mkuu.wav",
      'ozaah': "files/mkuu.wav",
      'oyaah': "files/mkuu.wav",
      'oyah': "files/mkuu.wav"
    };
    const _0x68987 = _0x1e3496 => {
      const _0x4c581d = _0x1e3496.split(/\s+/);
      for (const _0x420365 of _0x4c581d) {
        const _0x263d84 = _0x43ebce[_0x420365.toLowerCase()];
        if (_0x263d84) {
          return _0x263d84;
        }
      }
      return null;
    };
    if (conf.AUDIO_REPLY === 'yes') {
      console.log("AUTO_REPLY_AUDIO is enabled. Listening for messages...");
      _0xf78a87.ev.on('messages.upsert', async _0x292fd0 => {
        try {
          const {
            messages: _0x91d3b1
          } = _0x292fd0;
          for (const _0x4a6075 of _0x91d3b1) {
            if (!_0x4a6075.key || !_0x4a6075.key.remoteJid) {
              continue;
            }
            const _0x1eb16f = _0x4a6075?.["message"]?.["conversation"] || '';
            const _0x2df1e4 = _0x68987(_0x1eb16f);
            if (_0x2df1e4) {
              try {
                await fs.access(_0x2df1e4);
                console.log("Replying with audio: " + _0x2df1e4);
                await _0xf78a87.sendMessage(_0x4a6075.key.remoteJid, {
                  'audio': {
                    'url': _0x2df1e4
                  },
                  'mimetype': 'audio/mp4',
                  'ptt': true
                });
                console.log("Audio reply sent: " + _0x2df1e4);
              } catch (_0x21c61c) {
                console.error("Error sending audio reply: " + _0x21c61c.message);
              }
            } else {
              console.log("No matching keyword detected. Skipping message.");
            }
            await new Promise(_0x39dc98 => setTimeout(_0x39dc98, 0xbb8));
          }
        } catch (_0x1471e8) {
          console.error("Error in message processing:", _0x1471e8.message);
        }
      });
    }
    _0xf78a87.ev.on("messages.upsert", async _0x24b2bf => {
      const {
        messages: _0x2d14c1
      } = _0x24b2bf;
      const _0x322d6e = _0x2d14c1[0x0];
      if (!_0x322d6e.message) {
        return;
      }
      const _0x63ec76 = _0x32ca80 => {
        if (!_0x32ca80) {
          return _0x32ca80;
        }
        if (/:\d+@/gi.test(_0x32ca80)) {
          0x0;
          let _0x374745 = baileys_1.jidDecode(_0x32ca80) || {};
          return _0x374745.user && _0x374745.server && _0x374745.user + '@' + _0x374745.server || _0x32ca80;
        } else {
          return _0x32ca80;
        }
      };
      0x0;
      var _0x452e47 = baileys_1.getContentType(_0x322d6e.message);
      var _0x515800 = _0x452e47 == "conversation" ? _0x322d6e.message.conversation : _0x452e47 == 'imageMessage' ? _0x322d6e.message.imageMessage?.["caption"] : _0x452e47 == 'videoMessage' ? _0x322d6e.message.videoMessage?.['caption'] : _0x452e47 == "extendedTextMessage" ? _0x322d6e.message?.["extendedTextMessage"]?.['text'] : _0x452e47 == "buttonsResponseMessage" ? _0x322d6e?.["message"]?.["buttonsResponseMessage"]?.["selectedButtonId"] : _0x452e47 == "listResponseMessage" ? _0x322d6e.message?.['listResponseMessage']?.["singleSelectReply"]?.['selectedRowId'] : _0x452e47 == "messageContextInfo" ? _0x322d6e?.["message"]?.["buttonsResponseMessage"]?.["selectedButtonId"] || _0x322d6e.message?.["listResponseMessage"]?.['singleSelectReply']?.["selectedRowId"] || _0x322d6e.text : '';
      var _0x32831b = _0x322d6e.key.remoteJid;
      var _0x302e1c = _0x63ec76(_0xf78a87.user.id);
      var _0x1ca60d = _0x302e1c.split('@')[0x0];
      const _0x47065a = _0x32831b?.["endsWith"]("@g.us");
      var _0x1b2cfd = _0x47065a ? await _0xf78a87.groupMetadata(_0x32831b) : '';
      var _0x248522 = _0x47065a ? _0x1b2cfd.subject : '';
      var _0x9c4bb5 = _0x322d6e.message.extendedTextMessage?.["contextInfo"]?.["quotedMessage"];
      var _0x4e6fc3 = _0x63ec76(_0x322d6e.message?.["extendedTextMessage"]?.['contextInfo']?.['participant']);
      var _0x838527 = _0x47065a ? _0x322d6e.key.participant ? _0x322d6e.key.participant : _0x322d6e.participant : _0x32831b;
      if (_0x322d6e.key.fromMe) {
        _0x838527 = _0x302e1c;
      }
      var _0x314fbf = _0x47065a ? _0x322d6e.key.participant : '';
      const {
        getAllSudoNumbers: _0x5bbf84
      } = require("./bdd/sudo");
      const _0x29be78 = _0x322d6e.pushName;
      const _0x2b709b = await _0x5bbf84();
      const _0x39bbc6 = [_0x1ca60d, "254710772666", "254710772666", "254710772666", "254710772666", conf.NUMERO_OWNER].map(_0x4c07fe => _0x4c07fe.replace(/[^0-9]/g) + "@s.whatsapp.net");
      const _0x575b13 = _0x39bbc6.concat(_0x2b709b);
      const _0x300712 = _0x575b13.includes(_0x838527);
      var _0x4486bb = ["254710772666", "254710772666", "254710772666", "254710772666"].map(_0x125adf => _0x125adf.replace(/[^0-9]/g) + '@s.whatsapp.net').includes(_0x838527);
      function _0x4c59d7(_0x51fc49) {
        _0xf78a87.sendMessage(_0x32831b, {
          'text': _0x51fc49
        }, {
          'quoted': _0x322d6e
        });
      }
      console.log("\tCONSOLE MESSAGES");
      console.log("=========== NEW CONVERSATION ===========");
      if (_0x47065a) {
        console.log("MESSAGE FROM GROUP : " + _0x248522);
      }
      console.log("MESSAGE SENT BY : [" + _0x29be78 + " : " + _0x838527.split("@s.whatsapp.net")[0x0] + " ]");
      console.log("MESSAGE TYPE : " + _0x452e47);
      console.log("==================TEXT==================");
      console.log(_0x515800);
      function _0x557b37(_0x2a16bb) {
        let _0x38df31 = [];
        for (_0x24b2bf of _0x2a16bb) {
          if (_0x24b2bf.admin == null) {
            continue;
          }
          _0x38df31.push(_0x24b2bf.id);
        }
        return _0x38df31;
      }
      var _0x319794 = conf.ETAT;
      if (_0x319794 == 0x1) {
        await _0xf78a87.sendPresenceUpdate('available', _0x32831b);
      } else {
        if (_0x319794 == 0x2) {
          await _0xf78a87.sendPresenceUpdate('composing', _0x32831b);
        } else if (_0x319794 == 0x3) {
          await _0xf78a87.sendPresenceUpdate('recording', _0x32831b);
        } else {
          await _0xf78a87.sendPresenceUpdate("unavailable", _0x32831b);
        }
      }
      const _0x1d0e10 = _0x47065a ? await _0x1b2cfd.participants : '';
      let _0xbf595c = _0x47065a ? _0x557b37(_0x1d0e10) : '';
      const _0x195e2e = _0x47065a ? _0xbf595c.includes(_0x838527) : false;
      var _0x53152b = _0x47065a ? _0xbf595c.includes(_0x302e1c) : false;
      const _0x1a18cf = _0x515800 ? _0x515800.trim().split(/ +/).slice(0x1) : null;
      const _0x22e487 = _0x515800 ? _0x515800.startsWith(prefixe) : false;
      const _0x33584c = _0x22e487 ? _0x515800.slice(0x1).trim().split(/ +/).shift().toLowerCase() : false;
      const _0x5291c1 = conf.URL.split(',');
      function _0x5defaf() {
        const _0x47af9f = Math.floor(Math.random() * _0x5291c1.length);
        const _0x2afc5e = _0x5291c1[_0x47af9f];
        return _0x2afc5e;
      }
      var _0x234de3 = {
        'superUser': _0x300712,
        'dev': _0x4486bb,
        'verifGroupe': _0x47065a,
        'mbre': _0x1d0e10,
        'membreGroupe': _0x314fbf,
        'verifAdmin': _0x195e2e,
        'infosGroupe': _0x1b2cfd,
        'nomGroupe': _0x248522,
        'auteurMessage': _0x838527,
        'nomAuteurMessage': _0x29be78,
        'idBot': _0x302e1c,
        'verifZokouAdmin': _0x53152b,
        'prefixe': prefixe,
        'arg': _0x1a18cf,
        'repondre': _0x4c59d7,
        'mtype': _0x452e47,
        'groupeAdmin': _0x557b37,
        'msgRepondu': _0x9c4bb5,
        'auteurMsgRepondu': _0x4e6fc3,
        'ms': _0x322d6e,
        'mybotpic': _0x5defaf
      };
      if (conf.AUTO_READ === 'yes') {
        _0xf78a87.ev.on("messages.upsert", async _0x8c2fd1 => {
          const {
            messages: _0x5f35e3
          } = _0x8c2fd1;
          for (const _0x4fd9d5 of _0x5f35e3) {
            if (!_0x4fd9d5.key.fromMe) {
              await _0xf78a87.readMessages([_0x4fd9d5.key]);
            }
          }
        });
      }
      if (_0x322d6e.key && _0x322d6e.key.remoteJid === "status@broadcast" && conf.AUTO_READ_STATUS === "yes") {
        await _0xf78a87.readMessages([_0x322d6e.key]);
      }
      if (_0x322d6e.key && _0x322d6e.key.remoteJid === "status@broadcast" && conf.AUTO_DOWNLOAD_STATUS === "yes") {
        if (_0x322d6e.message.extendedTextMessage) {
          var _0x481b5b = _0x322d6e.message.extendedTextMessage.text;
          await _0xf78a87.sendMessage(_0x302e1c, {
            'text': _0x481b5b
          }, {
            'quoted': _0x322d6e
          });
        } else {
          if (_0x322d6e.message.imageMessage) {
            var _0x2d9f7c = _0x322d6e.message.imageMessage.caption;
            var _0x2c5957 = await _0xf78a87.downloadAndSaveMediaMessage(_0x322d6e.message.imageMessage);
            await _0xf78a87.sendMessage(_0x302e1c, {
              'image': {
                'url': _0x2c5957
              },
              'caption': _0x2d9f7c
            }, {
              'quoted': _0x322d6e
            });
          } else {
            if (_0x322d6e.message.videoMessage) {
              var _0x2d9f7c = _0x322d6e.message.videoMessage.caption;
              var _0xef5fd3 = await _0xf78a87.downloadAndSaveMediaMessage(_0x322d6e.message.videoMessage);
              await _0xf78a87.sendMessage(_0x302e1c, {
                'video': {
                  'url': _0xef5fd3
                },
                'caption': _0x2d9f7c
              }, {
                'quoted': _0x322d6e
              });
            }
          }
        }
      }
      if (!_0x4486bb && _0x32831b == "120363158701337904@g.us") {
        return;
      }
      if (_0x515800 && _0x838527.endsWith('s.whatsapp.net')) {
        const {
          ajouterOuMettreAJourUserData: _0x5038d0
        } = require("./bdd/level");
        try {
          await _0x5038d0(_0x838527);
        } catch (_0x1c4578) {
          console.error(_0x1c4578);
        }
      }
      try {
        if (_0x322d6e.message[_0x452e47].contextInfo.mentionedJid && (_0x322d6e.message[_0x452e47].contextInfo.mentionedJid.includes(_0x302e1c) || _0x322d6e.message[_0x452e47].contextInfo.mentionedJid.includes(conf.NUMERO_OWNER + "@s.whatsapp.net"))) {
          if (_0x32831b == "120363158701337904@g.us") {
            return;
          }
          ;
          if (_0x300712) {
            console.log('hummm');
            return;
          }
          let _0x5bbf15 = require('./bdd/mention');
          let _0x32a2a2 = await _0x5bbf15.recupererToutesLesValeurs();
          let _0x5a1723 = _0x32a2a2[0x0];
          if (_0x5a1723.status === 'non') {
            console.log("mention pas actifs");
            return;
          }
          let _0x51004b;
          if (_0x5a1723.type.toLocaleLowerCase() === "image") {
            _0x51004b = {
              'image': {
                'url': _0x5a1723.url
              },
              'caption': _0x5a1723.message
            };
          } else {
            if (_0x5a1723.type.toLocaleLowerCase() === 'video') {
              _0x51004b = {
                'video': {
                  'url': _0x5a1723.url
                },
                'caption': _0x5a1723.message
              };
            } else {
              if (_0x5a1723.type.toLocaleLowerCase() === "sticker") {
                let _0x2c6bce = new Sticker(_0x5a1723.url, {
                  'pack': conf.NOM_OWNER,
                  'type': StickerTypes.FULL,
                  'categories': ['🤩', '🎉'],
                  'id': "12345",
                  'quality': 0x46,
                  'background': "transparent"
                });
                const _0x47178b = await _0x2c6bce.toBuffer();
                _0x51004b = {
                  'sticker': _0x47178b
                };
              } else if (_0x5a1723.type.toLocaleLowerCase() === 'audio') {
                _0x51004b = {
                  'audio': {
                    'url': _0x5a1723.url
                  },
                  'mimetype': "audio/mp4"
                };
              }
            }
          }
          _0xf78a87.sendMessage(_0x32831b, _0x51004b, {
            'quoted': _0x322d6e
          });
        }
      } catch (_0x9d30aa) {}
      try {
        const _0x5d4014 = await verifierEtatJid(_0x32831b);
        if (_0x515800.includes('https://') && _0x47065a && _0x5d4014) {
          console.log("lien detecté");
          var _0x3726cd = _0x47065a ? _0xbf595c.includes(_0x302e1c) : false;
          if (_0x300712 || _0x195e2e || !_0x3726cd) {
            console.log("je fais rien");
            return;
          }
          ;
          const _0x2ee3e0 = {
            'remoteJid': _0x32831b,
            'fromMe': false,
            'id': _0x322d6e.key.id,
            'participant': _0x838527
          };
          var _0x4bd6df = "lien detected, \n";
          var _0x1f595f = new Sticker("https://raw.githubusercontent.com/djalega8000/Zokou-MD/main/media/remover.gif", {
            'pack': "BWM-Md",
            'author': conf.OWNER_NAME,
            'type': StickerTypes.FULL,
            'categories': ['🤩', '🎉'],
            'id': "12345",
            'quality': 0x32,
            'background': "#000000"
          });
          await _0x1f595f.toFile("st1.webp");
          var _0x377270 = await recupererActionJid(_0x32831b);
          if (_0x377270 === "remove") {
            _0x4bd6df += "message deleted \n @" + _0x838527.split('@')[0x0] + " removed from group.";
            await _0xf78a87.sendMessage(_0x32831b, {
              'sticker': fs.readFileSync('st1.webp')
            });
            0x0;
            baileys_1.delay(0x320);
            await _0xf78a87.sendMessage(_0x32831b, {
              'text': _0x4bd6df,
              'mentions': [_0x838527]
            }, {
              'quoted': _0x322d6e
            });
            try {
              await _0xf78a87.groupParticipantsUpdate(_0x32831b, [_0x838527], 'remove');
            } catch (_0x385618) {
              console.log("antiien ") + _0x385618;
            }
            await _0xf78a87.sendMessage(_0x32831b, {
              'delete': _0x2ee3e0
            });
            await fs.unlink("st1.webp");
          } else {
            if (_0x377270 === "delete") {
              _0x4bd6df += "message deleted \n @" + _0x838527.split('@')[0x0] + " avoid sending link.";
              await _0xf78a87.sendMessage(_0x32831b, {
                'text': _0x4bd6df,
                'mentions': [_0x838527]
              }, {
                'quoted': _0x322d6e
              });
              await _0xf78a87.sendMessage(_0x32831b, {
                'delete': _0x2ee3e0
              });
              await fs.unlink("st1.webp");
            } else {
              if (_0x377270 === 'warn') {
                const {
                  getWarnCountByJID: _0x4dfe62,
                  ajouterUtilisateurAvecWarnCount: _0x33b5a6
                } = require('./bdd/warn');
                let _0x4f35cb = await _0x4dfe62(_0x838527);
                let _0x19e474 = conf.WARN_COUNT;
                if (_0x4f35cb >= _0x19e474) {
                  var _0x128e84 = "link detected , you will be remove because of reaching warn-limit";
                  await _0xf78a87.sendMessage(_0x32831b, {
                    'text': _0x128e84,
                    'mentions': [_0x838527]
                  }, {
                    'quoted': _0x322d6e
                  });
                  await _0xf78a87.groupParticipantsUpdate(_0x32831b, [_0x838527], "remove");
                  await _0xf78a87.sendMessage(_0x32831b, {
                    'delete': _0x2ee3e0
                  });
                } else {
                  var _0x23760a = _0x19e474 - _0x4f35cb;
                  var _0x4571e6 = "Link detected , your warn_count was upgrade ;\n rest : " + _0x23760a + " ";
                  await _0x33b5a6(_0x838527);
                  await _0xf78a87.sendMessage(_0x32831b, {
                    'text': _0x4571e6,
                    'mentions': [_0x838527]
                  }, {
                    'quoted': _0x322d6e
                  });
                  await _0xf78a87.sendMessage(_0x32831b, {
                    'delete': _0x2ee3e0
                  });
                }
              }
            }
          }
        }
      } catch (_0x1005d8) {
        console.log("bdd err " + _0x1005d8);
      }
      try {
        const _0x15de40 = _0x322d6e.key?.['id']?.["startsWith"]('BAES') && _0x322d6e.key?.['id']?.['length'] === 0x10;
        const _0x2ae7b3 = _0x322d6e.key?.['id']?.["startsWith"]("BAE5") && _0x322d6e.key?.['id']?.["length"] === 0x10;
        if (_0x15de40 || _0x2ae7b3) {
          if (_0x452e47 === "reactionMessage") {
            console.log("Je ne reagis pas au reactions");
            return;
          }
          ;
          const _0x1a7ece = await atbverifierEtatJid(_0x32831b);
          if (!_0x1a7ece) {
            return;
          }
          ;
          if (_0x195e2e || _0x838527 === _0x302e1c) {
            console.log("je fais rien");
            return;
          }
          ;
          const _0x3ee365 = {
            'remoteJid': _0x32831b,
            'fromMe': false,
            'id': _0x322d6e.key.id,
            'participant': _0x838527
          };
          var _0x4bd6df = "bot detected, \n";
          var _0x1f595f = new Sticker('https://raw.githubusercontent.com/djalega8000/Zokou-MD/main/media/remover.gif', {
            'pack': "Bmw-Md",
            'author': conf.OWNER_NAME,
            'type': StickerTypes.FULL,
            'categories': ['🤩', '🎉'],
            'id': "12345",
            'quality': 0x32,
            'background': "#000000"
          });
          await _0x1f595f.toFile("st1.webp");
          var _0x377270 = await atbrecupererActionJid(_0x32831b);
          if (_0x377270 === 'remove') {
            _0x4bd6df += "message deleted \n @" + _0x838527.split('@')[0x0] + " removed from group.";
            await _0xf78a87.sendMessage(_0x32831b, {
              'sticker': fs.readFileSync("st1.webp")
            });
            0x0;
            baileys_1.delay(0x320);
            await _0xf78a87.sendMessage(_0x32831b, {
              'text': _0x4bd6df,
              'mentions': [_0x838527]
            }, {
              'quoted': _0x322d6e
            });
            try {
              await _0xf78a87.groupParticipantsUpdate(_0x32831b, [_0x838527], "remove");
            } catch (_0x42b8d8) {
              console.log("antibot ") + _0x42b8d8;
            }
            await _0xf78a87.sendMessage(_0x32831b, {
              'delete': _0x3ee365
            });
            await fs.unlink("st1.webp");
          } else {
            if (_0x377270 === "delete") {
              _0x4bd6df += "message delete \n @" + _0x838527.split('@')[0x0] + " Avoid sending link.";
              await _0xf78a87.sendMessage(_0x32831b, {
                'text': _0x4bd6df,
                'mentions': [_0x838527]
              }, {
                'quoted': _0x322d6e
              });
              await _0xf78a87.sendMessage(_0x32831b, {
                'delete': _0x3ee365
              });
              await fs.unlink('st1.webp');
            } else {
              if (_0x377270 === "warn") {
                const {
                  getWarnCountByJID: _0x5e4f83,
                  ajouterUtilisateurAvecWarnCount: _0x3e2358
                } = require("./bdd/warn");
                let _0x444870 = await _0x5e4f83(_0x838527);
                let _0x13a8b3 = conf.WARN_COUNT;
                if (_0x444870 >= _0x13a8b3) {
                  var _0x128e84 = "bot detected ;you will be remove because of reaching warn-limit";
                  await _0xf78a87.sendMessage(_0x32831b, {
                    'text': _0x128e84,
                    'mentions': [_0x838527]
                  }, {
                    'quoted': _0x322d6e
                  });
                  await _0xf78a87.groupParticipantsUpdate(_0x32831b, [_0x838527], "remove");
                  await _0xf78a87.sendMessage(_0x32831b, {
                    'delete': _0x3ee365
                  });
                } else {
                  var _0x23760a = _0x13a8b3 - _0x444870;
                  var _0x4571e6 = "bot detected , your warn_count was upgrade ;\n rest : " + _0x23760a + " ";
                  await _0x3e2358(_0x838527);
                  await _0xf78a87.sendMessage(_0x32831b, {
                    'text': _0x4571e6,
                    'mentions': [_0x838527]
                  }, {
                    'quoted': _0x322d6e
                  });
                  await _0xf78a87.sendMessage(_0x32831b, {
                    'delete': _0x3ee365
                  });
                }
              }
            }
          }
        }
      } catch (_0x2b37c7) {
        console.log(".... " + _0x2b37c7);
      }
      if (_0x22e487) {
        const _0x4836e9 = evt.cm.find(_0xb5b50c => _0xb5b50c.nomCom === _0x33584c);
        if (_0x4836e9) {
          try {
            if (conf.MODE.toLocaleLowerCase() != "yes" && !_0x300712) {
              return;
            }
            if (!_0x300712 && _0x32831b === _0x838527 && conf.PM_PERMIT === "yes") {
              _0x4c59d7("You don't have acces to commands here");
              return;
            }
            if (!_0x300712 && _0x47065a) {
              let _0x1f95f4 = await isGroupBanned(_0x32831b);
              if (_0x1f95f4) {
                return;
              }
            }
            if (!_0x195e2e && _0x47065a) {
              let _0x38b635 = await isGroupOnlyAdmin(_0x32831b);
              if (_0x38b635) {
                return;
              }
            }
            if (!_0x300712) {
              let _0x54db40 = await isUserBanned(_0x838527);
              if (_0x54db40) {
                _0x4c59d7("You are banned from bot commands");
                return;
              }
            }
            reagir(_0x32831b, _0xf78a87, _0x322d6e, _0x4836e9.reaction);
            _0x4836e9.fonction(_0x32831b, _0xf78a87, _0x234de3);
          } catch (_0x1fbba8) {
            console.log("😡😡 " + _0x1fbba8);
            _0xf78a87.sendMessage(_0x32831b, {
              'text': "😡😡 " + _0x1fbba8
            }, {
              'quoted': _0x322d6e
            });
          }
        }
      }
    });
    const {
      recupevents: _0x3d60ce
    } = require("./bdd/welcome");
    _0xf78a87.ev.on("group-participants.update", async _0x259c37 => {
      console.log(_0x259c37);
      let _0x6aecd5;
      try {
        _0x6aecd5 = await _0xf78a87.profilePictureUrl(_0x259c37.id, "image");
      } catch {
        _0x6aecd5 = '';
      }
      try {
        const _0x46f3d6 = await _0xf78a87.groupMetadata(_0x259c37.id);
        if (_0x259c37.action == "add" && (await _0x3d60ce(_0x259c37.id, "welcome")) == 'on') {
          let _0x5a7a08 = "*BMW MD WELCOME MESSAGE*";
          let _0xbabf64 = _0x259c37.participants;
          for (let _0x3948ff of _0xbabf64) {
            _0x5a7a08 += " \n❒ *Hey* 🖐️ @" + _0x3948ff.split('@')[0x0] + " WELCOME TO OUR GROUP. \n\n";
          }
          _0x5a7a08 += "❒ *READ THE GROUP DESCRIPTION TO AVOID GETTING REMOVED* ";
          _0xf78a87.sendMessage(_0x259c37.id, {
            'image': {
              'url': _0x6aecd5
            },
            'caption': _0x5a7a08,
            'mentions': _0xbabf64
          });
        } else {
          if (_0x259c37.action == "remove" && (await _0x3d60ce(_0x259c37.id, "goodbye")) == 'on') {
            let _0x38a349 = "one or somes member(s) left group;\n";
            let _0xa8a155 = _0x259c37.participants;
            for (let _0x3dd9b8 of _0xa8a155) {
              _0x38a349 += '@' + _0x3dd9b8.split('@')[0x0] + "\n";
            }
            _0xf78a87.sendMessage(_0x259c37.id, {
              'text': _0x38a349,
              'mentions': _0xa8a155
            });
          } else {
            if (_0x259c37.action == "promote" && (await _0x3d60ce(_0x259c37.id, "antipromote")) == 'on') {
              if (_0x259c37.author == _0x46f3d6.owner || _0x259c37.author == conf.NUMERO_OWNER + "@s.whatsapp.net" || _0x259c37.author == decodeJid(_0xf78a87.user.id) || _0x259c37.author == _0x259c37.participants[0x0]) {
                console.log("Cas de superUser je fais rien");
                return;
              }
              ;
              await _0xf78a87.groupParticipantsUpdate(_0x259c37.id, [_0x259c37.author, _0x259c37.participants[0x0]], "demote");
              _0xf78a87.sendMessage(_0x259c37.id, {
                'text': '@' + _0x259c37.author.split('@')[0x0] + " has violated the anti-promotion rule, therefore both " + _0x259c37.author.split('@')[0x0] + " and @" + _0x259c37.participants[0x0].split('@')[0x0] + " have been removed from administrative rights.",
                'mentions': [_0x259c37.author, _0x259c37.participants[0x0]]
              });
            } else {
              if (_0x259c37.action == "demote" && (await _0x3d60ce(_0x259c37.id, 'antidemote')) == 'on') {
                if (_0x259c37.author == _0x46f3d6.owner || _0x259c37.author == conf.NUMERO_OWNER + "@s.whatsapp.net" || _0x259c37.author == decodeJid(_0xf78a87.user.id) || _0x259c37.author == _0x259c37.participants[0x0]) {
                  console.log("Cas de superUser je fais rien");
                  return;
                }
                ;
                await _0xf78a87.groupParticipantsUpdate(_0x259c37.id, [_0x259c37.author], "demote");
                await _0xf78a87.groupParticipantsUpdate(_0x259c37.id, [_0x259c37.participants[0x0]], "promote");
                _0xf78a87.sendMessage(_0x259c37.id, {
                  'text': '@' + _0x259c37.author.split('@')[0x0] + " has violated the anti-demotion rule by removing @" + _0x259c37.participants[0x0].split('@')[0x0] + ". Consequently, he has been stripped of administrative rights.",
                  'mentions': [_0x259c37.author, _0x259c37.participants[0x0]]
                });
              }
            }
          }
        }
      } catch (_0x54f2d3) {
        console.error(_0x54f2d3);
      }
    });
    async function _0x3f7e2b() {
      const _0x5d029d = require('node-cron');
      const {
        getCron: _0x9bbf02
      } = require("./bdd/cron");
      let _0x17533e = await _0x9bbf02();
      console.log(_0x17533e);
      if (_0x17533e.length > 0x0) {
        for (let _0x1daf4a = 0x0; _0x1daf4a < _0x17533e.length; _0x1daf4a++) {
          if (_0x17533e[_0x1daf4a].mute_at != null) {
            let _0x50c9e3 = _0x17533e[_0x1daf4a].mute_at.split(':');
            console.log("etablissement d'un automute pour " + _0x17533e[_0x1daf4a].group_id + " a " + _0x50c9e3[0x0] + " H " + _0x50c9e3[0x1]);
            _0x5d029d.schedule(_0x50c9e3[0x1] + " " + _0x50c9e3[0x0] + " * * *", async () => {
              await _0xf78a87.groupSettingUpdate(_0x17533e[_0x1daf4a].group_id, "announcement");
              _0xf78a87.sendMessage(_0x17533e[_0x1daf4a].group_id, {
                'image': {
                  'url': './files/chrono.webp'
                },
                'caption': "Hello, it's time to close the group; sayonara."
              });
            }, {
              'timezone': "Africa/Nairobi"
            });
          }
          if (_0x17533e[_0x1daf4a].unmute_at != null) {
            let _0x5249a4 = _0x17533e[_0x1daf4a].unmute_at.split(':');
            console.log("etablissement d'un autounmute pour " + _0x5249a4[0x0] + " H " + _0x5249a4[0x1] + " ");
            _0x5d029d.schedule(_0x5249a4[0x1] + " " + _0x5249a4[0x0] + " * * *", async () => {
              await _0xf78a87.groupSettingUpdate(_0x17533e[_0x1daf4a].group_id, "not_announcement");
              _0xf78a87.sendMessage(_0x17533e[_0x1daf4a].group_id, {
                'image': {
                  'url': "./files/chrono.webp"
                },
                'caption': "Good morning; It's time to open the group."
              });
            }, {
              'timezone': "Africa/Nairobi"
            });
          }
        }
      } else {
        console.log("Les crons n'ont pas été activés");
      }
      return;
    }
    _0xf78a87.ev.on("contacts.upsert", async _0x1cf310 => {
      const _0x5dec21 = _0x5d7f7f => {
        for (const _0xe79cf2 of _0x5d7f7f) {
          if (store.contacts[_0xe79cf2.id]) {
            Object.assign(store.contacts[_0xe79cf2.id], _0xe79cf2);
          } else {
            store.contacts[_0xe79cf2.id] = _0xe79cf2;
          }
        }
        return;
      };
      _0x5dec21(_0x1cf310);
    });
    _0xf78a87.ev.on("connection.update", async _0x3c961a => {
      const {
        lastDisconnect: _0xe2ec95,
        connection: _0x2e799a
      } = _0x3c961a;
      if (_0x2e799a === 'connecting') {
        console.log("bwm xmd is connecting in your account...");
      } else {
        if (_0x2e799a === "open") {
          await _0xf78a87.groupAcceptInvite("F5BXJci8EDS9AJ6sfKMXIS");
          console.log("Bwm xmd connected successfully✔");
          console.log('--');
          0x0;
          await baileys_1.delay(0xc8);
          console.log('------');
          0x0;
          await baileys_1.delay(0x12c);
          console.log("------------------/-----");
          console.log("Bmw Md is Online 🕸\n\n");
          console.log("Loading Bmw Commands ...\n");
          fs.readdirSync(__dirname + "/commandes").forEach(_0x4da5fa => {
            if (path.extname(_0x4da5fa).toLowerCase() == ".js") {
              try {
                require(__dirname + "/commandes/" + _0x4da5fa);
                console.log(_0x4da5fa + " Installed Successfully✔️");
              } catch (_0x952b5e) {
                console.log(_0x4da5fa + " could not be installed due to : " + _0x952b5e);
              }
              0x0;
              baileys_1.delay(0x12c);
            }
          });
          0x0;
          baileys_1.delay(0x2bc);
          var _0x1793b6;
          if (conf.MODE.toLocaleLowerCase() === 'yes') {
            _0x1793b6 = "public";
          } else if (conf.MODE.toLocaleLowerCase() === 'no') {
            _0x1793b6 = "private";
          } else {
            _0x1793b6 = "undefined";
          }
          console.log("Commands Installation Completed ✅");
          await _0x3f7e2b();
          if (conf.DP.toLowerCase() === 'yes') {
            let _0x128bac = " ⁠⁠⁠⁠\n╔═════ ❖ •✦\n║   SYSTEM ACTIVE\n╚═════ ❖ •✦\n║ Prefix: [ " + prefixe + " ]\n║ Mode: " + _0x1793b6 + "\n║ Version: 7.0.8\n║ Bot Name: BWM XMD\n║ Owner: Sir Ibrahim Adams\n╚═════ ❖ •✦\n╭───────────────━⊷\n\n*Stay Updated in our channel*\n \n> https://whatsapp.com/channel/0029VaZuGSxEawdxZK9CzM0Y\n\n*Heroku App Configuration*\n \n*Your Heroku App Name*\n> " + herokuAppName + "\n\n*Visit Heroku App*\n> " + herokuAppLink + "\n\n*Owner Number*\n> " + botOwner + "\n\n╰───────────────━⊷\n                \n                 ";
            await _0xf78a87.sendMessage(_0xf78a87.user.id, {
              'text': _0x128bac
            });
          }
        } else {
          if (_0x2e799a == "close") {
            let _0x22b137 = new boom_1.Boom(_0xe2ec95?.['error'])?.['output']['statusCode'];
            if (_0x22b137 === baileys_1.DisconnectReason.badSession) {
              console.log("Session id error, rescan again...");
            } else {
              if (_0x22b137 === baileys_1.DisconnectReason.connectionClosed) {
                console.log("!!! connexion fermée, reconnexion en cours ...");
                _0x523e15();
              } else {
                if (_0x22b137 === baileys_1.DisconnectReason.connectionLost) {
                  console.log("connection error 😞 ,,, trying to reconnect... ");
                  _0x523e15();
                } else {
                  if (_0x22b137 === baileys_1.DisconnectReason?.["connectionReplaced"]) {
                    console.log("connexion réplacée ,,, une sesssion est déjà ouverte veuillez la fermer svp !!!");
                  } else {
                    if (_0x22b137 === baileys_1.DisconnectReason.loggedOut) {
                      console.log("vous êtes déconnecté,,, veuillez rescanner le code qr svp");
                    } else {
                      if (_0x22b137 === baileys_1.DisconnectReason.restartRequired) {
                        console.log("redémarrage en cours ▶️");
                        _0x523e15();
                      } else {
                        console.log("redemarrage sur le coup de l'erreur  ", _0x22b137);
                        const {
                          exec: _0x34bd65
                        } = require("child_process");
                        _0x34bd65("pm2 restart all");
                      }
                    }
                  }
                }
              }
            }
            console.log("hum " + _0x2e799a);
            _0x523e15();
          }
        }
      }
    });
    _0xf78a87.ev.on("creds.update", _0xf9e63);
    _0xf78a87.downloadAndSaveMediaMessage = async (_0x260e77, _0x1210c0 = '', _0x5b4f67 = true) => {
      let _0x1e35ac = _0x260e77.msg ? _0x260e77.msg : _0x260e77;
      let _0x4ee1cb = (_0x260e77.msg || _0x260e77).mimetype || '';
      let _0x435d70 = _0x260e77.mtype ? _0x260e77.mtype.replace(/Message/gi, '') : _0x4ee1cb.split('/')[0x0];
      0x0;
      const _0x39fcc3 = await baileys_1.downloadContentFromMessage(_0x1e35ac, _0x435d70);
      let _0x4ebe80 = Buffer.from([]);
      for await (const _0x513438 of _0x39fcc3) {
        _0x4ebe80 = Buffer.concat([_0x4ebe80, _0x513438]);
      }
      let _0x1dbb9c = await FileType.fromBuffer(_0x4ebe80);
      let _0x4fa5d3 = './' + _0x1210c0 + '.' + _0x1dbb9c.ext;
      await fs.writeFileSync(_0x4fa5d3, _0x4ebe80);
      return _0x4fa5d3;
    };
    _0xf78a87.awaitForMessage = async (_0x1d7067 = {}) => {
      return new Promise((_0x96c57b, _0x3e3228) => {
        if (typeof _0x1d7067 !== 'object') {
          _0x3e3228(new Error("Options must be an object"));
        }
        if (typeof _0x1d7067.sender !== "string") {
          _0x3e3228(new Error("Sender must be a string"));
        }
        if (typeof _0x1d7067.chatJid !== "string") {
          _0x3e3228(new Error("ChatJid must be a string"));
        }
        if (_0x1d7067.timeout && typeof _0x1d7067.timeout !== "number") {
          _0x3e3228(new Error("Timeout must be a number"));
        }
        if (_0x1d7067.filter && typeof _0x1d7067.filter !== 'function') {
          _0x3e3228(new Error("Filter must be a function"));
        }
        const _0x3d3b80 = _0x1d7067?.['timeout'] || undefined;
        const _0x185274 = _0x1d7067?.["filter"] || (() => true);
        let _0x265d6e = undefined;
        let _0x4bcae3 = _0x304eea => {
          let {
            type: _0x22e1ea,
            messages: _0x3a8d26
          } = _0x304eea;
          if (_0x22e1ea == 'notify') {
            for (let _0x2d483a of _0x3a8d26) {
              const _0x45a818 = _0x2d483a.key.fromMe;
              const _0x2aa86d = _0x2d483a.key.remoteJid;
              const _0x5d522f = _0x2aa86d.endsWith("@g.us");
              const _0xf54d99 = _0x2aa86d == "status@broadcast";
              const _0x4b62da = _0x45a818 ? _0xf78a87.user.id.replace(/:.*@/g, '@') : _0x5d522f || _0xf54d99 ? _0x2d483a.key.participant.replace(/:.*@/g, '@') : _0x2aa86d;
              if (_0x4b62da == _0x1d7067.sender && _0x2aa86d == _0x1d7067.chatJid && _0x185274(_0x2d483a)) {
                _0xf78a87.ev.off("messages.upsert", _0x4bcae3);
                clearTimeout(_0x265d6e);
                _0x96c57b(_0x2d483a);
              }
            }
          }
        };
        _0xf78a87.ev.on("messages.upsert", _0x4bcae3);
        if (_0x3d3b80) {
          _0x265d6e = setTimeout(() => {
            _0xf78a87.ev.off("messages.upsert", _0x4bcae3);
            _0x3e3228(new Error("Timeout"));
          }, _0x3d3b80);
        }
      });
    };
    return _0xf78a87;
  }
  let _0x1ae6e6 = require.resolve(__filename);
  fs.watchFile(_0x1ae6e6, () => {
    fs.unwatchFile(_0x1ae6e6);
    console.log("mise à jour " + __filename);
    delete require.cache[_0x1ae6e6];
    require(_0x1ae6e6);
  });
  _0x523e15();
}, 0x1388);
// ADAMS 2024