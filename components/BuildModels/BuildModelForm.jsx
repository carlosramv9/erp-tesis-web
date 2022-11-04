import { useForm } from "react-hook-form";
import { getToken } from '../../api/token';
import { toast } from "react-toastify";
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { addBuildModelsAction, updateBuildModelsAction, deleteBuildModelsAction } from '../../store/actions/buildModelActions';
import { useState, useEffect } from "react";
import Required from './../shared/Required';

export const BuildModelForm = ({ show, buildModel }) => {
    const dispatch = useDispatch();
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [radio, setradio] = useState(buildModel ? buildModel.type === 'house' : true)
    const divisionsList = useSelector(state => state.divisions.divisions)

    const processData = async (data, e) => {
        const token = getToken();
        if (token) {
            if (buildModel) {
                const _data = {
                    name: data.name != "" ? data.name : buildModel.name,
                    description: data.description != "" ? data.description : buildModel.description,
                    division: data.division,
                    type: radio ? 'house' : 'terrain',
                    floors: radio ? (data.floors != "" ? data.floors : buildModel.floors) : 0,
                    bedrooms: radio ? (data.bedrooms != "" ? data.bedrooms : buildModel.bedrooms) : 0,
                    bathrooms: radio ? (data.bathrooms != "" ? data.bathrooms : buildModel.bathrooms) : 0,
                    halfbathrooms: radio ? (data.halfbathrooms != "" ? data.halfbathrooms : buildModel.halfbathrooms) : 0,
                }
                await dispatch(updateBuildModelsAction(buildModel._id, _data))
                show(false)
                toast.success('Updated Successful')
            }
            else {
                await dispatch(addBuildModelsAction({ ...data, type: show ? 'house' : 'terrain' }))
                show(false)
                toast.success('Uploaded Successful')
            }
        } else {
            toast.error("Information Failed")
        }
        e.target.reset();
    }

    const deleteHandler = async () => {
        const token = await getToken();
        if (token) {

            await dispatch(deleteBuildModelsAction(buildModel._id))
            show(false)
            toast.success('Deleted Successful')

        } else {
            toast.error("Information not found")
        }
    }

    const onChange = (e) => {
        if (e.target.value === 'house' && e.target.checked) setradio(true)
        else setradio(false)
    }

    return (
        <div>
            <form onSubmit={handleSubmit(processData)} method="post" className=''>
                <div className="mb-3">
                    <Required />
                </div>
                <div className="row">
                    <div className="row card-select">
                        <label className="card-select-model m-3">
                            <input type="radio" className="bi bi-tree-fill" name="model" id="" value={'terrain'}
                                onChange={onChange}
                                defaultChecked={buildModel ? buildModel.type === 'terrain' : false}
                            />
                            <div className="card-select-model-container">
                                <i className="bi bi-tree-fill card-select-model-container-icon"></i>
                                <span>Terreno</span>
                            </div>
                        </label>
                        <label className="card-select-model m-3" >
                            <input type="radio" className="bi bi-tree-fill" name="model" id="" value={'house'}
                                onChange={onChange}
                                defaultChecked={buildModel ? buildModel.type === 'house' : true}
                            />
                            <div className="card-select-model-container">
                                <i className="bi bi-house-fill card-select-model-container-icon"></i>
                                <span>Casa</span>
                            </div>
                        </label>
                    </div>
                    <div className="row m-auto">
                        <div className="mb-3 col-md-12 col-sm-12">
                            <label className="mb-2" htmlFor=""><span className="color-primary h5">*</span> Fraccionamiento</label>
                            <select className="form-select" name='division' defaultValue={buildModel ? buildModel.division ? buildModel.division._id : 0 : 0}
                                {...register("division", buildModel ? { required: { value: true } } : { required: { value: true, message: 'The division is required' }, minLength: { value: 3, message: "Min lenght 3" } })} >
                                <option value={0} >Seleccionar Fraccionamiento...</option>
                                {
                                    divisionsList?.map((b, i) => (
                                        <option value={b._id} key={i}>{b.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <hr />
                        <div className="mb-6 col-12">
                            <label htmlFor="" className="form-label"><span className="color-primary h5">*</span> Nombre</label>
                            <input type="text" className="form-control" name='name'
                                defaultValue={buildModel ? buildModel.name : ''}
                                {...register("name", buildModel ? { required: { value: false } } : { required: { value: true, message: 'The Name is required' }, minLength: { value: 3, message: "Min lenght 3" } })} />
                            <span className='text-danger text-small d-block mb-2'>{errors?.name?.message}</span>
                        </div>
                        {
                            radio
                                ? (
                                    <div className="row mx-auto mt-2">
                                        <div className="mb-3 col-md-3 col-sm-12">
                                            <label htmlFor=""><span className="color-primary h5">*</span> Recámaras</label>
                                            <input type="number" className="form-control mx-auto" min={0}
                                                defaultValue={buildModel ? buildModel.bedrooms : 0} name='bedrooms'
                                                {...register("bedrooms", { required: { value: true, message: 'The number of bedrooms is required' } })}
                                            />
                                            <span className='text-danger text-small d-block mb-2'>{errors?.bedrooms?.message}</span>
                                        </div>
                                        <div className="mb-3 col-md-3 col-sm-12">
                                            <label htmlFor=""><span className="color-primary h5">*</span> Baños (Completos)</label>
                                            <input type="number" className="form-control" min={0}
                                                defaultValue={buildModel ? buildModel.bathrooms : 0} name='bathrooms' step={1}
                                                {...register("bathrooms", { required: { value: true, message: 'The number of bathrooms is required' } })}
                                            />
                                            <span className='text-danger text-small d-block mb-2'>{errors?.bathrooms?.message}</span>
                                        </div>
                                        <div className="mb-3 col-md-3 col-sm-12">
                                            <label htmlFor=""><span className="color-primary h5">*</span> Baños (Medios)</label>
                                            <input type="number" className="form-control" min={0}
                                                defaultValue={buildModel ? buildModel.halfbathrooms : 0} name='halfbathrooms' step={1}
                                                {...register("halfbathrooms", { required: { value: true, message: 'The number of half bathrooms is required' } })}
                                            />
                                            <span className='text-danger text-small d-block mb-2'>{errors?.bathrooms?.message}</span>
                                        </div>
                                        <div className="mb-3 col-md-3 col-sm-12">
                                            <label htmlFor=""><span className="color-primary h5">*</span> Plantas</label>
                                            <input type="number" className="form-control" min={0}
                                                defaultValue={buildModel ? buildModel.floors : 0} name='floors'
                                                {...register("floors", { required: { value: true, message: 'The number of floors is required' } })}
                                            />
                                            <span className='text-danger text-small d-block mb-2'>{errors?.floors?.message}</span>
                                        </div>
                                    </div>
                                )
                                : (<></>)
                        }
                        <div className="mb-6 col-12">
                            <label htmlFor="" className="form-label">Descripción</label>
                            <textarea className="form-control" id="exampleFormControlTextarea1" name="description" rows="3" defaultValue={buildModel ? buildModel.description : ""} {...register("description", buildModel ? { required: { value: false } } : { required: { value: false, message: 'The description is required' } })}></textarea>
                            <span className='text-danger text-small d-block mb-2'>{errors?.description?.message}</span>
                        </div>
                    </div>

                    {buildModel ?
                        (
                            <>
                                <input type="submit" value="Update" className='btn btn-block btn-action-primary p-5' />
                                <button type='button' onClick={() => deleteHandler()} className='btn btn-block btn-action-warning p-5 mt-3' >Delete</button>
                            </>
                        )
                        :
                        (
                            <input type="submit" value="Send" className='btn btn-block btn-action-primary p-5' />
                        )
                    }
                </div>
            </form>
        </div>
    )
}
