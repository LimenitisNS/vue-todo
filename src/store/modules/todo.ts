import { ActionTree, GetterTree, MutationTree } from "vuex";
import { RootState } from "@/store/type";

type StateType = {
  list: Array<string>;
};

const state: StateType = {
  list: [],
};

const mutations: MutationTree<StateType> = {
  ADD_TODO: (state, item: string): void => {
    state.list.push(item);
  },
};

const getters: GetterTree<StateType, RootState> = {
  list: (state): Array<string> => state.list,
};

const actions: ActionTree<StateType, RootState> = {
  async addTodo({ commit }, data: string) {
    commit("ADD_TODO", data);
  },
};

export default {
  namespace: true,
  state,
  mutations,
  getters,
  actions,
};
