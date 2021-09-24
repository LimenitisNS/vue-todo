import { mount } from "@vue/test-utils";
import TodoForm from "@/components/TodoForm/TodoForm.vue";
import store from "@/store";

describe("TodoForm", () => {
  it("snapshot", () => {
    const wrapper = mount(TodoForm);
    expect(wrapper.element).toMatchSnapshot();
  });

  it("create todo", async () => {
    const value = "test";

    const wrapper = mount(TodoForm, {
      global: {
        plugins: [store],
      },
    });

    const input = await wrapper.find(".todo-form__input");
    const button = await wrapper.find(".todo-form__button");

    (input.element as HTMLInputElement).value = value;
    input.trigger("input");

    expect((input.element as HTMLInputElement).value).toBe(value);

    await wrapper.vm.$nextTick();

    button.trigger("click");

    await wrapper.vm.$nextTick();

    expect(store.getters["list"].length).toBe(1);
  });
});
