import Head from "next/head";
import { useEffect, useState } from "react";
import AdminLayout from '../../../layouts/AdminLayout'
import PropertyDocUpload from '../../../components/Property/PropertyDocUpload'
import Modal from '../../../components/shared/Modal'
import { toast } from "react-toastify";
import { getToken } from '../../../api/token';
import Link from 'next/link'
import { useRouter } from 'next/router'
//Redux
import { useSelector, useDispatch } from 'react-redux';
import { setPropertyAction, setPublishPropertyAction } from '../../../store/actions/propertyActions';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import InformationCard from "../../../components/Property/InformationCard";
import useAttachmentsProperty from './../../../hooks/useAttachments';
import CardDocument from './../../../components/Property/CardDocument';
import { PropertyDevelopmentForm } from "../../../components/Property/PropertyDevForm";
import { PropertySaleForm } from "../../../components/Property/PropertySaleForm";
import { useUpload } from './../../../hooks/useUpload';
import Dropzone from './../../../components/shared/Dropzone';
import PDF from '../../../public/img/pdf.png'
import Other from '../../../public/img/other.png'

const PropertyInfo = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { id } = router.query;

    const [show, setShow] = useState(false)
    const [showFiles, setShowFiles] = useState(false)
    const [isMultiple, setIsMultiple] = useState(false)
    const [showAddFile, setshowAddFile] = useState(false)
    const [showEdit, setshowEdit] = useState(false)
    const [isCover, setIsCover] = useState(false)

    const [currentType, setcurrentType] = useState('')
    const [documents, setDocuments] = useState([])

    const _property = useSelector(state => state.properties.currentProperty)

    const { files, setattachments } = useAttachmentsProperty(_property?.attachments)

    useEffect(() => {
        dispatch(setPropertyAction(id));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setcurrentType(_property.type)
        setattachments(_property?.attachments)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [_property])

    const publishHandler = () => {
        confirmAlert({
            title: !_property.isPublished ? 'Publicar' : 'Eliminar Publicación',
            message: !_property.isPublished ? '¿Publicar en sitio web?' : '¿Quitar publicación en sitio web?',
            buttons: [
                {
                    label: 'Aceptar',
                    onClick: () => {
                        const token = getToken();
                        if (token) {
                            dispatch(setPublishPropertyAction(id))

                            toast.success('Updated Successful')

                        } else {
                            toast.error("Information Failed")
                        }
                    }
                },
                {
                    label: 'Cancelar',
                    onClick: () => { }
                }
            ]
        });
    }

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    const onChange = (acceptedFiles, multiple) => {
        Array.from(acceptedFiles)?.map((file, index) => {
            var reader = new FileReader()

            reader.onload = async e => {
                if (file.type === 'image/jpeg' || file.type === 'image/png')
                    setDocuments([...documents, { img: reader.result, name: file.name, data: file }])
                else if (file.type === 'application/pdf')
                    setDocuments([...documents, { img: PDF, name: file.name, data: file }])
                else if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
                    setDocuments([...documents, { img: envUrl + '/excel.png', name: file.name, data: file }])
                else
                    setDocuments([...documents, { img: envUrl + '/other.png', name: file.name, data: file }])
            }
            reader.readAsDataURL(file)
        });
        setIsCover(multiple)
        setShowFiles(true)
    }

    return (
        <div>
            <Head>
                <title>Propiedades - VIVE Sistemas Inmobiliarios</title>
            </Head>
            <AdminLayout>
                <div className="row my-3">
                    <span className="col-md-2 col-sm-12 pointer" onClick={() => router.back()}>
                        <i className={`bi bi-arrow-return-left mx-3`}></i> {"Regresar"}
                    </span>
                </div>
                <div className="row">
                    <div className="mt-2 col-md-1 col-sm-12">
                        <button className="btn btn-action-sm-primary my-2 file_upload w-100" onClick={() => setshowEdit(!showAddFile)}>Editar</button>
                    </div>
                    
                </div>
                <div className="container-fluid pt-3">
                    <InformationCard property={_property} />

                    <hr />{/* //////////////////////////////////////////////////////////////////////////////// */}
                    <div className="row justify-content-around">
                        <Dropzone
                            multiple={true}
                            className="col-md-5 col-sm-12"
                            title='Arrastra los documentos para expediente aquí, o presiona para cargar'
                            icon="bi bi-cloud-arrow-up-fill"
                            onChange={(files) => onChange(files, true)}
                        />
                        <Dropzone
                            multiple={false}
                            className="col-md-4 col-sm-12"
                            title='Arrastra una imagen para portada aquí, o presiona para cargar'
                            icon="bi bi-camera2"
                            onChange={(files) => onChange(files, false)}
                        />
                    </div>

                    <div className="row ms-1 mt-2">
                        <button className="btn btn-action-sm-primary col-md-2 col-sm-2 my-2 file_upload" onClick={() => setshowAddFile(!showAddFile)}>Agregar Documento Nuevo</button>
                    </div>

                    <div className="row mt-2 mb-5">
                        <div className="alert alert-info" role="alert">
                            Presionar en el documento para abrir su configuración.
                        </div>
                        {
                            files.map((b, i) => (
                                <div key={i}>
                                    <hr />
                                    {/* <h2 className='ms-3 mb-3' key={i}>{b.name}</h2> */}
                                    <div className="row w-100 m-auto mb-5" key={i}>
                                        {
                                            b.files.map((att, index) => {
                                                return (
                                                    <div className="col-md-3 mt-4 container_img" key={index}>
                                                        <CardDocument att={att} category={b} key={index} id={id} status={_property?.image?._id === att.file._id} />
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>



                {/* <Modal title="Agregar Archivos" show={showAddFile} setShow={setshowAddFile}>
                    <PropertyDocUpload id={id} setShow={setshowAddFile} />
                </Modal> */}
                <Modal title="Agregar Archivos" show={showFiles} setShow={setShowFiles}>
                    <PropertyDocUpload setShow={setShowFiles} files={documents} setFiles={setDocuments} multiple={isCover} />
                </Modal>

                <Modal title="Actualizar" show={showEdit} setShow={setshowEdit} fullscreen={true}>
                    {
                        _property.type === 'development'
                            ? (<PropertyDevelopmentForm show={setshowEdit} type={currentType} property={_property} />)
                            : (<PropertySaleForm show={setshowEdit} type={currentType} property={_property} />)
                    }

                </Modal>

            </AdminLayout>
        </div>
    )
}

export default PropertyInfo
