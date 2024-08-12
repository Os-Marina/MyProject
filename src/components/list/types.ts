export interface Task {
  title: string;
  complete: boolean;
  id: number;
}

export interface IProps {
  modelValue: boolean;
  tasks: Task[];
  task: Task;
  filterType: string;
}

export interface IEmits {
  (e: "editTask", data: Task): void;
  (e: "toggleTask", value: number): void;
  (e: "removeTask", value: number): void;
  //   (e: "update:modelValue", value: boolean): void;
}
