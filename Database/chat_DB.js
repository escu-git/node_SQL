const dbSettings = require('./config/db_config.js');
const {sqLite3} = dbSettings;
const db = require('knex');

const chatDB = async() =>{
    db(sqLite3).schema.createTable('mensajes', table=>{
        table.increments(),
        table.string('userId'),
        table.string('message'),
        table.string('userName'),
        table.string('date')
    })
    .then(x=>{
        console.log('La tabla mensajes fue creada correctamente ✔');
    })
    .catch(err=>{console.error(`ChatDB message:`)
    console.log(err)})
};

const setChatDatabase = async() =>{
    //Chequeamos que las base de datos no existan, para evitar warnings de knex:
    db(sqLite3).schema.hasTable('mensajes').then(exists =>{
        if(!exists){
            chatDB();
            console.log('Chat table created...')
        }else{
            console.log('Chat table already exists ✔');
        }
    });
}

module.exports = {setChatDatabase};