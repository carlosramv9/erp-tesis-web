import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux';
import { emptyCurrentTemplateAction } from '../../store/actions/templatesActions'
const TemplateHeader = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  return (
    <div className='mb-4'>
      <div className='d-flex flex-column'>
        <div className='d-flex flex-between'>
          <h2><b></b>Plantillas de Proceso</h2>
          <button className='btn btn-action-primary' onClick={() => { router.push('/template/newtemplate'); dispatch(emptyCurrentTemplateAction()) }}>Nueva Plantilla</button>
        </div>
        <div className='d-flex flex-between'>
        </div>
      </div>
    </div>
  )
};

export default TemplateHeader;
