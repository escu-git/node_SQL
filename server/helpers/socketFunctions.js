const product = require('../helpers/newProduct');
const {productos} = require('./appRouter');

//Function to manage new products from form.
function manageNewProduct(data){
    const{title, price, thumbnail}=data;
    newProd = new product(title, price, thumbnail);
    productos.length < 1 ? newProd.productId(0) : newProd.productId(productos.length)
    productos.push(newProd)
    socket.emit('sentProduct', {newProd, productos});
}

//Function to manage new message coming from online chat.
function manageNewMessage(msg, socket){
    const messageData ={
        userId:socket.id,
        message:msg.msg,
        userName:msg.user 
    }
    socket.broadcast.emit('showMessage',messageData)

}

module.exports={manageNewProduct, manageNewMessage}