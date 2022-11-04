import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { createArticleAction, updateArticleAction } from '../../store/actions/articlesAction'
import UpdateArticleForm from './UpdateArticleForm';
import UpdateArticlePreview from './UpdateArticlePreview';
import { getAttachment } from '../../api/utils';

const UpdateArticleContent = ({ setReload, reload }) => {
    const currentArticle = useSelector(state => state.articles.currentArticle)
    const router = useRouter();
    const dispatch = useDispatch();

    const [title, setTitle] = useState(`${currentArticle?.title}`)
    const [description, setDescription] = useState(`${currentArticle?.description}`)
    const [content, setContent] = useState(`${currentArticle?.content}`)
    const [image, setImage] = useState('')
    const [imagePreview, setImagePreview] = useState('')

    useEffect(() => {
        if (currentArticle?.image) {
            getAttachment(currentArticle?.image)
                .then(response => {
                    const objectUrl = URL.createObjectURL(response);
                    setImagePreview(objectUrl);
                })
                .catch(response => setImagePreview(null))
        }
        // eslint-disable-next-line 
    }, [])

    const updateArticleFunction = () => {
        dispatch(updateArticleAction(currentArticle?._id, title, image, description, content))
        router.push('/blog')
    }

    return (
        <div className='d-flex flex-column'>
            <button className='btn btn-action-primary w-25 ms-auto me-3' onClick={() => updateArticleFunction()}>Guardar Articulo</button>
            <div className='d-flex flex-column flex-md-row overflow-hidden'>
                <div className='w-100  p-3'>
                    <UpdateArticleForm setContent={setContent} content={content} title={title} setTitle={setTitle} description={description} setDescription={setDescription} setImage={setImage} setImagePreview={setImagePreview} />
                </div>
                <div className='w-100 mt-2 mt-md-0 p-3'>
                    <UpdateArticlePreview setContent={setContent} content={content} title={title} description={description} imagePreview={imagePreview} />
                </div>
            </div>
        </div>
    )
}

export default UpdateArticleContent