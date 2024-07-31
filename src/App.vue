<template>
  <v-app>
    <div class="app">
      <v-card-title>TODOS</v-card-title>
      <div class="app__btn">
        <v-btn variant="outlined" @click="setFilterCompleted('all')">All</v-btn>
        <v-btn variant="outlined" @click="setFilterCompleted('active')"
          >Active</v-btn
        >
        <v-btn variant="outlined" @click="setFilterCompleted('done')"
          >Done</v-btn
        >
      </div>
      <div>
        <div class="v-card">
          <v-card-text
            v-for="task in filteredTasks"
            :key="task.id"
            class="v-card__items"
          >
            <div
              class="v-card__text"
              :class="[{ completeTask: task.complete }]"
            >
              {{ task.title }}
            </div>
            <div class="v-card__btns">
              <v-btn
                icon="mdi-check"
                class="v-card__btn-done"
                @click="toggleTask(task.id)"
              >
              </v-btn>
              <v-btn
                icon="mdi-trash-can"
                class="v-card__btn-del"
                @click="removeTask(task.id)"
              >
              </v-btn>
            </div>
          </v-card-text>
        </div>
      </div>
      <v-btn
        v-if="btnVisible"
        icon="mdi-android-messages"
        variant="outlined"
        @click="showDialog"
      />
      <!-- <Transition name="showAddTask"> работает для одного компонента -->
      <div v-if="listVisible" class="item-list">
        <div>
          <v-text-field
            v-model="taskTitle"
            class="item-list__text"
            placeholder="Введите заметку..."
          />
          <div
            v-if="noneTask"
            style="color: red; font-size: 12px; margin-bottom: 5px"
          >
            Заметка не может быть пустой!
          </div>
          <v-btn variant="outlined" @click="addTask" class="item-list__btn"
            >Add task
          </v-btn>
        </div>
        <v-btn
          icon="mdi-close"
          @click="closeDialog"
          class="item-list__btn-close"
        />
      </div>
      <!-- </Transition> -->
    </div>
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import type { Task } from "@/type";

let id = 0;
const tasks = ref([] as Task[]);
const taskTitle = ref("");
const listVisible = ref(false);
const noneTask = ref(false);
const btnVisible = ref(true);
const filterType = ref<"all" | "active" | "done">("all");

function addTask() {
  if (taskTitle.value !== "") {
    tasks.value.push({ title: taskTitle.value, complete: false, id: id++ });
    taskTitle.value = "";

    noneTask.value = false;
  } else return (noneTask.value = true);
  // console.log(tasks.value);
}

const showDialog = () => {
  btnVisible.value = false;
  listVisible.value = true;
};
const closeDialog = () => {
  listVisible.value = false;
  noneTask.value = false;
  btnVisible.value = true;
  taskTitle.value = "";
};
const toggleTask = (taskId: number) => {
  const task = tasks.value.find((task) => task.id === taskId);
  if (task) {
    task.complete = !task.complete;
  }
  // console.log(typeof taskId);
};
const removeTask = (taskId: number) => {
  tasks.value = tasks.value.filter((task) => task.id !== taskId);
  // console.log("Del:", tasks.value);
};
// const setFilterCompleted = () => {
//   tasks.value.forEach((el) => {
//     if (el.complete == true) {
//       return tasks.value.filter((task) => task.complete == true);
//     }
//   });
// };
// const filteredTasks = computed(() => {
//   if (filter.value == "completeTask") {
//     return tasks.value.filter((task) => !task.complete);
//   } else {
//     return taskTitle.value;
//   }
// });
// const setFilterCompleted = () => {
//   showCompleted.value = true;
// };
const setFilterCompleted = (type: "all" | "active" | "done") => {
  filterType.value = type;
};
// const filteredTasks = computed(() => {
//   if (showCompleted.value) {
//     return tasks.value.filter((task) => task.complete);
//   }
//   return tasks.value;
// });
const filteredTasks = computed(() => {
  if (filterType.value == "done") {
    return tasks.value.filter((task) => task.complete);
  } else if (filterType.value == "active") {
    return tasks.value.filter((task) => !task.complete);
  } else return tasks.value;
});
</script>

<style lang="scss" scoped>
.v-card-text {
  padding: 5px;
}
// .v-text-field > .v-input__details {
//   display: none !important;
// }
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

.v-card {
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
  &__btn-done {
    width: 30px;
    height: 30px;
    color: green;
    opacity: 0.3;
    &:hover {
      opacity: 1;
    }
  }
  &__btn-del {
    width: 30px;
    height: 30px;
    color: red;
    opacity: 0.3;
    &:hover {
      opacity: 1;
    }
  }
}
.item-list {
  // width: 400px;
  border: 1px solid;
  border-radius: 15px;
  padding: 15px;
  display: flex;
  gap: 10px;
  box-shadow: 1px 1px 10px rgba(127, 17, 161, 0.555);

  &__text {
    width: 300px;
  }
  &__btn {
    width: 100%;
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
