import React, { useState } from 'react'
import NewArticleForm from './NewArticleForm'
import NewArticlePreview from './NewArticlePreview'
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { createArticleAction } from '../../store/actions/articlesAction'

const NewArticleContent = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [content, setContent] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [imagePreview, setImagePreview] = useState('')

    const createArticleFunction = () => {
        dispatch(createArticleAction(title, image, description, content))
        router.push('/blog')
    }

    return (
        <div className='d-flex flex-column'>
            <button className='btn btn-action-primary w-25 ms-auto me-3' onClick={() => createArticleFunction()}>Guardar Articulo</button>
            <div className='d-flex flex-column flex-md-row overflow-hidden'>
                <div className='w-100  p-3'>
                    <NewArticleForm setContent={setContent} content={content} title={title} setTitle={setTitle} description={description} setDescription={setDescription} setImage={setImage} setImagePreview={setImagePreview} />
                </div>
                <div className='w-100 mt-2 mt-md-0 p-3'>
                    <NewArticlePreview setContent={setContent} content={content} title={title} description={description} imagePreview={imagePreview} />
                </div>
            </div>
        </div>
    )
}

export default NewArticleContent