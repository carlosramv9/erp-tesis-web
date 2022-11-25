import React, { useState } from 'react'
import { useEffect } from 'react'

const ProcessTimelineCard = ({ step, index, currentStep }) => {
    const [status, setStatus] = useState('')

    useEffect(() => {
        if ((index) === currentStep) setStatus('active')
        else if ((index) < currentStep) setStatus('success')
    }, [])


    return (
        <div className="card__steps__step d-flex flex-column align-items-center ">
            <div className={"card__steps__step--box mb-2 " + status}>{status === 'success' ? <i className="fa-solid fa-check"></i> : null}</div>
            <span className='text-center'>{step.name.length > 7 ? step.name.slice(0, 7) + '...' : step.name}</span>
        </div>
    )
}

export default ProcessTimelineCard