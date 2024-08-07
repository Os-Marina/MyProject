<template>
  <v-dialog v-model="isDialog" max-width="500">
    <v-card class="item-list" style="display: flex; flex-direction: row">
      <v-form class="item-list__task">
        <v-toolbar-title style="margin-bottom: 15px; font-weight: 300">{{
          isEditTask ? "Редактирование задачи" : "Добавление задачи"
        }}</v-toolbar-title>
        <v-text-field
          autofocus
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
import { ref, watch } from "vue"
import { isRequired } from "@/helpers/rules"

// import type { Task } from "@/type";
// const isDialog = ref(false);
// const tasks = ref([] as Task[]);
// const currenTaskId = ref(null);

const isEditTask = ref(false)
const taskTitle = ref("")
const props = defineProps({
  modelValue: Boolean,
  task: Object,
  onUpdateModelValue: Function,
})
let id = 0
const isDialog = ref(props.modelValue)
const emit = defineEmits(["closeForm", "saveTask", "update:modelValue"])

const closeForm = () => {
  emit("update:modelValue", false)
}
const saveTask = () => {
  if (taskTitle.value) {
    const task = {
      title: taskTitle.value,
      complete: props.task ? props.task.complete : false,
      id: props.task ? props.task.id : id++,
    }
    console.log("saveTask", task)

    emit("saveTask", task)
    emit("update:modelValue", false)
  }
}

watch(
  () => props.modelValue,
  (newVal) => {
    isDialog.value = newVal
    if (!newVal) {
      taskTitle.value = ""
    }
  }
)
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

  &__text {
    width: 100%;
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
