const express = require('express');
const app = express();
const {appRouter} = require('./Routes/appRouter.js');
const {manageNewProduct, manageNewMessage, persistentHistory} = require('./helpers/socketFunctions.js');
const {setDatabase} = require('../Database/product_DB.js');
const {setChatDatabase} = require('../Database/chat_DB.js')
const handlebarsEngine = require('./helpers/handlebars');

const PORT = process.env.PORT || 8080;

setDatabase();
setChatDatabase();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use('/api', appRouter);


const http = require('http').Server(app);
const io = require('socket.io')(http);

http.listen(PORT, ()=>{
    console.log(`\n *** Server initializated on port ${PORT} *** \n`)
});
http.on('err', (err)=>{
    console.log(err)
})

io.on('connection', (socket)=>{
    console.log('User connected')
    socket.emit('message', 'mensaje socket')
    persistentHistory(socket)
    socket.on('newProduct',(data)=>{
        manageNewProduct(data, socket)
    })
    socket.on('newMessage', msg=>{
        manageNewMessage(msg, socket, io)
    })
})

//function to export socket.io to other js files.
function getSocketFromApp(){
    return io;
}

//function to modularize handlebars config.
handlebarsEngine(app);

module.exports.importedIo=getSocketFromApp;

