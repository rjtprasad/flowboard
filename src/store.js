import { create } from "zustand";
import { devtools } from "zustand/middleware";

const store = (set) => ({
  loader: true,
  isLoggedIn: false,
  boards: [],
  areBoardsFetched: false,
  toastrMsg: "",

  setLoginStatus: (status) =>
    set(
      {
        isLoggedIn: status,
        loader: false,
        boards: [],
        areBoardsFetched: false,
      },
      false,
      "setLoginStatus"
    ),

  setBoards: (boards) =>
    set(
      {
        boards,
        areBoardsFetched: true,
      },
      false,
      "setBoards"
    ),

  addBoard: (board) =>
    set((prev) => ({ boards: [board, ...prev.boards] }), false, "addBoard"),

  setToastr: (toastrMsg) => set({ toastrMsg }, false, "setToastr"),
});

const useStore = create(devtools(store));

export default useStore;
