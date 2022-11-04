import React,{ useEffect } from 'react'
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';


const TaskList = ({steps, selectedStep, setSelectedStep, setSteps}) => {
    const numberDot = "d-flex bg-number-rounded me-2 color-text-03 align-items-center justify-content-center"

    const getListStyle = () => ({
        background:  "lightgrey",
        display:"flex",
        width: "100%",
        alignItems:"center",
        justifyContent:"center",
        flexDirection:"column",
      });

      const getItemStyle = (isDragging, draggableStyle) => ({
        userSelect: "none",
        background: isDragging ? "#d8ac34" : "#222831",
        width: "100%",
        ...draggableStyle
      });



      const reorder = async (tasks, startIndex, endIndex ) =>{
        let result = [...tasks]
        const [removed] = await result.splice(startIndex-1 ,1)
        await result.splice(endIndex-1,0,removed);

        const finalTasks = await result?.map ((item, index) =>{
            const task = {
                index:index+1,
                name:item.name,
                dndId:item.dndId,
                description:item.description,
                type:item.description,
                isRequired:item.isRequired
            }
            return task;
        })
        return finalTasks;
      }

    const movePlace = async place =>{
        if(place?.destination?.index) {
            const newTasks = await reorder(selectedStep.tasks, place.source.index, place.destination.index)
            setSelectedStep({...selectedStep, tasks:newTasks});
        }
    }

    const SelectedIcon = type =>{
        let icon = '';
        switch (type) {
            case 'attachment':
                    icon = 'bi bi-file-earmark-pdf icon-task';
                break;
            case 'appointment':
                icon = 'bi bi-calendar-plus icon-task';
            break;
            case 'contract':
                icon = 'bi bi-card-text icon-task';
            break;
            case 'dataUpdate':
                icon = 'bi bi-arrow-up-circle icon-task';
            break;
            default:
                break;
        }
        return(<span  className={icon}></span>)
    }

    const deleteTask = task =>{
        let selectedStepAux = {...selectedStep};
        let stepsAux = [...steps];
        selectedStepAux?.tasks?.length > 1
        ?selectedStepAux?.tasks?.splice(task.index -1, 1)
        :selectedStepAux.tasks = []
        stepsAux[selectedStepAux.index - 1] = selectedStepAux;
        setSteps(stepsAux);
        setSelectedStep(selectedStepAux);
    }
    
    return (
    <div className='w-100'>
        <DragDropContext style={{ overflow: "scroll"}} onDragEnd={(place)=>{movePlace(place)}}>
            <Droppable droppableId="tasks">
                {(droppableProvided, snapshot) => (
                    <div {...droppableProvided.droppableProps} ref={droppableProvided.innerRef} style={getListStyle(snapshot.isDraggingOver,selectedStep?.tasks?.length)}>
                        {selectedStep?.tasks?.map((task, index) => (
                            <Draggable draggableId={`${task?.dndId}`} key={`${task?.dndId}`} index={task?.index}>
                                {(dragableProvided) =>(
                                    <div className='draggable-item-template  mb-2' ref={dragableProvided.innerRef} {...dragableProvided.draggableProps} {...dragableProvided.dragHandleProps} style={getItemStyle(snapshot.isDragging,dragableProvided.draggableProps.style)}>
                                        <div className='d-flex align-items-center'>   
                                            <div className={numberDot}>{task?.index}</div> 
                                            <div className={numberDot}>{SelectedIcon(task.type)}</div>  
                                            <div className={numberDot}>{task.isRequired ? <span className='bi bi-check-circle-fill icon-task'/>: <span className='bi bi-dash-circle icon-task'/>}</div>
                                            {task?.name}
                                            <div className={`${numberDot} ms-auto`} onClick={()=> deleteTask(task)}><i className="bi bi-x-circle icon-task"></i></div>
                                        </div>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {droppableProvided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    </div>
    )
}

export default TaskList