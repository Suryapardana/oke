"use strict";
require('dotenv').config();
    const { flatDirectly } = require('../../actually/required/get.js');
    const { boom, baileys, fs, chalk } = new flatDirectly();
    const { DisconnectReason } = baileys;
    const { Boom } = boom;
    
    module.exports = {
        async newModule(update, sessions) {
            if(global.qr !== update.qr) {
                global.qr = update.qr
            }
            if(update.connection === 'connecting to barra sange') {
                console.log('menyambung...')
            } else if(update.connection === 'close') {
                if(new Boom(update.lastDisconnect?.error)?.output.statusCode === DisconnectReason.badSession) { 
                    console.log('sesi buruk, menyambung ulang...')
                    sessions('dbase/sessions'); 
                } else if(new Boom(update.lastDisconnect?.error)?.output.statusCode === DisconnectReason.connectionClosed) { 
                    console.log('koneksi tertutup, menyambung ulang...')
                    sessions('dbase/sessions');
                } else if(new Boom(update.lastDisconnect?.error)?.output.statusCode === DisconnectReason.connectionLost) { 
                    console.log('koneksi terputus, menyambung ulang...')
                    sessions('dbase/sessions'); 
                } else if(new Boom(update.lastDisconnect?.error)?.output.statusCode === DisconnectReason.connectionReplaced) { 
                    console.log('koneksi tertimpa, menutup sesi sebelumnya...')
                    sessions('dbase/sessions'); 
                } else if(new Boom(update.lastDisconnect?.error)?.output.statusCode === DisconnectReason.loggedOut) { 
                    console.log('koneksi keluar, menyambung ulang...')
                    sessions('dbase/sessions');  
                } else if(new Boom(update.lastDisconnect?.error)?.output.statusCode === DisconnectReason.resessionsRequired) { 
                    console.log('mulai ulang di butuhkan, mencoba ulang...')
                    sessions('dbase/sessions'); 
                } else if(new Boom(update.lastDisconnect?.error)?.output.statusCode === DisconnectReason.timedOut) {
                    console.log('waktu habis, menyambung ulang...')
                    sessions('dbase/sessions'); 
                } else {
                    console.log('pemutusan terakhir')
                    sessions('dbase/sessions');
                };
            } else if(update.connection === 'open') {
                console.log('tersambung...')
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