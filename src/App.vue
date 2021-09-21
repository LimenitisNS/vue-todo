<template>
  <todo-form />
  <todo-list />
</template>

<script>
import TodoForm from "@/components/TodoForm/TodoForm";
import TodoList from "@/components/TodoList/TodoList";
export default {
  components: { TodoList, TodoForm },
};
</script>
