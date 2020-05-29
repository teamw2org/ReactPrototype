export const reducerActions = {
  CHANGE_ORDER: "order",
  CHANGE_ORDER_BY: "orderBy",
  CHANGE_SELECTED: "selected",
  CHANGE_PAGE: "change_page",
  CHANGE_ROWS_PER_PAGE: "rowsPerPage",
  CHANGE_USERS_STATE: "usersState",
};

const users = {
  order: "asc",
  orderBy: "username",
  selected: [],
  page: 0,
  rowsPerPage: 5,
  usersState: [],
};

export function usersReducer(state = users, action) {
  switch (action.type) {
    case reducerActions.CHANGE_ORDER:
      return {
        ...state,
        order: action.order,
      };
      case reducerActions.CHANGE_ORDER_BY:
      return {
        ...state,
        orderBy: action.orderBy,
      };
    case reducerActions.CHANGE_SELECTED:
      return {
        ...state,
        selected: action.selected,
      };
    case reducerActions.CHANGE_PAGE:
      return {
        ...state,
        page: action.page,
      };
    case reducerActions.CHANGE_ROWS_PER_PAGE:
      return {
        ...state,
        rowsPerPage: action.rowsPerPage,
      };
    case reducerActions.CHANGE_USERS_STATE:
      return {
        ...state,
        usersState: action.usersState,
      };
    default:
      return state;
  }
}
