import React from 'react'
import {Droppable, Draggable} from 'react-beautiful-dnd';

const DroppableItem = ({items,index}) => {
    const grid = 4;
    const getListStyle = (isDraggingOver, itemsLength) => ({
        background: isDraggingOver ? "#d8ac34" : "lightgrey",
        minWidth: '100%',
        width: itemsLength * 168,
        display:"flex",
        padding:grid,
      });
      const getItemStyle = (isDragging, draggableStyle) => ({
        userSelect: "none",
        background: isDragging ? "#d8ac34" : "#222831",
        margin: `0 ${grid}px 0 0`,
        padding: grid * 2,
        ...draggableStyle
        
      });
    return(
        <>
            <div className='d-flex'>
                <div className='draggable-priority d-flex align-items-center justify-content-center'>
                    <h2>{index}</h2>
                </div>
                <Droppable droppableId={`p${index}`} direction="horizontal">
                    {(droppableProvided, snapshot) =>(
                        <div  {...droppableProvided.droppableProps} ref={droppableProvided.innerRef} style={getListStyle(snapshot.isDraggingOver,items.length)}>
                            {items?.map((roles, index)=>(
                                <Draggable draggableId={roles._id} key={index} index={roles.index ? roles.index : index} >
                                {(dragableProvided)=> 
                                    <div className='draggable-item' ref={dragableProvided.innerRef} {...dragableProvided.draggableProps} {...dragableProvided.dragHandleProps} style={getItemStyle(snapshot.isDragging,dragableProvided.draggableProps.style)}>
                                        {roles.role}
                                    </div>}
                                </Draggable>
                            ))}
                            {droppableProvided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        </>
    )
}

function Droppables () {
    
}
export default DroppableItem
