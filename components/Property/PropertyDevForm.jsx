import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Router from 'next/router'
import { getToken } from '../../api/token';
import { toast } from "react-toastify";
import dayjs from 'dayjs';
import Tag from '../Tags/TagComponent'
import Required from "../shared/Required";
import useDynamicFields from '../../hooks/useDynamicFields';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { addPropertiesAction, updatePropertiesAction, deletePropertiesAction, getPropertiesAction } from '../../store/actions/propertyActions';
import { useState } from "react";
import { validate } from "uuid";
import { string } from "sharp/lib/is";
import { DocsMenu } from "./DocsMenu";

export const PropertyDevelopmentForm = ({ show, property, type, history, refresh, customer, externalURL }) => {
    const dispatch = useDispatch();
    const buildersList = useSelector(state => state.builders.builders)
    const divisionsList = useSelector(state => state.divisions.divisions)
    const buildModelsList = useSelector(state => state.buildModels.buildModels)
    const creditsList = useSelector(state => state.bankCredits.bankCredits)

    const { register, formState: { errors }, handleSubmit } = useForm();
    const [credits, setcredits] = useState([])
    const [selectedBuilder, setselectedBuilder] = useState(buildersList[0])
    const [selectedDivision, setselectedDivision] = useState(divisionsList[0])
    const [selectedBuildModel, setselectedBuildModel] = useState(buildModelsList[0])
    const [model, setModel] = useState()
    const [builders, setbuilders] = useState(buildersList)
    const [divisions, setdivisions] = useState(divisionsList?.filter(x => x.builder._id === selectedBuilder._id))
    const [buildModels, setbuildModels] = useState(buildModelsList?.filter(x => x.division._id === selectedDivision?._id))
    const [advanceShow, setadvanceShow] = useState(false)
    const [typeProperty, setType] = useState(type)
    const [customers, setCustomer] = useState([])
    const [ckDelivery, setckDelivery] = useState(false)
    const [discount, setDiscount] = useState(0)
    const [commission, setCommission] = useState(property ? property.commission : (selectedDivision?.commission ? selectedDivision.commission : 0))
    const [prices, setprices] = useState({
        price: property ? property.price : 0,
        appraisal: property ? property.appraisal : 0,
    })
    const [showDocs, setShowDocs] = useState(false)
    const [ckrepairs, setckRepairs] = useState(false)

    const assessments = useDynamicFields({ name: '', value: 0.0 })
    const services = useDynamicFields({ name: '', value: 0.0, chargeTo: 'owner' })
    const repairs = useDynamicFields({ name: '', value: 0.0, chargeTo: 'owner' })

    useEffect(() => {
        property ? setcredits(property.credits) : setcredits([])
        if (property) {
            setCommission(property.commission)
            setType(property.type)
            assessments.onPopulate(property.taxation)
            repairs.onPopulate(property.repairs)
            services.onPopulate(property.services)

            setdivisions(divisionsList?.filter(x => x._id === property.subdivision._id))
            setbuildModels(buildModelsList.filter(x => x._id === property.model._id))

            setselectedBuilder(property.builder)
            setselectedDivision(property.subdivision)
            setselectedBuildModel(property.model)

            setModel(buildModelsList.filter(x => x._id === property.model._id)?.pop())
            
            if (property.repairs.length > 0 && property.repairs[0].name != '') {
                setckRepairs(true)
                ckRestore.checked = true
            }
        } else
            addCustomer(1)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const { price, appraisal } = prices
        setDiscount(Number(appraisal) - Number(price))
    }, [prices])

    useEffect(() => {
        setModel(buildModelsList.filter(x => x._id === selectedBuildModel?._id)?.pop())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedBuildModel])

    //useEffect(() => setCommission(selectedDivision.commission ?? 0), [selectedDivision])
    

    const processData = async (data, e) => {
        const token = getToken();
        if (token) {
            if (property) {
                var _data = {
                    ...data,
                    builder: data.builder != "" ? data.builder : property.builder,
                    title: data.title != "" ? data.title : property.title,
                    subdivision: selectedDivision._id,
                    model: selectedBuildModel._id,
                    constructionmts: data.constructionmts != "" ? data.constructionmts : property.constructionmts,
                    mtsland: data.mtsland != "" ? data.mtsland : property.mtsland,
                    equipment: data.equipment != "" ? data.equipment : property.equipment,
                    creditsAmount: data.creditsAmount != "" ? data.creditsAmount : property.creditsAmount,
                    price: data.price != "" ? data.price : property.price,
                    appraisal: data.appraisal != "" ? data.appraisal : property.appraisal,
                    discount: discount,
                    deliveryTime: data.deliveryTime != "" ? data.deliveryTime : property.deliveryTime,
                    type: typeProperty,
                    businessType: model ? model.type : property.businessType,
                    floors: model ? model.floors : 0,
                    bedrooms: model ? model.bedrooms : 0,
                    bathrooms: model ? model.bathrooms : 0,
                    halfbathrooms: model ? model.halfbathrooms : 0,
                    street: data.street != "" ? data.street : property.street,
                    suburb: data.suburb != "" ? data.suburb : property.suburb,
                    number: data.number != "" ? data.number : property.number,
                    credits,
                    attachments: property.attachments,
                    soldBy: data.soldBy,
                    commission
                }

                if (assessments.array.length > 0 && assessments.array[0].name != '') {
                    _data.taxation = assessments.array
                }

                if (services.array.length > 0 && services.array[0].name != '') {
                    _data.services = services.array
                }

                if (repairs.array.length > 0 && repairs.array[0].name != '') {
                    _data.repairs = repairs.array
                }

                if (customers.length > 0 && customers[0] != '') {
                    _data.customers = customers
                }

                dispatch(updatePropertiesAction(property._id, _data))
                show(false)
                toast.success('Updated Successful')
            }
            else {
                const _data = {
                    ...data,
                    credits,
                    type: typeProperty,
                    businessType: model ? model.type : "",
                    discount: discount,
                    street: data.street != "" ? data.street : property.street,
                    suburb: data.suburb != "" ? data.suburb : property.suburb,
                    number: data.number != "" ? data.number : property.number,
                    taxation: assessments.array,
                    services: services.array,
                    repairs: repairs.array,
                    subdivision: selectedDivision._id,
                    model: selectedBuildModel._id,
                    floors: model ? model.floors : 0,
                    bedrooms: model ? model.bedrooms : 0,
                    bathrooms: model ? model.bathrooms : 0,
                    halfbathrooms: model ? model.halfbathrooms : 0,
                    commission
                }

                if (customers.length > 0 && customers[0] != '') {
                    _data.customers = customers
                }
                //console.log(_data)
                console.log(model)
                dispatch(addPropertiesAction(_data))
                show(false)
                toast.success('Uploaded Successful')
                if (externalURL) route.push(externalURL)
            }
        } else {
            toast.error("Information Failed")
        }

        e.target.reset();
    }

    const deleteHandler = async () => {
        const token = await getToken();
        if (token) {

            dispatch(deletePropertiesAction(property._id))
            show(false)
            toast.success('Deleted Successful')
            Router.push(`/properties?type=${property.type}`)

        } else {
            toast.error("Information not found")
        }
    }

    const inputHandler = ({ target }) => {
        let name = target[target.options.selectedIndex].text
        let credit = {
            id: target.value,
            name
        }
        if (target.options.selectedIndex > 0 && !credits.includes(credit)) {
            setcredits([...credits, credit])
        }
        document.querySelector('#cboTag').value = ""
    }

    const addCustomer = (n) => {
        var array = []
        for (let i = 0; i < n; i++) {
            if (customers[i])
                array.push(customers[i])
            else
                array.push('')
        }
        setCustomer(array)
    }

    const calculate = (e) => {
        const { name, value } = e.target

        setprices({ ...prices, [name]: value })
    }


    return (
        <div>
            <DocsMenu show={showDocs} setShow={setShowDocs} />
            <form onSubmit={handleSubmit(processData)} method="post" className='form-box'>
                <div className="mb-3">
                    <Required />
                </div>
                <div className="row">

                    {/** ============================ DETAILS ============================================= */}
                    <hr />
                    <div className="row m-auto">
                        <div className={typeProperty != 'development' ? "" : "mb-3 col-md-6 col-sm-12"}>
                            <div>
                                <label htmlFor="" className="form-label"><span className="color-primary h5">*</span> Constructora</label>
                                <select
                                    className="form-select" name='builder' value={selectedBuilder._id}
                                    onChangeCapture={(e) => {
                                        var builders = buildersList?.filter(x => x._id === e.target.value)
                                        var divisions = divisionsList?.filter(x => x.builder._id === e.target.value)
                                        var models = buildModelsList?.filter(x => x.division._id === divisions[0]?._id)
                                        setselectedBuilder(builders[0])
                                        setdivisions(divisions)
                                        setselectedDivision(divisions[0])
                                        setbuildModels(models)
                                        setselectedBuildModel(models[0])
                                    }}
                                    {...register("builder", property ? { required: { value: true } } : { required: { value: true, message: 'The builder is required' }, minLength: { value: 3, message: "Min lenght 3" } })} >
                                    {
                                        builders?.map((b, i) => (
                                            <option value={b._id} key={i}>{b.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <span className='text-danger text-small d-block mb-2'>{errors?.builder?.message}</span>
                        </div>
                        <div className={typeProperty != 'development' ? "mb-3 col-md-12 col-sm-12" : "mb-3 col-md-6 col-sm-12"}>
                            <label htmlFor="" className="form-label"><span className="color-primary h5">*</span> Fraccionamiento</label>
                            <select className="form-select" name='subdivision' value={selectedDivision?._id}
                                onChangeCapture={(e) => {
                                    var divisions = divisionsList?.filter(x => x._id === e.target.value)
                                    var models = buildModelsList?.filter(x => x.division._id === e.target.value)
                                    setCommission(divisions[0].commission ?? 0)
                                    setselectedDivision(divisions[0])
                                    setbuildModels(models)
                                    setselectedBuildModel(models[0] && '')
                                }}
                                {...register("subdivision", property ? { required: { value: true } } : { required: { value: true, message: 'The subdivision is required' }, minLength: { value: 3, message: "Min lenght 3" } })} >
                                {
                                    divisions?.map((b, i) => (
                                        <option value={b._id} key={i}>{b.name}</option>
                                    ))
                                }
                            </select>
                            <span className='text-danger text-small d-block mb-2'>{errors?.subdivision?.message}</span>
                        </div>

                    </div>
                    <div className="row m-auto">
                        <div className="mb-3 col-md-6 col-sm-12">
                            <label htmlFor=""><span className="color-primary h5">*</span> Modelo</label>
                            <select className="form-select" name='model' value={selectedBuildModel?._id}
                                onChangeCapture={(e) => {
                                    var models = buildModelsList?.filter(x => x._id === e.target.value)
                                    setselectedBuildModel(models[0])
                                }}
                                {...register("model", property ? { required: { value: true } } : { required: { value: true, message: 'The model is required' }, minLength: { value: 3, message: "Min lenght 3" } })} >
                                {
                                    buildModels?.map((b, i) => (
                                        <option value={b._id} key={i}>{b.name}</option>
                                    ))
                                }
                            </select>
                            <span className='text-danger text-small d-block mb-2'>{errors?.model?.message}</span>
                        </div>
                        <div className="mb-3 col-md-6 col-sm-12">
                            <label htmlFor="" className="form-label">Tipo de Propiedad</label>
                            <select className="form-select" name='businessType' value={model ? model.type : ""}
                                {...register("businessType", property ? { required: { value: false } } : { required: { value: false, message: 'The business Type is required' }, minLength: { value: 3, message: "Min lenght 3" } })} disabled >
                                <option value={'house'}>Casa</option>
                                <option value={'local'}>Local</option>
                                <option value={'terrain'}>Terreno</option>
                            </select>
                            <span className='text-danger text-small d-block mb-2'>{errors?.businessType?.message}</span>
                        </div>
                    </div>
                    <div className="row m-auto">
                        <div className="mb-3 col-md-12 col-sm-12">
                            <label htmlFor=""><span className="color-primary h5">*</span> Título de Propiedad</label>
                            <input type="text" className="form-control"
                                defaultValue={property ? property.title : ''} name='title'
                                {...register("title", property ? { required: { value: false } } : { required: { value: true, message: 'Titulo de la propiedad obligatoria' } })}
                            />
                            <span className='text-danger text-small d-block mb-2'>{errors?.title?.message}</span>
                        </div>
                    </div>
                    <div className="row m-auto">
                        <div className="mb-3 col-md-6 col-sm-12">
                            <label htmlFor=""><span className="color-primary h5">*</span> Mts. Terreno</label>
                            <input type="number" className="form-control" min={0}
                                defaultValue={property ? property.mtsland : 0} name='mtsland' step={0.100}
                                {...register("mtsland", property ? { required: { value: false }, min: { value: 0, message: 'Ingrese valor mayor a 0' } } : { required: { value: true, message: 'The mts of land is required' }, min: { value: 0, message: 'Ingrese valor mayor a 0' } })}
                            />
                            <span className='text-danger text-small d-block mb-2'>{errors?.mtsland?.message}</span>
                        </div>
                        <div className=" mb-3 col-md-6 col-sm-12">
                            <label htmlFor=""><span className="color-primary h5">*</span> Mts. Construcción</label>
                            <input type="number" className="form-control" name='constructionmts' step={0.100} min={0}
                                defaultValue={property ? property.constructionmts : 0} {...register("constructionmts", property ? { required: { value: false } } : { required: { value: true, message: 'The construction mts is required' } })} />
                            <span className='text-danger text-small d-block mb-2'>{errors?.constructionmts?.message}</span>
                        </div>
                    </div>

                    <div className="row m-auto">
                        <div className="mb-3 col-md-12 col-sm-12">
                            <label htmlFor=""><span className="color-primary h5">*</span> Equipamiento</label>
                            <textarea type="text" className="form-control" rows={3}
                                defaultValue={property ? property.equipment : ''} name='equipment'
                                {...register("equipment", property ? { required: { value: false } } : { required: { value: true, message: 'The equipment is required' } })}
                            />
                            <span className='text-danger text-small d-block mb-2'>{errors?.equipment?.message}</span>
                        </div>
                    </div>
                    {/** ============================ UBICATION ============================================= */}
                    <hr />
                    <div className="row m-auto">

                        <div className="mb-3 col-md-6 col-sm-12">
                            <label htmlFor=""><span className="color-primary h5">*</span> Calle</label>
                            <input type="text" className="form-control" name='street'
                                defaultValue={property ? property.street : ''} {...register("street", property ? { required: { value: false } } : { required: { value: true, message: 'The street is required' } })} />
                            <span className='text-danger text-small d-block mb-2'>{errors?.street?.message}</span>
                        </div>
                        <div className="mb-3 col-md-6 col-sm-12">
                            <label htmlFor=""><span className="color-primary h5">*</span> Colonia</label>
                            <input type="text" className="form-control" name='suburb'
                                defaultValue={property ? property.suburb : ''} {...register("suburb", property ? { required: { value: false } } : { required: { value: true, message: 'The suburb is required' } })} />
                            <span className='text-danger text-small d-block mb-2'>{errors?.suburb?.message}</span>
                        </div>
                        <div className="mb-3 col-md-6 col-sm-12">
                            <label htmlFor=""><span className="color-primary h5">*</span> Numero</label>
                            <input type="number" className="form-control" name='number' min={0}
                                defaultValue={property ? property.number : 0} {...register("number", property ? { required: { value: false } } : { required: { value: true, message: 'The number is required' } })} />
                            <span className='text-danger text-small d-block mb-2'>{errors?.number?.message}</span>
                        </div>
                        <div className="mb-3 col-md-6 col-sm-12">
                            <label htmlFor=""><span className="color-primary h5">*</span> Código Postal</label>
                            <input type="number" className="form-control" name='zipcode' min={0}
                                defaultValue={property ? property.zipcode : 0} {...register("zipcode", property ? { required: { value: false } } : { required: { value: true, message: 'The zipcode is required' } })} />
                            <span className='text-danger text-small d-block mb-2'>{errors?.zipcode?.message}</span>
                        </div>
                    </div>
                    {/** ============================ COSTS ============================================= */}
                    <hr className="px-4" />
                    <div className="row m-auto">
                        <div className="mb-3 col-xl-4 col-md-6 col-sm-12">
                            <label htmlFor="">Precio</label>
                            <input type="number" className="form-control" name='price' min={0}
                                value={prices.price} onChangeCapture={calculate}
                                {...register("price", property ? { required: { value: false } } : { required: { value: false } })}
                            />
                            <span className='text-danger text-small d-block mb-2'>{errors?.price?.message}</span>
                        </div>
                        <div className="mb-3 col-xl-4 col-md-6 col-sm-12">
                            <label htmlFor="">Avalúo</label>
                            <input type="number" className="form-control" name='appraisal' min={0}
                                value={prices.appraisal} onChangeCapture={calculate}
                                {...register("appraisal", property ? { required: { value: false } } : { required: { value: false, message: 'The appraisal is required' } })}
                            />
                            <span className='text-danger text-small d-block mb-2'>{errors?.appraisal?.message}</span>
                        </div>
                        {/* //////////////////// */}
                        <div className="mb-3 col-xl-4 col-md-6 col-sm-12">
                            <label htmlFor="">Tipo de Cambio</label>
                            <select className="form-select" name='exchangeRate' defaultValue={property ? property.exchangeRate : ""}
                                {...register("exchangeRate", property ? { required: { value: true } } : { required: { value: true, message: 'The exchange rate is required' }, minLength: { value: 3, message: "Min lenght 3" } })} >
                                <option value={'MXN'}>MXN</option>
                                <option value={'USD'}>USD</option>
                            </select>
                            <span className='text-danger text-small d-block mb-2'>{errors?.exchangeRate?.message}</span>
                        </div>
                    </div>
                    <div className="row m-auto">
                        <div className="mb-3 col-md-3 col-sm-12">
                            <label htmlFor="">Bono</label>
                            <input type="number" className="form-control" name='discount' min={0}
                                value={discount} onChangeCapture={(e) => setDiscount(e.target.value)}
                                {...register("discount", property ? { required: { value: false } } : { required: { value: false, message: 'The discount is required' } })}
                            />
                            <span className='text-danger text-small d-block mb-2'>{errors?.discount?.message}</span>
                        </div>
                        <div className="mb-3 col-md-3 col-sm-12">
                            <label htmlFor="">Comisión</label>
                            <input type="number" className="form-control" name='commission' min={0}
                                value={commission} onChangeCapture={(e)=> setCommission(e.target.value)}
                                {...register("commission", property ? { required: { value: false } } : { required: { value: false, message: 'The discount is required' } })}
                            />
                            <span className='text-danger text-small d-block mb-2'>{errors?.discount?.message}</span>
                        </div>
                        <div className="mb-3 col-md-2 col-sm-12">
                            <label htmlFor="">Comisión por:</label>
                            <select className="form-select" name='commissionType' defaultValue={property ? property.commissionType : selectedDivision?.commissionType ? selectedDivision?.commissionType : 'percentage'}
                                {...register("commissionType", property ? { required: { value: true } } : { required: { value: true, message: 'The exchange rate is required' }, minLength: { value: 3, message: "Min lenght 3" } })} >
                                <option value={'percentage'} selected>%</option>
                                <option value={'currency'}>$</option>
                            </select>
                            <span className='text-danger text-small d-block mb-2'>{errors?.exchangeRate?.message}</span>
                        </div>
                        <div className="row mb-3 col-md-4 col-sm-12">
                            <div className="col">
                                <label htmlFor="">Tiempo de Entrega (Dias)</label>
                                <input name='deliveryTime' type="number" placeholder='Tiempo de Entrega' min={0} defaultValue={property ? property.deliveryTime : 0} className='form-control' disabled={ckDelivery} {...register("deliveryTime", property ? { required: { value: false } } : { required: { value: false, message: 'The delivery Time is required' } })} />
                                <span className='text-danger text-small d-block mb-2'>{errors?.deliveryTime?.message}</span>
                            </div>
                            <div className="col my-auto">
                                <input type="checkbox" id="deliveryNow" defaultValue={ckDelivery} onClick={() => { setckDelivery(!ckDelivery) }} className="form-check-input" />
                                <label htmlFor="deliveryNow" className="ms-2" >Entrega Inmediata</label>
                            </div>
                        </div>
                    </div>
                    <hr className="px-4" />
                    <button type="button" className="text-button" onClick={() => setadvanceShow(!advanceShow)}>Avanzado <i className="bi bi-chevron-compact-down"></i></button>
                    <div className={advanceShow ? 'collapse-box my-3 show' : 'collapse-box my-3'} >

                        {
                            typeProperty !== 'rent' ?
                                (
                                    <div className="row m-auto d-flex">
                                        <div className="mb-3 col-md-6 col-sm-12">
                                            <label htmlFor="">Créditos</label>
                                            <select className="form-select" name='type' id="cboTag" onChange={inputHandler}>
                                                <option value="">Selecciona el tipo crédito</option>
                                                {
                                                    creditsList?.map((e, i) => (<option value={e.name} key={i} >{e.name}</option>))
                                                }
                                                {/* <option value="dos">dos</option> */}
                                            </select>
                                            <span className='text-danger text-small d-block mb-2'>{errors?.credits?.message}</span>
                                        </div>
                                        <div className="col-md-6 col-sm-12">
                                            <Tag tags={credits} settags={setcredits} />
                                        </div>
                                    </div>
                                ) : (<></>)
                        }

                        {/** ============================ FILES ============================================= */}

                        <hr />
                        {/* <PropertyDocUpload id={0} /> */}
                    </div>

                    <input type="text" {...register('type')} value={typeProperty} style={{ display: 'none' }} />
                    {property ?
                        (
                            <>
                                <input type="submit" value="Actualizar" className='btn btn-block btn-action-primary p-5' />
                                <button type='button' onClick={() => deleteHandler()} className='btn btn-block btn-action-warning p-5 mt-3' >Eliminar</button>
                            </>
                        )
                        :
                        (
                            <input type="submit" value="Enviar" className='btn btn-block btn-action-primary p-5' />
                        )
                    }
                </div>
            </form>
        </div>
    )
}
