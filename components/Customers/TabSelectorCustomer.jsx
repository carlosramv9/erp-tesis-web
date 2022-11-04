import React from 'react'

const TabSelectorCustomer = ({selectedTable, setSelectedTable}) => {
  return (
    <div className='w-100 mt-4 bg-red'>
        <button type='button' onClick={() => setSelectedTable('buy')} className={selectedTable == 'buy'?'btn btn-primary rounded-0-right btn-active btn-tab-hover' :'btn btn-primary rounded-0-right'}>Compra</button>
        <button type='button' onClick={() => setSelectedTable('sale')} className={selectedTable == 'sale'?'btn btn-primary rounded-0 btn-active btn-tab-hover' :'btn btn-primary rounded-0'}>Venta</button>
    </div>
  )
}

export default TabSelectorCustomer