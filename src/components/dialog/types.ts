export interface Task {
  title: string;
  complete: boolean;
  id: number;
}

export interface IProps {
  modelValue: boolean;
  tasks: Task[];
  isEditTask: boolean;
  currenTaskId: number;
}

export interface IEmits {
  (e: "saveTask", tasks: Task[]): void;
  (e: "closeForm", value: boolean): void;
  (e: "update:modelValue", value: boolean): void;
}
