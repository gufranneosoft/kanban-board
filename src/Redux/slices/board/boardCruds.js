import api from "../../../api";

export const GET_BOARD = "/boards";
export const UPDATE_BOARD = "/boards";

export function fetchBoard() {
  return api.get(`${GET_BOARD}`);
}

export function updateBoard(payload) {
  return api.put(UPDATE_BOARD, { bds: payload });
}
