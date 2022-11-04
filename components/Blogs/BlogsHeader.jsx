import React, { useState } from 'react'
import { useRouter } from 'next/router'

const BlogsHeader = () => {
    const router = useRouter();
    return (
        <div className='mb-4'>
            <div className='d-flex flex-column'>
                <div className='d-flex flex-between'>
                    <h2><b></b>Articulos</h2>
                    <button className='btn btn-action-primary' onClick={() => { router.push('/blog/newarticle') }}>Crear Nuevo Articulo</button>
                </div>
                <div className='d-flex flex-between'>
                </div>
            </div>
        </div>
    )
};

export default BlogsHeader;