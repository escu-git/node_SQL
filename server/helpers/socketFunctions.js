const fs = require('fs');
const {product, file} = require('./classes');
const {productos} = require('./appRouter');
//Function to manage new products from form.
const chatFile = 'index.txt'
const messageHistory=[];
persistentHistory()
function manageNewProduct(data, socket){
    const{title, price, thumbnail}=data;
    newProd = new product(title, price, thumbnail);
    productos.length < 1 ? newProd.productId(0) : newProd.productId(productos.length)
    productos.push(newProd)
    socket.emit('sentProduct', {newProd, productos});
}

//Function to manage new message coming from online chat.
function manageNewMessage(msg, socket, io){
    const date = new Date().toLocaleDateString('en-GB');
    const messageData ={
        userId:socket.id,
        message:msg.msg,
        userName:msg.user,
        date:date.toString(),
    }
    messageHistory.push(messageData);
    let persistentFile =new file(chatFile);
    persistentFile.writeFile(messageHistory)

    io.sockets.emit('showMessage', messageHistory)
}

function persistentHistory(){
    let checkFile = new file(chatFile);
    let checkedFile = checkFile.readFile();
    console.log(checkedFile)
    if(checkedFile){
        messageHistory=checkedFile;
        console.log(messageHistory)
    }else{
        return
    }
}
function checkChatHistory(io){
    io.emit('showMessage', messageHistory)
}


module.exports={manageNewProduct, manageNewMessage, checkChatHistory}