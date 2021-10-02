const chatSocket = io();
let userName = null;
const userNameTag = document.getElementById('userName');
const userContainer = document.getElementById('userContainer');
const inputUser = document.getElementById('inputUser');
const setUserBtn = document.getElementById('setUser');
const chatBox = document.getElementById('chatBox');
const sendMessageBtn = document.getElementById('sendMessage');
const chatArea = document.getElementById('chatArea');
inputUser.onkeydown=(event)=>pressEnterToSend(event, setUserName);
setUserBtn.onclick=()=>setUserName();
chatBox.onkeydown=(event)=>pressEnterToSend(event , sendMessage)
sendMessageBtn.onclick=()=>sendMessage();

chatSocket.on('showMessage', data=>{
    const chat = data.map((x)=>{
    let side = x.userId == chatSocket.id ? 'myMsg' : 'otherMsg';
   return( `
    <div class='messageBox ${side}'>
        <div class='messageInfo'>
            <span class='date'>${x.date}</span>
            <span class='userTag'>${x.userName}:</span>
        </div>
        <div class='messageText'>
            <span>${x.message}</span>
        </div>
    </div>
    `)}
    ).join(' ')

    chatArea.innerHTML=chat;
    chatArea.scrollTop = chatArea.scrollHeight;
})

function setUserName(){
    if(inputUser == ""){
        alert('Add text to your user name');
        return
    }else{
        userNameTag.classList.add('userName')
        userName=inputUser.value;
        userContainer.style.cssText='transition:1.5s; height:0px'
        setTimeout(()=>{
            userNameTag.innerHTML=`Welcome to chat: ${userName}`
            userContainer.remove(inputUser, setUserBtn)
        },1500)
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

function pressEnterToSend(event, fn){
    if(event.keyCode == 13){
        fn()
    }else{
        return
    }
}





