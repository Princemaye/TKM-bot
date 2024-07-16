const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieVAzM1VyNDRMaU1UWVUwRldFOGJNdHhkaHhQUmhXcnFvdFZjNEFFdDkyQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaFQySGNkejh0NlFjeStsR3EzY204a0pVMFZhbC9JWGFybjk3Z0phejRtQT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJhUHFnUnlHeVdidjBqK05KZFh4SDdpajlDL3VuWXkrQlBQNS94ZW1UNkdBPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJEZkhXTldjQWdHNkZ6eTN0M2NMSStpVXV0em1JT1VqeU1hZDU2RU96eDFvPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImdLNHhveDZFZ3JYN2lyN0ZtNVZGOE51VW1ZT3pZVkhrcEUvM0tqVFFvMzA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik5JWjhCcjZBMTVXdS83RTFqeFYwb3J1Y2J3dC9URHlsSE94cXQ3UmZRR1E9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia0Yxcyt1TEVmNnZtbUhZRUhOdzZFNlJZcVc2L2pHTWdZZ2V5cFpDdW1GOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia3phMnEvblpIem5kOThxejhWb3NlVk9QbWNqcVZqOUVnTWZrWm1KMllWUT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im5TWHVML0IrV25CU2h6YXBhWlVSbGQ5R0lMRmlqclE5a05MQmJDaGtCOVIza2pIYXplNTlYVzI5OG0vS2NzSFJpd2srb0I0ZW1BVXpqZSt3K2ovM2hBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjU0LCJhZHZTZWNyZXRLZXkiOiIyZXR3WUFrRGJTSzdRTEUzQnhYNE5lUlBvaVBOdWpoSVljUlZzQTMySEw0PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJ2SWxkaGtHWFR0eUxZbno0X2tTcjZRIiwicGhvbmVJZCI6IjIwZWZmZmI5LTNkZGYtNDQxMS04MTQ5LWRjMDViYTZlNDIyYSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCeHlkaHBPUjhrOGJBMm55d0Fua0dKbFMrMVE9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRHVvYlRVUFUyVG10UU5aT1Y3MDlCRGt1TFZvPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkRFR1dHMzVTIiwibWUiOnsiaWQiOiIyMzc2ODI2OTg1MTc6NTRAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ09mUXIrTUZFSkhzMTdRR0dCMGdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImpWUktiUFdxS1l2UVh3SmlMZnUvaFI0cHVTbWFCUUplaC82NkRyd1o3bWs9IiwiYWNjb3VudFNpZ25hdHVyZSI6Ik5xZ2pnQUc1ZXJkN1hObmoxcGJzYmVuYytCWW5HdGx6TTk0cjRSdXNYb3pFVkF5eXl2MFZmZTg0Zi9JcWFzUzhBQm9LdWgxMEs5bE9YYklUNTJsU0JnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJmTGs4UDQ5WHdLTGxSMDcvUER4SjBZZDkvVUJsOG04L1pCUHRxMWlZeTlyTmdXejl1ZDV1VmJKWHlJbFdXNDRjQkw4MUVJUHRCUmRBdEdBdDJ3WkRpdz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNzY4MjY5ODUxNzo1NEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJZMVVTbXoxcWltTDBGOENZaTM3djRVZUtia3BtZ1VDWG9mK3VnNjhHZTVwIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIxMTAzOTAyLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQU5NTCJ9',
    PREFIXE: process.env.PREFIX || ",",
    OWNER_NAME: process.env.OWNER_NAME || "PRINCE",
    NUMERO_OWNER : process.env.OWNER_NUM || "237682698517",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'FARADAY',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e07a3d933fb4cad0b3791.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TZ : process.env.TIME_ZONE || 'Etc/GMT',
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    BOOM_MESSAGE_LIMIT : process.env.BOOM_MESSAGE_LIMIT || 100,
    PORT : process.env.PORT || 8000,
    LINK : process.env.LINK || '',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
