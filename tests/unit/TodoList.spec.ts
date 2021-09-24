import todo from "@/store/modules/todo";
import store from "@/store";
import { mount } from "@vue/test-utils";
import TodoList from "@/components/TodoList/TodoList.vue";

describe("TodoList", () => {
  it("snapshot", () => {
    const wrapper = mount(TodoList, {
      global: {
        mocks: {
          $store: {
            todo,
          },
        },
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("getter", async () => {
    const wrapper = mount(TodoList, {
      global: {
        mocks: {
          $store: {
            state: {
              list: ["Todo 1", "Todo 2", "Todo 3"],
            },
            getters: todo.getters,
          },
        },
      },
    });

    const todoList = wrapper.findAll(".todo-list__item");

    expect(todoList.length).toBe(3);
  });
});
