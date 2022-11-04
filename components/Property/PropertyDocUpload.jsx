import { toast } from "react-toastify";
import { getToken } from '../../api/token';
import { useForm } from "react-hook-form";
import Image from 'next/image';
import PDF from '../../public/img/pdf.png'

//Redux
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import { addFilesPropertiesAction } from '../../store/actions/propertyActions';

const PropertyDocUpload = ({ setShow, onSubmit, files, setFiles, multiple }) => {
    const categoriesList = useSelector(state => state.categories.categories)

    const envUrl = process.env[process.env.NODE_ENV];
    const dispatch = useDispatch();
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [categories, setcategories] = useState(categoriesList)

    const changeHandler = e => {
        Array.from(e.target.files)?.map((x) => {
            var reader = new FileReader()
            var file = x

            reader.onload = e => {

                if (file.type === 'image/jpeg' || file.type === 'image/png') {
                    // upload.push({ img: reader.result, name: file.name, data: file })
                    setFiles([...files, { img: reader.result, name: file.name, data: file }])
                }
                else if (file.type === 'application/pdf') {
                    setFiles([...files, { img: PDF, name: file.name, data: file }])
                }
                else if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
                    setFiles([...files, { img: envUrl + '/excel.png', name: file.name, data: file }])
                else {
                    setFiles([...files, { img: envUrl + '/other.png', name: file.name, data: file }])
                }

            }
            reader.readAsDataURL(x)
        });
        // setfiles([...files, ...upload])
    }

    const SaveFiles = async (data, e) => {
        const token = getToken();
        if (token) {
            files?.map((file) => {
                const _data = new FormData()
                _data.append("category", file.category)
                _data.append("img", file.data)
                dispatch(addFilesPropertiesAction(id, _data))
            })
            setShow(false)
            toast.success('Uploaded Successful')

        } else {
            toast.error("Information Failed")
        }
        //     e.target.reset()
    }

    const changeFileState = (file, category) => {
        const _file = files?.map(f => {
            if (f.data === file) {
                f.category = category
            }
            return f
        })
        setFiles(_file)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} method="post">
            {files?.map((file, i) => {
                return (
                    <div className="row m-3 " key={i} style={{ maxHeight: '100px' }} >
                        <div className="col-3" style={{ position: 'relative' }}>
                            <Image src={file.img} alt="" className="m-auto" width='150' layout="fill" objectFit="contain" />
                        </div>
                        <div className="col-6">
                            <label htmlFor=""><span><b>{file.name.length > 35 ? file.name.substr(0, 35) + '...' : file.name}</b></span></label><br />

                            <label className="ms-2" htmlFor="">Seleccionar Categoria</label>
                            <select className="form-select" aria-label="" defaultValue="" name='type' onChange={(e) => changeFileState(file.data, e.target.value)}>
                                <option value="">Seleccionar categoria</option>
                                {
                                    categories?.map((cat, idx) => (
                                        <>
                                            <option value={cat.name} key={idx} >{cat.name}</option>
                                        </>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                )
            })}
            <div>
                <div className="btn btn-primary custom-input-file mt-2">
                    <input type="file" className="input-file" onChange={changeHandler} multiple={true} /> Cargar Archivo...
                </div>
                <button type='submit' className="btn btn-action-primary mt-2" style={{ float: "right" }} >Guardar</button>
            </div>
        </form>
    )
}

export default PropertyDocUpload