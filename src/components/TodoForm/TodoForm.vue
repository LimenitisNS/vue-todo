<template>
  <el-form v-model="form" class="todo-form">
    <div class="todo-form__input-group">
      <el-form-item prop="value" class="todo-form__item">
        <el-input ref="input" v-model="form.value" class="todo-form__input" />
      </el-form-item>
      <el-form-item>
        <el-button class="todo-form__button" @click="handleCreateTodo">
          Создать
        </el-button>
      </el-form-item>
    </div>
    <el-form-item prop="group">
      <el-radio-group v-model="form.group" @change="handleChangeGrouping">
        <el-radio-button label="Все"></el-radio-button>
        <el-radio-button label="Выполненные"></el-radio-button>
        <el-radio-button label="Не выполненные"></el-radio-button>
      </el-radio-group>
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
        group: "Все",
      },
    });

    const handleCreateTodo = (): void => {
      store.dispatch("addTodo", data.form.value);
      data.form.value = "";
    };

    const handleChangeGrouping = (): void => {
      store.dispatch("changeGrouping", data.form.group).then(() => {
        data.form.group = store.getters.grouping;
      });
    };

    return {
      ...toRefs(data),

      handleCreateTodo,
      handleChangeGrouping,
    };
  },
});
</script>

<style scoped lang="scss">
.todo-form {
  &__input-group {
    display: flex;
    justify-content: space-between;
  }

  &__item {
    flex-grow: 1;
  }

  &__button {
    margin-left: 10px;
  }
}
</style>
