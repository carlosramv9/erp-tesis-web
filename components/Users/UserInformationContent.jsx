import React,{useState} from 'react'
import UserInformation from './UserInformation'
import UserTables from './UserTables'
import { useRouter } from 'next/router';

const UserInformationContent = () => {
    const router = useRouter();
    return (
        <div className='row mt-4    '>
            <div className="row my-3">
                <span className="col-md-2 col-sm-12 pointer" onClick={() => router.back()}>
                    <i className={`bi bi-arrow-return-left mx-3`}></i> {"Regresar"}
                </span>
            </div>
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
