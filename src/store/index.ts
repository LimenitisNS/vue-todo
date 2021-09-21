import Vuex, { StoreOptions } from "vuex";
import todo from "./modules/todo";
import { RootState } from "@/store/type";

const store: StoreOptions<RootState> = {
  modules: {
    todo: todo,
  },
};

export default new Vuex.Store<RootState>(store);
