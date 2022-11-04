import React from 'react'

const Paginator = ({totalItems, page, setPage}) => {
    return (
        <div className='d-flex'>
            <div className='me-2'>
                <p>{page === 1 ? page : (page-1)*10} a {page*10 > totalItems ? totalItems : page*10} de {totalItems}</p>
            </div>
            <div className='d-flex flex-between'>
                <i className="bi bi-chevron-left pointer me-1" onClick={()=> page-1 > 0 ? setPage(page-1) : null}/>
                <i className="bi bi-chevron-right pointer ms-1" onClick={()=> (page+1)*10 > totalItems + 9 ? null : setPage(page+1)}/>
            </div>
        </div>
    )
}

export default Paginator
