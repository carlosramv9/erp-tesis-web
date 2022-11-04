import React from 'react'
import Image from 'next/image';
import dayjs from 'dayjs'
import { es } from "dayjs/locale/es";
import useAuth from "../../hooks/useAuth";

const NewArticlePreview = ({ content, title, description, imagePreview }) => {
    dayjs.locale("es");
    const { auth } = useAuth();
    const name = auth?.firstName + ' ' + auth?.lastName;
    const date = dayjs().format('DD MMMM, YYYY')
    console.log(content, 'fdsafs')
    return (
        <div className='d-flex justify-content-center align-items-center card shadow'>
            <div className='mb-3'><h1>Previsualización</h1></div>
            {imagePreview && <div className='w-100 position-relative'><Image src={imagePreview} alt="preview" layout="responsive" objectFit="contain" width='100%' height='100%' /></div>}
            <div className='ms-auto mt-3 me-3'>
                <p className='font-italic mb-2'>{date}</p>
            </div>
            <div><h2>{title}</h2></div>
            <div className='me-auto'><p>~ {name}</p></div>
            <p className="text-justify">{description}</p>
            <div className='article-preview-content' dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    )
}

export default NewArticlePreview