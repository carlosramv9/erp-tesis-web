import React,{useState} from 'react'
import {useRouter} from 'next/router'

const NewTemplateHeader = () => {
  const router =  useRouter();

  return(
    <div className='mb-4'>
        <div className='d-flex flex-column'>
            <div className='d-flex flex-between'>
                <h2><b></b>Nueva Plantilla</h2>
            </div>
            <div className='d-flex flex-between'>
                
                
            </div>                
        </div>
    </div>
  )
};

export default NewTemplateHeader;
