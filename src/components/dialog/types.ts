export interface Task {
  title: string;
  complete: boolean;
  id: number;
}

export interface IProps {
  modelValue: boolean;
  task: Task;
}

export interface IEmits {
  (e: "saveTask", data: Task): void;
  (e: "closeForm", value: boolean): void;
  (e: "update:modelValue", value: boolean): void;
}
