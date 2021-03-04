import React, { useState, useContext, useEffect, useRef } from 'react';
import ItemContext from '../../context/item/itemContext';



const Card = props => {
  const itemContext = useContext(ItemContext);
  const {addCard, deleteTmpCard, updateCard} = itemContext;


  const refEdit = useRef();
  const [value, setValue] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [newMode, setNewMode] = useState(false);

  useEffect(() => {
    props.card.name === '' ? setNewMode(true) : setNewMode(false)
    props.card.name === '' ? setValue('') : setValue(props.card.name)
  }, [props]);

  
  const rename = () => {
    console.log('Renaming');    
    setEditMode(false);
    const newCard = {... props.card , name: value}
    updateCard(newCard);
  }


  const addCardToDB = () => { value === '' ? deleteTmpCard() : addCard(   {...props.card, name: value}, setEditMode(false)  ) };


  return (
    <div draggable key={props.card} className={props.getStyles} onDragStart={props.onDragStart} onDragEnter={props.onDragEnter}>  
      
      <h1>{editMode | newMode ? '' : props.card.name}</h1>
    
      {!editMode ? <button onClick={() => editMode ? rename() : setEditMode(!editMode)}>Rename</button> : ''}


      {(editMode) && (
          <input
          ref={refEdit}
          autoFocus
          value={value}
          onChange={e => setValue(e.target.value)}
          onBlur={() => rename() }
          onKeyPress={event => {
                if (event.key === 'Enter') {
                  rename();
                }}
          }
          />)}



      <div>
          {newMode && (
          <input
          ref={refEdit}
          autoFocus
          onBlur={() => addCardToDB() }
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyPress={event => {
                if (event.key === 'Enter') {
                  addCardToDB();
                }}
          }
          />)}
        </div>


   



    
    </div>
  );
};



export default Card;