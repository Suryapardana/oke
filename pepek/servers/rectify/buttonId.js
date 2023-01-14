"use strict";
require('dotenv').config();
    const { flatDirectly, extractDocs } = require('../../actually/required/get.js');
    const { api, info, switching, costumeText } = require('../../dbase/config/dat.json');
    const { jsonformat, isUrl, getBuffer, fetchJson } = require('../../actually/replacement/serials.js');
    const { yta, ytv } = require('../../actually/tools/y2mate.js');
    const { moment, node_fetch, yts, hxz, baileys, fs, chalk, child_process, util } = new flatDirectly();
    const { jidNormalizedUser, generateWAMessageFromContent, proto, generateWAMessageContent, delay } = baileys;
    const { exec } = child_process;
    
    module.exports = {
        async responseMessage(programRojak, m, store) {
            try {
                switch (m.command) {
                    case m.prefix+'test_1': {
                        m.reply("work as command with button 1")
                    };
                    break;
                    case m.prefix+'test_2': {
                        m.reply("work as command with button 2")
                    };
                    break;
                    case m.prefix+'test_3': {
                        m.reply("work as command with button 3")
                    };
                    break;
                    case m.prefix+'konfirmasi_laporan': {
                        if((m.args[0]) === 'laporkan') {
                            let err = eval(m);
                            programRojak.sendMessage("6281361057300@s.whatsapp.net", { text: jsonformat(err) }, { quoted: m }).then(() => {
                                m.reply("Laporan catatan log error, Sukses di kirim ke developer pusat.")
                            })
                        } else if((m.args[0]) === 'abaikan') {
                            m.reply("Log berhasil diabaikan")
                        } else {
                            m.reply("Please click button");
                        };
                    };
                    break;
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