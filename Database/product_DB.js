const dbSettings = require('./db_config');
const {mariaDB} = dbSettings;
const db = require('knex');

const INITIAL_PRODUCTS = [
    {
        title:'Intense Cat',
        image:"https://firebasestorage.googleapis.com/v0/b/deco-etcetera.appspot.com/o/cuadro9.jpg?alt=media&token=45ca2bc7-d7d0-48c4-8695-ded7e54896b9",
        price:300

    },
    {
        title:'Cactus',
        image:"https://firebasestorage.googleapis.com/v0/b/deco-etcetera.appspot.com/o/cuadro2.jpg?alt=media&token=05211aa9-1d31-461e-9755-3984def842a9",
        price:400
    },
];

const setInitial = async()=>{
    await db(mariaDB)('products').insert(INITIAL_PRODUCTS)
    db(mariaDB)('users').insert(INITIAL_USERS)
    .then(x=>{
        console.log(x)
    })
    .catch(err=>{
        console.log(err)
    })
}

const INITIAL_USERS = [
    {
        name:'Pablo Escudero',
        email:'escu@gmail.com',
        password:'password1234'
    }
];
const productsDB = async() =>{
    db(mariaDB).schema.createTable('products', table=>{
        table.increments('id'),
        table.string('title'),
        table.integer('price'),
        table.string('image')
    })
    .then(x=>{
        console.log('La tabla products fue creada correctamente ✔');
    })
    .then(x=>setInitial())
    .catch(err=>{console.error(`Products DB message:`)
    console.log(err)})
};

const usersDB = async()=>{
    db(mariaDB).schema.createTable('users', user=>{
        user.increments('id'),
        user.string('name'),
        user.string('email'),
        user.string('password')
    })
    .then(x=>{
        console.log('La tabla users fue creada correctamente ✔');
    })
    .catch(err=>console.error(`DB message: ${err}`))
};

const setDatabase = () =>{
    //Chequeamos que las base de datos no existan, para evitar warnings de knex:
    db(mariaDB).schema.hasTable('products').then(exists =>{
        if(!exists){
            productsDB();
        }else{
            console.log('Products database already exists ✔');
        }
    });
    db(mariaDB).schema.hasTable('users').then(exists=>{
        if(!exists){
            usersDB();
        }else{
            console.log('Users database already exists ✔')
        }
    })
}
module.exports = {setDatabase};