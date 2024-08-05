<template>
  <v-app>
    <div class="app">
      <v-card-title>TODOS</v-card-title>
      <div class="app__btn">
        <v-btn variant="outlined" @click="setFilterCompleted">All</v-btn>
        <v-btn variant="outlined" @click="setFilterCompleted('active')"
          >Active</v-btn
        >
        <v-btn variant="outlined" @click="setFilterCompleted('done')"
          >Done</v-btn
        >
      </div>
      <div>
        <div class="card">
          <v-card-text
            v-for="task in filteredTasks"
            :key="task.id"
            class="card__items"
          >
            <div class="card__text" :class="[{ completeTask: task.complete }]">
              {{ task.title }}
            </div>
            <div class="card__btns">
              <v-btn
                icon="mdi-pencil-outline"
                @click="isDialog = true"
                class="card__btn"
                style="color: blue"
              >
              </v-btn>
              <v-btn
                icon="mdi-check"
                class="card__btn"
                style="color: green"
                @click="toggleTask(task.id)"
              >
              </v-btn>
              <v-btn
                icon="mdi-trash-can"
                class="card__btn"
                style="color: red"
                @click="removeTask(task.id)"
              >
              </v-btn>
            </div>
          </v-card-text>
        </div>
      </div>
      <v-btn
        @click="isDialog = true"
        icon="mdi-android-messages"
        variant="outlined"
      />
      <v-dialog v-model="isDialog" max-width="500">
        <v-card class="item-list" style="display: flex; flex-direction: row">
          <v-form class="item-list__task">
            <v-text-field
              v-model="taskTitle"
              class="item-list__text"
              :rules="[isRequired]"
              label="Введите заметку..."
            />

            <v-btn variant="outlined" @click="addTask" class="item-list__btn"
              >Сохранить заметку
            </v-btn>
          </v-form>
          <v-btn
            icon="mdi-close"
            @click="isDialog = false"
            class="item-list__btn-close"
          />
        </v-card>
      </v-dialog>
    </div>
  </v-app>
</template>

<script setup lang="ts">
import { isRequired } from "./helpers/rules";
import { ref, computed } from "vue";
import type { Task } from "@/type";

const isDialog = ref(false);
const tasks = ref([] as Task[]);
const taskTitle = ref("");
const filterType = ref<"all" | "active" | "done">("all");
let id = 0;

function addTask() {
  if (taskTitle.value) {
    tasks.value.unshift({
      title: taskTitle.value,
      complete: false,
      id: id++,
    });
    taskTitle.value = "";
    isDialog.value = false;
  }
}

function toggleTask(taskId: number) {
  const task = tasks.value.find((task) => task.id === taskId);
  if (task) {
    task.complete = !task.complete;
  }
}

function removeTask(taskId: number) {
  tasks.value = tasks.value.filter((task) => task.id !== taskId);
}
function editTask(taskId: number) {
  console.log("Реактирование прошло успешно");
}

function setFilterCompleted(type: "active" | "done") {
  filterType.value = type;
}

const filteredTasks = computed(() => {
  if (filterType.value == "done") {
    return tasks.value.filter((task) => task.complete);
  } else if (filterType.value == "active") {
    return tasks.value.filter((task) => !task.complete);
  } else return tasks.value;
});
</script>

<style lang="scss" scoped>
.completeTask {
  text-decoration: line-through;
}

.app {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  color: rgb(128, 17, 161);

  &__btn {
    display: flex;
    flex-direction: row;
    gap: 30px;
  }
}

.card {
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &__list {
    display: flex;
    flex-direction: row;
  }
  &__items {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    color: rgb(128, 17, 161);
    &:hover {
      .card__btn {
        opacity: 1;
      }
    }
  }
  &__text {
    word-wrap: break-word;
    width: 300px;
    font-size: 16px;
  }
  &__btns {
    display: flex;
    gap: 10px;
  }
  &__btn {
    width: 30px;
    height: 30px;
    opacity: 0.1;
  }
}
.v-card-text {
  padding: 5px;
}

.item-list {
  width: 100%;
  border: 1px solid;
  border-radius: 15px;
  padding: 15px;
  gap: 20px;
  color: rgba(127, 17, 161);
  box-shadow: 1px 1px 10px rgba(127, 17, 161, 0.555);

  &__task {
    flex-grow: 1;
  }

  &__btn {
    width: 100%;
    margin-top: 10px;
  }
  &__btn-close {
    color: rgba(127, 17, 161);
    width: 20px;
    height: 20px;
    border: 1px solid;
    &:deep(.v-icon) {
      font-size: 16px;
    }
  }
}
.showAddTask-enter-active,
.showAddTask-leave-active {
  transition: opacity 3s ease;
}
.showAddTask-enter-from,
.showAddTask-leave-to {
  transition: opacity 0;
  transform: translateX(30px);
}
</style>
