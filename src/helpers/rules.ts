export const isRequired = (value: unknown): true | string => {
  if (value && !(Array.isArray(value) && value.length === 0)) return true;
  return "Заметка не может быть пустой";
};
