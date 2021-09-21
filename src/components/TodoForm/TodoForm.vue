<template>
  <el-form v-model="form" class="form">
    <el-form-item prop="value">
      <el-input v-model="form.value" />
    </el-form-item>
    <el-form-item>
      <el-button @click="handleCreateTodo">Создать</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "TodoForm",
  setup() {
    const store = useStore();

    const data = reactive({
      form: {
        value: "",
      },
    });

    const handleCreateTodo = (): void => {
      store.dispatch("addTodo", data.form.value);
      data.form.value = "";
    };

    return {
      ...toRefs(data),

      handleCreateTodo,
    };
  },
});
</script>
