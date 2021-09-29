const chatSocket = io();

let userName = null;
const userNameTag = document.getElementById('userName');
const userContainer = document.getElementById('userContainer');
const inputUser = document.getElementById('inputUser');
const setUserBtn = document.getElementById('setUser');
setUserBtn.onclick=()=>setUserName();

const chatBox = document.getElementById('chatBox');
const sendMessageBtn = document.getElementById('sendMessage');
sendMessageBtn.onclick=()=>sendMessage();

const chatArea = document.getElementById('chatArea');

chatSocket.on('showMessage', msg=>{
    console.log(msg)
    chatArea.innerHTML=`
    <span>${msg.userName} : </span>
    <span>${msg.message}</span>
    `
})

function setUserName(){
    if(inputUser == ""){
        alert('Add text to your user name');
        return
    }else{
        userName=inputUser.value;
        userContainer.style.display='none';
        userNameTag.innerHTML=`Welcome to chat: ${userName}`
    }
}

function sendMessage(){
    if(userName == null){
        sendMessage.onclick= alert('Set your username to send messages')
        return
    }
    else{
        if(chatBox.value == ""){
            alert('No message');
            return
        }
        else{
            const messageInfo = {msg:chatBox.value, user:userName}
            chatSocket.emit('newMessage', messageInfo);
            chatBox.value="";
        }
    }
};




