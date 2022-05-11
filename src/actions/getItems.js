import {
  GET_ITEMS_LIST_SUCCESS,
  GET_MORE_ITEMS_LIST_REQUEST,
  GET_MORE_ITEMS_LIST_SUCCESS,
  GET_MORE_ITEMS_LIST_FAILURE,
} from "../constants/itemsConstant";
import axios from "axios";

export const getPagination = (page,query) => async (dispatch) => {
  dispatch({ type: GET_MORE_ITEMS_LIST_REQUEST });
  try {
    const res = await axios.get(
      `https://api.jikan.moe/v4/anime?q=${query}&limit=16&page=${page}`
    );
    page === 1 
      ? dispatch({ type: GET_ITEMS_LIST_SUCCESS, payload: res.data })
      : dispatch({ type: GET_MORE_ITEMS_LIST_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: GET_MORE_ITEMS_LIST_FAILURE, payload: error.message });
  }
};
