<template>
  <div>
    <div class="card">
      <v-card-text
        v-for="task in filteredTasks"
        :key="task.id"
        class="card__items"
      >
        <div class="card__text" :class="[{ completeTask: task.complete }]">
          {{ task }}
        </div>
        <div class="card__btns">
          <v-btn
            icon="mdi-pencil-outline"
            @click="editTask(task)"
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
</template>

<script setup lang="ts">
import { computed } from "vue";
// import type { IProps, IEmits } from "./types";
import type { IProps, IEmits, Task } from "./types";

const props = defineProps<IProps>();
const emit = defineEmits<IEmits>();
// const isEditTask = ref(props.modelValue);
// const isDialog = ref(props.modelValue);
// const currenTaskId = ref("");
// const taskTitle = ref("");

const filteredTasks = computed(() => {
  if (props.filterType === "all") {
    return props.tasks;
  }
  if (props.filterType === "active") {
    return props.tasks.filter((task) => !task.complete);
  }
  if (props.filterType === "done") {
    return props.tasks.filter((task) => task.complete);
  }
  return props.tasks;
});

const editTask = (task: Task) => {
  emit("editTask", task);
};

const toggleTask = (taskId: number) => {
  emit("toggleTask", taskId);
};

const removeTask = (taskId: number) => {
  emit("removeTask", taskId);
};
</script>

<style lang="scss" scoped>
.completeTask {
  text-decoration: line-through;
}
.card {
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-top: 1px solid;
  padding: 10px;

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
    opacity: 0;
  }
}
</style>
