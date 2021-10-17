const fs = require('fs');
const {Product} = require('./classes');
const productDB = require('../Controllers/db.js');
//Function to manage new products from form.
const table = 'mensajes';
let messageHistory=[];

async function manageNewProduct(data, socket){
    const{title, price, thumbnail}=data;
    await productDB.insert('products', data);
    const allProducts = await productDB.readAll('products', "*")
    socket.emit('sentProduct', allProducts);
}

//Function to manage new message coming from online chat.
async function manageNewMessage(msg, socket, io){
    const date = new Date().toLocaleDateString('en-GB');
    const messageData ={
        userId:socket.id,
        message:msg.msg,
        userName:msg.user,
        date:date.toString(),
    }
    await productDB.insert(table, messageData)
    messageHistory = await productDB.readAll(table, "*");
    io.sockets.emit('showMessage', messageHistory)
}

async function persistentHistory(socket){
    try{
        let chat = await productDB.readAll(table, "*")
        messageHistory = chat;
        socket.emit('showMessage', messageHistory)
    }catch(err){
        console.log(err)
    }
}

module.exports={manageNewProduct, manageNewMessage, persistentHistory}