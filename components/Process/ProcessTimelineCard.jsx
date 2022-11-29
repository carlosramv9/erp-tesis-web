import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { changeStepProcessAction } from '../../store/actions/processActions';

const ProcessTimelineCard = ({ process, readOnly = false }) => {
    const dispatch = useDispatch()

    return (
        <div className="card__steps text-center">
            {process?.processTemplate?.steps?.map((data, index) => {
                let status = ''
                if ((index + 1) === process?.currentStep && !readOnly)
                    status = ('active')
                else if (process?.steps[index]?.status === 'complete')
                    status = ('success')

                return <div key={index} className="card__steps__step d-flex flex-column align-items-center pointer"
                    onClick={() => dispatch(changeStepProcessAction(process?._id, index + 1))}>
                    <div className={"card__steps__step--box mb-2 " + status}>{status === 'success' ? <i className="fa-solid fa-check"></i> : null}</div>
                    <span className='text-center'>{data?.name.length > 7 ? data?.name.slice(0, 7) + '...' : data?.name}</span>
                </div>;
            })
            }
        </div>
    )
}

export default ProcessTimelineCard