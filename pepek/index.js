"use strict";
require('dotenv').config();
    const { flatDirectly } = require('./actually/required/get.js');
    const { info } = require('./dbase/config/dat.json');
    const { baileys, fs, chalk, figlet, CFonts, yargs, pino } = new flatDirectly();
    const { default: makeWASocket, fetchLatestBaileysVersion, makeInMemoryStore, useMultiFileAuthState, Browsers, areJidsSameUser, jidNormalizedUser, proto, generateWAMessageFromContent } = baileys;

async function sessions(path) {
    try {
        const { version: WAVersion, isLatest } = await fetchLatestBaileysVersion();
        const { state, saveCreds } = await useMultiFileAuthState(path);
            let opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse());
            let store = await makeInMemoryStore({ logger: pino({ level: 'silent' }) });
            let programRojak;
            try {
                programRojak = await makeWASocket({
                    version: WAVersion, 
                    logger: pino({ level: 'silent' }),
                    printQRInTerminal: true,
                    auth: state, 
                    msgRetryCounterMap: {},
                    browser: Browsers.macOS('Firefox'), 
                    getMessage: async key => { 
                        return {
                            conversation: null
                        };
                    },
                });
            } catch {
                programRojak = (opts['legacy'] ? await makeWALegacySocket : await makeWASocket({
                    version: WAVersion, 
                    logger: pino({ level: 'silent' }),
                    printQRInTerminal: true,
                    auth: state, 
                    msgRetryCounterMap: {},
                    browser: Browsers.macOS('Firefox'), 
                    getMessage: async key => { 
                        return {
                            conversation: null
                        };
                    },
                }));
            }
            store?.bind(programRojak.ev);
            programRojak.ev.on('connection.update', async (update) => {
                require('./servers/host/connection.js').newModule(update, sessions);
            });
            programRojak.ev.on('group-participants.update', async (anu) => {
                require('./servers/host/group.js').newModule(programRojak, anu);
            });
            programRojak.ev.on('creds.update', saveCreds)
            programRojak.ev.on('messages.upsert', async (msg) => {
                require('./servers/host/messages.js').newModule(msg, programRojak, store);
            });
        require('./servers/jids/codes.js').depthModule(programRojak, store)
    } catch (err) {
        console.log(err)
    }
}
sessions('dbase/sessions').then(() => {
    console.log(chalk.hex('#FF8800').bold(figlet.textSync(info.owner.name, { 
        font: 'Standard', 
        horizontalLayout: 'default', 
        vertivalLayout: 'default', 
        width: 80, 
        whitespaceBreak: false
    })))
}).catch(() => {
    sessions('dbase/sessions')
})

let LordROJAK = require.resolve(__filename)
    fs.watchFile(LordROJAK, () => {
	    fs.unwatchFile(LordROJAK) 
    	console.log(chalk.bold(chalk.redBright('[FILE]'), chalk.blueBright('Update!'), chalk.yellowBright(__filename)))
    	delete require.cache[LordROJAK]
      	require(LordROJAK)
    })
        process.on("uncaughtException", console.error);
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = process.env.REJECT || process.env.PORT;