
const dbSettings = {
    mariaDB:{
        client: 'mysql',
        connection:{
            host:'127.0.0.1',
            port:3306,
            user:'root',
            password:'',
            database:'nodejs_mariadb_sqlite3'
        }
    },
    sqLite3:{
        client: 'sqlite3',
        connection: {
            filename: './Database/chat_DB.sqlite'
        },
        useNullAsDefault: true
    }
};


module.exports=dbSettings;