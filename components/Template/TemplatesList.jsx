import React,{useState, useEffect} from 'react';
import dayjs from 'dayjs'
//Redux
import {useSelector,useDispatch} from 'react-redux';
import { deleteTemplateAction, getTemplatesAction,setCurrentTemplateAction } from '../../store/actions/templatesActions';
//Otras
import { useRouter } from 'next/router'
import Paginator from '../shared/Paginator';
import WarningModal from '../shared/WarningModal';
import NoDataFound from '../shared/NoDataFound';
import Loading from '../shared/Loading'

const title = 'Estas por eliminar una plantilla';
const TemplatesList = () => {
  const router =  useRouter();
  const dispatch = useDispatch();

  const [page, setPage] = useState(1)
  const [showWarningModal, setShowWarningModal] = useState(false)
  const templateList = useSelector(state => state.templates.templatesList);
  const totalItems = useSelector(state => state.templates.total); 
  const isLoadingTemplates = useSelector(state => state.templates.isLoadingTemplates);
  const [selectedTemplate, setSelectedTemplate] = useState({})

  const deleteTemplate = () =>{
    dispatch(deleteTemplateAction(selectedTemplate._id));
    setSelectedTemplate({});
  }

  useEffect(() => {
    dispatch(getTemplatesAction(page));
    // eslint-disable-next-line 
  }, [page])
  
  return (
    <div>
      <div className='d-flex justify-content-end me-4'>
        {totalItems >= 1 && <Paginator  totalItems={totalItems} page={page} setPage={setPage}/>}
      </div>
      {
         isLoadingTemplates 
        ? <Loading/>
        : <TemplatesTable templateList={templateList} dispatch={dispatch} router={router} setCurrentTemplateAction={setCurrentTemplateAction} setShowWarningModal={setShowWarningModal} setSelectedTemplate={setSelectedTemplate} totalItems={totalItems}/>
      }
      
      <WarningModal title={title} setShow={setShowWarningModal} show={showWarningModal} action={deleteTemplate} message={`¿Estas seguro de eliminar el template "${selectedTemplate.name}"?`}/>
    </div>
  )
}

const TemplatesTable = ({templateList, dispatch, router, setCurrentTemplateAction, setShowWarningModal, setSelectedTemplate, totalItems}) => {

    return (
      <div>      
      {
      totalItems === 0
      ? <NoDataFound/>
      :(
        <div>
        
        <table className="table">
          <thead>
              <tr>
                  <th className='table-header'>Nombre</th>
                  <th className='table-header'>Tipo</th>
                  <th className='table-header text-center'>Metodo de Pago</th>
                  <th className='table-header'>Creado Por</th>
                  <th className='table-header'>Fecha de creacion</th>
                  <th className='table-header'>Acciones </th>
              </tr>
          </thead>
          <tbody>
              {
                  templateList?.map((data, index) => (
                      <tr key={index}>
                          <td>{data.name}</td>
                          <td>{data.type}</td>
                          <td className='text-center'>{data.paymentMethod}</td>
                          <td>{`${data?.createdBy?.firstName} ${data?.createdBy?.lastName}`}</td>
                          <td className='text-left'>{dayjs(data?.createdDate).format("DD/MMM/YYYY")}</td>
                          <td>
                            <button className="bi bi-pencil-fill icon-button me-1" onClick={()=>{dispatch(setCurrentTemplateAction(data._id)); router.push('/template/newtemplate')}}></button >
                            <button className="bi bi-trash-fill icon-button" onClick={()=>{setSelectedTemplate(data); setShowWarningModal(true)}}></button>
                          </td>
                      </tr>
                  ))
              }
          </tbody>
        </table>
        </div>
      )
    }
    </div>)
}

export default TemplatesList