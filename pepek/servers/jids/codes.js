"use strict";
require('dotenv').config();
    const { flatDirectly } = require('../../actually/required/get.js');
    const { extractDocs, getBuffer, jsonformat } = require('../../actually/replacement/serials.js');
    const { imageToWebp, writeExifImg } = require('../../actually/tools/exif.js');
    const { yta } = require('../../actually/tools/y2mate.js')
    const { switching, info } = require('../../dbase/config/dat.json');
    const { yts, node_fetch, hxz, boom, baileys, fs, chalk, PhoneNumber, FileType } = new flatDirectly();
    const { generateForwardMessageContent, generateWAMessageFromContent, downloadContentFromMessage, isJidStatusBroadcast, jidDecode, areJidsSameUser, jidNormalizedUser, getContentType, proto } = baileys;
    
    module.exports = {
        async depthModule(programRojak, store) {
            try {
            programRojak.decodeJid = (jid) => {
                if(!jid) return jid
                if(/:\d+@/gi.test(jid)) {
                    let decode = jidDecode(jid) || {}
                    return decode.user && decode.server && decode.user + '@' + decode.server || jid
                } else return jid
            };
            programRojak.saveName = async(id, name = '') => {
                if(!id) return
                id = programRojak.decodeJid(id)
                let isGroup = id.endsWith('@g.us')
                if(id in programRojak.contacts && programRojak.contacts[id][isGroup ? 'subject' : 'name'] && id in programRojak.chats) return
                let metadata = {}
                if(isGroup) metadata = await programRojak.groupMetadata(id)
                let chat = { ...(programRojak.contacts[id] || {}), id, ...(isGroup ? { subject: metadata.subject, desc: metadata.desc } : { name }) }
                programRojak.contacts[id] = chat
                programRojak.chats[id] = chat
            };
            programRojak.pushMessage = (m) => {
                if(['senderKeyDistributionMessage', 'protocolMessage'].includes(m.mtype)) return
                let id = m.chat
                let chats = programRojak.chats[id]
                if(!chats) chats = { id }
                if(!chats.messages) chats.messages = {}
                chats.messages[m.id] = JSON.stringify(m, null, 2)
            };
            programRojak.getName = async(jid = '', withoutContact = false) => {
                jid = programRojak.decodeJid(jid)
                withoutContact = programRojak.withoutContact || withoutContact
                let v
                if(jid.endsWith('@g.us')) return new Promise(async(resolve) => {
                    v = programRojak.chats[jid] || {}
                    if(!(v.name || v.subject)) v = await programRojak.groupMetadata(jid) || {} 
                    resolve(v.name || v.subject || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international'))
                })
                    else v = jid === '0@s.whatsapp.net' ? { jid, vname: 'WhatsApp' } : areJidsSameUser(jid, programRojak.user.id) ? programRojak.user : (programRojak.chats[jid] || {})
                return (withoutContact ? '' : v.name) || v.subject || v.vname || v.notify || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')
            }
            programRojak.cMod = async (jid, copy, text = '', sender = programRojak.user.id, options = {}) => {
                let mtype = getContentType(copy.message)
                let isEphemeral = mtype === 'ephemeralMessage'
                if(isEphemeral) {
                    mtype = Object.keys(copy.message.ephemeralMessage.message)[0]
                }
                let msg = isEphemeral ? copy.message.ephemeralMessage.message : copy.message
                let content = msg[mtype]
                if(typeof content === 'string') msg[mtype] = text || content
                else if(text || content.caption) content.caption = text || content.caption
                else if(content.text) content.text = text || content.text
                if(typeof content !== 'string') msg[mtype] = {
                    ...content,
                    ...options
                }
                if(copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
                else if(copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
                if(copy.key.remoteJid.includes('@s.whatsapp.net')) sender = sender || copy.key.remoteJid
                else if(copy.key.remoteJid.includes('@broadcast')) sender = sender || copy.key.remoteJid
                copy.key.remoteJid = jid
                copy.key.fromMe = areJidsSameUser(sender, programRojak.user.id)
                if(options.mentions) {
                    copy.message[mtype].contextInfo.mentionedJid = options.mentions
                }
                return proto.WebMessageInfo.fromObject(copy)
            }
            /**
            * @param {string} jid 
            * @param {proto.WebMessageInfo} message 
            * @param {boolean} forceForward 
            * @param {any} options 
            * @returns 
            */
            programRojak.copyNForward = async(jid, message, forceForward = false, options = {}) => {
                let vtype
                let mtype = await getContentType(message.message)
                if(options.readViewOnce) {
                    message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : (message.message || undefined)
                    vtype = Object.keys(message.message.viewOnceMessage.message)[0]
                    delete (message.message && message.message.ignore ? message.message.ignore : (message.message || undefined))
                    delete message.message.viewOnceMessage.message[vtype].viewOnce
                    message.message = {
                        ...message.message.viewOnceMessage.message
                    }
                }
                if(options.mentions) {
                    message.message[mtype].contextInfo.mentionedJid = options.mentions
                }
                let content = generateForwardMessageContent(message, forceForward)
                let ctype = getContentType(content)
                let context = {}
                if(mtype != "conversation") context = message.message[mtype].contextInfo
                content[ctype].contextInfo = {
                    ...context,
                    ...content[ctype].contextInfo,
                }
                const waMessage = generateWAMessageFromContent(jid, content, options ? {
                    ...content[ctype],
                    ...options,
                    ...(options.contextInfo ? {
                        contextInfo: {
                            ...content[ctype].contextInfo,
                            ...options.contextInfo
                        }
                    } : {})
                } : {})
                await programRojak.relayMessage(jid, waMessage.message, { messageId: waMessage.key.id })
                return waMessage
            };
            programRojak.getFile = async(PATH, returnAsFilename) => {
                let res, filename
                let data = Buffer.isBuffer(PATH) ? PATH : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split`,`[1], 'base64') : /^https?:\/\//.test(PATH) ? await (res = await node_fetch(PATH)).buffer() : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : typeof PATH === 'string' ? PATH : Buffer.alloc(0)
                if(!Buffer.isBuffer(data)) throw new TypeError('Result is not a buffer')
                let type = await FileType.fromBuffer(data) || {
                    mime: 'application/octet-stream',
                    ext: '.bin'
                }
                if(data && returnAsFilename && !filename) (filename = path.join(__dirname, '../tmp/' + new Date * 1 + '.' + type.ext), await fs.promises.writeFile(filename, data))
                return {
                    res,
                    filename,
                    ...type,
                    data
                }
            }
            programRojak.sendFile = async(jid, path, filename = '', caption = '', quoted, ptt = false, options = {}) => {
                let type = await programRojak.getFile(path, true)
                let { res, data: file, filename: pathFile } = type
                if(res && res.status !== 200 || file.length <= 65536) {
                try { 
                    throw { 
                        json: JSON.parse(file.toString()) 
                    } 
                } catch (err) { 
                    if(err.json) 
                        throw err.json 
                    }
                }
                let opt = { filename }
                if(quoted) opt.quoted = quoted
                if(!type) 
                if(options.asDocument) options.asDocument = true
                let mtype = '', mimetype = type.mime
                if(/webp/.test(type.mime)) mtype = 'sticker'
                else if(/image/.test(type.mime)) mtype = 'image'
                else if(/video/.test(type.mime)) mtype = 'video'
                else if(/audio/.test(type.mime)) (convert = await (ptt ? toPTT : toAudio)(file, type.ext), file = convert.data, pathFile = convert.filename, mtype = 'audio', mimetype = 'audio/ogg; codecs=opus')
                else mtype = 'document'
                return await programRojak.sendMessage(jid, { ...options, caption, ptt, [mtype]: { url: pathFile }, mimetype }, { ...opt, ...options })
            };
            programRojak.parseMention = (text = '') => {
                return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
            };
            programRojak.reply = async(jid, text = '', quoted, options) => {
                return Buffer.isBuffer(text) ? programRojak.sendFile(jid, text, 'file', '', quoted, false, options) : programRojak.sendMessage(jid, { ...options, text }, { quoted, ...options })
            };
            programRojak.reply2 = async(jid, text = '', quoted, options) => {
                return Buffer.isBuffer(text) ? programRojak.sendFile(jid, text, 'file', '', quoted, false, options) : programRojak.sendMessage(jid, { ...options, text: await tr(text, {from: 'auto', to: lang}) }, { quoted, ...options })
            };
            programRojak.fakeReply = (jid, text = '', fakeJid = programRojak.user.jid, fakeText = '', fakeGroupJid, options) => {
                return programRojak.sendMessage(jid, { text: text }, { quoted: { key: { fromMe: fakeJid == programRojak.user.jid, participant: fakeJid, ...(fakeGroupJid ? { remoteJid: fakeGroupJid } : {}) }, message: { conversation: fakeText }, ...options } })
            };
            programRojak.replyWithMentions = async(jid, text = '', options = {}) => {
                return programRojak.sendMessage(jid, { text: text, mentions: [programRojak.parseMention(text)] }, options)
            };
            programRojak.externalAdReplyPreviewTypeVideo = async(from, thumb, sender, title, mediaUrl, sourceUrl, moment, quoted) => {
			    return programRojak.sendMessage(from, { 
			        sticker: fs.readFileSync('./dbase/documents/webp/wait.webp'), 
			        contextInfo: { 
			            mentionedJid: [sender],
			            externalAdReply: {
			                showAdAttribution: true,
			                title: title, 
			                mediaType: 2, 
			                thumbnail: thumb,
			                previewType: "VIDEO",
			                mediaUrl: mediaUrl,
			                sourceUrl: sourceUrl
			            },
			        },
			    }, { quoted: quoted });
		    };
		    programRojak.sendImage = async (jid, path, caption = '', quoted = '', options) => {
		        let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
                return await programRojak.sendMessage(jid, { image: buffer, caption: caption, ...options }, { quoted })
            };
            programRojak.sendListM = async(jid, button, rows, quoted) => {
                let messageList = proto.Message.fromObject({
                    listMessage: proto.ListMessage.fromObject({
                        title: button.title,
                        buttonText: button.buttonText,
                        footerText: button.footerText, 
                        description: button.description,
                        listType: 1,
                        sections: [
                            {
                                title: button.title,
                                rows: [...rows]
                            }
                        ]
                    })
                });
                let waMessageList = await generateWAMessageFromContent(jid, messageList, { fromMe: jid, quoted: quoted, mentions: [programRojak.parseMention(button.description)] })
                return await programRojak.relayMessage(jid, waMessageList.message, { messageId: waMessageList.key.id })
            };
            programRojak.sendL = async (jid, latitude, longitude, name, address, url, location, quoted, options) => {
                let message = {
                    ...options,
                    location: {
                        jpegThumbnail: await getBuffer(location),
                        degreesLatitude: latitude,
                        degreesLongitude: longitude,
                        name: name,
                        url: url,
                        address: address
                    }
                }
                return await programRojak.sendMessage(jid, message, { quoted, upload: programRojak.waUploadToServer, ...options })
            };
            programRojak.sendButtonText = async (jid, buttons = [], text, footer, quoted, options = {}) => {
                let buttonMessage = {
                    text: text,
                    footer: footer,
                    buttons: buttons,
                    headerType: 2,
                    ...options
                };
                return await programRojak.sendMessage(jid, buttonMessage, { quoted: quoted, options })
            };
            programRojak.sendBI_MapType = async (jid, contentText, footer, image, buttons, quoted, options) => { 
                let message = {
                    image: { url: image }, ...options,
                    caption: contentText,
                    headerType: 4,
                    footer: footer,
                    buttons: buttons.map(mk => {
                        return {
                            buttonId: mk[1] || mk[0] || '',
                            buttonText: {
                                displayText: mk[0] || mk[1] || ''
                            },
                        };
                    }),
                };
                return await programRojak.sendMessage(jid, message, { quoted: quoted, ...options })
            };
            programRojak.sendBI = async (jid, contentText, footer, image, buttonId1, displayText1, quoted, options) => {
                let buttonsDefault = [
                    { 
                        buttonId: buttonId1, 
                        buttonText: { 
                            displayText: displayText1
                        }, 
                        type: 1 
                    },
                ];
                let message = {
                    image: { 
                        url: image
                    },
                    caption: contentText,
                    footer: footer,
                    buttons: buttonsDefault,
                    headerType: 4,
                    ...options
                };
                return await programRojak.sendMessage(jid, message, { quoted: quoted, ...options })
            };
            programRojak.sendBI2 = async (jid, contentText, footer, image, buttonId1, displayText1, buttonId2, displayText2, quoted, options) => {
                let buttonsDefault = [
                    { 
                        buttonId: buttonId1, 
                        buttonText: { 
                            displayText: displayText1
                        }, 
                        type: 1 
                    }, { 
                        buttonId: buttonId2, 
                        buttonText: { 
                            displayText: displayText2
                        }, 
                        type: 1 
                    },
                ];
                let message = {
                    image: { 
                        url: image
                    },
                    caption: contentText,
                    footer: footer,
                    buttons: buttonsDefault,
                    headerType: 4,
                    ...options
                };
                return await programRojak.sendMessage(jid, message, { quoted: quoted, ...options })
            };
            programRojak.sendBI3 = async (jid, contentText, footer, image, buttonId1, displayText1, buttonId2, displayText2, buttonId3, displayText3, quoted, options) => {
                let buttonsDefault = [
                    { 
                        buttonId: buttonId1, 
                        buttonText: { 
                            displayText: displayText1
                        }, 
                        type: 1 
                    }, { 
                        buttonId: buttonId2, 
                        buttonText: { 
                            displayText: displayText2
                        }, 
                        type: 1 
                    }, { 
                        buttonId: buttonId3, 
                        buttonText: { 
                            displayText: displayText3
                        }, 
                        type: 1 
                    },
                ];
                let message = {
                    image: { 
                        url: image
                    },
                    caption: contentText,
                    footer: footer,
                    buttons: buttonsDefault,
                    headerType: 4,
                    ...options
                };
                return await programRojak.sendMessage(jid, message, { quoted: quoted, ...options })
            };
            programRojak.sendBL_MapType = async (jid, contentText, footer, location, buttons, quoted, options) => {
                let message = {
                    headerType: 6, ...options,
                    location: { jpegThumbnail: await (await node_fetch(location)).buffer() },
                    caption: contentText,
                    footer: footer,
                    buttons: buttons.map(btn => {
                        return {
                            buttonId: btn[1] || btn[0] || '',
                            buttonText: {
                                displayText: btn[0] || btn[1] || ''
                            }
                        }
                    }),
                }
                return await programRojak.sendMessage(jid, message, { quoted: quoted, upload: programRojak.waUploadToServer, ...options })
            };
            programRojak.sendBL = async (jid, contentText, footer, location, buttonId1, displayText1, quoted, options) => {
                let buttonsDefault = [
                    { 
                        buttonId: buttonId1, 
                        buttonText: { 
                            displayText: displayText1
                        }, 
                        type: 1 
                    },
                ];
                let message = {
                    location: { 
                        jpegThumbnail: await (await node_fetch(location)).buffer() 
                    },
                    caption: contentText,
                    footer: footer,
                    buttons: buttonsDefault,
                    headerType: 6,
                    ...options
                };
                return await programRojak.sendMessage(jid, message, { quoted: quoted, upload: programRojak.waUploadToServer, ...options })
            };
            programRojak.sendBL2 = async (jid, contentText, footer, location, buttonId1, displayText1, buttonId2, displayText2, quoted, options) => {
                let buttonsDefault = [
                    { 
                        buttonId: buttonId1, 
                        buttonText: { 
                            displayText: displayText1
                        }, 
                        type: 1 
                    }, { 
                        buttonId: buttonId2, 
                        buttonText: { 
                            displayText: displayText2
                        }, 
                        type: 1 
                    },
                ];
                let message = {
                    location: { 
                        jpegThumbnail: await (await node_fetch(location)).buffer() 
                    },
                    caption: contentText,
                    footer: footer,
                    buttons: buttonsDefault,
                    headerType: 6,
                    ...options
                };
                return await programRojak.sendMessage(jid, message, { quoted: quoted, upload: programRojak.waUploadToServer, ...options })
            };
            programRojak.sendBL3 = async (jid, contentText, footer, location, buttonId1, displayText1, buttonId2, displayText2, buttonId3, displayText3, quoted, options) => {
                let buttonsDefault = [
                    { 
                        buttonId: buttonId1, 
                        buttonText: { 
                            displayText: displayText1
                        }, 
                        type: 1 
                    }, { 
                        buttonId: buttonId2, 
                        buttonText: { 
                            displayText: displayText2
                        }, 
                        type: 1 
                    }, { 
                        buttonId: buttonId3, 
                        buttonText: { 
                            displayText: displayText3
                        }, 
                        type: 1 
                    },
                ];
                let message = {
                    location: { 
                        jpegThumbnail: await (await node_fetch(location)).buffer() 
                    },
                    caption: contentText,
                    footer: footer,
                    buttons: buttonsDefault,
                    headerType: 6,
                    ...options
                };
                return await programRojak.sendMessage(jid, message, { quoted: quoted, upload: programRojak.waUploadToServer, ...options })
            };
            programRojak.sendTBD5 = async (jid, docux, optsDocs, contentText, footer, thumb, linkbuttid1, butturl1, linkbuttid2, butturl2, buttons1, row1, buttons2, row2, buttons3, row3, quoted, options) => {
                const message = {
                    document: { url: docux }, ...options,
                    jpegThumbnail: await (await node_fetch(thumb)).buffer(), 
                    fileName: optsDocs.fileName, 
                    mimetype: 'image/png', 
                    fileLength: optsDocs.fileLength, 
                    pageCount: optsDocs.pageCount,
                    caption: contentText,
                    footer: footer,
                    templateButtons: [
                        {
                            urlButton: {
                                displayText: linkbuttid1,
                                url: butturl1
                            }
                        }, {
                            urlButton: {
                                displayText: linkbuttid2,
                                url: butturl2
                            }
                        }, {
                            quickReplyButton: {
                                displayText: buttons1,
                                id: row1
                            }
                        }, {
                            quickReplyButton: {
                                displayText: buttons2,
                                id: row2
                            }
                        }, {
                            quickReplyButton: {
                                displayText: buttons3,
                                id: row3
                            },
                        },
                    ],
                };
                return await programRojak.sendMessage(jid, message, { quoted: quoted, ...options })
            };
            programRojak.sendTBI4 = async (jid, contentText, footer, image, linkbuttid1, butturl1, buttons1, row1, buttons2, row2, buttons3, row3, quoted, options) => {
                const message = {
                    image: { url: image }, ...options,
                    jpegThumbnail: await (await node_fetch(image)).buffer(),
                    caption: contentText,
                    footer: footer,
                    templateButtons: [
                        {
                            urlButton: {
                                displayText: linkbuttid1,
                                url: butturl1
                            }
                        }, {
                            quickReplyButton: {
                                displayText: buttons1,
                                id: row1
                            }
                        }, {
                            quickReplyButton: {
                                displayText: buttons2,
                                id: row2
                            }
                        }, {
                            quickReplyButton: {
                                displayText: buttons3,
                                id: row3
                            }
                        },
                    ]
                }
                return await programRojak.sendMessage(jid, message, { quoted: quoted, ...options })
            };
            programRojak.sendTBI3 = async (jid, contentText, footer, image, linkbuttid1, butturl1, buttons1, row1, buttons2, row2, quoted, options) => {
                const message = {
                    image: { url: image }, ...options,
                    jpegThumbnail: await (await node_fetch(image)).buffer(),
                    caption: contentText,
                    footer: footer,
                    templateButtons: [
                        {
                            urlButton: {
                                displayText: linkbuttid1,
                                url: butturl1
                            }
                        }, {
                            quickReplyButton: {
                                displayText: buttons1,
                                id: row1
                            }
                        }, {
                            quickReplyButton: {
                                displayText: buttons2,
                                id: row2
                            }
                        },
                    ]
                }
                return await programRojak.sendMessage(jid, message, { quoted: quoted, ...options })
            };
            programRojak.sendContact = async(jid, contact, quoted = false, opts = {}) => {
                let list = [];
                for (let i of contact) {
                    let num = typeof i == "number" ? i + "@s.whatsapp.net" : i;
                    let num2 = typeof i == "number" ? i : i.split("@")[0];
                        list.push({
                            displayName: await programRojak.getName(num),
                            vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:${await programRojak.getName(
				    	    num
			         	)}\nFN:${await programRojak.getName(
			    	    	num
			         	)}\nitem1.TEL;waid=${num2}:${num2}\nitem1.X-ABLabel:Ponsel\nitem2.EMAIL;type=INTERNET:${
				     	    info.owner.social.email
			        	}\nitem2.X-ABLabel:Email\nitem3.URL:${
				        	info.owner.social.instagram
			        	}\nitem3.X-ABLabel:Instagram\nitem4.ADR:;;Indonesia;;;;\nitem4.X-ABLabel:Region\nEND:VCARD`,
                    });
                }
                return programRojak.sendMessage(
                    jid, {
                        contacts: {
                            displayName: `${list.length} Kontak`,
                            contacts: list,
                        },  ...opts }, { quoted
                    },
                );
            };
            programRojak.sendImageAsSticker = async(jid, path, quoted, options = {}) => {
                let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
                let buffer;
                if(options && (options.packname || options.author)) {
                    buffer = await writeExifImg(buff, options)
                } else {
                    buffer = await imageToWebp(buff)
                }
                await programRojak.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
                return buffer
            };
            programRojak.downloadM = async(m, type, filename = '') => {
                if(!m || !(m.url || m.directPath)) return Buffer.alloc(0)
                const stream = await downloadContentFromMessage(m, type)
                let buffer = Buffer.from([])
                for await (const chunk of stream) {
                    buffer = Buffer.concat([buffer, chunk])
                };
                if(filename) await fs.promises.writeFile(filename, buffer)
                return filename && fs.existsSync(filename) ? filename : buffer
            };
            programRojak.chatRead = async(jid, participant = programRojak.user.jid, messageID) => {
                return await programRojak.sendReadReceipt(jid, participant, [messageID])
            };
            programRojak.sendPlay = async(from, query, prefix, sender, quoted, options) => {
                var url = await yts.search(query)
                url = url.videos[0].url
                hxz.youtube(url).then(async(data) => {
                    programRojak.sendBI2(from, `*⚐︎ Id:* ${data.id}\n*⚐︎ Title :* ${data.title}\n*⚐︎ Quality :* ${data.quality}\n*⚐︎ Thumb:* ${data.thumb}`, `Pilih Salah Satu Button Dibawah!`, `${data.thumb}`, `${prefix}ytmp3 ${url}`, `🎵 Audio (${data.size_mp3})`, `${prefix}ytmp4 ${url}`, `🎥 Video (${data.size})`, quoted, options)
                }).catch((err) => {
                    programRojak.sendMessage(from, { text: jsonformat(err) });
                    info.owner.number.map(() => programRojak.sendMessage(from, { text: `Send Play Error : ${jsonformat(err)}` }));
                });
            };
            if(programRojak.user && programRojak.user.id) programRojak.user.jid = jidNormalizedUser(programRojak.user.id)
                programRojak.chats = {}
                programRojak.contacts = {}
                programRojak.logger = {
                    ...programRojak.logger,
                    info(...args) { 
                        console.log(chalk.bold.rgb(57, 183, 16)(`INFO [${chalk.rgb(255, 255, 255)(new Date())}]:`), chalk.cyan(...args)) 
                    },
                    error(...args) { 
                        console.log(chalk.bold.rgb(247, 38, 33)(`ERROR [${chalk.rgb(255, 255, 255)(new Date())}]:`), chalk.rgb(255, 38, 0)(...args)) 
                    },
                    warn(...args) { 
                        console.log(chalk.bold.rgb(239, 225, 3)(`WARNING [${chalk.rgb(255, 255, 255)(new Date())}]:`), chalk.keyword('orange')(...args)) 
                    },
                };
            } catch (err) {
                var requestPaymentMessage = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
                    requestPaymentMessage: {
                        currencyCodeIso4217: "USD",
                        amount1000: 1000,
                        requestFrom: m.sender,
                        noteMessage: {
                            extendedTextMessage: {
                                text: util.format(err)
                            }, 
                        }, 
                    },
                }), { userJid: m.chat, quoted: m })
                programRojak.relayMessage(m.chat, requestPaymentMessage.message, { messageId: requestPaymentMessage.key.id })
            };
        },
    };
   
let LordROJAK = require.resolve(__filename)
    fs.watchFile(LordROJAK, () => {
	    fs.unwatchFile(LordROJAK) 
    	console.log(chalk.bold(chalk.redBright('[FILE]'), chalk.blueBright('Update!'), chalk.yellowBright(__filename)))
    	delete require.cache[LordROJAK]
      	require(LordROJAK)
    }) 