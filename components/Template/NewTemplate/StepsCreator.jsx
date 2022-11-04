import React,{useState, useEffect} from 'react'
import StepList from './StepList'
import TaskList from './TaskList';
import CreateTaskForm from './CreateTaskForm';
import Loading from '../../shared/Loading';
import Modal from '../../shared/Modal';
import { v4 } from 'uuid';

const StepsCreator = ({steps, setSteps, setRefresh, refresh}) => {

    const [stepName, setStepName] = useState('')
    const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [selectedStep, setSelectedStep] = useState({})
    
    const addNewStep = () => {
        const step = {
            index : steps?.length + 1,
            dndId: v4(),
            name: stepName,
            tasks:[]
        }
        
        steps?.length === 0
        ?setSteps([step])
        :setSteps([...steps, step]);
        
        setStepName('')
    };
    const updateState = async e =>{
        setStepName(e.target.value);
    };

    return (
    <div className='mx-2 mt-2 w-100 card shadow p-4 d-flex flex-column justify-content-start'>
        <div className='d-flex flex-row justify-content-start p-3'>

            <div className='steps-creator_steps w-50 me-1'>
                <h2>Pasos</h2>
                <div className='add-new-step w-100 d-flex justify-content-start px-3 aling-items-center'>
                    <input name='name' type="text" className='form-control w-100 ' placeholder="Inserte el nombre del Paso" onChange={ updateState } value= {stepName}></input>
                    <button style={{borderRadius:0, minWidth:'150px'}} className='btn btn-primary p-2 d-flex align-items-center justify-content-center' onClick={()=>addNewStep()} disabled={!stepName}>Añadir Paso</button>
                </div>
                <div className='d-flex justify-content-start mt-5 px-3'>
                    {!isLoading
                    ?<StepList setSteps={setSteps} steps={steps} setSelectedStep={setSelectedStep} selectedStep={selectedStep}/>
                    :<Loading/>}
                </div>
            </div>



            
            <div className='steps-creator_tasks w-50 ms-1'>
                <h2>Tareas</h2>
                <div className='add-new-step w-100 d-flex justify-content-start px-3 aling-items-center'>
                    <button style={{borderRadius:0, minWidth:'150px'}} className='btn btn-primary p-2 d-flex align-items-center w-100 justify-content-center' onClick={()=>setShowCreateTaskModal(true)} disabled={selectedStep.dndId ? false : true} >Añadir Tarea</button>
                </div>
                <div className='d-flex justify-content-start mt-5 px-3'>
                {!isLoading
                    ?<TaskList setSteps={setSteps} steps={steps} setSelectedStep={setSelectedStep} selectedStep={selectedStep} />
                    :<Loading/>}
                </div>
            </div>
        </div>
        <Modal  title="Crear Nueva Tarea" show={showCreateTaskModal} setShow={setShowCreateTaskModal}>
            <CreateTaskForm setSteps={setSteps} steps={steps} setSelectedStep={setSelectedStep} selectedStep={selectedStep} setShow={setShowCreateTaskModal} refresh={refresh} setRefresh={setRefresh}/>
        </Modal>
    </div>
    )
}

export default StepsCreator