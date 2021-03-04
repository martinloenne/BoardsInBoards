import React, { useReducer } from 'react';
import axios from 'axios';
import ItemContext from './itemContext';
import itemReducer from './itemReducer';
import {
  GET_ITEMS,
  ADD_ITEM,
  DELETE_ITEM,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_ITEM,
  DRAGGING,
  ENDDRAG,
  DELETE_TMP_CARD,
  DELETE_TMP_COLUMN,
  UPDATE_COLUMN,
  UPDATE_CARD,
  ADD_CARD_FROM_TMP,
  ADD_COLUMN_FROM_TMP,
  ADD_TMP_CARD,
  ADD_TMP_COLUMN,
  FILTER_ITEMS,
  CLEAR_ITEMS,
  CLEAR_FILTER,
  ITEM_ERROR
} from '../types';

const ItemState = props => {
  const initialState = {
    items: null,
    board: null,
    column: null,
    cards: null,
    current: null,
    error: null,
    loading: true
  };

  const [state, dispatch] = useReducer(itemReducer, initialState);












  
  // Get all items
  const getItems = async () => {
    try {
      const res = await axios.get('/board/?populate=true');
      console.log(JSON.parse(JSON.stringify(res.data)));
      dispatch({
        type: GET_ITEMS,
        payload: JSON.parse(JSON.stringify(res.data))
      });
    } 
    catch (err) 
    {
      dispatch({
        type: ITEM_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Get user items
  const getItemsUser = async () => {
    try {
      const res = await axios.get('/session/me');
      dispatch({
        type: GET_ITEMS,
        payload: res.data
      });
    } 
    catch (err) 
    {
      dispatch({
        type: ITEM_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Add
  const addItem = async item => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    console.log("In addItem: ", item)

    try {
      const res = await axios.post('/card/create/', item, config);

      dispatch({
        type: ADD_ITEM,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: ITEM_ERROR,
        payload: err.response.msg
      });
    }
  };










  const addColumn = async item => {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
  
      console.log("In addColumn: ", item)
  
      try {
        const res = await axios.post('/column/create/', item, config);
   
        dispatch({
          type: ADD_COLUMN_FROM_TMP,
          payload: res.data
         
        });
      } catch (err) {
        dispatch({
          type: ITEM_ERROR,
          payload: err.response.msg
        });
      }
  
  };

  const addTmpColumn = async item => {
    console.log(item)
      dispatch({
        type: ADD_TMP_COLUMN,
        payload: item
      });
  };

  const updateColumn = async item => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.put(
        `/column/${item._id}`,
        item,
        config
      );
      dispatch({
        type: UPDATE_COLUMN,
        payload: res.data
      });
    } 
    catch (err) {
      dispatch({
        type: ITEM_ERROR,
        payload: err.response.msg
      });
    }
  };













  // Add
  const addCard = async item => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    console.log("In addItem: ", item)

    try {
      const res = await axios.post('/card/create/', item, config);
 
      dispatch({
        type: ADD_CARD_FROM_TMP,
        payload: res.data
       
      });
    } catch (err) {
      dispatch({
        type: ITEM_ERROR,
        payload: err.response.msg
      });
    }

  };


  const addTmpCard = async item => {
    console.log(item)
      dispatch({
        type: ADD_TMP_CARD,
        payload: item
      });
  };


  // Delete
  const deleteTmpCard = async id => {
    try {
      dispatch({
        type: DELETE_TMP_CARD,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: ITEM_ERROR,
        payload: err.response.msg
      });
    }
  };
  
  const updateCard = async item => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.put(
        `/card/${item._id}`,
        item,
        config
      );
      dispatch({
        type: UPDATE_CARD,
        payload: res.data
      });
    } 
    catch (err) {
      dispatch({
        type: ITEM_ERROR,
        payload: err.response.msg
      });
    }
  };


















  // Delete
  const deleteItem = async id => {
    try {
      await axios.delete(`/api/contacts/${id}`);

      dispatch({
        type: DELETE_ITEM,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: ITEM_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Update
  const updateItem = async item => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.put(
        `/api/contacts/${item._id}`,
        item,
        config
      );

      dispatch({
        type: UPDATE_ITEM,
        payload: res.data
      });
    } 
    catch (err) {
      dispatch({
        type: ITEM_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Update
  const updateItemNoStateChange = async item => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.put(
        `/card/${item._id}`,
        item,
        config
      ); 
    } 

    catch (err) {
      dispatch({
        type: ITEM_ERROR,
        payload: err.response.msg
      });
    }
  };


  const draggingItem = async item => {
    dispatch({
      type: DRAGGING,
      payload: item
    });
  };













  // Clear
  const clearItems = () => {
    dispatch({ type: CLEAR_ITEMS });
  };

  // Set Current
  const setCurrent = item => {
    dispatch({ type: SET_CURRENT, payload: item });
  };

  // Clear Current
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Filter
  const filterItems = text => {
    dispatch({ type: FILTER_ITEMS, payload: text });
  };

  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };














  return (
      <ItemContext.Provider
      value=
      {{
        items: state.items,
        board: state.board,
        column: state.column,
        cards: state.cards,
        current: state.current,
        loading: state.loading,
        error: state.error,
        addItem,
        addCard,
        updateCard,
        deleteItem,
        deleteTmpCard,
        setCurrent,
        updateColumn,
        updateItemNoStateChange,
        addTmpColumn,
        clearCurrent,
        addColumn,
        updateItem,
        draggingItem,
        filterItems,
        clearFilter,
        getItems,
        clearItems,
        addTmpCard
      }}>
      {props.children}
    </ItemContext.Provider>
  );
};

export default ItemState;