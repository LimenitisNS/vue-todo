import { createStore } from "vuex";
import todo from "@/store/modules/todo";
import { mount } from "@vue/test-utils";
import TodoForm from "@/components/TodoForm/TodoForm.vue";

const store = createStore({
  modules: {
    todo: todo,
  },
});

describe("TodoList", () => {
  it("getter", () => {
    // const wrapper = mount(TodoForm, {
    //   global: {
    //     plugins: [store],
    //   },
    // });
  });
});
