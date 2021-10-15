const dbSettings = require('../Database/db_config.js');
const {sqLite3} = dbSettings;
const db = require('knex')(sqLite3);

const chatDB = async() =>{
    db.schema.createTable('mensajes', table=>{
        table.increments('userId'),
        table.string('message'),
        table.integer('userName'),
        table.string('date')
    })
    .then(x=>{
        console.log('La tabla mensajes fue creada correctamente ✔');
    })
    .then(x=>setInitial())
    .catch(err=>{console.error(`ChatDB message:`)
    console.log(err)})
};

const setChatDatabase = () =>{
    //Chequeamos que las base de datos no existan, para evitar warnings de knex:
    db.schema.hasTable('mensajes').then(exists =>{
        if(!exists){
            productsDB();
        }else{
            console.log('Products table already exists ✔');
        }
    });
}

module.exports = setChatDatabase;