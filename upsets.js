"use strict";
require('dotenv').config();
    const { flatDirectly, extractDocs } = require('../../actually/required/get.js');
    const { api, info, switching, costumeText } = require('../../dbase/config/dat.json');
    const { jsonformat, isUrl, getBuffer, fetchJson } = require('../../actually/replacement/serials.js');
    const { yta, ytv } = require('../../actually/tools/y2mate.js');
    const { donasiTEXT } = require('../../actually/typing/donasi.js');
    const { moment, node_fetch, yts, hxz, baileys, fs, chalk, child_process, util, axios } = new flatDirectly();
    const { jidNormalizedUser, generateWAMessageFromContent, proto, generateWAMessageContent, delay } = baileys;
    const { exec } = child_process;
    
    module.exports = {
        async shellMessage(programRojak, m, store) {
            try {
                switch (m.command) {
                    case m.prefix+'menu': {
                        let descArray = {
                            bt: '<button>',
                            qr: '<query>',
                            rp: '<reply>',
                            oxf: '<on/off>'
                        };
                        let objectCommand = [ 
                            {
                                commands: m.prefix+`test ${descArray.bt}`,
                                descriptions: "testing response",
                                id: m.prefix+'test'
                            },
                        ];
                        let objectCommand_2 = [ 
                            {
                                commands: m.prefix+`sticker ${descArray.rp}`,
                                descriptions: "convert img to sticker",
                                id: m.prefix+'sticker'
                            },
                        ];
                        let objectCommand_3 = [ 
                            {
                                commands: m.prefix+`antilink ${descArray.oxf}`,
                                descriptions: "accessibility detector links",
                                id: m.prefix+'antilink'
                            }, {
                                commands: m.prefix+`welcome ${descArray.oxf}`,
                                descriptions: "accessibility detector participants",
                                id: m.prefix+'welcome'
                            },
                        ];
                        let objectCommand_4 = [ 
                            {
                                commands: m.prefix+`ytplay ${descArray.qr}`,
                                descriptions: "play youtube only query",
                                id: m.prefix+'ytplay'
                            }, {
                                commands: m.prefix+`ytmp3 ${descArray.oxf}`,
                                descriptions: "youtube music download only links",
                                id: m.prefix+'ytmp3'
                            }, {
                                commands: m.prefix+`ytmp4 ${descArray.oxf}`,
                                descriptions: "youtube video download only links",
                                id: m.prefix+'ytmp4'
                            },
                        ];
                        let objectCommand_5 = [ 
                            {
                                commands: m.prefix+`addreply ${descArray.rp}`,
                                descriptions: "add participants",
                                id: m.prefix+'addreply'
                            },
                        ];
                        if(!fs.existsSync('./dbase/commands/test.json')) {
                            if(!fs.existsSync('./dbase/commands/media.json')) {
                                if(!fs.existsSync('./dbase/commands/accessibility.json')) {
                                    if(!fs.existsSync('./dbase/commands/downloader.json')) {
                                        fs.writeFile('./dbase/commands/downloader.json', JSON.stringify(objectCommand_4, null, 3), () => { 
                                            console.log(chalk.underline.green('array created in: ./dbase/commands/downloader.json')) 
                                        });
                                        fs.writeFile('./dbase/commands/accessibility.json', JSON.stringify(objectCommand_3, null, 3), () => { 
                                            console.log(chalk.underline.green('array created in: ./dbase/commands/accessibility.json')) 
                                        });
                                        fs.writeFile('./dbase/commands/media.json', JSON.stringify(objectCommand_2, null, 3), () => { 
                                            console.log(chalk.underline.green('array created in: ./dbase/commands/media.json')) 
                                        });
                                        fs.writeFile('./dbase/commands/test.json', JSON.stringify(objectCommand, null, 3), () => { 
                                            console.log(chalk.underline.green('array created in: ./dbase/commands/test.json')) 
                                        });
                                    };
                                };
                            };
                        };
                        if(!fs.existsSync('./dbase/commands/group.json')) {
                            fs.writeFile('./dbase/commands/group.json', JSON.stringify(objectCommand_5, null, 3), () => { 
                                console.log(chalk.underline.green('array created in: ./dbase/commands/group.json')) 
                            });
                        };
                        await delay(1000)
                        let voidedCommand = JSON.parse(fs.readFileSync('./dbase/commands/test.json'));
                        let voidedCommand_2 = JSON.parse(fs.readFileSync('./dbase/commands/media.json'));
                        let voidedCommand_3 = JSON.parse(fs.readFileSync('./dbase/commands/accessibility.json'));
                        let voidedCommand_4 = JSON.parse(fs.readFileSync('./dbase/commands/downloader.json'));
                        let voidedCommand_5 = JSON.parse(fs.readFileSync('./dbase/commands/group.json'));
                        try {
                            let service_row = [];
                            for (let x of voidedCommand) {
                                service_row.push({
                                    title: x.commands,
                                    rowId: x.id,
                                    description: x.descriptions
                                });
                            };
                            let service_row_2 = [];
                            for (let x of voidedCommand_2) {
                                service_row_2.push({
                                    title: x.commands,
                                    rowId: x.id,
                                    description: x.descriptions
                                });
                            };
                            let service_row_3 = [];
                            for (let x of voidedCommand_3) {
                                service_row_3.push({
                                    title: x.commands,
                                    rowId: x.id,
                                    description: x.descriptions
                                });
                            };
                            let service_row_4 = [];
                            for (let x of voidedCommand_4) {
                                service_row_4.push({
                                    title: x.commands,
                                    rowId: x.id,
                                    description: x.descriptions
                                });
                            };
                            let service_row_5 = [];
                            for (let x of voidedCommand_5) {
                                service_row_5.push({
                                    title: x.commands,
                                    rowId: x.id,
                                    description: x.descriptions
                                });
                            };
                            let sections = [
                                { 
                                    title: 'TEST',
                                    rows: service_row
                                }, {
                                    title: 'MEDIA', 
                                    rows: service_row_2
                                }, {
                                    title: 'ACCESSIBILITY', 
                                    rows: service_row_3
                                }, {
                                    title: 'DOWNLOADER', 
                                    rows: service_row_4
                                }, {
                                    title: 'GROUP', 
                                    rows: service_row_5
                                },
                            ];
                            global.button = {
                                title: `Di Berdaya Oleh ${info.owner.name}`,
                                buttonText: `Tekan Disini`,
                                footer: info.bot.bame, 
                                text: `\nHalo 👋 *${m.name}*, Berikut adalah daftar menu pada ${info.bot.name}.`
                            };
                            await programRojak.sendMessage(m.chat, { 
                                text: button.text, 
                                footer: button.footer, 
                                title: button.title, 
                                buttonText: button.buttonText, 
                                sections 
                            }, { fromMe: m.chat, quoted: m }).catch((err) => {
                                m.reply(jsonformat(err))
                            });
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
                    };
                    break;
                    case m.prefix+'test': {
                        if((m.args[0]) === 'text') {
                            m.reply("work as command");
                        } else if((m.args[0]) === 'button') {
                            programRojak.sendButtonText(m.chat, [
                                { 
                                    buttonId: `${m.prefix}test_1`, 
                                    buttonText: { 
                                        displayText: 'TEST BUTTON 1'
                                    }, 
                                    type: 1 
                                }, {
                                    buttonId: `${m.prefix}test_2`, 
                                    buttonText: { 
                                        displayText: 'TEST BUTTON 2'
                                    }, 
                                    type: 1 
                                }, {
                                    buttonId: `${m.prefix}test_3`, 
                                    buttonText: { 
                                        displayText: 'TEST BUTTON 3'
                                    }, 
                                    type: 1 
                                },
                            ], `Testing with button command`, info.bot.name, m)
                        } else {
                            m.reply(`*Type testing:*\n${m.numberLive++}. ${m.command} text\n${m.numberLive++}. ${m.command} button`)
                        };
                    };
                    break;
                    case m.prefix+'donasi': {
                        m.reply(`${donasiTEXT}`)
                    };
                    break;
                    case m.prefix+'ytplay': {
                        if(!m.isGroup) return global.dfail("grup", m, programRojak);
                        if(m.args.length < 1) return m.reply(`Kirim perintah ${m.command} query\nContoh : ${m.command} sholawat man ana`);
                            await m.reply("mohon tunggu sebentar, permintaan anda sedang di proses")
                            await delay(1000);
                            await programRojak.sendPlay(m.chat, m.qStringTwo, m.prefix, m.sender, m).catch(() => {
                                programRojak.sendBI3(m.chat, "Server utama lagi gangguan, Silahkan pilih server yang lain untuk melanjutkan", `Pilih Salah Satu Button Dibawah!`, m.thumb, m.command + m.qStringTwo, 'Server 1', m.command + m.qStringTwo, 'Server 2', m.command + m.qStringTwo, 'Server 3', m).catch(() => {
                                    programRojak.sendBI2(m.chat, "Server utama lagi gangguan, Silahkan pilih server yang lain untuk melanjutkan", `Pilih Salah Satu Button Dibawah!`, m.thumb, m.command + m.qStringTwo, 'Server 1', m.command + m.qStringTwo, 'Server 2', m).catch(() => {
                                        programRojak.sendBI2(m.chat, "Server utama lagi gangguan, Silahkan pilih server yang lain untuk melanjutkan", `Pilih Salah Satu Button Dibawah!`, m.thumb, m.command + m.qStringTwo, 'Server 1', m).catch(() => {
                                        m.reply("Semua server dalam gangguan silahkan coba beberapa saat lagi.")
                                    })
                                })
                            })
                       })
                    };
                    break;
                    case m.prefix+'ytmp3': {
                        if(!m.isGroup) return global.dfail("grup", m, programRojak);
                        if(m.qStringTwo) {
                                let quality = m.args[1] ? m.args[1] : '128kbps'
                                let media = await yta(m.qStringTwo, quality)
                                if(media.filesize >= 100000) return m.reply('File Melebihi Batas ' + util.format(media))
                                await programRojak.sendMessage(m.chat, { text: "mohon tunggu sebentar, permintaan anda sedang di proses" }, { quoted: m });
                                await programRojak.sendMessage(m.chat, { 
                                    audio: { 
                                        url: media.dl_link 
                                    }, 
                                    mimetype: 'audio/mp4', 
                                    ptt: true, 
                                    contextInfo: {
                                        externalAdReply: {
                                            showAdAttribution: true,
                                            title: media.title,
                                            body: info.bot.name,
                                            thumbnail: await getBuffer(media.thumb),
                                            mediaType: 2,
                                            mediaUrl: m.args[0],
                                            sourceUrl: m.args[0]
                                        },
                                    },
                                }, { quoted: m }).catch((err) => {
                                    m.reply(jsonformat(err))
                                });
                        } else {
                            m.reply(`Example : ${m.command} https://youtube.com/shorts/BDVhjKSvL8c?feature=share 128kbps`);
                        };
                    };
                    break;
                    case m.prefix+'ytmp4': {
                        if(!m.isGroup) return global.dfail("grup", m, programRojak);
                        if(m.qStringTwo) {
                                let quality = m.args[1] ? m.args[1] : '360p'
                                let media = await ytv(m.qStringTwo, quality)
                                if(media.filesize >= 100000) return m.reply('File Melebihi Batas ' + util.format(media))
                                await programRojak.sendMessage(m.chat, { text: "mohon tunggu sebentar, permintaan anda sedang di proses" }, { quoted: m });
                                await programRojak.sendMessage(m.chat, { 
                                    video: {
                                        url: media.dl_link
                                    },
                                    mimetype: 'video/mp4',
                                    fileName: `${media.title}.mp4`,
                                    caption: `Title : ${media.title}\nFile Size : ${media.filesizeF}\nUrl : ${isUrl(m.args)}\n✇ Ext : MP4\n✇ Resolusi : ${m.args[1] || '360p'}`,
                                }, { quoted: m }).catch((err) => {
                                    m.reply(jsonformat(err))
                                });
                        } else {
                            m.reply(`Example : ${m.command} https://youtube.com/shorts/BDVhjKSvL8c?feature=share 128kbps`);
                        };
                    };
                    break;
                    case m.prefix+'sticker': {
                        if(/image/.test(m.mime)) {
                            let media = await m.quoted.download();
                            let encmedia = await programRojak.sendImageAsSticker(m.chat, media, m, { packname: info.bot.name, author: info.owner.name });
                            await fs.unlinkSync(encmedia);
                        } else if(/video/.test(m.mime)) {
                            if((m.quoted.msg || m.quoted).seconds > 11) return m.reply('Maksimal 10 detik!');
                            let media = await quoted.download();
                            let encmedia = await programRojak.sendVideoAsSticker(m.chat, media, m, { packname: info.bot.name, author: info.owner.name });
                            await fs.unlinkSync(encmedia);
                        } else {
                            m.reply(`Kirim Gambar/Video Dengan Caption ${m.command}\nDurasi Video 1-9 Detik`)
                        };
                    };
                    break;
                    case m.prefix+'antilink': {
                        if(!m.isGroup) return global.dfail("grup", m, programRojak);
                        if(!m.isBotGroupAdmin) return global.dfail("botAdmin", m, programRojak);
                        if(m.isGroupAdmin && m.isOwner && m.key.fromMe) global.dfail("owner", m, programRojak);
                        if(m.args.length < 1) return m.reply(`example:\n\n${m.command} on/off`);
                        if((m.args[0]) === 'on') {
                            if(switching.antilink) return m.reply('Udah aktif');
                            switching.antilink = true;
                            m.reply(`Sukses mengaktifkan fitur ${m.command} di group ini`);
                        } else if((m.args[0]) === 'off') {
                            switching.antilink = false;
                            m.reply(`Sukses menonaktifkan fitur ${m.command} di group ini`);
                        } else {
                            m.reply('on untuk mengaktifkan, off untuk menonaktifkan');
                        };
                    };
                    break;
                    case m.prefix+'welcome': {
                        if(!m.isGroup) return global.dfail("grup", m, programRojak);
                        if(!m.isBotGroupAdmin) return global.dfail("botAdmin", m, programRojak);
                        if(m.isGroupAdmin && m.isOwner && m.key.fromMe) global.dfail("owner", m, programRojak);
                        if(m.args.length < 1) return m.reply(`example:\n\n${m.command} on/off`);
                        if((m.args[0]) === 'on') {
                            if(switching.antilink) return m.reply('Udah aktif');
                            switching.welcome = true;
                            m.reply(`Sukses mengaktifkan fitur ${m.command} di group ini`);
                        } else if((m.args[0]) === 'off') {
                            switching.welcome = false;
                            m.reply(`Sukses menonaktifkan fitur ${m.command} di group ini`);
                        } else {
                            m.reply('on untuk mengaktifkan, off untuk menonaktifkan');
                        };
                    };
                    break;
                    case m.prefix+'addreply': {
                        if(!m.isGroup) return m.reply("Only for group");
                        if(!m.isOwner && !m.key.fromMe) return m.reply("Only for owner");
                        if(programRojak.decodeJid(m.msg.contextInfo.participant)) {
                        let isText = `Berhasil menambahkan @${programRojak.decodeJid(m.msg.contextInfo.participant).split("@")[0]}`;
                        await programRojak.groupParticipantsUpdate(m.chat, [programRojak.decodeJid(m.msg.contextInfo.participant)], 'add').catch((err) => { 
                            m.reply(jsonformat(err));
	                    });
                            await m.reply(isText);
                        } else {
                            m.reply("please reply to someone's chat to propose the action");
                        };
                    };
                    break;
                };
                require('./buttonId.js').responseMessage(programRojak, m, store)
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