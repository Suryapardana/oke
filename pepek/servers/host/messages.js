"use strict";
require('dotenv').config();
    const { flatDirectly } = require('../../actually/required/get.js');
    const { extractDocs, jsonformat } = require('../../actually/replacement/serials.js');
    const { switching, info } = require('../../dbase/config/dat.json');
    const { JsonDB } = require("node-json-db");
    const { Config } = require("node-json-db/dist/lib/JsonDBConfig");
    const { util, boom, baileys, fs, chalk } = new flatDirectly();
    const { delay, jidDecode, isJidStatusBroadcast, generateWAMessageFromContent, proto } = baileys;
    
    module.exports = {
        async newModule(msg, programRojak, store) {
            try {
                if(!msg.messages) return
                if(!switching.remoteJid) {
                    if(msg.key.fromMe) return
                };
                let vM = await msg.messages[0]
                let m = await extractDocs(programRojak, vM, store)
                if(m.msg && m.mtype == 'protocolMessage') return programRojak.ev.emit('message.delete', m.message)
                if(m.key && isJidStatusBroadcast(m.key.remoteJid)) return
                if(!switching.remoteJid && !m.key.fromMe && msg.type === 'notify') return
                if(m.key.id.startsWith('BAE5') && m.key.id.length === 16) return
                if(m.sender.startsWith('212')) return programRojak.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
                if(m.sender.startsWith('212')) return programRojak.updateBlockStatus(m.sender, 'block')
                if(m.message) {
                    console.log(chalk.bold(chalk.yellow('[MSG]')), chalk.cyan(m.body.slice(0, 15) + '... in more'), chalk.bold(chalk.yellow('[FROM]')), chalk.redBright(m.isGroup ? m.name : 'Private Chat'));
	                if(m.isGroup) {
	                    programRojak.readMessages([m.key])
	                };
	            };
                global.dfail = (type, m) => {
                    let msgnye = {
                        grup: "Only for group",
                        admin: "Only for admin",
                        botAdmin: "Only bots when you're an admin",
                        owner: "Only for owner",
                        ownerB: "Free owner"
                    }[type]
                    if(msgnye) return m.reply(msgnye)
                };
                if(switching.antilink) {
                    if(/chat\.whatsapp\.com\/([\w\d]*)\S/g.test(m.body)) {
                        if(m.isGroup) {
                            if(!m.isBotGroupAdmin) {
                                if(m.isGroupAdmin && m.isOwner && m.key.fromMe) { 
                                    if(!m.isCmd) {
                                        await m.reply(`Antilink grup terdeteksi, Maaf! @${m.sender.split("@")[0]} Anda dikeluarkan dalam grup ${m.formattedTitle}`)
                                        await programRojak.groupParticipantsUpdate(m.chat, [m.sender], 'remove').catch((err) => m.reply(jsonformat(err)))
	                                };
	                            } else {
	                                global.dfail('ownerB', m).catch((err) => m.reply(jsonformat(err)))
	                            };
	                        } else {
	                            global.dfail('botAdmin', m).catch((err) => m.reply(jsonformat(err)))
	                        };
	                    };
                    };
                };
                function kyun(s) {
                function pad(s) {
                    return (s < 10 ? '0' : '') + s;
                };
                    var hours = Math.floor(s / (60 * 60));
                    var minutes = Math.floor(s % (60 * 60) / 60);
                    var seconds = Math.floor(s % 60);
                    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
                };
                function rand(text) {
                    return text[Math.floor(Math.random() * text.length)]
                };
                require("../rectify/upsets.js").shellMessage(programRojak, m, store)
            } catch (err) {
                console.log(err)
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