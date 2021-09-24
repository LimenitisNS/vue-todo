<template>
  <ul class="todo-list">
    <li v-for="(item, key) in getTodos" :key="key" class="todo-list__item">
      <el-button
        class="todo-list__remove-button"
        @click="handleRemoveTodo(item.id)"
      >
        Удалить
      </el-button>
      <span>{{ item.title }}</span>
    </li>
  </ul>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "TodoList",
  setup() {
    const store = useStore();

    const getTodos = computed(() => {
      return store.getters.list;
    });

    const handleRemoveTodo = (id: string) => {
      store.dispatch("removeTodo", id);
    };

    return {
      getTodos,
      handleRemoveTodo,
    };
  },
});
</script>

<style scoped lang="scss">
.todo-list {
  list-style-type: none;
  padding: 0;

  &__item {
    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }
}
</style>
