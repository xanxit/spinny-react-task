import {
  GET_ITEMS_LIST_SUCCESS,
  GET_MORE_ITEMS_LIST_REQUEST,
  GET_MORE_ITEMS_LIST_SUCCESS,
  GET_MORE_ITEMS_LIST_FAILURE,
} from "../constants/itemsConstant";

export const itemsReducer = (
  state = { items: [], loading: true, error: null, pagination: {} },
  action
) => {
  switch (action.type) {
    case GET_ITEMS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload.data,
        pagination: {...state.pagination, ...action.payload.pagination},
      };
    case GET_MORE_ITEMS_LIST_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_MORE_ITEMS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        items: [...state.items, ...action.payload.data],
        pagination: { ...state.pagination, ...action.payload.pagination },
      };
    case GET_MORE_ITEMS_LIST_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
