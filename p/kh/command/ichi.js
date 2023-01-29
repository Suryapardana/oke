/**
   * Made By Fandyyy 🕴️
   * No Enc 100% Chat wa.me/6287891518799
*/

//Module 
require('../settings')
const { BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType } = require('@adiwajshing/baileys')
const axios = require('axios')
const chalk = require('chalk')
const { exec, spawn, execSync } = require("child_process")
const { EmojiAPI } = require("emoji-api");
const emoji = new EmojiAPI()
const fetch = require('node-fetch')
const ffmpeg = require('fluent-ffmpeg')
const { fromBuffer } = require('file-type')
const fs = require('fs')
const promises = require('fs')
const FormData = require("form-data")
const moment = require('moment-timezone')
const util = require('util')
const path = require('path')
const os = require('os')
const speed = require('performance-now')
const { performance } = require('perf_hooks')
const qrcode = require('qrcode')
const similarity = require('similarity')
const linkpreview = require('link-preview-js')
const toms = require('ms')
const zrapi = require('zrapi')

//Waktu
const time = moment().tz('Asia/Jakarta').format("HH:mm:ss")
const wib = moment.tz('Asia/Jakarta').format('HH:mm:ss')
const wita = moment.tz('Asia/Makassar').format("HH:mm:ss")
const wit = moment.tz('Asia/Jayapura').format("HH:mm:ss")
const hour_now = moment().format('HH:mm:ss') 

//Lib
const { pinterest, wallpaper, wikimedia, quotesAnime } = require('../lib/scraper')
const { bytesToSize, TelegraPh, UploadFileUgu, webp2mp4File} = require('../lib/uploader')
const { smsg, getGroupAdmins, formatp, tanggal, formatDate, getTime, isUrl, await, sleep, clockString, msToDate, sort, toNumber, enumGetKey, runtime, fetchJson, getBuffer, jsonformat, delay, format, logic, generateProfilePicture, parseMention, getRandom, pickRandom, removeEmojis } = require('../lib/myfunc')
const { addResponList, delResponList, isAlreadyResponList, isAlreadyResponListGroup, sendResponList, updateResponList, getDataResponList } = require('../lib/respon-list')

//DB
const dbog = require('../lib/Database.js')
const dbmesseg = new dbog()
var dbs = []
global.dbchatpesan = dbs
const db_respon_list = JSON.parse(fs.readFileSync('./storage/list-message.json'))

//Module Exports
module.exports = ichi = async(ichi, m, chatUpdate, store) => {
try {

msg = m
dbs.push({
	id: msg.key.id,
	msg
});

var body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
var budy = (typeof m.text == 'string' ? m.text : '')
var prefix = prefa ? /^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi.test(body) ? body.match(/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi)[0] : "" : prefa ?? global.prefix
const isCmd = body.startsWith(prefix)
const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
const args = body.trim().split(/ +/).slice(1)
const pushname = m.pushName || "No Name"
const botNumber = ichi.user.id ? ichi.user.id.split(":")[0]+"@s.whatsapp.net" : ichi.user.id
const isOwner = [ichi.user.id, ...global.ownerNumber].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
const itsMe = m.sender == ichi.user.id ? true : false
const text = q = args.join(" ")
const fatkuns = (m.quoted || m)
const quoted = (fatkuns.mtype == 'buttonsMessage') ? fatkuns[Object.keys(fatkuns)[1]] : (fatkuns.mtype == 'templateMessage') ? fatkuns.hydratedTemplate[Object.keys(fatkuns.hydratedTemplate)[1]] : (fatkuns.mtype == 'product') ? fatkuns[Object.keys(fatkuns)[0]] : m.quoted ? m.quoted : m
const mime = (quoted.msg || quoted).mimetype || ''
const qmsg = (quoted.msg || quoted)
const isMedia = /image|video|sticker|audio/.test(mime)
const from = m.key.remoteJid
const { type, quotedMsg, mentioned, now, fromMe } = m
const more = String.fromCharCode(8206)
const readmore = more.repeat(4001)
const mode = 'public'
const jam = moment().format("HH:mm:ss z")

const isGroup = m.key.remoteJid.endsWith('@g.us')
const groupMetadata = m.isGroup ? await ichi.groupMetadata(m.chat).catch(e => {}) : ''
const groupName = m.isGroup ? groupMetadata.subject : ''
const groupDesk = m.isGroup ? groupMetadata.desk : ''
const participants = m.isGroup ? await groupMetadata.participants : ''
const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : ''
const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
const mentionUser = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])]
const isNumber = x => typeof x === 'number' && !isNaN(x)

const isImage = (type == 'imageMessage')
const isVideo = (type == 'videoMessage')
const isSticker = (type == 'stickerMessage')
const isQuotedMsg = (type == 'extendedTextMessage')
const isQuotedImage = isQuotedMsg ? content.includes('imageMessage') ? true : false : false
const isQuotedAudio = isQuotedMsg ? content.includes('audioMessage') ? true : false : false
const isQuotedDocument = isQuotedMsg ? content.includes('documentMessage') ? true : false : false
const isQuotedVideo = isQuotedMsg ? content.includes('videoMessage') ? true : false : false
const isQuotedSticker = isQuotedMsg ? content.includes('stickerMessage') ? true : false : false

var tipsz = [tips1, tips2, tips3, tips4, tips5]
var tips = tipsz[Math.floor(Math.random() * tipsz.length)]
var quote = [quotes1, quotes2, quotes3]
var quotes = quote[Math.floor(Math.random() * quote.length)]

try {
let chats = global.db.data.chats[m.chat]
if (typeof chats !== 'object') global.db.data.chats[m.chat] = {}
if (chats) {
if (!('antilink' in chats)) chats.antilink = false
if (!('antiwame' in chats)) chats.antiwame = false
if (!('antivirtex' in chats)) chats.antivirtex = false
if (!('antiasing' in chats)) chats.antiasing = false
if (!('antiviewone' in chats)) chats.antiviewone = false
if (!('event' in chats)) chats.event = false
if (!('nsfw' in chats)) chats.nsfw = false
if (!('expired' in chats)) chats.sewa = 0
if (!('isBanned' in chats)) chats.isBanned = false
if (!('closegc' in chats)) chats.closegc = 0
if (!('autokesal' in chats)) chats.autokesal = false
if (!('welcome' in chats)) chats.welcome = true
if (!('setProses' in chats)) chats.setProses = ''
if (!('setDone' in chats)) chats.setDone = ''

} else global.db.data.chats[m.chat] = {
antilink: false,
antiwame: false,
antivirtex: false,
antiasing: false,
antiviewone: false,
nsfw: false,
expired: 0,
isBanned: false,
closegc: 0,
autokesal: false,
welcome: true,
setProses: '',
setDone: ''

}

let limitUser = isOwner? global.limitAwal.prem : global.limitAwal.free
let users = global.db.data.users[m.sender]
if (typeof users !== 'object') global.db.data.users[m.sender] = {}
if (users) {
if (!('limit' in users)) users.limit = limitUser

if (!('registered' in users)) users.registered = false
if (!users.registered) {
 if (!('name' in users)) users.name = m.name
 if (!('age' in users)) users.age = -1
 if (!('regTime' in users)) users.regTime = -1
}

if (!('premium' in users)) users.premium = false
if (!('premiumTime' in users)) users.premiumTime = 0
if (!('role' in users)) users.role = 'Beginner'
if (!('banned' in users)) users.banned = false
if (!('autolevelup' in users)) users.autolevelup = true
if (!('atm' in users)) users.atm = 0
if (!('fullatm' in users)) users.fullatm = 0
if (!('bank' in users)) users.bank = 0

if (!('armor' in users)) users.armor = 0
if (!('health' in users)) users.health = 100
if (!('money' in users)) users.money = 0
if (!('exp' in users)) users.exp = 0
if (!('level' in users)) users.level = 0
if (!('potion' in users)) users.potion = 0
if (!('kayu' in users)) users.kayu = 0
if (!('batu' in users)) users.batu = 0
if (!('iron' in users)) users.iron = 0
if (!('potion' in users)) users.potion = 0
if (!('diamond' in users)) users.diamond = 0
if (!('sampah' in users)) users.sampah = 0
if (!('sword' in users)) users.sword = 0
if (!('budak' in users)) users.budak = 0
if (!('busur' in users)) users.busur = 0
if (!('panah' in users)) users.panah = 0
if (!('kapak' in users)) users.kapak = 0

if (!('fox' in users)) users.fox = 0
if (!('foxExp' in users)) users.foxExp = 0
if (!('foxLastFeed' in users)) users.foxLastFeed = 0
if (!('cat' in users)) users.cat = 0
if (!('catExp' in users)) users.catExp = 0
if (!('catLastFeed' in users)) users.catLastFeed = 0
if (!('dog' in users)) users.dog = 0
if (!('dogExp' in users)) users.dogExp = 0
if (!('dogLastFeed' in users)) users.dogLastFeed = 0
if (!('horse' in users)) users.horse = 0
if (!('horseExp' in users)) users.horseExp = 0
if (!('horseLastFeed' in users)) users.horseLastFeed = 0
if (!('petFood' in users)) users.petFood = 0
if (!('fishingroddurability' in users)) users.fishingroddurability = 0

if (!('common' in users)) users.common = 0
if (!('uncommon' in users)) users.uncommon = 0
if (!('mythic' in users)) users.mythic = 0
if (!('legendary' in users)) users.legendary = 0
if (!('pet' in users)) users.pet = 0

if (!('lastfishing' in users)) users.lastfishing = 0
if (!('lastday' in users)) users.lastday = 0
if (!('lastweekly' in users)) users.lastweekly = 0
if (!('lastmonthly' in users)) users.lastmonthly = 0
if (!('lastgajian' in users)) users.lastgajian = 0
if (!('lastmining' in users)) users.lastmining = 0
if (!('lastadventure' in users)) users.lastadventure = 0
if (!('lastbansos' in users)) users.lastbansos = 0
if (!('lastnebang' in users)) users.lastnebang = 0
if (!('lastdagang' in users)) users.lastdagang = 0
} else global.db.data.users[m.sender] = {
limit: limitUser,

registered: false,
name: m.name,
age: -1,
regTime: -1,

premium: false,
premiumTime: 0,
role: 'Beginner',
banned: false,
autolevelup: true,
atm: 0,
fullatm: 0,
bank: 0,

armor: 0,
health: 100,
money: 0,
exp: 0,
level: 0,
potion: 0,
kayu: 0,
batu: 0,
iron: 0,
potion: 0,
diamond: 0,
sampah: 0,
sword: 0,
budak: 0,
busur: 0,
panah: 0,
kapak: 0,

fox: 0,
foxExp: 0,
foxLastFeed: 0,
cat: 0,
catExp: 0,
catLastFeed: 0,
dog: 0,
dogExp: 0,
dogLastFeed: 0,
horse: 0,
horseExp: 0,
horseLastFeed: 0,
fishingroddurability: 0,

common: 0,
uncommon: 0,
mythic: 0,
legendary: 0,
pet: 0,

lastfishing: 0,
lastday: 0,
lastweekly: 0,
lastmonthly: 0,
lastgajian: 0,
lastmining: 0,
lastadventure: 0,
lastbansos: 0,
lastnebang: 0,
lastdagang: 0
}

let settings = global.db.data.settings[botNumber]
if (typeof settings !== 'object') global.db.data.settings[botNumber] = {}
if (settings) {
if (!('public' in settings)) settings.public = true
if (!('self' in settings)) settings.self = false
if (!('anticall' in settings)) settings.anticall = false
if (!('autoreact' in settings)) settings.autoreact = false
if (!('autobio' in settings)) settings.autobio = false
if (!('autosticker' in settings)) settings.autosticker = false
if (!('autobackup' in settings)) settings.autobackup = global.autobackup
if (!('autoread' in settings)) settings.autoread = global.autoread
if (!('autotyping' in settings)) settings.autotyping = global.autotyping
if (!('available' in settings)) settings.available = global.available
if (!('simi' in settings)) settings.simi = false
if (!('autodownload' in settings)) settings.autodownload = false
if (!('autolevelup' in settings)) settings.autolevelup = global.autolevelup
if (!('templateImage' in settings)) settings.templateImage = false
if (!('listMessage' in settings)) settings.listMessage = false
if (!('templateVideo' in settings)) settings.templateVideo = false
if (!('templateDocument' in settings)) settings.templateDocument = true

} else global.db.data.settings[botNumber] = {
public: true,
self: false,
anticall: false,
autoreact: false,
autobio: false,
autosticker: false,
autobackup: global.autobackup,
autoread: global.autoread,
autotyping: global.autotyping,
available: global.available,
simi: false,
autodownload: false,
autolevelup: global.autolevelup,
templateImage: false,
listMessage: false,
templateVideo: false,
templateDocument: true
}

} catch (err) {
console.error(err)
}

//Jangan Dihapus
const isPrem = isOwner || global.db.data.users[m.sender].premium || false
var cron = require('node-cron')
 cron.schedule('21 09 * * *', () => {
 var user = Object.keys(global.db.data.users)
 let limitUser = isPrem? global.limitAwal.prem : global.limitAwal.free
 for (let jid of user) global.db.data.users[jid].limit = limitUser
 console.log('Reseted Limit')
 }, {
 scheduled: true,
 timezone: "Asia/Jakarta"
 })

//Auto Backup
if (db.data.settings[botNumber].autobackup) {
  var cron = require('node-cron')
  cron.schedule('21 09 * * *', () => {
  var fdoc = { key : { remoteJid: 'status@broadcast', participant : '0@s.whatsapp.net' }, message: { documentMessage: { title: '𝙳 𝙰 𝚃 𝙰 𝙱 𝙰 𝚂 𝙴', jpegThumbnail: global.thumb, }}}
  var d = new Date
  var date = d.toLocaleDateString('id', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
  ichi.sendMessage(global.Rowner + '@s.whatsapp.net', { text: `*🗓️ Database & Session :* ${date}` }, { quoted : m })
  ichi.sendMessage(global.Rowner + '@s.whatsapp.net', {document: fs.readFileSync('./storage/db.json'), mimetype: 'application/json', fileName: `db.json`}, { quoted : fdoc })
  ichi.sendMessage(global.Rowner + '@s.whatsapp.net', {document: fs.readFileSync(`./${global.sessionName}.json`), mimetype: 'application/json', fileName: `${global.sessionName}.json`}, { quoted : fdoc })
  }, {
  schedule: true,
  timezone: "Asia/Jakarta"
  })
  }

// Antilink
if (db.data.chats[m.chat].antilink) {
if (budy.match(`https:\/\/chat.whatsapp.com`)) {
m.reply(`Link Grup Lain Terdeteksi 🤬\nMaaf Kamu Akan Di Kick !`)
if (!isBotAdmins) return m.reply(mess.botAdmin)
var gclink = (`https://chat.whatsapp.com/`+await ichi.groupInviteCode(m.chat))
var isLinkThisGc = new RegExp(gclink, 'i')
var isgclink = isLinkThisGc.test(m.text)
if (isgclink) return m.reply(`Ehh Maaf Gak Jadi, Link Group Ini Ternyata 😆`)
if (isAdmins) return m.reply(`Ehh Maaf Ternyata Kamu Admin 😁`)
if (isOwner) return m.reply(`Ehh Maaf Kamu Ownerku Ternyata 😅`)
ichi.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
}
}

// Antiwame
if (db.data.chats[m.chat].antiwame) {
if (budy.match(`https:\/\/wa.me/`)) {
m.reply(`Link wa.me Lain Terdeteksi 🤬\nMaaf Kamu Akan Di Kick !`)
if (!isBotAdmins) return m.reply(mess.botAdmin)
if (isAdmins) return m.reply(`Ehh Maaf Ternyata Kamu Admin 😁`)
if (isOwner) return m.reply(`Ehh Maaf Kamu Ownerku Ternyata 😅`)
ichi.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
}
}

//Antivirtex
if (db.data.chats[m.chat].antivirtex) {
if (budy.length > 3500) {
m.reply('Tandai telah dibaca\n'.repeat(300))
m.reply(`Virtex Terdeteksi 🐞\nMaaf Kamu Akan Di Kick !`)
if (!isBotAdmins) return m.reply(mess.botAdmin)
ichi.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
}
}
  
//Auto Bio
if (db.data.settings[botNumber].autobio){
await ichi.setStatus(`${global.packname} || Created By ${global.ownerName} || ⌚ Runtime : ${runtime(process.uptime())}`);
}

if (db.data.chats[m.chat].antiviewone) {
if (m.isGroup && m.mtype == 'viewOnceMessage') {
let teks = `「 *Anti ViewOnce Message* 」
    
    🤠 *Name* : ${pushname}
    👾 *User* : @${m.sender.split("@")[0]}
    ⏰ *Clock* : ${moment.tz('Asia/Jakarta').format('HH:mm:ss')} WIB
    
    💫 *MessageType* : ${m.mtype}`
m.reply(teks)
await sleep(500)
m.copyNForward(m.chat, true, {
readViewOnce: true
}, {
quoted: mek
}).catch(_ => m.reply('Mungkin dah pernah dibuka bot'))
}
}

function msToDate(ms) {
    temp = ms
    days = Math.floor(ms / (24 * 60 * 60 * 1000));
    daysms = ms % (24 * 60 * 60 * 1000);
    hours = Math.floor((daysms) / (60 * 60 * 1000));
    hoursms = ms % (60 * 60 * 1000);
    minutes = Math.floor((hoursms) / (60 * 1000));
    minutesms = ms % (60 * 1000);
    sec = Math.floor((minutesms) / (1000));
    return days + " hari " + hours + " jam " + minutes + " menit";
    // +minutes+":"+sec;
}

if (global.db.data.self) {
if (!m.key.fromMe && !isOwner) return
}

//Push Message To Console
if (m.message) {
global.db.data.users[m.sender].exp += 10
console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32m ICHI \x1b[1;37m]', time, chalk.green(budy || m.mtype), 'Dari', chalk.blue(pushname), 'Di', chalk.yellow(groupName ? groupName : 'Private Chat' ), 'args :', chalk.white(args.length))
}

//Bot Setting Atur Di Settings.js
if (db.data.settings[botNumber].autoread) { if (m.chat) { ichi.readMessages([m.key]) }}
if (db.data.settings[botNumber].autotyping) { if (m.chat) { ichi.sendPresenceUpdate('composing', m.chat) }}
if (db.data.settings[botNumber].available) { if (m.chat) { ichi.sendPresenceUpdate('available', m.chat) }}

//Role From DOTA 2
var roles = {
  'Herald V': 0,
  'Herald V': 5,
  'Herald IV': 10,
  'Herald III': 15,
  'Herald II': 20,
  'Herald I': 25,
  'Guardian V': 30,
  'Guardian IV': 35,
  'Guardian III': 40,
  'Guardian II': 45,
  'Guardian I': 50,
  'Crusader V': 55,
  'Crusader IV': 60,
  'Crusader III': 65,
  'Crusader II': 70,
  'Crusader I': 75,
  'Archon V': 80,
  'Archon IV': 85,
  'Archon III': 90,
  'Archon II': 95,
  'Archon I': 100,
  'Legend V': 105,
  'Legend IV': 110,
  'Legend III': 115,
  'Legend II': 120,
  'Legend I': 125,
  'Ancient V': 130,
  'Ancient IV': 135,
  'Ancient III': 140,
  'Ancient II': 145,
  'Ancient I': 150,
  'Divine V': 155,
  'Divine IV': 160,
  'Divine III': 165,
  'Divine II': 170,
  'Divine I': 175,
  'Immortal V': 180,
  'Immortal IV': 185,
  'Immortal III': 190,
  'Immortal II': 195,
  'Immortal I': 200,
  'Glory': 250
}
var user = global.db.data.users[m.sender]
var level = user.level
var role = (Object.entries(roles).sort((a, b) => b[1] - a[1]).find(([,minLevel]) => level >= minLevel) || Object.entries(roles)[0])[0]
user.role = role

//Jangan Di Ubah Biar Tampilan Menu nya keren
var menuu = `Hai *${pushname}* 👋

*${emot.limit} Limit :* ${isOwner? `${global.limitAwal.prem} Limit` : user.premium? `${global.limitAwal.prem} Limit` : `${user.limit}/${global.limitAwal.free}`}
*${emot.money} Money :* ${global.db.data.users[m.sender].money}
*${emot.exp} Exp :* ${global.db.data.users[m.sender].exp}
*${emot.level}️ Level :* ${global.db.data.users[m.sender].level}
*${emot.role} Role :* ${global.db.data.users[m.sender].role}

${readmore} *🍒 Tips :* ${tips}\n
`
var menu = `Hai *${pushname}* 👋

*${emot.limit} Limit :* ${isOwner? `${global.limitAwal.prem} Limit` : user.premium? `${global.limitAwal.prem} Limit` : `${user.limit}/${global.limitAwal.free}`}
*${emot.money} Money :* ${global.db.data.users[m.sender].money}
*${emot.exp} Exp :* ${global.db.data.users[m.sender].exp}
*${emot.level}️ Level :* ${global.db.data.users[m.sender].level}
*${emot.role} Role :* ${global.db.data.users[m.sender].role}

*📚 Quotes:* ${quotes}\n
`

//function leveling & pick
function sort(property, ascending = true) {
  if (property) return (...args) => args[ascending & 1][property] - args[!ascending & 1][property]
  else return (...args) => args[ascending & 1] - args[!ascending & 1]
}
function toNumber(property, _default = 0) {
  if (property) return (a, i, b) => {
    return { ...b[i], [property]: a[property] === undefined ? _default : a[property] }
  }
  else return a => a === undefined ? _default : a
}
function enumGetKey(a) {
  return a.jid
}
function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)]
}
const growth = Math.pow(Math.PI / Math.E, 1.618) * Math.E * .75
function xpRange(level, multiplier = global.multiplier || 1) {
  if (level < 0)
  throw new TypeError('level cannot be negative value')
  level = Math.floor(level)
  let min = level === 0 ? 0 : Math.round(Math.pow(level, growth) * multiplier) + 1
  let max = Math.round(Math.pow(++level, growth) * multiplier)
  return {
  min,
  max,
  xp: max - min
  }
  }
function findLevel(xp, multiplier = global.multiplier || 1) {
  if (xp === Infinity)
  return Infinity
  if (isNaN(xp))
  return NaN
  if (xp <= 0)
  return -1
  let level = 0
  do
  level++
  while (xpRange(level, multiplier).min <= xp)
  return --level
  }
function canLevelUp(level, xp, multiplier = global.multiplier || 1) {
  if (level < 0)
  return false
  if (xp === Infinity)
  return true
  if (isNaN(xp))
  return false
  if (xp <= 0)
  return false
  return level < findLevel(xp, multiplier)
  }
function mentions(teks, mems = [], id) {
  if (id == null || id == undefined || id == false) {
  let res = ichi.sendMessage(from, { text: teks, mentions: mems })
  return res
  } else {
  let res = ichi.sendMessage(from, { text: teks, mentions: mems }, { quoted: m })
  return res
  }
  }
function MeNit(ms) {
  let m = isNaN(ms) ? '02' : Math.floor(ms / 60000) % 60
  return [m].map(v => v.toString().padStart(2, 0)).join(':')
  }
function DeTik(ms) {
  let s = isNaN(ms) ? '60' : Math.floor(ms / 1000) % 60
  return [s].map(v => v.toString().padStart(2, 0)).join(':')
  }

const jimp_1 = require('jimp')
async function pepe(media) {
	const jimp = await jimp_1.read(media)
	const min = jimp.getWidth()
	const max = jimp.getHeight()
	const cropped = jimp.crop(0, 0, min, max)
	return {
		img: await cropped.scaleToFit(720, 720).getBufferAsync(jimp_1.MIME_JPEG),
		preview: await cropped.normalize().getBufferAsync(jimp_1.MIME_JPEG)
	}
}

//Auto Respon
  let reg = /(ass?alam|اَلسَّلاَمُ عَلَيْكُمْ|السلام عليکم)/i
  let isSalam = reg.exec(m.text)
  if (isSalam && !m.fromMe) {
  m.reply(`وَعَلَيْكُمْ السَّلاَمُ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ\n_wa\'alaikumussalam wr.wb._`)
  }

//Auto Downloader
if (db.data.settings[botNumber].autodownload) {
if (budy.match('https://www.tiktok.com')) {
  if (!isPrem && global.db.data.users[m.sender].limit < 1) return m.reply(global.limitEnd)
  var { tiktokdl, tiktokdlv2 } = require('@bochilteam/scraper')
  await m.reply(mess.wait)
  var { author: { nickname }, video, description } = await tiktokdl(budy).catch(async _ => await tiktokdlv2(budy))
  var url = video.no_watermark_raw || video.no_watermark || video.no_watermark_hd || video.with_watermark 
  if (!url) throw 'Can\'t download video!'
  var taex = `🔗 *Url:* ${url}\n📛 *Nickname:* ${nickname}\n${description ? `📱 *Description:* ${description}` : ''}`
  ichi.sendMessage(m.chat, { document: { url: url }, mimetype: 'video/mp4', fileName: 'tiktok.mp4' }, { quoted: m })
  global.db.data.users[m.sender].limit -= 5
} else if (budy.match('https://twitter')) {
  if (!isPrem && global.db.data.users[m.sender].limit < 1) return m.reply(global.limitEnd)
  var { twitterDl } = require('../lib/scraper')
  var res = await twitterDl(budy)
  await m.reply(mess.wait)
  for (let x = 0; x < res.media.length; x++) {
  var caption = x === 0 ? res.caption.replace(/https:\/\/t.co\/[a-zA-Z0-9]+/gi, '').trim() : ''
  ichi.sendFile(m.chat, res.media[x].url, caption, m)
  }
  global.db.data.users[m.sender].limit -= 5
} else if (budy.match('https://www.mediafire')) {
  if (!isPrem) return m.reply(mess.prem)
  var { mediafiredl } = require('@bochilteam/scraper')
  await m.reply(mess.wait)
  var res = await mediafiredl(budy)
  var { url, url2, filename, ext, aploud, filesize, filesizeH } = res
  ichi.sendMessage(m.chat, {document: { url: url }, mimetype: `application/${ext}`, fileName: `${filename}.${ext}`}, { quoted : m })
 }
}

//Simih
if (db.data.settings[botNumber].simi) {
if (!isMedia && !m.key.fromMe) {
  var simi = await axios.get(`https://api.simsimi.net/v2/?text=${budy}&lc=id`)
  ichi.sendMessage(m.chat, { text: simi.data.success }, {quoted: m})
  }
  }
  
//Auto Sticker
if (db.data.settings[botNumber].autosticker) {
if (m.mtype == 'imageMessage' || m.mtype == 'videoMessage' || m.mtype == 'stickerMessage')
  if (/image/.test(mime)) {
  let media = await ichi.downloadMediaMessage(qmsg)
  let encmedia = await ichi.sendImageAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })
  await fs.unlinkSync(encmedia)
  } else if (/video/.test(mime)) {
  if (qmsg.seconds > 11) return m.reply('Maksimal 10 detik!')
  let media = await ichi.downloadMediaMessage(qmsg)
  let encmedia = await ichi.sendVideoAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })
  await fs.unlinkSync(encmedia)
  }
  }
  
// Store
if (m.isGroup && isAlreadyResponList(from, body, db_respon_list)) {
  var get_data_respon = getDataResponList(from, body, db_respon_list)
  if (get_data_respon.isImage === false) {
  var butstore = [{ buttonId: `.menu`, buttonText: { displayText: 'Contact Owner 👦' }, type: 1 }]
  ichi.sendMessage(from, { text: sendResponList(from, body, db_respon_list), mentions: [getDataResponList, m.sender] }, { quoted : m })
  } else {
  imgstore = await getBuffer(get_data_respon.image_url)
  var butstore = [{ buttonId: `.menu`, buttonText: { displayText: 'Contact Owner 👦' }, type: 1 }]
  ichi.sendMessage(from, { image: imgstore, caption: get_data_respon.response, buttons: butstore, mentions: [getDataResponList, m.sender]}, { quoted: m })
  }
  }

// Menfes
if (m.chat.endsWith('@s.whatsapp.net') && isCmd) {
  var fdoc = { key : { remoteJid: 'status@broadcast', participant : '0@s.whatsapp.net' }, message: { documentMessage: { title: 'Cieee Menfesnya Dibales', jpegThumbnail: global.thumb }}}
  const delay = time => new Promise(res => setTimeout(res, time))
  this.menfess = global.db.data.menfes
  let room = Object.values(this.menfess).find(room => [room.a, room.b].includes(m.sender) && room.state === 'CHATTING')
  if (room) {
  console.log({ text: m.text })
  if (room && (m.text === 'Balas ✍️' || m.text === '') && m.quoted?.mtype == 'buttonsMessage') return m.reply("Silahkan kirim pesan balasan kamu.")
  let txtbalasan = `Hai Kak 👋, Menfes Kamu Dibales Nih. Ini Aku Teruskan Ya Balesan Dari Si Doi ☺️`
  let other = [room.a, room.b].find(user => user !== m.sender)
  await ichi.sendMessage(other, {text: txtbalasan}, {quoted: fdoc})
  await m.copyNForward(other, true, m.quoted && m.quoted.fromMe ? { contextInfo: { ...m.msg.contextInfo, participant: other }} : {}).then(() => {
	m.reply('Berhasil mengirim balasan.')
	//delay(2000)
	delete this.menfess[room.id]
	return !0
	})
   }
  }
        
//Anti Asing
if (db.data.chats[m.chat].antiasing) {
if (m.sender.startsWith( '212' || '212' )) {
m.reply('Sorry Negaramu Terlalu Haram Untuk Menggunakan Bot')
ichi.updateBlockStatus(m.sender, 'block')
if (!isBotAdmins) throw mess.botAdmin
ichi.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
}
if (m.sender.startsWith( '265' || '265' )) {
m.reply('Sorry Negaramu Terlalu Haram Untuk Menggunakan Bot')
ichi.updateBlockStatus(m.sender, 'block')
if (!isBotAdmins) throw mess.botAdmin
ichi.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
}
}

//Auto React
if (db.data.settings[botNumber].autoreact) {
let emoji = ["👍","👎","🤙","😎","😁","😭","😠","🗿","😍","🤨","🤔","🤡"]
let emot = emoji[Math.floor(Math.random() * emoji.length)]
ichi.sendMessage(m.chat, {
react: {
text: emot,
key: m.key
}
})
}

//Sewa Abis
if (m.isGroup && db.data.chats[m.chat].expired != 0) {
if (new Date() * 1 >= db.data.chats[m.chat].expired) {
ichi.sendMessage(m.chat, { text: 'Waktunya Untuk Bot Meninggalkan Grup' })
await ichi.groupLeave(m.chat)
db.data.chats[m.chat].expired = 0
}
}

//Premium Abis
var user = global.db.data.users[m.sender]
if (m.chat.endsWith('broadcast')) return
if (user.premiumTime != 0 && user.premium) {
 if (new Date() * 1 >= user.premiumTime) {
  await m.reply('Waktu Premium Kamu Sudah Habis')
  user.premiumTime = 0
  user.premium = false
 }
}

//Copy Sticker
var chat = global.db.data.chats[m.chat]
if (db.data.chats[m.chat].autokesal) {
if (m.isBaileys && m.fromMe && m.isGroup) return true
if (m.mtype === 'stickerMessage' || m.text || m.mtype === 'audioMessage' ) {
  m.copyNForward(m.chat, true)
}
}

//Store Lagi
if ((budy) && ["p", "proses", "Proses", "P"].includes(budy) && !isCmd) {
  if (!m.isGroup) return
  if (!isAdmins && !isOwner) return
  if (!m.quoted) throw 'Reply Pesan!'
  let tek = m.quoted ? quoted.text : quoted.text.split(args[0])[1]
  let proses = (db.data.chats[m.chat].setProses || `「 *TRANSAKSI PENDING* 」\n\n\`\`\`📆 TANGGAL : @tanggal\n⌚ JAM     : @jam\n✨ STATUS  : Pending\`\`\`\n\n📝 Catatan :\n@catatan\n\nPesanan @user sedang di proses!`).replace('@tanggal', `${tanggal(new Date())}`).replace('@jam', time).replace('@catatan', `${tek ? tek : '-'}`).replace('@user', '@' + m.quoted.sender.split('@')[0])
  ichi.sendTextWithMentions(m.chat, proses, m)
  }
if ((budy) && ["d", 'done', "Done", "D"].includes(budy) && !isCmd) {
  if (!m.isGroup) return
  if (!isAdmins && !isOwner) return
  if (!m.quoted) throw 'Reply Pesan!'
  let tek = m.quoted ? quoted.text : quoted.text.split(args[0])[1]
  let sukses = (db.data.chats[m.chat].setDone || `「 *TRANSAKSI BERHASIL* 」\n\n\`\`\`📆 TANGGAL : @tanggal\n⌚ JAM     : @jam\n✨ STATUS  : Berhasil\`\`\`\n\n📝 Catatan :\n@catatan\n\nTerimakasih @user Next Order ya🙏`).replace('@tanggal', `${tanggal(new Date())}`).replace('@jam', time).replace('@catatan', `${tek ? tek : '-'}`).replace('@user', '@' + m.quoted.sender.split('@')[0])
  ichi.sendTextWithMentions(m.chat, sukses, m)
  }

//Mute Chat
if (db.data.chats[m.chat].isBanned && !isAdmins && !isOwner) {
return
}

//Mute User
if (db.data.users[m.sender].banned) {
return
}

//Auto Levelup
if (db.data.settings[botNumber].autolevelup) {
var user = global.db.data.users[m.sender]
if (!user.autolevelup)
return !0
let before = user.level * 1
while (canLevelUp(user.level, user.exp, global.multiplier)) user.level++

if (before !== user.level) {
  try {
  ppusew = await ichi.profilePictureUrl(m.sender, 'image')
  } catch {
  ppusew = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
  }
let txtlev = `Selamat, @${m.sender.split('@')[0]} Telah Naik Level

☃️ Level Sebelumnya : ${before}
☃️ Level Baru : ${user.level}
☃️ Role Kamu : ${user.role}

🤝 Gunakan *.profile* Untuk Mengecek`
ichi.sendMessage(m.chat, {image: {url: ppusew}, caption: txtlev, buttons: [{ buttonId: '.profile', buttonText: { displayText: 'Profile 👦' }, type: 1 }], mentions: [m.sender]}, {quoted: m})
}
}

let buttonmenu = [{ buttonId: `.donasi`, buttonText: { displayText: 'Donasi 📦' }, type: 1 }, { buttonId: `.owner`, buttonText: { displayText: 'Owner 👦' }, type: 1 }, { buttonId: `.ping`, buttonText: { displayText: 'Status Bot ⌚' }, type: 1 }]
let butmenu = [{urlButton: {displayText: 'Source Code ♨️',url: 'https://www.droidangga.com'}}, {urlButton: {displayText: 'My Web 🔗',url: global.webme }}, {"quickReplyButton": {"displayText": "Donasi 🗂️","id": `donasi`},}, {"quickReplyButton": {"displayText": "Owner 👦","id": "owner"},}, {"quickReplyButton": {"displayText": "Status Bot ⌚","id": `ping`}}]
                            
switch(command) {
case 'tes':{
  m.reply('ok')
}
break
default:
if (budy.startsWith('=>')) {
  if (!isOwner) return m.reply(mess.botOwner)
  function Return(sul) {
  sat = JSON.stringify(sul, null, 2)
  bang = util.format(sat)
  if (sat == undefined) {
  bang = util.format(sul)
  }
  return m.reply(bang)
  }
  try {
  m.reply(util.format(eval(`(async () => { return ${budy.slice(3)} })()`)))
  } catch (e) {
  m.reply(String(e))
  }
  }  
if (budy.startsWith('>')) {
  if (!isOwner) return m.reply(mess.botOwner)
  try {
  let evaled = await eval(budy.slice(2))
  if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
  await m.reply(evaled)
  } catch (err) {
  await m.reply(String(err))
  }
  }
if (budy.startsWith('$')) {
  if (!isOwner) return m.reply(mess.botOwner)
  exec(budy.slice(2), (err, stdout) => {
  if (err) return m.reply(`${err}`)
  if (stdout) return m.reply(stdout)
  })
  }
  }
              
  switch (command) {


  }
  } catch (err) {
  m.reply(util.format(err))
  }
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.redBright(`Update ${__filename}`))
delete require.cache[file]
require(file)
})
