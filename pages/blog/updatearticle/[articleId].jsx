import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import AdminLayout from '../../../layouts/AdminLayout'
import UpdateArticleContent from '../../../components/Blogs/UpdateArticleContent'
import UpdateArticleHeader from '../../../components/Blogs/UpdateArticleHeader'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import Loading from '../../../components/shared/Loading'
import { setCurrentArticlesAction } from '../../../store/actions/articlesAction'

const UpdateArticle = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const [reload, setReload] = useState(false)
    const { articleId } = router.query
    const currentArticle = useSelector(state => state.articles.currentArticle)
    const isLoading = useSelector(state => state.articles?.isCurrentArticleLoading)

    useEffect(() => {
        if (!currentArticle?.title || !articleId) {
            dispatch(setCurrentArticlesAction(articleId))
            setReload(!reload)
        }
    }, [reload])// eslint-disable-line

    return (
        <div className="">
            <Head>
                <title>Blogs - VIVE Sistemas Inmobiliarios</title>
            </Head>
            <AdminLayout>
                <div className='mt-4 d-flex flex-column'>
                    <div className='border-bottom'>
                        <UpdateArticleHeader />
                        {currentArticle?.title}
                    </div>
                    <div className='mt-4'>
                        {
                            isLoading
                                ? <Loading />
                                : <UpdateArticleContent setReload={setReload} reload={reload} />
                        }

                    </div>
                </div>
            </AdminLayout>
        </div>
    )
}

export default UpdateArticle