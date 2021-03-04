import React,  {useState, useRef, useContext, useEffect} from 'react';
import Card from './Card'
import ItemContext from '../../context/item/itemContext';


const Row = props => {
    const itemContext = useContext(ItemContext);
    const {addTmpCard, addColumn, updateColumn} = itemContext;

    const grpI = props.grpI;
    const grp = props.grp;
    const dragging = props.dragging;

    const refEdit = useRef();
    const [value, setValue] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [newMode, setNewMode] = useState(false);
  
    useEffect(() => {
      grp.name === '' ? setNewMode(true) : setNewMode(false)
      grp.name === '' ? setValue('') : setValue(grp.name)

      //const test = () => { grpI.map.}

    }, [props]);


    useEffect(() => {
        if (editMode) {
            refEdit.current.select();
        }
      }, [editMode]);

    const rename = () => {
      console.log('Renaming');    
      setEditMode(false);
      const newColumn = {... grp , name: value}
      updateColumn(newColumn);
    }


    const newCard = () => {
      console.log('New Card State');    
      const newKort = {
        name: '',
        column: grp._id,
        level: 0
      };
      addTmpCard(newKort);
    }
  
  const addColumnToDB = () => { value === '' ? console.log("delete") : addColumn(   {...props.grp, name: value}, setNewMode(false)  ) };

  
  return (

    <div key={grp.name} onDragEnter={dragging && !grpI.length ? (e) => props.handleDragEnter(e,{grp, itemI: 0}) : null} className="dnd-group"> {/* OnDragEnter here is for when no items in group*/}

        <button onClick={() => editMode ? rename() : setEditMode(!editMode)}>Toggle edit</button>

        <button onClick={() => newCard() }>   +   </button>
        
        <div>
          {editMode | newMode ? '' : grp.name}


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


          {(newMode) && (
          <input
          ref={refEdit}
          autoFocus
          value={value}
          onBlur={() => addColumnToDB() }
          onKeyPress={event => {
                if (event.key === 'Enter') {
                  addColumnToDB();
                }}
          }
          onChange={e => setValue(e.target.value)}
          />)}


        </div>


        {grpI.map((card) =>      // Every kort
        (  
          <Card card={card} getStyles={dragging ? props.getStyles({grpI, card}) : "dnd-item"}  
          onDragStart={(e) => props.handletDragStart(e, {grp, card})}  
          onDragEnter={dragging ? (e) => { props.handleDragEnter(e, {grp, card}) } : null}
          />               
        ))}

        
              
    </div>

    

);


};

export default Row;