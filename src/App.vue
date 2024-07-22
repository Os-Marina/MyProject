<template>
  <v-app>
    <div class="app">
      <v-card-title>TODOS</v-card-title>
      <div class="btn">
        <v-btn variant="outlined">All</v-btn>
        <v-btn variant="outlined">Active</v-btn>
        <v-btn variant="outlined">Done</v-btn>
      </div>
      <div :style="{color: count % 2 === 0 ? 'red' : ' green'}">{{ count }}</div>
      <div>
        <v-btn
          variant="outlined"
          @click="addCount"
        >+
        </v-btn>
      </div>
    </div>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue';


let count = ref(0)
function addCount(){
  count.value += 1
  console.log(count.value);
}
// import { ref } from 'vue';
// const taskTitle = ref('')
// type Task = {title: string, complete: boolean, id: number}
// const tasks = ref([] as Task[])

</script>

<style lang="scss" scoped >

.app{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  color: rgb(128, 17, 161);
}
.btn{
  display: flex;
  flex-direction: row;
  gap: 30px;
}
</style>
