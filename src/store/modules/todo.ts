import { ActionTree, GetterTree, MutationTree } from "vuex";
import { RootState } from "@/store/type";
import { Todo } from "@/store/modules/todo.type";

type StateType = {
  list: Array<Todo>;
};

const state: StateType = {
  list: [],
};

const mutations: MutationTree<StateType> = {
  ADD_TODO: (state, item: string): void => {
    state.list.push({
      id: Math.random().toString(36).substr(2),
      title: item,
    });
  },
  REMOVE_TODO: (state, id: string): void => {
    state.list = state.list.filter((item: Todo) => item.id !== id);
  },
};

export const getters: GetterTree<StateType, RootState> = {
  list: (state): Array<Todo> => state.list,
};

const actions: ActionTree<StateType, RootState> = {
  async addTodo({ commit }, data: string) {
    commit("ADD_TODO", data);
  },

  async removeTodo({ commit }, id: string) {
    commit("REMOVE_TODO", id);
  },
};

export default {
  namespace: true,
  state,
  mutations,
  getters,
  actions,
};
