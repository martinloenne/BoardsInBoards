import React, {Fragment, useContext, useEffect, useState} from 'react';
import Board from '../board/Board';
import ItemContext from '../../context/item/itemContext';

const Home = () => {
  const itemContext = useContext(ItemContext);
  const { items, filtered, getItems, addItem, updateItem, loading } = itemContext;
  
  
  useEffect(() => {
    getItems();
    // eslint-disable-next-line
  }, []);


 
  return (
    <Board />
  );

};

export default Home;


