import Image from 'next/image';
import React from 'react'

const InformationCard = ({ property }) => {
    var formatterCurrency = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    var formatter = new Intl.NumberFormat()
    const envUrl = process.env[process.env.NODE_ENV];
    return (
        <>
            <h3>Información General</h3>
            <hr />
            <div className='row'>
                <div className='col-md-4 col-sm-12'>
                    <h4><b>Precios</b></h4>
                    <span><b>Venta: </b>{formatterCurrency.format(property.price)}</span><br />
                    <span><b>Avalúo: </b>{formatterCurrency.format(property.appraisal)}</span><br />
                    <span><b>Bono: </b>{formatterCurrency.format(property.discount)}</span>
                    <hr />
                    <h4><b>Terreno</b></h4>
                    <span><b>Construccion: </b>{formatter.format(property.constructionmts)} m²</span><br />
                    <span><b>Terreno: </b>{formatter.format(property.mtsland)} m²</span>
                </div>
                <div className="col">
                    <h4 className='mb-4'>Caracteristicas</h4>
                    <div className='row'>
                        {
                            property.builder ? (
                                <>
                                    <div className='col-md-4 col-sm-12' style={{borderRight: '1px solid rgba(0,0,0,0.3)'}}>
                                        <div className="col-xl-6 col-sm-12 my-2">
                                            <span>Constructora: <b>{property.builder.name}</b></span>
                                        </div>
                                        <div className="col-xl-6 col-sm-12 my-2">
                                            <span>Fraccionamiento: <b>{property.subdivision.name}</b></span>
                                        </div>
                                        <div className="col-xl-6 col-sm-12 my-2">
                                            <span>Modelo: <b>{property.model.name}</b></span>
                                        </div>
                                    </div>
                                </>) : (<></>)
                        }

                        <div className="col-md col-sm-12" style={{borderRight: '1px solid rgba(0,0,0,0.3)'}}>
                            <div className="">
                                <span><b><i className="fa-solid fa-stairs"></i> Niveles: </b>{property.floors}</span>
                            </div><br />
                            <div className="">
                                <span><b><i className="fa-solid fa-bed"></i> Recamaras: </b>{property.bedrooms}</span>
                            </div><br />
                            <div className="">
                                <span><b><i className="fa-solid fa-bath"></i> Baños Completos: </b>{property.bathrooms}</span>
                            </div><br />
                            <div className="">
                                <span><b><i className="fa-solid fa-bath"></i> Baños Medios: </b>{property.halfbathrooms}</span>
                            </div><br />
                        </div>
                        <div className="col-md col-sm-12 border-end">
                            <h4>Dirección</h4>
                            <div className=''>
                                <div className="col-xl-6 col-sm-12 my-2">
                                    <span>{property.street}</span>
                                </div>
                            </div>
                            <hr />
                            <span>{property.equipment}</span><br />
                        </div>
                    </div>
                </div>
                {/* <div className='image_container'>
                    {
                        property?.attachments?.map((file, i) => {
                            if (file.default === true) {
                                return (<Image src={envUrl + '/' + file.file.name} layout='fill' className='image_container_default' />)
                            } else {
                                return (<></>)
                            }
                        })
                    }
                </div> */}
            </div>
        </>
    )
}

export default InformationCard