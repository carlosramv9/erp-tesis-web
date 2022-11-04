import React,{ useEffect } from 'react'
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';

const StepList = ({steps, setSteps, selectedStep, setSelectedStep}) => {

    const numberDot = "d-flex bg-number-rounded me-3 align-items-center justify-content-center"
    const numberDotActive = "d-flex bg-number-rounded-active me-3 align-items-center justify-content-center text-white"

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

      const reorder = async (steps, startIndex, endIndex ) =>{
        let result = [...steps]
        const [removed] = await result.splice(startIndex-1 ,1)
        await result.splice(endIndex-1,0,removed);

        const finalSteps = await result?.map ((item, index) =>{
            const step = {
                index:index+1,
                name:item.name,
                dndId:item.dndId,
                tasks:item.tasks
            }
            return step;
        })
        return finalSteps;
      }

    const movePlace = async place =>{
        if(place?.destination?.index) {
            const newSteps = await reorder(steps, place.source.index, place.destination.index)
            setSteps(newSteps);
            setSelectedStep({})
        }
    }

    const deleteStep = async step=> {
        let currentSteps = [...steps];
        
        currentSteps.length > 1
        ? currentSteps?.splice(step.index -1, 1)
        : currentSteps = [];
        setSteps(currentSteps)
    }

    useEffect(() => {
        setSelectedStep({})
        // eslint-disable-next-line 
    }, [steps])
    

    return (
    <div className='w-100'>
        <DragDropContext style={{ overflow: "scroll"}} onDragEnd={(place)=>{movePlace(place)}}>
            <Droppable droppableId="steps">
                {(droppableProvided, snapshot) => (
                    <div {...droppableProvided.droppableProps} ref={droppableProvided.innerRef} style={getListStyle(snapshot.isDraggingOver,steps?.length)}>
                        {steps?.map((step, index) => (
                            <Draggable draggableId={`${step?.dndId}`} key={`${step?.dndId}`} index={step?.index}>
                                {(dragableProvided) =>(
                                    <div className={selectedStep?.dndId === step?.dndId ? 'draggable-item-template-active mb-2' :'draggable-item-template  mb-2'} onClick={()=> setSelectedStep(step)} ref={dragableProvided.innerRef} {...dragableProvided.draggableProps} {...dragableProvided.dragHandleProps} style={getItemStyle(snapshot.isDragging,dragableProvided.draggableProps.style)}>
                                        <div className='d-flex align-items-center'>   
                                            <div className={selectedStep?.dndId === step.dndId  ? numberDotActive : numberDot}>{step?.index}</div> {step?.name}
                                            <div className={`ms-auto ${selectedStep?.dndId === step.dndId  ? numberDotActive : numberDot}`} onClick={()=> deleteStep(step)}><i className="bi bi-x-circle icon-task"></i></div>
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

export default StepList