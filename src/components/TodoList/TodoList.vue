<template>
  <div>
    <el-input
      ref="input"
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
          <span
            class="todo-list__title"
            :class="{ 'todo-list__title--completed': item.isChecked }"
          >
            {{ item.title }}
          </span>
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
      console.table(store.getters.list);
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

    const handleSearchTodo = (filterValue: string) => {
      store.dispatch("filter", filterValue);
    };

    return {
      getTodos,
      handleRemoveTodo,
      handleCheckTodo,
      handleSearchTodo,
      searchValue,
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

  &__title {
    &--completed {
      text-decoration: line-through;
    }
  }
}
</style>
