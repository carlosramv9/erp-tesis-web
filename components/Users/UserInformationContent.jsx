import React,{useState} from 'react'
import UserInformation from './UserInformation'
import UserTables from './UserTables'

const UserInformationContent = () => {
    return (
        <div className='row mt-4    '>
            <div className='col-12 col-md-6 col-xl-7'>
                <div className='d-flex flex-column'>
                    <UserTables/>
                </div>
            </div>
            <div className='col-12 col-md-6 col-xl-5' >
                <UserInformation/>
            </div>
        </div>
    )
}

export default UserInformationContent
