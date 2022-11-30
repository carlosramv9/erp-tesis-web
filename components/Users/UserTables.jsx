import React, {useState} from 'react'
import TabSelector from './TabSelector'
import CurrentUserAttachments from './CurrentUserAttachments'
import CurrentUserMovements from './CurrentUserMovements'
import CurrentUserProcess  from './CurrentUserProcess'
import { useSelector } from 'react-redux';


const UserTables = () => {

  const { currentUserTab } = useSelector(state => state.users)
  return (
      <div>
          <div className='text-center'>
            <TabSelector/>
          </div>
          <div>
            <div>

            </div>
              {/* {currentUserTab == 'process' && <CurrentUserProcess/>} */}
              {currentUserTab == 'files' && <CurrentUserAttachments/>}
              {/* {currentUserTab == 'movements' && <CurrentUserMovements/>} */}
          </div>
      </div>

  )
}

export default UserTables