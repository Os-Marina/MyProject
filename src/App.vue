<template>
  <v-app>
    <div class="app">
      <v-card-title>TODOS</v-card-title>
      <div class="app__btn">
        <v-btn variant="outlined">All</v-btn>
        <v-btn variant="outlined">Active</v-btn>
        <v-btn variant="outlined">Done</v-btn>
      </div>
      <!-- <div :style="{color: count % 2 === 0 ? 'red' : ' green'}">{{ count }}</div> -->
      <div>
        <div class="v-card">
          <v-card-text
            v-for="task in tasks" 
            :key="task.id"
            class="v-card__items">
            <slot :task />
            {{ task.title }}
            <v-btn
              icon="mdi-trash-can-outline"
              class="v-card__btn"
            >
            </v-btn>
          </v-card-text>
        </div>
      </div>


      <div class="item-list">
        <v-text-field v-model="taskTitle" class="item-list__text" placeholder="Введите заметку..."></v-text-field>
        <v-btn
          variant="outlined"
          @click="addCount"
          class="item-list__btn"
        >+
        </v-btn>
      </div>
    </div>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Task } from '@/type'

let id = 0
const taskTitle = ref('')
const tasks = ref([] as Task [])

function addCount(){
  tasks.value.push({title: taskTitle.value, id: id++})
  taskTitle.value = ''
  // console.log(count.value);
}

</script>

<style lang="scss" scoped >

.app{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  color: rgb(128, 17, 161);

  &__btn{
    display: flex;
    flex-direction: row;
    gap: 30px;
    
  }
}

.v-card{
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  &__list{
    display: flex;
    flex-direction: row;
  }
  &__items{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    color: rgb(128, 17, 161);
  }
  &__btn{
    width: 30px;
    height: 30px;
    color: red;
  }
}
.item-list{
  width: 400px;
  display: flex;
  gap: 30px;
  &__text{
    width: 300px;
  }
}

</style>
