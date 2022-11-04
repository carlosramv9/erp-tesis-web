import React,{useState} from 'react'
import AttachmentTable from './AttachmentTable'
import NewAttachmentForm from './NewAttachmentForm'
import { useSelector } from 'react-redux';
import NoDataFound from '../shared/NoDataFound';
import Modal from '../shared/Modal';

const CurrentUserAttachment = () => {
  const [show, setShow] = useState(false);
  const user = useSelector(state => state.users.currentUser);
  return (
    <div className='mt-5'>
      <div className='d-flex justify-content-end '>
        <button className='btn btn-primary mb-1 me-5' onClick={()=>setShow(true)}>Nuevo Documento</button>
      </div>
      {user?.attachments?.length > 0 ? <AttachmentTable/> : <NoDataFound/>}
      <Modal title="Nuevo Documento" show={show} setShow={setShow}>
        <NewAttachmentForm id={ user._id } />
      </Modal>
    </div>
  )
}

export default CurrentUserAttachment