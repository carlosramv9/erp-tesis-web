import React from 'react'
import NewArticleHeader from '../../../components/Blogs/NewArticleHeader'
import Head from 'next/head'
import AdminLayout from '../../../layouts/AdminLayout'
import UnderDevelopment from '../../../components/shared/UnderDevelopment'
import NewArticleContent from '../../../components/Blogs/NewArticleContent'

const NewArticle = () => {
    return (
        <div className="">
            <Head>
                <title>Blogs - VIVE Sistemas Inmobiliarios</title>
            </Head>
            <AdminLayout>
                <div className='mt-4 d-flex flex-column'>
                    <div className='border-bottom'>
                        <NewArticleHeader />
                    </div>
                    <div className='mt-4'>
                        <NewArticleContent />
                    </div>
                </div>
            </AdminLayout>
        </div>
    )
}

export default NewArticle