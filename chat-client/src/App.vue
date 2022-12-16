<script setup>
import  { io } from 'socket.io-client';
import { onBeforeMount } from 'vue';

const socket = io('http://localhost:30001')// this is how you make connection to socket server;
const messages = ref([]);
onBeforeMount(()=> {
  socket.emit('findAllMessages', {}, (response) => {// he said the second arg is the payload and we don't have one, don't know why??
    messages.value = response;// response is a call back to the server sent response;
  })
})

</script>

<template>

</template>
  <div  class="chat">

  </div>

<style scoped>
@import './assets/base.css';

</style>
