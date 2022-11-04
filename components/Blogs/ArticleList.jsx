import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs'
//Redux
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router'
import Loading from '../shared/Loading'
import NoDataFound from '../shared/NoDataFound';
import { es } from "dayjs/locale/es";
import GetServerImage from '../shared/GetServerImage';
import { getAttachment } from '../../api/utils';
import { publishArticlesAction, deleteArticlesAction, setCurrentArticlesAction } from '../../store/actions/articlesAction';
import WarningModal from '../shared/WarningModal';

export default function CustomerList() {
    const dispatch = useDispatch()
    const router = useRouter();
    const articlesList = useSelector(state => state.articles.articlesList)
    const isLoading = useSelector(state => state.articles.isArticlesListLoading)
    const [article, setArticle] = useState({})
    const [show, setShow] = useState(false)

    const deleteTemplate = () => {
        dispatch(deleteArticlesAction(article._id));
        setArticle({});
    }

    return (
        <div>
            <div className="form-check form-switch d-flex justify-content-end overflow-hidden mb-3 me-2">
                <label className="form-check-label me-5">Presiona para publicar </label>
                <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
            </div>
            {
                isLoading
                    ? <Loading />
                    : <ArticlesTable articlesList={articlesList} router={router} setArticle={setArticle} setShow={setShow} />
            }
            <WarningModal title={'Eliminar Articulo'} setShow={setShow} show={show} action={deleteTemplate} message={`¿Estas seguro de eliminar el articulo "${article.title}"?`} />
        </div>

    )
}
//onClick={() => { dispatch(setCurrentArticlesAction(article?._id)); router.push(`/blog/updatearticle/${article._id}`) }}
const ArticlesTable = ({ articlesList, router, setArticle, setShow }) => {
    const dispatch = useDispatch()
    dayjs.locale("es");
    return (
        articlesList?.length > 0
            ? (
                articlesList.map((article, index) => (
                    <div className='d-md-block w-100' key={index} >
                        <div className='card p-0 card-articles-size shadow-sm mb-3 d-flex flex-row w-100 article-list-item '>
                            {article?.image && <GetServerImage wrapperClassName='overflow-hidden w-100 w-md-50' layout='fill' objectFit="cover" apiMethod={getAttachment} param={article?.image} show={article?.image ? true : false} />}
                            <div className='w-100 d-flex justify-content-center flex-column'>
                                <div className="form-switch d-flex mb-md-auto mb-auto mt-2 ms-auto me-3 align-items-md-center ">
                                    <span className='bi bi-pencil-square me-3 pointer h5 mt-2' onClick={() => { dispatch(setCurrentArticlesAction(article?._id)); router.push(`/blog/updatearticle/${article._id}`) }}></span>
                                    <div className='overflow-hidden d-flex flex-column flex-md-row me-md-4 mb-1 me-md-0 ms-md-5 align-items-center ms-md-auto'>
                                        <input className="form-check-input ms-2" type="checkbox" role="switch" checked={article?.isPublished} onChange={event => dispatch(publishArticlesAction(article?._id))} />
                                    </div>
                                    <span className='bi bi-x-lg ms-md-auto me-md-3 ms-4 pointer' onClick={() => { setArticle(article); setShow(true) }}></span>
                                </div>
                                <div className='mb-auto'>
                                    <p className='d-flex align-items-center justify-content-center my-0 me-3 me-md-5 d-md-none  overflow-hidden'>{dayjs(article?.createdDate).format('DD MMMM, YYYY')}</p>
                                    <h5 className='text-center  overflow-hidden'>{article?.title}</h5>
                                    <p className='text-center d-none d-md-flex justify-content-md-center overflow-hidden'>{article?.description}</p>
                                    <div className='d-flex flex-row flex-between mt-md-5 mx-md-3'>
                                        <p className='text-center  overflow-hidden'>{`${article?.createdBy?.firstName} ${article?.createdBy?.lastName}`}</p>
                                        <p className='d-none d-md-flex '>{dayjs(article?.createdDate).format('DD MMMM, YYYY')}</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                ))

            )
            : <NoDataFound />
    )
}