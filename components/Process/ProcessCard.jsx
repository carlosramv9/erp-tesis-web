import { useRouter } from 'next/router'
import React from 'react'
import ProcessTimelineCard from './ProcessTimelineCard';

const ProcessCard = ({ process }) => {
    const router = useRouter();
    const { customer, property, processTemplate, currentStepName, currentStep, statusName } = process
    return (
        <div className="card process" style={{ maxHeight: '300px' }} onClick={() => router.push('/process/' + process._id)}>
            <div className="card-body d-flex">
                <div className="card__info">
                    <h4 className="card-title">Cliente: {`${customer?.firstName} ${customer?.lastName}`}</h4>
                    <div className="my-4"></div>
                    <h5 className="card-text">Inmueble: {property?.title}</h5>
                    <h5 className="card-text">Proceso Actual: <span className="text-success">{currentStepName}</span></h5>
                    <h5 className="card-text">Estado: <span className="text-success">{statusName}</span></h5>
                </div>
                <div className="card__steps text-center">
                    {
                        processTemplate?.steps.map((data, index) => <ProcessTimelineCard key={index} step={data} index={index + 1} currentStep={currentStep} />)
                    }
                </div>
            </div>
        </div>
    )
}

export default ProcessCard