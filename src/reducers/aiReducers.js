import {
    AI_CHAT_REQUEST,
    AI_CHAT_SUCCESS,
    AI_CHAT_FAIL,
    AI_CHAT_RESET,
  } from "../constants/aiConstants";
  
  const initialState = {
    loading: false,
    error: null,
    answer: "",
    intent: "",
    products: [],
    recommended_product_ids: [],
  };
  
  export const aiChatReducer = (state = initialState, action) => {
    switch (action.type) {
      case AI_CHAT_REQUEST:
        return { ...state, loading: true, error: null };
  
      case AI_CHAT_SUCCESS:
        return {
          ...state,
          loading: false,
          error: null,
          answer: action.payload.answer || "",
          intent: action.payload.intent || "",
          products: action.payload.products || [],
          recommended_product_ids: action.payload.recommended_product_ids || [],
        };
  
      case AI_CHAT_FAIL:
        return { ...state, loading: false, error: action.payload };
  
      case AI_CHAT_RESET:
        return initialState;
  
      default:
        return state;
    }
  };