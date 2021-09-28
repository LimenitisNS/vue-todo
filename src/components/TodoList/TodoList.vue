<template>
  <div>
    <el-input
      :model-value="searchValue"
      suffix-icon="el-icon-search"
      placeholder="Поиск"
      @input="handleSearchTodo"
    />
    <ul class="todo-list">
      <li v-for="(item, key) in getTodos" :key="key" class="todo-list__item">
        <el-checkbox
          :model-value="item.isChecked"
          @change="handleCheckTodo(item.id)"
          class="todo-list__checkbox"
        >
          <span>{{ item.title }}</span>
        </el-checkbox>
        <el-button
          class="todo-list__remove-button"
          @click="handleRemoveTodo(item.id)"
        >
          Удалить
        </el-button>
      </li>
    </ul>
  </div>
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

    const searchValue = computed(() => {
      return store.getters.filter;
    });

    const handleRemoveTodo = (id: string) => {
      store.dispatch("removeTodo", id);
    };

    const handleCheckTodo = (id: string) => {
      store.dispatch("checkTodo", id);
    };

    const handleSearchTodo = (event: InputEvent) => {
      console.log(123, event);
      const target = event.target as HTMLInputElement;
      if (target) {
        store.dispatch("filter", target.value);
      }
    };

    return {
      getTodos,
      handleRemoveTodo,
      handleCheckTodo,
      handleSearchTodo,
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
