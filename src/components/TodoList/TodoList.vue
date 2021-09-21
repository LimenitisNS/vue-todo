<template>
  <ul>
    <li v-for="(item, key) in getTodos" :key="key">
      {{ item }}
    </li>
  </ul>
</template>

<script>
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "TodoList",
  setup() {
    const store = useStore();

    const getTodos = computed(() => {
      return store.getters.list;
    });

    return {
      getTodos,
    };
  },
});
</script>
