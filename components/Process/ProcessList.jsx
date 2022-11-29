import React from 'react'
import ProcessCard from './ProcessCard'
import { useSelector } from 'react-redux';
import Loading from './../shared/Loading';

const ProcessList = () => {
    const processesList = useSelector(state => state.processes.processes)
    const loading = useSelector(state => state.processes.loading)

    return (
        <div>
            {
                loading
                    ? <Loading></Loading>
                    : processesList?.map((data, index) =>
                        <div key={index} className={'mb-4'}><ProcessCard process={data} /></div>)}
        </div>
    )
}

export default ProcessList