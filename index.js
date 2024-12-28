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
    const _0xf8aa76 = _0x28b895 => new Promise(_0x4822f3 => setTimeout(_0x4822f3, _0x28b895));
    let _0x8d36d5 = 0x0;
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
      _0x3686ee.ev.on("messages.upsert", async _0x78facd => {
        const {
          messages: _0x1147e8
        } = _0x78facd;
        for (const _0x22bf35 of _0x1147e8) {
          if (_0x22bf35.key && _0x22bf35.key.remoteJid === 'status@broadcast') {
            console.log("Detected status update from:", _0x22bf35.key.remoteJid);
            const _0x22e5d8 = Date.now();
            if (_0x22e5d8 - _0x8d36d5 < 0x1388) {
              console.log("Throttling reactions to prevent overflow.");
              continue;
            }
            const _0x275aa0 = _0x3686ee.user && _0x3686ee.user.id ? _0x3686ee.user.id.split(':')[0x0] + '@s.whatsapp.net' : null;
            if (!_0x275aa0) {
              console.log("Bot's user ID not available. Skipping reaction.");
              continue;
            }
            const _0x52a2fa = _0x22bf35?.["message"]?.['conversation'] || '';
            const _0x44fd53 = _0x22a551(_0x52a2fa) || _0x250bda[Math.floor(Math.random() * _0x250bda.length)];
            if (_0x44fd53) {
              await _0x3686ee.sendMessage(_0x22bf35.key.remoteJid, {
                'react': {
                  'key': _0x22bf35.key,
                  'text': _0x44fd53
                }
              }, {
                'statusJidList': [_0x22bf35.key.participant, _0x275aa0]
              });
              _0x8d36d5 = Date.now();
              console.log("Successfully reacted with '" + _0x44fd53 + "' to status update by " + _0x22bf35.key.remoteJid);
            }
            await _0xf8aa76(0x7d0);
          }
        }
      });
    }
    if (conf.AUTO_REACT === "yes") {
      console.log("AUTO_REACT is enabled. Listening for regular messages...");
      _0x3686ee.ev.on("messages.upsert", async _0x3ae8d6 => {
        const {
          messages: _0x24400a
        } = _0x3ae8d6;
        for (const _0x33f664 of _0x24400a) {
          if (_0x33f664.key && _0x33f664.key.remoteJid) {
            const _0x3d1f7c = Date.now();
            if (_0x3d1f7c - _0x8d36d5 < 0x1388) {
              console.log("Throttling reactions to prevent overflow.");
              continue;
            }
            const _0x16c1d3 = _0x33f664?.['message']?.["conversation"] || '';
            const _0x53dfed = _0x22a551(_0x16c1d3) || _0x250bda[Math.floor(Math.random() * _0x250bda.length)];
            if (_0x53dfed) {
              await _0x3686ee.sendMessage(_0x33f664.key.remoteJid, {
                'react': {
                  'text': _0x53dfed,
                  'key': _0x33f664.key
                }
              }).then(() => {
                _0x8d36d5 = Date.now();
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
              'text': _0x4e639a,
              'mentions': [_0x19b3a0]
            }, {
              'quoted': _0x4c77a4
            });
            try {
              await _0xf78a87.groupParticipantsUpdate(_0x56ba16, [_0x19b3a0], 'remove');
            } catch (_0x1f8622) {
              console.log("antiien ") + _0x1f8622;
            }
            await _0xf78a87.sendMessage(_0x56ba16, {
              'delete': _0x57d055
            });
            await fs.unlink("st1.webp");
          } else {
            if (_0x360ce2 === "delete") {
              _0x4e639a += "message deleted \n @" + _0x19b3a0.split('@')[0x0] + " avoid sending link.";
              await _0xf78a87.sendMessage(_0x56ba16, {
                'text': _0x4e639a,
                'mentions': [_0x19b3a0]
              }, {
                'quoted': _0x4c77a4
              });
              await _0xf78a87.sendMessage(_0x56ba16, {
                'delete': _0x57d055
              });
              await fs.unlink("st1.webp");
            } else {
              if (_0x360ce2 === "warn") {
                const {
                  getWarnCountByJID: _0x929622,
                  ajouterUtilisateurAvecWarnCount: _0x10aad9
                } = require('./bdd/warn');
                let _0x3c1839 = await _0x929622(_0x19b3a0);
                let _0x4ee8dc = conf.WARN_COUNT;
                if (_0x3c1839 >= _0x4ee8dc) {
                  var _0x3dce1e = "link detected , you will be remove because of reaching warn-limit";
                  await _0xf78a87.sendMessage(_0x56ba16, {
                    'text': _0x3dce1e,
                    'mentions': [_0x19b3a0]
                  }, {
                    'quoted': _0x4c77a4
                  });
                  await _0xf78a87.groupParticipantsUpdate(_0x56ba16, [_0x19b3a0], "remove");
                  await _0xf78a87.sendMessage(_0x56ba16, {
                    'delete': _0x57d055
                  });
                } else {
                  var _0x5dfdea = _0x4ee8dc - _0x3c1839;
                  var _0x28f434 = "Link detected , your warn_count was upgrade ;\n rest : " + _0x5dfdea + " ";
                  await _0x10aad9(_0x19b3a0);
                  await _0xf78a87.sendMessage(_0x56ba16, {
                    'text': _0x28f434,
                    'mentions': [_0x19b3a0]
                  }, {
                    'quoted': _0x4c77a4
                  });
                  await _0xf78a87.sendMessage(_0x56ba16, {
                    'delete': _0x57d055
                  });
                }
              }
            }
          }
        }
      } catch (_0x250d7f) {
        console.log("bdd err " + _0x250d7f);
      }
      try {
        const _0x2b5683 = _0x4c77a4.key?.['id']?.["startsWith"]('BAES') && _0x4c77a4.key?.['id']?.["length"] === 0x10;
        const _0x301449 = _0x4c77a4.key?.['id']?.["startsWith"]("BAE5") && _0x4c77a4.key?.['id']?.['length'] === 0x10;
        if (_0x2b5683 || _0x301449) {
          if (_0x38342d === 'reactionMessage') {
            console.log("Je ne reagis pas au reactions");
            return;
          }
          ;
          const _0x3dc4cd = await atbverifierEtatJid(_0x56ba16);
          if (!_0x3dc4cd) {
            return;
          }
          ;
          if (_0x4f0765 || _0x19b3a0 === _0x4f6687) {
            console.log("je fais rien");
            return;
          }
          ;
          const _0x263ebd = {
            'remoteJid': _0x56ba16,
            'fromMe': false,
            'id': _0x4c77a4.key.id,
            'participant': _0x19b3a0
          };
          var _0x4e639a = "bot detected, \n";
          var _0x59ee8f = new Sticker("https://raw.githubusercontent.com/djalega8000/Zokou-MD/main/media/remover.gif", {
            'pack': "Zoou-Md",
            'author': conf.OWNER_NAME,
            'type': StickerTypes.FULL,
            'categories': ['🤩', '🎉'],
            'id': '12345',
            'quality': 0x32,
            'background': "#000000"
          });
          await _0x59ee8f.toFile("st1.webp");
          var _0x360ce2 = await atbrecupererActionJid(_0x56ba16);
          if (_0x360ce2 === "remove") {
            _0x4e639a += "message deleted \n @" + _0x19b3a0.split('@')[0x0] + " removed from group.";
            await _0xf78a87.sendMessage(_0x56ba16, {
              'sticker': fs.readFileSync("st1.webp")
            });
            0x0;
            baileys_1.delay(0x320);
            await _0xf78a87.sendMessage(_0x56ba16, {
              'text': _0x4e639a,
              'mentions': [_0x19b3a0]
            }, {
              'quoted': _0x4c77a4
            });
            try {
              await _0xf78a87.groupParticipantsUpdate(_0x56ba16, [_0x19b3a0], 'remove');
            } catch (_0x3acf25) {
              console.log("antibot ") + _0x3acf25;
            }
            await _0xf78a87.sendMessage(_0x56ba16, {
              'delete': _0x263ebd
            });
            await fs.unlink('st1.webp');
          } else {
            if (_0x360ce2 === "delete") {
              _0x4e639a += "message delete \n @" + _0x19b3a0.split('@')[0x0] + " Avoid sending link.";
              await _0xf78a87.sendMessage(_0x56ba16, {
                'text': _0x4e639a,
                'mentions': [_0x19b3a0]
              }, {
                'quoted': _0x4c77a4
              });
              await _0xf78a87.sendMessage(_0x56ba16, {
                'delete': _0x263ebd
              });
              await fs.unlink("st1.webp");
            } else {
              if (_0x360ce2 === "warn") {
                const {
                  getWarnCountByJID: _0x5ae1fd,
                  ajouterUtilisateurAvecWarnCount: _0x3a3227
                } = require("./bdd/warn");
                let _0x19cb19 = await _0x5ae1fd(_0x19b3a0);
                let _0x347a13 = conf.WARN_COUNT;
                if (_0x19cb19 >= _0x347a13) {
                  var _0x3dce1e = "bot detected ;you will be remove because of reaching warn-limit";
                  await _0xf78a87.sendMessage(_0x56ba16, {
                    'text': _0x3dce1e,
                    'mentions': [_0x19b3a0]
                  }, {
                    'quoted': _0x4c77a4
                  });
                  await _0xf78a87.groupParticipantsUpdate(_0x56ba16, [_0x19b3a0], "remove");
                  await _0xf78a87.sendMessage(_0x56ba16, {
                    'delete': _0x263ebd
                  });
                } else {
                  var _0x5dfdea = _0x347a13 - _0x19cb19;
                  var _0x28f434 = "bot detected , your warn_count was upgrade ;\n rest : " + _0x5dfdea + " ";
                  await _0x3a3227(_0x19b3a0);
                  await _0xf78a87.sendMessage(_0x56ba16, {
                    'text': _0x28f434,
                    'mentions': [_0x19b3a0]
                  }, {
                    'quoted': _0x4c77a4
                  });
                  await _0xf78a87.sendMessage(_0x56ba16, {
                    'delete': _0x263ebd
                  });
                }
              }
            }
          }
        }
      } catch (_0x4e1246) {
        console.log(".... " + _0x4e1246);
      }
      if (_0x362812) {
        const _0x51c016 = evt.cm.find(_0x5dce6c => _0x5dce6c.nomCom === _0x2c0823);
        if (_0x51c016) {
          try {
            if (conf.MODE.toLocaleLowerCase() != 'yes' && !_0x5a78ec) {
              return;
            }
            if (!_0x5a78ec && _0x56ba16 === _0x19b3a0 && conf.PM_PERMIT === 'yes') {
              _0x5c197a("You don't have acces to commands here");
              return;
            }
            if (!_0x5a78ec && _0x3c4e15) {
              let _0x513f7a = await isGroupBanned(_0x56ba16);
              if (_0x513f7a) {
                return;
              }
            }
            if (!_0x4f0765 && _0x3c4e15) {
              let _0x8faddc = await isGroupOnlyAdmin(_0x56ba16);
              if (_0x8faddc) {
                return;
              }
            }
            if (!_0x5a78ec) {
              let _0x415719 = await isUserBanned(_0x19b3a0);
              if (_0x415719) {
                _0x5c197a("You are banned from bot commands");
                return;
              }
            }
            reagir(_0x56ba16, _0xf78a87, _0x4c77a4, _0x51c016.reaction);
            _0x51c016.fonction(_0x56ba16, _0xf78a87, _0x4aaf08);
          } catch (_0x4da9ad) {
            console.log("😡😡 " + _0x4da9ad);
            _0xf78a87.sendMessage(_0x56ba16, {
              'text': "😡😡 " + _0x4da9ad
            }, {
              'quoted': _0x4c77a4
            });
          }
        }
      }
    });
    const {
      recupevents: _0x3917c8
    } = require("./bdd/welcome");
    _0xf78a87.ev.on("group-participants.update", async _0x2d4ff0 => {
      console.log(_0x2d4ff0);
      let _0x1f7dd8;
      try {
        _0x1f7dd8 = await _0xf78a87.profilePictureUrl(_0x2d4ff0.id, "image");
      } catch {
        _0x1f7dd8 = '';
      }
      try {
        const _0x442c6f = await _0xf78a87.groupMetadata(_0x2d4ff0.id);
        if (_0x2d4ff0.action == "add" && (await _0x3917c8(_0x2d4ff0.id, 'welcome')) == 'on') {
          let _0x4cf3d4 = "*HANS WELCOME MESSAGE*";
          let _0x80123d = _0x2d4ff0.participants;
          for (let _0x466772 of _0x80123d) {
            _0x4cf3d4 += " \n❒ *Hey* 🖐️ @" + _0x466772.split('@')[0x0] + " WELCOME TO OUR GROUP. \n\n";
          }
          _0x4cf3d4 += "❒ *READ THE GROUP DESCRIPTION TO AVOID GETTING REMOVED* ";
          _0xf78a87.sendMessage(_0x2d4ff0.id, {
            'image': {
              'url': _0x1f7dd8
            },
            'caption': _0x4cf3d4,
            'mentions': _0x80123d
          });
        } else {
          if (_0x2d4ff0.action == "remove" && (await _0x3917c8(_0x2d4ff0.id, "goodbye")) == 'on') {
            let _0x450444 = "one or somes member(s) left group;\n";
            let _0x1a2615 = _0x2d4ff0.participants;
            for (let _0x18ab7f of _0x1a2615) {
              _0x450444 += '@' + _0x18ab7f.split('@')[0x0] + "\n";
            }
            _0xf78a87.sendMessage(_0x2d4ff0.id, {
              'text': _0x450444,
              'mentions': _0x1a2615
            });
          } else {
            if (_0x2d4ff0.action == "promote" && (await _0x3917c8(_0x2d4ff0.id, "antipromote")) == 'on') {
              if (_0x2d4ff0.author == _0x442c6f.owner || _0x2d4ff0.author == conf.NUMERO_OWNER + "@s.whatsapp.net" || _0x2d4ff0.author == decodeJid(_0xf78a87.user.id) || _0x2d4ff0.author == _0x2d4ff0.participants[0x0]) {
                console.log("Cas de superUser je fais rien");
                return;
              }
              ;
              await _0xf78a87.groupParticipantsUpdate(_0x2d4ff0.id, [_0x2d4ff0.author, _0x2d4ff0.participants[0x0]], "demote");
              _0xf78a87.sendMessage(_0x2d4ff0.id, {
                'text': '@' + _0x2d4ff0.author.split('@')[0x0] + " has violated the anti-promotion rule, therefore both " + _0x2d4ff0.author.split('@')[0x0] + " and @" + _0x2d4ff0.participants[0x0].split('@')[0x0] + " have been removed from administrative rights.",
                'mentions': [_0x2d4ff0.author, _0x2d4ff0.participants[0x0]]
              });
            } else {
              if (_0x2d4ff0.action == "demote" && (await _0x3917c8(_0x2d4ff0.id, "antidemote")) == 'on') {
                if (_0x2d4ff0.author == _0x442c6f.owner || _0x2d4ff0.author == conf.NUMERO_OWNER + '@s.whatsapp.net' || _0x2d4ff0.author == decodeJid(_0xf78a87.user.id) || _0x2d4ff0.author == _0x2d4ff0.participants[0x0]) {
                  console.log("Cas de superUser je fais rien");
                  return;
                }
                ;
                await _0xf78a87.groupParticipantsUpdate(_0x2d4ff0.id, [_0x2d4ff0.author], "demote");
                await _0xf78a87.groupParticipantsUpdate(_0x2d4ff0.id, [_0x2d4ff0.participants[0x0]], 'promote');
                _0xf78a87.sendMessage(_0x2d4ff0.id, {
                  'text': '@' + _0x2d4ff0.author.split('@')[0x0] + " has violated the anti-demotion rule by removing @" + _0x2d4ff0.participants[0x0].split('@')[0x0] + ". Consequently, he has been stripped of administrative rights.",
                  'mentions': [_0x2d4ff0.author, _0x2d4ff0.participants[0x0]]
                });
              }
            }
          }
        }
      } catch (_0x47770e) {
        console.error(_0x47770e);
      }
    });
    async function _0x4eb9f4() {
      const _0x3457b1 = require("node-cron");
      const {
        getCron: _0x54a16a
      } = require("./bdd/cron");
      let _0x561332 = await _0x54a16a();
      console.log(_0x561332);
      if (_0x561332.length > 0x0) {
        for (let _0x3c4a60 = 0x0; _0x3c4a60 < _0x561332.length; _0x3c4a60++) {
          if (_0x561332[_0x3c4a60].mute_at != null) {
            let _0x244c17 = _0x561332[_0x3c4a60].mute_at.split(':');
            console.log("etablissement d'un automute pour " + _0x561332[_0x3c4a60].group_id + " a " + _0x244c17[0x0] + " H " + _0x244c17[0x1]);
            _0x3457b1.schedule(_0x244c17[0x1] + " " + _0x244c17[0x0] + " * * *", async () => {
              await _0xf78a87.groupSettingUpdate(_0x561332[_0x3c4a60].group_id, "announcement");
              _0xf78a87.sendMessage(_0x561332[_0x3c4a60].group_id, {
                'image': {
                  'url': "./media/chrono.webp"
                },
                'caption': "Hello, it's time to close the group; sayonara."
              });
            }, {
              'timezone': 'Africa/Nairobi'
            });
          }
          if (_0x561332[_0x3c4a60].unmute_at != null) {
            let _0x1eb276 = _0x561332[_0x3c4a60].unmute_at.split(':');
            console.log("etablissement d'un autounmute pour " + _0x1eb276[0x0] + " H " + _0x1eb276[0x1] + " ");
            _0x3457b1.schedule(_0x1eb276[0x1] + " " + _0x1eb276[0x0] + " * * *", async () => {
              await _0xf78a87.groupSettingUpdate(_0x561332[_0x3c4a60].group_id, 'not_announcement');
              _0xf78a87.sendMessage(_0x561332[_0x3c4a60].group_id, {
                'image': {
                  'url': "./media/chrono.webp"
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
    _0xf78a87.ev.on('contacts.upsert', async _0x4da5ba => {
      const _0x56ea0e = _0x4ecac0 => {
        for (const _0x96d882 of _0x4ecac0) {
          if (store.contacts[_0x96d882.id]) {
            Object.assign(store.contacts[_0x96d882.id], _0x96d882);
          } else {
            store.contacts[_0x96d882.id] = _0x96d882;
          }
        }
        return;
      };
      _0x56ea0e(_0x4da5ba);
    });
    _0xf78a87.ev.on('connection.update', async _0x27d47d => {
      const {
        lastDisconnect: _0x13d461,
        connection: _0x34734f
      } = _0x27d47d;
      if (_0x34734f === "connecting") {
        console.log("ℹ️ Hans is connecting...");
      } else {
        if (_0x34734f === "open") {
          console.log("✅ Hans Connected to WhatsApp! ☺️");
          console.log('--');
          0x0;
          await baileys_1.delay(0xc8);
          console.log("------");
          0x0;
          await baileys_1.delay(0x12c);
          console.log("------------------/-----");
          console.log("Hans Md is Online 🕸\n\n");
          console.log("Loading Bmw Commands ...\n");
          fs.readdirSync(__dirname + "/commandes").forEach(_0x38cb02 => {
            if (path.extname(_0x38cb02).toLowerCase() == '.js') {
              try {
                require(__dirname + "/commandes/" + _0x38cb02);
                console.log(_0x38cb02 + " Installed Successfully✔️");
              } catch (_0x44f1d2) {
                console.log(_0x38cb02 + " could not be installed due to : " + _0x44f1d2);
              }
              0x0;
              baileys_1.delay(0x12c);
            }
          });
          0x0;
          baileys_1.delay(0x2bc);
          var _0x1793b6;
          if (conf.MODE.toLocaleLowerCase() === "yes") {
            _0x1793b6 = "public";
          } else if (conf.MODE.toLocaleLowerCase() === 'no') {
            _0x1793b6 = "private";
          } else {
            _0x1793b6 = "undefined";
          }
          console.log("Commands Installation Completed ✅");
          await _0x4eb9f4();
          if (conf.DP.toLowerCase() === 'yes') {
            let _0xac2a75 = " ⁠⁠⁠⁠\n╔═━━━━════━━━─━─➳ \n│🌏 *ʜᴀɴs-ᴍᴅ-ɪs-ᴄᴏɴɴᴇᴄᴛᴇᴅ-ᴏɴ-ʏᴏᴜʀ-ᴡʜᴀᴛsᴀᴘᴘ*\n╚═━━━━════━━━─━─➳\n│💫 ᴘʀᴇғɪx: *[ " + prefixe + " ]*\n│⭕ ᴍᴏᴅᴇ: *" + _0x1793b6 + "*\n╚═━━━━════━━━─━─➳\n\n                \n                \n                 ";
            await _0xf78a87.sendMessage(_0xf78a87.user.id, {
              'text': _0xac2a75
            });
          }
        } else {
          if (_0x34734f == "close") {
            let _0x5377aa = new boom_1.Boom(_0x13d461?.["error"])?.["output"]["statusCode"];
            if (_0x5377aa === baileys_1.DisconnectReason.badSession) {
              console.log("Session id error, rescan again...");
            } else {
              if (_0x5377aa === baileys_1.DisconnectReason.connectionClosed) {
                console.log("!!! connexion fermée, reconnexion en cours ...");
                _0x4b6795();
              } else {
                if (_0x5377aa === baileys_1.DisconnectReason.connectionLost) {
                  console.log("connection error 😞 ,,, trying to reconnect... ");
                  _0x4b6795();
                } else {
                  if (_0x5377aa === baileys_1.DisconnectReason?.["connectionReplaced"]) {
                    console.log("connexion réplacée ,,, une sesssion est déjà ouverte veuillez la fermer svp !!!");
                  } else {
                    if (_0x5377aa === baileys_1.DisconnectReason.loggedOut) {
                      console.log("vous êtes déconnecté,,, veuillez rescanner le code qr svp");
                    } else {
                      if (_0x5377aa === baileys_1.DisconnectReason.restartRequired) {
                        console.log("redémarrage en cours ▶️");
                        _0x4b6795();
                      } else {
                        console.log("redemarrage sur le coup de l'erreur  ", _0x5377aa);
                        const {
                          exec: _0x188683
                        } = require("child_process");
                        _0x188683("pm2 restart all");
                      }
                    }
                  }
                }
              }
            }
            console.log("hum " + _0x34734f);
            _0x4b6795();
          }
        }
      }
    });
    _0xf78a87.ev.on("creds.update", _0x5171fb);
    _0xf78a87.downloadAndSaveMediaMessage = async (_0x306150, _0x98a048 = '', _0x4765b9 = true) => {
      let _0xad6cf = _0x306150.msg ? _0x306150.msg : _0x306150;
      let _0xcde04d = (_0x306150.msg || _0x306150).mimetype || '';
      let _0x4e1b46 = _0x306150.mtype ? _0x306150.mtype.replace(/Message/gi, '') : _0xcde04d.split('/')[0x0];
      0x0;
      const _0x513757 = await baileys_1.downloadContentFromMessage(_0xad6cf, _0x4e1b46);
      let _0x5af7e5 = Buffer.from([]);
      for await (const _0x2851db of _0x513757) {
        _0x5af7e5 = Buffer.concat([_0x5af7e5, _0x2851db]);
      }
      let _0x36e709 = await FileType.fromBuffer(_0x5af7e5);
      let _0x557b00 = './' + _0x98a048 + '.' + _0x36e709.ext;
      await fs.writeFileSync(_0x557b00, _0x5af7e5);
      return _0x557b00;
    };
    _0xf78a87.awaitForMessage = async (_0x3e7712 = {}) => {
      return new Promise((_0x3c8632, _0x549ecd) => {
        if (typeof _0x3e7712 !== "object") {
          _0x549ecd(new Error("Options must be an object"));
        }
        if (typeof _0x3e7712.sender !== "string") {
          _0x549ecd(new Error("Sender must be a string"));
        }
        if (typeof _0x3e7712.chatJid !== 'string') {
          _0x549ecd(new Error("ChatJid must be a string"));
        }
        if (_0x3e7712.timeout && typeof _0x3e7712.timeout !== "number") {
          _0x549ecd(new Error("Timeout must be a number"));
        }
        if (_0x3e7712.filter && typeof _0x3e7712.filter !== "function") {
          _0x549ecd(new Error("Filter must be a function"));
        }
        const _0x39bb52 = _0x3e7712?.['timeout'] || undefined;
        const _0x1bd0f3 = _0x3e7712?.["filter"] || (() => true);
        let _0x3f7ab5 = undefined;
        let _0x245871 = _0xa71890 => {
          let {
            type: _0x55f553,
            messages: _0x2ddd1d
          } = _0xa71890;
          if (_0x55f553 == "notify") {
            for (let _0x4e8040 of _0x2ddd1d) {
              const _0x5568a9 = _0x4e8040.key.fromMe;
              const _0x170153 = _0x4e8040.key.remoteJid;
              const _0x51296e = _0x170153.endsWith("@g.us");
              const _0x27e770 = _0x170153 == "status@broadcast";
              const _0x4ba8a1 = _0x5568a9 ? _0xf78a87.user.id.replace(/:.*@/g, '@') : _0x51296e || _0x27e770 ? _0x4e8040.key.participant.replace(/:.*@/g, '@') : _0x170153;
              if (_0x4ba8a1 == _0x3e7712.sender && _0x170153 == _0x3e7712.chatJid && _0x1bd0f3(_0x4e8040)) {
                _0xf78a87.ev.off("messages.upsert", _0x245871);
                clearTimeout(_0x3f7ab5);
                _0x3c8632(_0x4e8040);
              }
            }
          }
        };
        _0xf78a87.ev.on('messages.upsert', _0x245871);
        if (_0x39bb52) {
          _0x3f7ab5 = setTimeout(() => {
            _0xf78a87.ev.off('messages.upsert', _0x245871);
            _0x549ecd(new Error("Timeout"));
          }, _0x39bb52);
        }
      });
    };
    return _0xf78a87;
  }
  let _0x5ead48 = require.resolve(__filename);
  fs.watchFile(_0x5ead48, () => {
    fs.unwatchFile(_0x5ead48);
    console.log("mise à jour " + __filename);
    delete require.cache[_0x5ead48];
    require(_0x5ead48);
  });
  _0x4b6795();
}, 0x1388);
