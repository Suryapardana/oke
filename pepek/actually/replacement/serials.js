"use strict";
require('dotenv').config();
    const { flatDirectly } = require('../../actually/required/get.js');
    const { info, api } = require('../../dbase/config/dat.json');
    const { moment, axios, baileys, fs, chalk, path, child_process, yargs, util, jimp, FileType } = new flatDirectly();
    const { getBuffer, isDeepStrictEqual, delay, MessageType, compressImage, proto, generateMessageID, jidNormalizedUser, isJidGroup, getContentType, fetchGroupMetadata } = baileys;
    const { spawn, exec } = child_process;
    
exports.extractDocs = async(programRojak, m, store, options = {}) => {
    if(!m) return m
    let M = proto.WebMessageInfo
    m = M.fromObject(m)
    if(m.key) {
        m.chat = m.key.remoteJid || message.message?.senderKeyDistributionMessage?.groupId || ''
        m.id = m.key.id
        m.isBot = m.id.startsWith("BAE5") && m.id.length == 16
        m.isGroup = await isJidGroup(m.chat)
        m.sender = m.key.fromMe && programRojak.user.id || m.participant || m.key.participant || m.chat || ''
        m.fromMe = m.key.fromMe || m.sender, programRojak.user.id || [programRojak.user.jid, ...info.owner.number[0]].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
        m.itsMe = m.sender == programRojak.user.id ? true : false
        m.isBaileys = m.id && m.id.length === 16 || m.id.startsWith('3EB0') && m.id.length === 12 || false
    }
    if(m.message) {
        let mtype = Object.keys(m.message)
        m.mtype = (!['senderKeyDistributionMessage', 'messageContextInfo'].includes(mtype[0]) && mtype[0]) || (mtype.length >= 3 && mtype[1] !== 'messageContextInfo' && mtype[1]) || mtype[mtype.length - 1] 
        m.msg = m.message[m.mtype]
        if(m.chat == 'status@broadcast' && ['protocolMessage', 'senderKeyDistributionMessage'].includes(m.mtype)) m.chat = (m.key.remoteJid !== 'status@broadcast' && m.key.remoteJid) || m.sender
        if(m.mtype == 'protocolMessage' && m.msg.key) {
            if(m.msg.key.remoteJid == 'status@broadcast') m.msg.key.remoteJid = m.chat
            if(!m.msg.key.participant || m.msg.key.participant == 'status_me') m.msg.key.participant = m.sender
            m.msg.key.fromMe = programRojak.decodeJid(m.msg.key.participant) === programRojak.user.id
            if(!m.msg.key.fromMe && m.msg.key.remoteJid === programRojak.user.id) m.msg.key.remoteJid = m.sender
        }
        m.text = m.msg.text || m.msg.caption || m.msg.contentText || m.msg || ''
        if(typeof m.text !== 'string') {
            if([ 'protocolMessage', 'messageContextInfo', 'stickerMessage', 'audioMessage', 'senderKeyDistributionMessage' ].includes(m.mtype)) m.text = ''
            else m.text = m.text.selectedDisplayText || m.text.hydratedTemplate?.hydratedContentText || m.text
        }
        m.mentionedJid = m.msg?.contextInfo?.mentionedJid?.length && m.msg.contextInfo.mentionedJid || []
        let quoted = m.quoted = m.msg?.contextInfo?.quotedMessage ? m.msg.contextInfo.quotedMessage : null
        if(m.quoted) {
            let type = Object.keys(m.quoted)[0]
            m.quoted = m.quoted[type]
            if(typeof m.quoted === 'string') m.quoted = { text: m.quoted }
            m.quoted.mtype = type
            m.quoted.msg = m.quoted[m.quoted.mtype]
            m.quoted.id = m.msg.contextInfo.stanzaId
            m.quoted.chat = programRojak.decodeJid(m.msg.contextInfo.remoteJid || m.chat || m.sender)
            m.quoted.isBaileys = m.quoted.id && m.quoted.id.length === 16 || false
            m.quoted.sender = programRojak.decodeJid(m.msg.contextInfo.participant)
            m.quoted.fromMe = m.quoted.sender === programRojak.user.jid
            m.quoted.text = m.quoted.text || m.quoted.caption || m.quoted.contentText || ''
            m.quoted.name = programRojak.getName(m.quoted.sender)
            m.quoted.mentionedJid = m.quoted.contextInfo?.mentionedJid?.length && m.quoted.contextInfo.mentionedJid || []
            let vM = m.quoted.fakeObj = M.fromObject({
                key: {
                    fromMe: m.quoted.fromMe,
                    remoteJid: m.quoted.chat,
                    id: m.quoted.id
                },
                message: quoted,
                ...(m.isGroup ? { participant: m.quoted.sender } : {})
            })
            m.getQuotedObj = m.getQuotedMessage = async () => {
                if(!m.quoted.id) return null
                let q = M.fromObject(await programRojak.loadMessage(m.quoted.id) || vM)
                return exports.Serialize(programRojak, q)
            }
            if(m.quoted.url || m.quoted.directPath) m.quoted.download = (saveToFile = false) => programRojak.downloadM(m.quoted, m.quoted.mtype.replace(/message/i, ''), saveToFile)
            m.quoted.reply = (text, chatId, options) => programRojak.reply(chatId ? chatId : m.chat, text, vM, options)
            m.quoted.copy = () => exports.Serialize(programRojak, M.fromObject(M.toObject(vM)))
            m.quoted.forward = (jid, forceForward = false) => programRojak.forwardMessage(jid, vM, forceForward)
            m.quoted.copyNForward = (jid, forceForward = true, options = {}) => programRojak.copyNForward(jid, vM, forceForward, options)
            m.quoted.cMod = (jid, text = '', sender = m.quoted.sender, options = {}) => programRojak.cMod(jid, vM, text, sender, options)
            m.quoted.delete = () => programRojak.sendMessage(m.quoted.chat, { delete: vM.key })
        }
    }
    m.name = !nullish(m.pushName) && m.pushName || programRojak.getName(m.sender)
    if(m.msg && m.msg.url) global.api = (saveToFile = false) => api.masgi(m.msg, m.mtype.replace(/message/i, ''), saveToFile)
    m.reply = async (text, chatId, options = {}) => {
        programRojak.reply(chatId ? chatId : m.chat, text, m, { 
            contextInfo: { 
                mentionedJid: programRojak.parseMention(text), 
                externalAdReply: { 
                    title: options.title,
                    body: options.body, 
                    sourceUrl: options.url, 
                    thumbnail: options.data 
                },
            }, 
        }, { fromMe: options.fromMe });
    };
    try {
        m.superType = programRojak.msgType = await getContentType(m.message);
    } catch {
        m.superType = Object.keys(m.message);
    };
    m.numberLive = 1;
    m.body = (m.superType === 'conversation') ? m.message.conversation : (m.superType == 'imageMessage') ? m.message.imageMessage.caption : (m.superType == 'videoMessage') ? m.message.videoMessage.caption : (m.superType == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.superType == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.superType == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.superType == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.superType === 'messageContextInfo') ? (m.message.listResponseMessage.singleSelectReply.selectedRowId || m.message.buttonsResponseMessage.selectedButtonId || m.text) : '';
    m.prefix = /^[./~!#%^&=\,;:()]/.test(m.body) ? m.body.match(/^[./~!#%^&=\,;:()]/gi) : '#';
    m.command = m.body.toLowerCase().split(' ')[0] || '';
    m.isCmd = programRojak.isCmd = m.body.startsWith(m.prefix);
    m.args = m.body.trim().split(/ +/).slice(1);
    m.qStringOne = m.args.slice(1).join(' ');
    m.qStringTwo = m.args.slice(0).join(' ');
    m.botNumber = await jidNormalizedUser(programRojak.user.id);
    m.isOwner = [ m.botNumber, info.owner.number[0]].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender);
    m.name = m.pushName || programRojak.getName(m.sender);
    try {
        m.thumb = await programRojak.profilePictureUrl(m.sender, 'image', 3000)
    } catch {
        m.thumb = info.source.image.url.nopp
    };
    m.groupMetadata = m.isGroup ? store?.groupMetadata[m.chat] !== undefined ? store.groupMetadata[m.chat] : await store.fetchGroupMetadata(m.chat, programRojak) : {};
    m.groupMembers = m.isGroup ? m.groupMetadata.participants : [];
    m.groupAdmins = m.groupMembers.filter(v => v.admin !== null).map(x => x.id) || groupMembers.filter(v => v.superadmin !== null).map(x => x.id);
    m.isGroupAdmin = m.isOwner || m.groupAdmins.includes(m.sender);
    m.isBotGroupAdmin = m.groupAdmins.includes(m.botNumber);
    m.formattedTitle = m.isGroup ? m.groupMetadata.subject : '';
    m.quotedM = m.quoted ? m.quoted : m;
    m.mime = (m.quotedM.msg || m.quotedM).mimetype || '';
    m.moment = moment.tz('asia/jakarta').format('HH:mm:ss');
	m.date = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a');
    m.ucapanWaktu = "Selamat " + m.date.charAt(0).toUpperCase() + m.date.slice(1);
    if(m.msg && m.msg.url) m.download = () => programRojak.downloadM(m.msg, m.mtype.toLowerCase().replace(/message/i, ''));
    m.copy = () => exports.Serialize(programRojak, M.fromObject(M.toObject(m)))
    m.forward = (jid = m.chat, forceForward = false) => programRojak.copyNForward(jid, m, forceForward)
    m.copyNForward = (jid = m.chat, forceForward = true, options = {}) => programRojak.copyNForward(jid, m, forceForward, options)
    m.cMod = (jid, text = '', sender = m.sender, options = {}) => programRojak.cMod(jid, m, text, sender, options)
    m.delete = () => programRojak.sendMessage(m.chat, { delete: m.key })
        async function generateThumbnail(file, mediaType, info) {
            const alternate = (Buffer.alloc(1)).toString('base64')
            if('thumbnail' in info) {
                if(mediaType === MessageType.audio) { 
                    throw new Error('audio messages cannot have thumbnails') 
                } 
            } else if(mediaType === MessageType.image) {
                try {
                     const buff = await compressImage(file)
                     info.thumbnail = buff.toString('base64')
                } catch (err) {
                     console.error(err)
                     info.thumbnail = alternate
                } 
            } else if(mediaType === MessageType.video) {
                const imgFilename = path.join(tmpdir(), generateMessageID() + '.jpg')
                try {
                    try {
                        await extractVideoThumb(file, imgFilename, '00:00:00', { width: 48, height: 48 })
                        const buff = await fs.promises.readFile(imgFilename)
                        info.thumbnail = buff.toString('base64')
                        await fs.promises.unlink(imgFilename)
                    } catch (e) {
                        console.error(e)
                        info.thumbnail = alternate
                    }
                } catch (err) {
                    console.log('could not generate video thumb: ' + err)
                }
            }
        }
        try {
            await delay(1000)
            await programRojak.saveName(m.sender, m.name)
            await programRojak.pushMessage(m)
            if(m.isGroup) await programRojak.saveName(m.chat)
            if(m.msg && m.mtype == 'protocolMessage') await programRojak.ev.emit('message.delete', m.msg.key)
        } catch (err) {
            console.log(err)
        }
    return m
}
exports.logic = (check, inp, out) => {
    if(inp.length !== out.length) throw new Error('Input and Output must have same length')
    for (let i in inp) if(isDeepStrictEqual(check, inp[i])) return out[i]
    return null
}
exports.jsonformat = (string) => {
    return JSON.stringify(string, null, 2)
}
exports.isUrl = (url) => {
	return new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi).test(url)
};
exports.getBuffer = async (url, options) => {
	try {
		options ? options : {}
		const res = await axios({
			method: "get",
			url,
			headers: {
				'DNT': 1,
				'Upgrade-Insecure-Request': 1
			},
			...options,
			responseType: 'arraybuffer'
		})
		return res.data
	} catch (err) {
		return err
	}
}
exports.fetchJson = async (url, options) => {
    try {
        options ? options : {}
        const res = await axios({
            method: 'GET',
            url: url,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
            },
            ...options
        })
        return res.data
    } catch (err) {
        return err
    }
}
exports.tanggal = (numer) => {
    var myMonths = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
    var myDays = ['Minggu','Senin','Selasa','Rabu','Kamis','Jum’at','Sabtu']; 
    var tgl = new Date(numer);
    var day = tgl.getDate()
    var bulan = tgl.getMonth()
    var thisDay = tgl.getDay(),
    thisDay = myDays[thisDay];
    var yy = tgl.getYear()
    var year = (yy < 1000) ? yy + 1900 : yy; 
    var time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
	let d = new Date
	let locale = 'id'
	let gmt = new Date(0).getTime() - new Date('1 January 1970').getTime()
	let weton = ['Pahing', 'Pon','Wage','Kliwon','Legi'][Math.floor(((d * 1) + gmt) / 84600000) % 5]
    return`${thisDay}, ${day} - ${myMonths[bulan]} - ${year}`
}
exports.proto = () => {
    Buffer.prototype.toArrayBuffer = function toArrayBufferV2() {
        const ab = new ArrayBuffer(this.length);
        const view = new Uint8Array(ab);
        for (let i = 0; i < this.length; ++i) {
            view[i] = this[i];
        }
        return ab;
    }
    Buffer.prototype.toArrayBufferV2 = function toArrayBuffer() {
        return this.buffer.slice(this.byteOffset, this.byteOffset + this.byteLength)
    }
    ArrayBuffer.prototype.toBuffer = function toBuffer() {
        return Buffer.from(new Uint8Array(this))
    }
    String.prototype.isNumber = Number.prototype.isNumber = isNumber
    Uint8Array.prototype.getFileType = ArrayBuffer.prototype.getFileType = Buffer.prototype.getFileType = async function getFileType() {
        const { fileTypeFromBuffer } = await import('file-type')
        return await fileTypeFromBuffer(this)
    }
}

function nullish(args) {
    return !(args !== null && args !== undefined)
}