<template>
  <v-dialog :model-value="isDialog" max-width="500">
    <v-card class="item-list">
      <v-form class="item-list__task">
        <v-toolbar-title style="margin-bottom: 15px; font-weight: 300">{{
          props.isEditTask ? "Редактирование задачи" : "Добавление задачи"
        }}</v-toolbar-title>
        <v-text-field
          v-model="localTitle"
          autofocus
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
import { ref, watch, computed, onMounted } from "vue";
import { isRequired } from "@/helpers/rules";
import type { IProps, IEmits, Task } from "./types";

// const isEditTask = ref(false);

const props = defineProps<IProps>();
const emit = defineEmits<IEmits>();
const isDialog = computed(() => props.modelValue);
const isEditTask = computed(() => props.modelValue);
const localTitle = ref("");
// const isEditTask = computed(() => props.modelValue);
// const isDialog = ref(props.modelValue); //computed
// const taskTitle = ref(props.task ? props.task.title : ""); // это должно поступать из родителя через props

const closeForm = (isClose: boolean) => {
  emit("closeForm", isClose);
};
onMounted(() => console.log(props, "монтируется"));

const saveTask = () => {
  console.log("saveTask", localTitle.value);
  const task = {
    title: localTitle.value,
    complete: false,
    id: props.isEditTask
      ? props.currenTaskId
      : props.tasks.length > 0
      ? props.tasks[props.tasks.length - 1].id + 1
      : 0,
  };
  console.log("saveTask", task);
  emit("saveTask", task);
  emit("update:modelValue", false);
};

// watch(
//   () => props.modelValue,
//   (newVal) => {
//     isDialog.value = newVal;
//     if (!newVal) {
//       taskTitle.value = "";
//     }
//   }
// );
</script>

<style lang="scss" scoped>
.item-list {
  display: flex;
  flex-direction: row;
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
