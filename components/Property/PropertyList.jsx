import { useEffect, useState } from 'react';
import Modal from '../shared/Modal';
import Property from './PropertyCard';
//Redux
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
// Import Swiper React components
import { Navigation, FreeMode } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { getPropertiesAction } from '../../store/actions/propertyActions';
import Paginator from '../shared/Paginator';
import { PropertySaleForm } from './PropertySaleForm';


export default function PropertyList({ type }) {
    const dispatch = useDispatch();

    const divisionsList = useSelector(state => state.divisions.divisions)
    const propertiesList = useSelector(state => state.properties.properties
        .filter(x => x.type === type)
        , shallowEqual)
    const propertiesTotal = useSelector(state => state.properties.total)

    const [show, setShow] = useState(false)
    const [property, setproperty] = useState({})
    const [properties, setproperties] = useState(propertiesList)
    const [page, setPage] = useState(1)

    const updateShow = (_show) => setShow(_show)

    useEffect(() => {
        dispatch(getPropertiesAction(page));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page])


    return (
        <>
            {
                type == 'development'
                    ? (
                        <div className='d-flex flex-row-reverse'>
                        </div>
                    )
                    : (<></>)
            }
            {
                type == 'development' ?
                    divisionsList?.map((b, i) => (
                        <div className='' key={i}>
                            {/* <div className='d-flex justify-content-end me-4'>
                                <Paginator totalItems={propertiesTotal} page={page} setPage={setPage} />
                            </div> */}
                            {
                                propertiesList?.filter(x => x.subdivision._id == b._id).length > 0
                                    ? (<>
                                        <h2 className='ms-3 my-3 builder-title'>{b.name}</h2>
                                        <Swiper
                                            grabCursor={true}
                                            modules={[FreeMode]}
                                            breakpoints={{
                                                0: {
                                                    //width: 640,
                                                    slidesPerView: 1,
                                                    spaceBetween: 10,
                                                },
                                                // when window width is >= 640px
                                                576: {
                                                    //width: 640,
                                                    slidesPerView: 2,
                                                    spaceBetween: 10,
                                                },
                                                // when window width is >= 768px
                                                768: {
                                                    //width: 768,
                                                    slidesPerView: 4,
                                                    spaceBetween: 15,
                                                },
                                            }
                                        }
                                        >
                                            {
                                                propertiesList?.filter(x => x.subdivision._id == b._id)?.map((property, key) => {
                                                    return (
                                                        <SwiperSlide key={key}>
                                                            <Property property={property} key={key} />
                                                        </SwiperSlide>)
                                                })
                                            }
                                        </Swiper>
                                    </>)
                                    : (<></>)
                            }

                        </div>
                    )
                    )
                    : (<>
                        <div className="row w-100 m-auto mb-5">
                            {
                                propertiesList?.map((property, key) => {
                                    return (
                                        <Property property={property} key={key} />
                                    )
                                })
                            }
                        </div>
                    </>)


            }

            <Modal title="Actualizar" show={show} setShow={setShow}>
                <PropertySaleForm show={updateShow} property={property} type={type} />
            </Modal>
        </>
    )
}
