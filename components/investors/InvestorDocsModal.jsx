import React from 'react'
import Dropzone from '../shared/Dropzone';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import PDF from "../../public/img/pdf.png";
import OTHER from "../../public/img/other.png";
import { toast } from "react-toastify";
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { getToken } from '../../api/token';
import { setInvestorAction, updateInvestorDocumentsAction, deleteInvestorDocumentAction } from '../../store/actions/investorActions';
import { getAttachment } from '../../api/utils';
import Loading from './../shared/Loading';
import Swal from 'sweetalert2'

const InvestorDocsModal = ({ setShow, investor }) => {
    const dispatch = useDispatch();
    const categoriesList = useSelector(state => state.categories.categories)
    const currentInvestor = useSelector(state => state.investors.currentInvestor)
    const loading = useSelector(state => state.investors.loadingSetinvestor)
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [documents, setDocuments] = useState([])

    useEffect(() => {
        dispatch(setInvestorAction(investor._id))
    }, [])


    const onChange = (acceptedFiles) => {
        Array.from(acceptedFiles)?.forEach((file) => {
            var reader = new FileReader()

            reader.onload = e => {
                if (file.type === 'image/jpeg' || file.type === 'image/png')
                    setDocuments([...documents, { img: e.target.result, name: file.name, category: categoriesList[0]?.name, data: file }])
                else if (file.type === 'application/pdf')
                    setDocuments([...documents, { img: PDF, name: file.name, category: categoriesList[0]?.name, data: file }])
                else {
                    setDocuments([...documents, { img: OTHER, name: file.name, category: categoriesList[0]?.name, data: file }])
                }
            }

            reader.readAsDataURL(file)
        });
    }

    const onDelete = (indexToDelete) => {
        const newFields = documents.filter((d, index) => index !== indexToDelete);
        setDocuments([...newFields]);
    };

    const modifyCategory = (event, indexParent) => {
        const newData = documents.map((d, index) => {
            if (index === indexParent) {
                d[event.target.name] = event.target.value;
            }
            return d;
        });
        setDocuments([...newData]);
    }

    const processData = async (data, e) => {
        const token = getToken();
        if (token) {
            if (documents) {
                documents?.forEach((data) => {
                    const _data = new FormData()
                    _data.append("category", data.category)
                    _data.append("img", data.data)

                    dispatch(updateInvestorDocumentsAction(currentInvestor._id, _data))
                    //setShow(false)
                })
                toast.success('Updated Successful')
            }
            setDocuments([])
        } else {
            toast.error("Information Failed")
        }

        //e.target.reset();
    }

    return (
        <form onSubmit={handleSubmit(processData)} method='post'>
            <div className='flex-center'>
                <Dropzone
                    multiple={true}
                    className="col-md-8 col-sm-12"
                    title='Arrastra los documentos para expediente aquí, o presiona para cargar'
                    icon="bi bi-cloud-arrow-up-fill"
                    onChange={(files) => onChange(files, true)}
                />
            </div>
            <div className='flex-center mt-3 flex-wrap'>
                {
                    /// Documentos que se cargaran al inversionista  ///
                    documents?.map((data, index) => {
                        return <div key={index} className='mx-3 mt-2 flex-center flex-column align-items-center'>
                            <div className='boxImagesToLoad'>
                                <div className='boxImagesToLoad_courtain'>
                                    <p className='mb-2 text-white'>{data.name}</p>
                                    <button type='button' className='boxImagesToLoad_courtain_delete' onClick={() => onDelete(index)}><i className='fa-solid fa-trash'></i></button>
                                </div>
                                <Image src={data.img} alt='' layout='fill' objectFit='cover' ></Image>
                            </div>
                            <button type='button' className='d-xl-none boxImagesToLoad_courtain_delete-sm' onClick={() => onDelete(index)}><i className='fa-solid fa-trash'></i></button>
                            <div>
                                <select className="form-select mt-2" name="category" id=""
                                    onChangeCapture={(e) => modifyCategory(e, index)}
                                >
                                    {
                                        categoriesList?.map((data, idx) => <option key={idx} value={data.name}>{data.name}</option>)
                                    }
                                </select>
                                <span className='text-danger text-small d-block mb-2'>{errors?.category?.message}</span>
                            </div>
                        </div>
                    })
                }

            </div>

            {documents.length ? <div className='flex-end mt-3'><button className='btn btn-action-primary'>Guardar</button></div> : null}
            <hr />
            <h3 className='mb-3'><b>Documentos</b></h3>

            {
                loading
                    ? <div className="flex-center"><Loading></Loading></div>
                    : <div className='row flex-wrap'>
                        {
                            /// Documentos cargados del inversionista  ///
                            currentInvestor.attachments?.map((data, index) => <div key={index} className='text-center col-md-4 col-sm-6'><DocumentCard file={data} key={index} idInvestor={currentInvestor._id} /></div>)
                        }
                    </div>
            }
            <section style={{ height: '50px' }}></section>
        </form>
    )
}

export default InvestorDocsModal


const DocumentCard = ({ file, idInvestor }) => {
    const dispatch = useDispatch();
    var [image, setImage] = useState(OTHER)
    const [isCover, setIsCover] = useState(false)

    useEffect(() => {
        if (file.fileType === 'application/pdf') { setImage(PDF); setIsCover(false) }
        else if (file.fileType.includes('image')) {
            getAttachment(file._id)
                .then(response => {
                    const objectUrl = URL.createObjectURL(response);
                    setImage(objectUrl);
                    setIsCover(true)
                })
                .catch(response => setImage(OTHER))
        }
        else { setImage(OTHER); setIsCover(false) }
    }, [])

    const onDeleteDocument = (id) => {
        try {
            const token = getToken();
            if (token) {
                Swal.fire({
                    title: '¿Desea eliminar el documento?',
                    text: "Esta operación no podra ser revertida!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#d33',
                    cancelButtonColor: '#3085d6',
                    confirmButtonText: 'Eliminar',
                    cancelButtonText: 'Cancelar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        dispatch(deleteInvestorDocumentAction(idInvestor, id))
                        Swal.fire(
                            'Eliminado!',
                            'El documento ha sido eliminado del expediente exitosamente.',
                            'success'
                        )
                        toast.success('Deleted Successful')
                    }
                })
                //dispatch(deleteInvestorDocumentAction(idInvestor, id))
            }
        } catch (error) {
            toast.error('Error')
        }
    }

    return (
        <div className='mx-4 my-3' style={{ overflow: 'hidden' }}>
            <div className='boxImagesLoaded'>
                <div className='boxImagesLoaded_courtain'>
                    <p className='mb-2 text-white'>{file.name}</p>
                    <button type='button' className='boxImagesLoaded_courtain_delete' onClick={() => onDeleteDocument(file._id)}><i className='fa-solid fa-trash'></i></button>
                </div>
                <Image src={image} alt='' layout='fill' objectFit={isCover ? 'cover' : 'contain'} className=' mx-auto'></Image>
            </div>
            <button type='button' className='d-xl-none boxImagesLoaded_courtain_delete-sm' onClick={() => onDeleteDocument(file._id)}><i className='fa-solid fa-trash'></i></button>
            <span><b>{file.category}</b></span>

        </div>
    )
}