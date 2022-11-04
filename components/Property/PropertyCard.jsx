import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import { getCoverImageProperty } from '../../api/properties';
import NoCover from '../../public/img/default-image.jpg'

const PropertyCard = ({ property }) => {
    const envUrl = process.env[process.env.NODE_ENV];
    var { builder, subdivision, street, suburb, number, _id, businessType, type } = property
    var defaultProperty = ''
    var ctype = ''
    const [image, setImage] = useState(null)

    property.attachments.forEach((att) => {
        if (att.default === true) defaultProperty = att.file
    });

    switch (property.businessType) {
        case 'terrain':
            ctype = 'Terreno'
            break
        case 'house':
            ctype = "Casa"
            break;
        case 'local':
            ctype = 'Local'
            break;
    }

    useEffect(() => {
        if (property?.image) {
            getCoverImageProperty(_id)
                .then(response => {
                    const objectUrl = URL.createObjectURL(response);
                    setImage(objectUrl);
                })
                .catch(response => setImage(null))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <div className="col-sm-12 col-md-3 mb-3">
            <div className="card-view">
                <div className='card-view-image'>
                    {/*  // eslint-disable-next-line  */}
                    <Image className="mt-auto" src={image ? image : NoCover} layout='fill' alt="Portada Inmueble" />
                </div>
                <div className="container">
                    {
                        type === 'development' ? (
                            <>
                                <h3>{subdivision.name}</h3>
                                <h5 style={{ color: '#929292' }}>{builder.name}</h5>
                            </>) : (<></>)
                    }

                    <span>Dirección: {street + ' #' + number + ', ' + suburb}</span>
                </div>
                <div className="d-flex justify-content-between mx-2">
                    <span className="my-auto">Tipo Inmueble: <span className="text-success fw-bold"> {ctype}</span></span>
                    <Link href={"/properties/search/" + _id} passHref>
                        <button className="btn btn-action-info--outline my-2">Abrir</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default PropertyCard
