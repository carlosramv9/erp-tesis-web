import React from 'react'
import Head from 'next/head'
import AdminLayout from '../../layouts/AdminLayout'
import Loading from '../../components/shared/Loading'
import BlogsHeader from '../../components/Blogs/BlogsHeader'
import ArticleList from '../../components/Blogs/ArticleList'

const Blog = () => {
  return (
    <div className="">
      <Head>
        <title>Blogs - VIVE Sistemas Inmobiliarios</title>
      </Head>
      <AdminLayout>
        <div className='mt-4 d-flex flex-column'>
          <div className='border-bottom'>
            <BlogsHeader />
          </div>
          <div className='ms-1 mt-4'>
            <ArticleList />
          </div>
        </div>
      </AdminLayout>
    </div>
  )
}

export default Blog