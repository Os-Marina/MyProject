<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card class="item-list" style="display: flex; flex-direction: row">
      <v-form class="item-list__task">
        <v-toolbar-title style="margin-bottom: 15px; font-weight: 300">{{
          isEditTask ? "Редактирование задачи" : "Добавление задачи"
        }}</v-toolbar-title>
        <v-text-field
          v-model="taskTitle"
          class="item-list__text"
          :rules="[isRequired]"
          label="Введите заметку..."
        />
        <v-btn variant="outlined" @click="saveTask" class="item-list__btn"
          >Сохранить заметку
        </v-btn>
      </v-form>
      <v-btn icon="mdi-close" @click="closeForm" class="item-list__btn-close" />
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { isRequired } from "@/helpers/rules";
import type { IProps, Task } from "@/type";
const props = defineProps<IProps>();
const emits = defineEmits(["update:modelValue", "save-task", "close-form"]);

const dialog = ref(props.modelValue);
const isDialog = ref(false);
const isEditTask = ref(false);
const taskTitle = ref("");
const currenTaskId = ref(null);
const tasks = ref([] as Task[]);
let id = 0;

function addTask() {
  if (taskTitle.value) {
    tasks.value.unshift(task);
    taskTitle.value = "";
    isDialog.value = false;
  }
}
watch(
  () => props.modelValue,
  (newValue) => {
    dialog.value = newValue;
  }
);

watch(dialog, (newValue) => {
  emits("update:modelValue", newValue);
});

function saveTask() {
  if (isEditTask.value && currenTaskId.value !== null) {
    const task = tasks.value.find((t) => t.id === currenTaskId.value);
    if (task) {
      task.title = taskTitle.value;
    }
  } else addTask();
}
function closeForm() {
  emits("close-form");
  isDialog.value = false;
  isEditTask.value = false;
  taskTitle.value = "";
  currenTaskId.value = null;
}
</script>

<style lang="scss" scoped>
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
</style>
