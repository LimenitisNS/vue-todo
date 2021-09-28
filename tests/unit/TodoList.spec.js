import todo from "@/store/modules/todo.ts";
import { mount } from "@vue/test-utils";
import TodoList from "@/components/TodoList/TodoList.vue";
import { createStore } from "vuex";

let store;

beforeEach(() => {
  store = createStore(todo);
});

describe("TodoList", () => {
  it("snapshot", () => {
    const wrapper = mount(TodoList, {
      global: {
        plugins: [store],
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("getter", async () => {
    const wrapper = mount(TodoList, {
      global: {
        plugins: [store],
      },
    });

    await store.dispatch("addTodo", "Option 1");
    await store.dispatch("addTodo", "Option 2");

    const todoList = wrapper.findAll(".todo-list__item");

    expect(todoList.length).toBe(2);
  });

  it("remove item", async () => {
    const wrapper = mount(TodoList, {
      global: {
        plugins: [store],
      },
    });

    console.log(store.state);

    await store.dispatch("addTodo", "Option 1");
    await store.dispatch("addTodo", "Option 2");

    const todoList = wrapper.findAll(".todo-list__item");

    expect(todoList.length).toBe(2);

    let removeButton = wrapper.findAll(".todo-list__remove-button");

    expect(removeButton.length).toBe(2);

    await removeButton[0].trigger("click");

    await wrapper.vm.$nextTick();
    removeButton = wrapper.findAll(".todo-list__remove-button");

    expect(removeButton.length).toBe(1);
  });

  it("check item", async () => {
    const wrapper = mount(TodoList, {
      global: {
        plugins: [store],
      },
    });

    await store.dispatch("addTodo", "Option 1");
    await store.dispatch("addTodo", "Option 2");

    expect(store.getters.list[0].isChecked).toBeFalsy();

    let checkbox = wrapper.findAll(".todo-list__checkbox");

    await checkbox[0].trigger("change");

    expect(store.getters.list[0].isChecked).toBeTruthy();

    await checkbox[0].trigger("change");

    expect(store.getters.list[0].isChecked).toBeFalsy();
  });
});
