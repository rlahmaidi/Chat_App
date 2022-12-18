<script setup>
import  { io } from 'socket.io-client';
import { onBeforeMount, ref } from 'vue';

const socket = io('http://localhost:3001')// this is how you make connection to socket server;

const messages = ref([]);
const messageText = ref('');
const joined  = ref(false);// withier a client joined a room or noot;
const name = ref('');
const typingDisplay = ref('');

onBeforeMount(()=> {
  socket.emit('findAllMessages', {}, (response) => {// he said the second arg is the payload and we
    // don't have one, don't know why??
    messages.value = response;// response is a call back to the server sent response;
  });
  socket.on('message', (message) =>{// to recieve new messages from the server
    messages.value.push(message);// we just push the message to an array, should be a db later;
   // console.log(message);
  });

  socket.on('typing', ({ name, isTyping }) => {
    if (isTyping){
      //typingDisplay.value = '${name} is typing...'; 
      typingDisplay.value = name +' is typing...'; 
    } else {
      typingDisplay.value = '';
    }
  })



});

  const join = () => {
    socket.emit('join', {  name: name.value }, (/*names*/) =>{// our server returns the names of 
      //those who joined so we can do (names)=> ...
      joined.value = true;
    })
  }

const sendMessage = () =>{// to send a message from the client to the server.
  socket.emit('createMessage', {text: messageText.value}, () => {
    //message.value.push(response); we don't need this since the message sent from here 
    // will be emmited by the server to all client including the sender
    // and our function above that recieve server messages will push it to measseges;
    messageText.value = '';
  })
}

let timeout;
const emitTyping = () => {
  socket.emit('typing', {isTyping: true });
  timeout = setTimeout(() => {
    socket.emit('typing', { isTyping: false });
  }, 2000);
}

</script>

<template>
  <div class="chat">
    <div v-if="!joined"> 
      <form  @submit.prevent="join">   <!--to preve -->
        <label>What's your name?</label>
          <input v-model="name" />    <!-- i don't understand this line very well so far-->
            <button type="submit"> Send</button>
      </form>
    </div>
    <div class="chat-container">
      <div  class="messages-container">
        <div  v-for="message in messages">
          [{{ message.name }}]: {{ message.text}}
        </div>
      </div>

      <div v-if="typingDisplay">{{ typingDisplay }}</div><!-- this line will display typinDisplay if it has a value-->

      <hr />

      <div class="message-input">
      <form @submit.prevent="sendMessage">
        <label>Message:</label>
        <input v-model="messageText" @input="emitTyping" />

        <button type="submit">Send</button>
      </form>
      </div>
    </div>
  </div>
</template>
  <!-- <div  class="chat">

  </div> -->

<style >
@import './assets/base.css';

.chat {
  padding: 20px;
  height: 100vh;
}

.chat-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.messages-container {
  flex: 1;
}

</style>
