import {
  GET_ITEMS,
  ADD_ITEM,
  DELETE_ITEM,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_ITEM,
  UPDATE_COLUMN,
  UPDATE_CARD,
  DRAGGING,
  ENDDRAG,
  ADD_ITEM_FROM_TMP,
  ADD_COLUMN_FROM_TMP,
  ADD_CARD_FROM_TMP,
  ADD_TMP_COLUMN,
  DELETE_TMP_CARD,
  ADD_TMP_CARD,
  FILTER_ITEMS,
  CLEAR_FILTER,
  ITEM_ERROR,
  CLEAR_ITEMS
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        items: action.payload,
        loading: false,
        board: action.payload.data[0],
        column: action.payload.data[0].columns.filter(item => item),
        //column: action.payload.data[0].columns.filter(item => item),
        cards:  action.payload.data[0].columns.filter(item => item.cards.length != 0).flatMap(item => item.cards)
      };
    case ADD_ITEM:
      return {
        ...state,
        items: [action.payload, ...state.items],
        loading: false
      };
    case ADD_CARD_FROM_TMP:
      return {
        ...state,
        cards: state.cards.map(item => // Delete the item    
          item.name === '' ? action.payload.data : item
        ),
        loading: false
      }; 
    case ADD_COLUMN_FROM_TMP:
      return {
        ...state,
        column: state.column.map(item =>    
          item.name === '' ? action.payload.data : item
        ),
        loading: false
      }; 
    case ADD_TMP_CARD:
      return {
        ...state,
        cards: [action.payload, ...state.cards],
        loading: false
      };
    case ADD_TMP_COLUMN:
      return {
        ...state,
        column: [action.payload, ...state.column],
        loading: false
      };   
    case UPDATE_ITEM:
      return {
        ...state,
        items: state.items.map(item =>
          console.log(item)
        ),
        loading: false
      };
    case UPDATE_COLUMN:
      return {
        ...state,
        column: state.column.map(item =>
          item._id === action.payload.data._id ? action.payload.data : item
        ),
        loading: false
      };
    case UPDATE_CARD:
      return {
        ...state,
        cards: state.cards.map(item =>
          item._id === action.payload.data._id ? action.payload.data : item
        ),
        loading: false
      };
    case DRAGGING:
      // Change the row
      //console.log("In state change: ", action.payload);
      return {
        ...state,
        cards: state.cards.map(item => // Delete the item    
          // Change the row on the kort
          item._id === action.payload._id ? action.payload : item
        ),
        loading: false
      };
    case DELETE_TMP_CARD:
      return {
        ...state,
        cards: state.cards.filter(
          item => item.name !== ''
        ),
        loading: false
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(
          item => item._id !== action.payload
        ),
        loading: false
      };
    case CLEAR_ITEMS:
      return {
        ...state,
        items: null,
        filtered: null,
        error: null,
        current: null
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };
    case FILTER_ITEMS:
      return {
        ...state,
        filtered: state.items.filter(item => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return item.name.match(regex) || item.email.match(regex);
        })
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      };
    case ITEM_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
