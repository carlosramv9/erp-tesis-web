import React,{useState, useEffect} from 'react'
import NewTemplateForm from './NewTemplateForm';
import StepsCreator from './StepsCreator';
import {useDispatch,  useSelector } from 'react-redux';
import {useRouter} from 'next/router';
import { createTemplateAction,  updateTemplateAction } from '../../../store/actions/templatesActions';

const NewTemplateStructure = () => {
    const router =  useRouter();
    const dispatch = useDispatch();
    const currentTemplate = useSelector(state => state.templates.currentTemplate);
    const [processTemplate, setProcessTemplate] = useState({name:'', type:'', paymentMethod:''});
    const [steps, setSteps] = useState([]);
    const [isReady, setIsReady] = useState(true);
    const [refresh, setRefresh] = useState(false);
    useEffect(() => {
        if(processTemplate?.name && processTemplate?.type && processTemplate?.paymentMethod && steps?.length > 0){
          //if(steps.every(step=>step?.tasks?.length > 0)) setIsReady(true);
          //else setIsReady(false)
        }
    }, [processTemplate, refresh, steps])
    
    useEffect(() => {
      if(currentTemplate._id) {
        setProcessTemplate({name: currentTemplate.name, type: currentTemplate.type, paymentMethod:currentTemplate.paymentMethod})
        setSteps(currentTemplate.steps)
      }else{
        setSteps([])
      }
    }, [currentTemplate])
    

    const saveNewTemplate = () => {
        const formatedSteps = steps?.map(step => {
          return{ ...step, totalTasks: step.tasks.length }
        } )
        const templateData = {...processTemplate, steps:formatedSteps}
        dispatch(createTemplateAction(templateData));
        router.push('/template')
    }

    const updateTemplate = () =>{
        const formatedSteps = steps?.map(step => {
          return{ ...step, totalTasks: step.tasks.length }
        } )
        const templateData = {...processTemplate, steps:formatedSteps}
        dispatch(updateTemplateAction(templateData, currentTemplate._id));
        router.push('/template')
    }

  return (
    <div className='new-template mx-4 d-flex flex-column'>
        <NewTemplateForm setProcessTemplate={setProcessTemplate} processTemplate={processTemplate} saveNewTemplate={saveNewTemplate} updateTemplate={updateTemplate} isReady={isReady}/>
        <StepsCreator  setProcessTemplate={setProcessTemplate} setSteps={setSteps} steps={steps} setIsReady={setIsReady} setRefresh={setRefresh} refresh={refresh}/>
    </div>
  )
}

export default NewTemplateStructure