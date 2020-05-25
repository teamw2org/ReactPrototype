import { store } from "./Store";

export function buckets(state = store, action) {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        movies: [...state.movies, action.movie],
      };
    case "RESET":
      return {
        ...state,
        movies: [],
      };
    default:
      return state;
  }
}
