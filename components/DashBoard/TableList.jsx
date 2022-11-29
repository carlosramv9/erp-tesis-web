import React from 'react'

const TableList = ({ title, total, children }) => {
    return (
        <div className='card dashboard-general-cards shadow p-4'>
            <h4>{`${title} (${total})`}</h4>
            { children }
        </div>
    )
}

export default TableList