import React from 'react'
import dayjs from 'dayjs';
import {useDispatch, useSelector} from 'react-redux';
import FileDownload from 'js-file-download';
import { downloadAttachment } from '../../api/utils';
import { deleteUserAttachmentAction } from '../../store/actions/usersAction';

const AttachmentTable = () => {
    const dispatch = useDispatch();
    const currentUserTab =  useSelector(state => state.users).currentUserTab
    const { attachments, _id: userId} = useSelector(state => state.users.currentUser)
    
    const downloadFile = (id,name) => {
        downloadAttachment(id)
        .then(response=>{
            FileDownload(response, name);
        })
    }
    
    const deleteFile = async attachmentId => {
        await dispatch(deleteUserAttachmentAction(userId, attachmentId, currentUserTab));
    }

    return (
        <table className="table">
            <thead>
                <tr>
                    <th className='table-header'>Nombre</th>
                    <th className='table-header'>Categoria</th>
                    <th className='table-header'>Fecha</th>
                    <th className='table-header'>Subido por:</th>
                    <th className='table-header text-center'>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    attachments?.map((attachment, index) => (
                        <tr key={index}>
                            <td>{attachment.name}</td>
                            <td>{attachment.category}</td>
                            <td className='text-left'>{dayjs(attachment.date).format("DD/MM/YYYY HH:mm")}</td>
                            <td className='text-left'>{`${attachment.createdBy.firstName} ${attachment.createdBy.lastName}`}</td>
                            <td className='text-center font-size-icon-table' >
                                <button className="bi bi-download icon-button me-1" onClick={()=>downloadFile(attachment._id, `${attachment.name}.${attachment.fileType}`)}></button >
                                <button className="bi bi-trash-fill icon-button" onClick={()=>deleteFile(attachment._id)}></button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

export default AttachmentTable