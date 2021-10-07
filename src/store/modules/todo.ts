import { ActionTree, GetterTree, MutationTree } from "vuex";
import { RootState } from "@/store/type";
import { Todo } from "@/store/modules/todo.type";
import { addTodo } from "@/api/todo";

type StateType = {
  list: Array<Todo>;
  grouping: string;
  filter: string;
};

const state = (): StateType => {
  return {
    list: [] as Array<Todo>,
    grouping: "Все",
    filter: "",
  };
};

const searchString = (item: string, substring: string): boolean => {
  return item.includes(substring);
};

const mutations: MutationTree<StateType> = {
  ADD_TODO: (state, item: Todo): void => {
    state.list.push(item);
  },
  REMOVE_TODO: (state, id: string): void => {
    state.list = state.list.filter((item: Todo) => item.id !== id);
  },
  CHECK_TODO: (state, id: string): void => {
    state.list = state.list.map((item) => {
      if (item.id === id) {
        item.isChecked = !item.isChecked;
        return item;
      }
      return item;
    });
  },
  CHANGE_GROUPING: (state, data: string): void => {
    state.grouping = data;
  },
  FILTER: (state, data: string): void => {
    state.filter = data;
  },
};

export const getters: GetterTree<StateType, RootState> = {
  list: (state): Array<Todo> => {
    if (state.grouping === "Выполненные") {
      return state.list.filter(
        (item) =>
          searchString(item.title, state.filter) && item.isChecked === true
      );
    }

    if (state.grouping === "Не выполненные") {
      return state.list.filter(
        (item) =>
          searchString(item.title, state.filter) && item.isChecked === false
      );
    }
    return state.list.filter((item) => searchString(item.title, state.filter));
  },
  grouping: (state): string => state.grouping,
  filter: (state): string => state.filter,
};

const actions: ActionTree<StateType, RootState> = {
  async addTodo({ commit }, data: string) {
    return new Promise<string>((resolve, reject) => {
      addTodo(data)
        .then((response) => {
          commit("ADD_TODO", response.data);
          resolve("Add");
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  },

  async removeTodo({ commit }, id: string) {
    commit("REMOVE_TODO", id);
  },

  async checkTodo({ commit }, id: string) {
    commit("CHECK_TODO", id);
  },

  async changeGrouping({ commit }, data: string) {
    commit("CHANGE_GROUPING", data);
  },

  async filter({ commit }, data: string) {
    commit("FILTER", data);
  },
};

export default {
  namespace: true,
  state,
  mutations,
  getters,
  actions,
};
