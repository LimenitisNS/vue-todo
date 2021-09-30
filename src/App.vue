<template>
  <div class="todo">
    <todo-form />
    <todo-list />
  </div>
</template>

<script>
import TodoForm from "@/components/TodoForm/TodoForm";
import TodoList from "@/components/TodoList/TodoList";
export default {
  components: { TodoList, TodoForm },
};
</script>

<style scoped lang="scss">
.todo {
  max-width: 400px;
  margin: 0 auto;
}
</style>

<style lang="scss">
.el-radio-button {
  flex-grow: 1;

  &__inner {
    width: 100%;
  }
}
</style>
