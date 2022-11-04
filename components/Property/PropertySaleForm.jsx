import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Router from 'next/router'
import { getToken } from '../../api/token';
import { toast } from "react-toastify";
import Required from "../shared/Required";
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { addPropertiesAction, updatePropertiesAction, deletePropertiesAction } from '../../store/actions/propertyActions';
import { useState } from "react";
import { DocsMenu } from "./DocsMenu";
import useDynamicFields from '../../hooks/useDynamicFields';
import TagComponent from "../Tags/TagComponent";
import { getUserInfoListApi } from "../../api/users";
import useAuth from "../../hooks/useAuth";

export const PropertySaleForm = ({ show, property, type, history, refresh, customer, externalURL }) => {
  const dispatch = useDispatch();
  const { auth } = useAuth();
  const clientsList = useSelector(state => state.customers.customers.filter(x => x.type == 'Seller'))
  // const usersList = useSelector(state => state.users.users)
  const creditsList = useSelector(state => state.bankCredits.bankCredits)

  const { register, formState: { errors }, handleSubmit } = useForm();
  const [usersList, setUsersList] = useState([])
  const [credits, setcredits] = useState([])
  const [advanceShow, setadvanceShow] = useState(false)
  const [typeProperty, setType] = useState(type)
  const [cantSellers, setCantSellers] = useState(1)
  const [customers, setCustomer] = useState([])
  const [terrain, setterrain] = useState('')
  const [ckDelivery, setckDelivery] = useState(false)
  const [discount, setDiscount] = useState(0)
  const [commission, setCommission] = useState(property ? property.commission : 0)
  const [showDocs, setShowDocs] = useState(false)
  const [ckrepairs, setckRepairs] = useState(false)
  const [soldBy, setSoldBy] = useState(property ? property.soldBy : auth.idUser)
    const [prices, setprices] = useState({
        price: property ? property.price : 0,
        appraisal: property ? property.appraisal : 0,
    })

  const assessments = useDynamicFields({ name: '', value: 0.0 })
  const services = useDynamicFields({ name: '', value: 0.0, chargeTo: 'owner' })
  const repairs = useDynamicFields({ name: '', value: 0.0, chargeTo: 'owner' })

  useEffect(() => {
    property ? setcredits(property.credits) : setcredits([])

    getUserInfoListApi()
      .then(data => {
        setUsersList(data?.users)
      })

    if (property) {
      setType(property.type)
      assessments.onPopulate(property.taxation)
      repairs.onPopulate(property.repairs)
      services.onPopulate(property.services)
      if (property.repairs.length > 0 && property.repairs[0].name != '') {
        setckRepairs(true)
        ckRestore.checked = true
      }
      if (property.customers) {
        setCantSellers(property.customers.length > 0 ? property.customers.length : 5)
        setCustomer(property.customers)
      }
      if (property.credits) {
        creditsList?.forEach((data) => {
          if (property.credits.includes(data._id))
            setcredits([...credits, { id: data._id, name: data.name }])
        })
      }

    } else
      addCustomer(1)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const { price, appraisal } = prices

    setDiscount(Number(appraisal) - Number(price))
  }, [prices])

  const submitNewProperty = async (_property) => dispatch(addPropertiesAction(_property));
  const submitDeleteProperty = async () => dispatch(deletePropertiesAction(property._id));
  const submitUpdateProperty = async (_property) => dispatch(updatePropertiesAction(property._id, _property));

  const processData = async (data, e) => {
    const token = getToken();
    if (token) {
      if (property) {
        var _data = {
          ...data,
          builder: data.builder != "" ? data.builder : property.builder,
          subdivision: data.subdivision != "" ? data.subdivision : property.subdivision,
          model: data.model != "" ? data.model : property.model,
          constructionmts: data.constructionmts != "" ? data.constructionmts : property.constructionmts,
          mtsland: data.mtsland != "" ? data.mtsland : property.mtsland,
          equipment: data.equipment != "" ? data.equipment : property.equipment,
          creditsAmount: data.creditsAmount != "" ? data.creditsAmount : property.creditsAmount,
          price: data.price != "" ? data.price : property.price,
          appraisal: data.appraisal != "" ? data.appraisal : property.appraisal,
          discount,
          deliveryTime: data.deliveryTime != "" ? data.deliveryTime : property.deliveryTime,
          type: typeProperty,
          businessType: data.businessType != "" ? data.businessType : property.businessType,
          floors: data.businessType != "terrain" ? data.floors : 0,
          bedrooms: data.businessType != "terrain" ? data.bedrooms : 0,
          bathrooms: data.businessType != "terrain" ? data.bathrooms : 0,
          halfbathrooms: data.businessType != "terrain" ? data.halfbathrooms : 0,

          street: data.street != "" ? data.street : property.street,
          suburb: data.suburb != "" ? data.suburb : property.suburb,
          number: data.number != "" ? data.number : property.number,
          credits: credits.map(x => x.id),
          attachments: property.attachments,
          soldBy
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

        await submitUpdateProperty(_data)
        show(false)
        toast.success('Updated Successful')
      }
      else {
        const _data = {
          ...data,
          credits: credits.map(x => x.id),
          type: typeProperty,
          soldBy: soldBy,
          businessType: data.businessType != "" ? data.businessType : property.businessType,
          floors: data.businessType != "terrain" ? data.floors : 0,
          bedrooms: data.businessType != "terrain" ? data.bedrooms : 0,
          bathrooms: data.businessType != "terrain" ? data.bathrooms : 0,
          halfbathrooms: data.businessType != "terrain" ? data.halfbathrooms : 0,
          street: data.street != "" ? data.street : property.street,
          suburb: data.suburb != "" ? data.suburb : property.suburb,
          number: data.number != "" ? data.number : property.number,
          taxation: assessments.array,
          services: services.array,
          repairs: repairs.array, 
          discount
        }

        if (customers.length > 0 && customers[0] != '') {
          _data.customers = customers
        }

        await submitNewProperty(_data)
        show(false)
        toast.success('Uploaded Successful')
        if (externalURL) Router.push(externalURL)
      }
    } else {
      toast.error("Information Failed")
    }

    e.target.reset();
  }

  const deleteHandler = async () => {
    const token = await getToken();
    if (token) {

      await submitDeleteProperty()
      show(false)
      toast.success('Deleted Successful')
      Router.push(`/properties?type=${property.type}`)

    } else {
      toast.error("Information not found")
    }
  }

  const inputHandlerCheck = (event, id, name) => {
    let credit = {
      id,
      name
    }
    if (event.target.checked && !credits?.some((_id) => _id === id)) {
      setcredits([...credits, credit])
    }
    else {
      setcredits(credits?.filter(x => x.id !== credit.id))
    }
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
          <div className="row m-auto">
            <div className="mb-3 col-md-3 col-sm-12">
              <label htmlFor=""><span className="color-primary h5">*</span> Cant. de Dueños</label>
              <input type="number" className="form-control" min={0}
                value={cantSellers} name='customers' step={1} onChange={({ target }) => {
                  setCantSellers(target.value)
                  addCustomer(target.value)
                }}
              />
            </div>
            {
              customers?.map((e, i) => (
                <div className="mb-3 col-md-12 col-sm-12" key={i}>
                  <label htmlFor=""><span className="color-primary h5">*</span> Cliente</label>
                  <select className="form-select" name='customer' defaultValue={(property ? property.customers[i] : customer ? customer._id : '')} onChangeCapture={
                    ({ target }) => {
                      customers[i] = target.value
                    }
                  }
                  >
                    <option value={''}>Seleccione Cliente...</option>
                    {
                      clientsList?.map((b, i) => (
                        <option value={b._id} key={i}>{b.firstName + ' ' + b.lastName}</option>
                      ))
                    }
                  </select>
                  <span className='text-danger text-small d-block mb-2'>{errors?.customer?.message}</span>
                </div>
              ))
            }
          </div>

          <div className="row m-auto col-md-12 col-sm-12mb-3">
            <label htmlFor="">Realiza Venta</label>
            <div className="mb-3 col-md-12 col-sm-12">
              <select className="form-select" name="soldBy" value={soldBy} {...register("soldBy")}
                onChange={(e) => {
                  setSoldBy(e.target.value)
                }} >
                <option value={''}>Seleccionar Vendedor...</option>
                {
                  usersList?.map(
                    (e, i) => {
                      return (
                        <option value={e?._id} key={i} >{e?.firstName + ' ' + e?.lastName + ` (${e?.role[0]?.role})`}</option>
                      )
                    }
                  )
                }
              </select>
            </div>
          </div>
          <hr />
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
            <div className="mb-3 col-md-6 col-sm-12">
              <label htmlFor=""><span className="color-primary h5">*</span> Equipamiento</label>
              <textarea type="text" className="form-control" rows={1}
                defaultValue={property ? property.equipment : ''} name='equipment'
                {...register("equipment", property ? { required: { value: false } } : { required: { value: true, message: 'The equipment is required' } })}
              />
              <span className='text-danger text-small d-block mb-2'>{errors?.equipment?.message}</span>
            </div>
            <div className="mb-3 col-md-6 col-sm-12">
              <label htmlFor="" className="form-label"><span className="color-primary h5">*</span> Tipo de Propiedad</label>

              {/*====================================*/}

              <select className="form-select" name='businessType' defaultValue={property ? property.businessType : ""} onChangeCapture={(e) => { console.log(e.target.value); setterrain(e.target.value) }}
                {...register("businessType", property ? { required: { value: true } } : { required: { value: true, message: 'The business Type is required' }, minLength: { value: 3, message: "Min lenght 3" } })} >
                <option value={'house'}>Casa</option>
                <option value={'local'}>Local</option>
                <option value={'terrain'}>Terreno</option>
              </select>
              <span className='text-danger text-small d-block mb-2'>{errors?.businessType?.message}</span>
            </div>
          </div>
          {
            terrain !== 'terrain' ? (
              <div className="row mx-auto mt-2">
                <div className="mb-3 col-md-3 col-sm-12">
                  <label htmlFor=""><span className="color-primary h5">*</span> Recámaras</label>
                  <input type="number" className="form-control mx-auto" min={0}
                    defaultValue={property ? property.bedrooms : 0} name='bedrooms'
                    {...register("bedrooms", { required: { value: true, message: 'The number of bedrooms is required' } })}
                  />
                  <span className='text-danger text-small d-block mb-2'>{errors?.bedrooms?.message}</span>
                </div>
                <div className="mb-3 col-md-3 col-sm-12">
                  <label htmlFor=""><span className="color-primary h5">*</span> Baños (Completos)</label>
                  <input type="number" className="form-control" min={0}
                    defaultValue={property ? property.bathrooms : 0} name='bathrooms' step={1}
                    {...register("bathrooms", { required: { value: true, message: 'The number of bathrooms is required' } })}
                  />
                  <span className='text-danger text-small d-block mb-2'>{errors?.bathrooms?.message}</span>
                </div>
                <div className="mb-3 col-md-3 col-sm-12">
                  <label htmlFor=""><span className="color-primary h5">*</span> Baños (Medios)</label>
                  <input type="number" className="form-control" min={0}
                    defaultValue={property ? property.halfbathrooms : 0} name='halfbathrooms' step={1}
                    {...register("halfbathrooms", { required: { value: true, message: 'The number of half bathrooms is required' } })}
                  />
                  <span className='text-danger text-small d-block mb-2'>{errors?.bathrooms?.message}</span>
                </div>
                <div className="mb-3 col-md-3 col-sm-12">
                  <label htmlFor=""><span className="color-primary h5">*</span> Plantas</label>
                  <input type="number" className="form-control" min={0}
                    defaultValue={property ? property.floors : 0} name='floors'
                    {...register("floors", { required: { value: true, message: 'The number of floors is required' } })}
                  />
                  <span className='text-danger text-small d-block mb-2'>{errors?.floors?.message}</span>
                </div>
              </div>) : (<></>)
          }
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
                disabled />
              <span className='text-danger text-small d-block mb-2'>{errors?.discount?.message}</span>
            </div>
            <div className="mb-3 col-md-3 col-sm-12">
              <label htmlFor="">Comisión</label>
              <input type="number" className="form-control" name='commission' min={0}
                value={commission} onChangeCapture={(e) => setCommission(e.target.value)}
                {...register("commission", property ? { required: { value: false } } : { required: { value: false, message: 'The discount is required' } })}
              />
              <span className='text-danger text-small d-block mb-2'>{errors?.discount?.message}</span>
            </div>
            <div className="mb-3 col-md-2 col-sm-12">
              <label htmlFor="">Comisión por:</label>
              <select className="form-select" name='commissionType' defaultValue={property ? property.commissionType : ""}
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
                    <label htmlFor="" className="mb-3" >Selecciona los créditos aceptados</label>
                    <div className="mb-3 col-md-12 col-sm-12 credit-box">
                      {
                        creditsList?.map((credit, index) => (
                          <div key={index}>
                            <input type="checkbox" name={credit.name} id={"credit" + index} defaultChecked={property ? property.credits?.some(x => x === credit._id) : false} className="form-check-input" onChange={(e) => inputHandlerCheck(e, credit._id, credit.name)} />
                            <label htmlFor={"credit" + index} className="ms-2" >{credit.name}</label>
                          </div>
                        ))
                      }
                    </div>

                    {/* <div className="col-md-6 col-sm-12">
                      <TagComponent tags={credits} settags={setcredits} />
                    </div> */}
                  </div>
                ) : (<></>)
            }

            {/* ===================================== GRAVAMEN ========================================= */}

            <div className="row col-md-12 col-sm-12 m-auto d-flex mb-3">
              <div>
                <label htmlFor="">Gravamen</label>
                <button type="button" className="text-button text-warning" onClick={assessments.onAdd}><i className="bi bi-plus-square-fill ms-2" style={{ fontSize: '1.2em' }}></i></button>
              </div>
              {
                assessments.array?.map((e, i) => {
                  return (
                    <div className="row" key={i}>
                      <div className="col-md-3">
                        <input type="text" value={e.name} className='form-control my-2' name="name"
                          onChange={event => assessments.onChange(i, event)}
                        />
                      </div>
                      <div className="col-md-3">
                        <input type="number" min={0} value={e.value} className='form-control my-2' name="value"
                          onChange={event => assessments.onChange(i, event)}
                        />
                      </div>
                      <div className="col-md-1 my-auto d-flex justify-content-between">
                        <button type="button" className="btn-delete text-center my-auto"
                          onClick={() => assessments.onDelete(i)}
                        >
                          <i className="bi bi-x text-danger" style={{ fontSize: '32px' }}></i>
                        </button>
                        <button type="button" className="btn-upload text-warning"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Cargar Documento a Gravamen" onClick={
                            () => setShowDocs(!showDocs)
                          } >
                          <i className="bi bi-cloud-arrow-up-fill"></i>
                        </button>
                      </div>
                    </div>
                  )
                })
              }
            </div>

            {/* ===================================== SERVICIOS ========================================= */}

            <div className="row col-md-12 col-sm-12 m-auto d-flex mb-3">
              <div>
                <label htmlFor="">Servicios</label>
                <button type="button" className="text-button text-warning" onClick={services.onAdd}><i className="bi bi-plus-square-fill ms-2" style={{ fontSize: '1.2em' }}></i></button>
              </div>
              {
                services.array?.map((e, i) =>
                (
                  <div className="row" key={i}>
                    <div className="col-md-3">
                      <label htmlFor="">Tipo</label>
                      <input name='name' type="text" min={0} value={e.name} className='form-control my-2'
                        onChange={event => services.onChange(i, event)}
                      />
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="">Costo</label>
                      <input name='value' type="number" min={0} value={e.value} className='form-control my-2'
                        onChange={event => services.onChange(i, event)}
                      />
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="">Cargo a</label>
                      <select name="chargeTo" className="form-select my-2" value={e.chargeTo}
                        onChange={event => services.onChange(i, event)}
                      >
                        <option value="realestate">Inmobiliaria</option>
                        <option value="owner">Dueño</option>
                      </select>
                    </div>
                    <div className="col-md-1 mt-auto d-flex justify-content-between">
                      <button type="button" className="btn-delete text-center my-auto"
                        onClick={() => services.onDelete(i)}
                      >
                        <i className="bi bi-x text-danger" style={{ fontSize: '32px' }}></i>
                      </button>
                      <button type="button" className="btn-upload text-warning"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Cargar Documento a Servicio" onClick={
                          () => setShowDocs(!showDocs)
                        } >
                        <i className="bi bi-cloud-arrow-up-fill"></i>
                      </button>
                    </div>
                  </div>
                ))
              }
            </div>

            {/* ==================================== REPARACIONES ============================================ */}

            <div className=" ms-3 col-md-12 col-sm-12mb-3">
              <input type="checkbox" id="ckRestore" className="form-check-input" defaultValue={ckrepairs} onClick={() => setckRepairs(!ckrepairs)} />
              <label htmlFor="ckRestore" className="ms-2" > ¿Requiere Reparaciones?</label>
            </div>

            <div className="row col-md-12 col-sm-12 m-auto d-flex my-3">
              {
                ckrepairs
                  ? (<>
                    <div>
                      <label htmlFor="">Reparaciones</label>
                      <button type="button" className="text-button text-warning" onClick={repairs.onAdd}><i className="bi bi-plus-square-fill ms-2" style={{ fontSize: '1.2em' }}></i></button>
                    </div>
                    <div className="row">
                      {
                        repairs.array?.map((e, i) =>
                        (
                          <div className="row" key={i}>
                            <div className="col-lg-3 col-md-3 col-sm-12">
                              <label htmlFor="">Tipo</label>
                              <input name='name' type="text" min={0} value={e.name} className='form-control my-2'
                                onChange={event => repairs.onChange(i, event)}
                              />
                            </div>
                            <div className="col-md-3 mt-auto">
                              <label htmlFor="">Costo</label>
                              <input name='value' type="number" min={0} value={e.value} className='form-control my-2'
                                onChange={event => repairs.onChange(i, event)}
                              />
                            </div>
                            <div className="col-md-3">
                              <label htmlFor="">Cargo a</label>
                              <select name="chargeTo" className="form-select my-2" value={e.chargeTo}
                                onChange={event => repairs.onChange(i, event)}
                              >
                                <option value="realestate">Inmobiliaria</option>
                                <option value="owner">Dueño</option>
                              </select>
                            </div>
                            <div className="col-md-1 mt-auto d-flex justify-content-between">
                              <button type="button" className="btn-delete text-center my-auto"
                                onClick={() => repairs.onDelete(i)}
                              >
                                <i className="bi bi-x text-danger" style={{ fontSize: '32px' }}></i>
                              </button>
                              <button type="button" className="btn-upload text-warning"
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Cargar Documento a Reparación" onClick={
                                  () => setShowDocs(!showDocs)
                                } >
                                <i className="bi bi-cloud-arrow-up-fill"></i>
                              </button>
                            </div>
                          </div>
                        ))
                      }</div></>)
                  : (<></>)
              }

            </div>

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
