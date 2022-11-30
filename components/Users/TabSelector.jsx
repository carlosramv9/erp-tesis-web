import React from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { setCurrentTabAction } from '../../store/actions/usersAction';

const TabSelector = () => {
  const dispatch = useDispatch();
  const { currentUserTab } = useSelector(state => state.users)
  
  return (
    <div className='w-100 mt-4 bg-red'>
        {/* <button type='button' onClick={() => dispatch(setCurrentTabAction('process'))} className={currentUserTab == 'process'?'btn btn-primary rounded-0-right btn-active btn-tab-hover' :'btn btn-primary rounded-0-right'}>Procesos</button> */}
        <button type='button' onClick={() => dispatch(setCurrentTabAction('files'))} className={currentUserTab == 'files'?'btn btn-primary rounded btn-active btn-tab-hover' :'btn btn-primary rounded-0'}>Archivos</button>
        {/* <button type='button' onClick={() => dispatch(setCurrentTabAction('movements'))} className={currentUserTab == 'movements'?'  btn btn-primary btn-tab-hover rounded-0-left btn-active' :'btn btn-primary rounded-0-left'}>Movimientos</button> */}
    </div>
  )
}

export default TabSelector