import React, {useState, useRef, useContext, useEffect} from 'react'
import Column from '../board/Column'
import ItemContext from '../../context/item/itemContext';



function Board() {
    const itemContext = useContext(ItemContext);
    const {getItems, addItem, updateItem, addTmpColumn, loading, draggingItem, board, column, cards, updateItemNoStateChange} = itemContext;

    const [dragging, setDragging] = useState(false);

    const dragItem = useRef();  // Stays the same upon renders
    const dragItemNode = useRef();
    const dragItemEnd = useRef();
    

    // Drags start mode
    const handletDragStart = (e, item) => {
        //console.log('Starting to drag', item)
        dragItemNode.current = e.target;
        // addeventlistener on a HTML 'dragend' event, so when the event happens on this item, we fire 'handleDragEnd'
        dragItemNode.current.addEventListener('dragend', handleDragEnd)
        dragItem.current = item;  // Sets the item as an ref, the item current being dragged

        setTimeout(() => {
            setDragging(true); // We make it true, to then make it false to trigger re-render
        }, 0)       
    }


    // Drags ending mode
    const handleDragEnd = (e) => {
        // Resets the state now that its moved      
        updateItemNoStateChange(dragItemEnd.current)
        console.log("Dragged end");
        setDragging(false); // Triggers the re-render
        dragItem.current = null;  
        dragItemNode.current.removeEventListener('dragend', handleDragEnd)
        dragItemNode.current = null;
    }


    // Drags enter mode
    const handleDragEnter = (e, targetItem) => {
        console.log('Entering a drag target', targetItem.card.name)

        const newItem = { ...dragItem.current.card, column: targetItem.grp._id };
        dragItemEnd.current = newItem;

        if (dragItemNode.current !== e.target) 
        {
            console.log('Target is NOT the same as dragged item')              
            draggingItem(newItem);
            /*
            setList(oldList => {
                let newList = JSON.parse(JSON.stringify(oldList))
                newList[targetItem.grpI].items.splice(targetItem.itemI, 0, newList[dragItem.current.grpI].items.splice(dragItem.current.itemI,1)[0])
                dragItem.current = targetItem;  
                localStorage.setItem('List', JSON.stringify(newList));
                return newList
            })
            */
        }
    }


    // Returns the style of the card
    // IF its being dragged it returns current style else normal style
    const getStyles = (item) => {
        if (dragItem.current.grpI === item.grpI && dragItem.current.itemI === item.itemI) {
            return "dnd-item current"
        }
        return "dnd-item"
    }



    const addColumn = () => {
        console.log('New column State');    
        const newColumn = {
          name: '',
          positionHorizontal: 0,
          board: board._id
        };
        addTmpColumn(newColumn);
    }


    


    // OnDragEnter/Start is HTML actions that gets triggered
    if (!loading) {              
        
       //console.log(items.data[0].id);
       //console.log("test: ", items.data[0].columns);

        /*    
        for (const key in items.data[0].columns) {
            console.log(items.data[0].columns[key]._id);
            
        }
        */


        //<div>{item._id}</div>
        return (                
            <div className="drag-n-drop">
                            
                {column.map((item) => (  // For every group   // grp = row, grpI = kort
                    <Column grp={item} grpI={cards.filter(card => card.column == item._id).sort((a,b) => (a.level < b.level) ? 1 : -1)} getStyles={getStyles} dragging={dragging}  handletDragStart={handletDragStart}  handleDragEnter={handleDragEnter} />       
                ))}
            
                <div><button onClick={addColumn}>+</button></div>
            </div>
          )
        
    } 
    else 
    { 
      return null
    }

}

export default Board;