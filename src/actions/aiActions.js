import axios from "axios";
import { API_BASE_URL } from "../config";
import {
  AI_CHAT_REQUEST,
  AI_CHAT_SUCCESS,
  AI_CHAT_FAIL,
} from "../constants/aiConstants";

export const aiChat = (message) => async (dispatch) => {
  try {
    dispatch({ type: AI_CHAT_REQUEST });

    const { data } = await axios.post(
      `${API_BASE_URL}/api/ai/chat/`,
      { message },
      { headers: { "Content-Type": "application/json" } }
    );

    dispatch({ type: AI_CHAT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: AI_CHAT_FAIL,
      payload:
        error.response?.data?.detail ||
        error.response?.data?.error ||
        error.message,
    });
  }
};