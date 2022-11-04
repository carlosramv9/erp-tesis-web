import React from 'react'

const NoDataFound = () => {
  return (
    <div className='mt-5 d-flex align-items-center justify-content-center'>
        <h1>No Data Found</h1><i style={{fontSize:"64px", fontWeight:"bold"}} className="bi bi-emoji-frown ms-5"></i>
    </div>
  )
}

export default NoDataFound