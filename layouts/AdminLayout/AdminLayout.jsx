import React, { useEffect } from 'react';;
import NavBar from '../../components/NavBar/'
import Header from '../../components/Header'
export default function adminLayout({ children }) {

    useEffect(() => {
        if (document.body.clientWidth < 1500) {
            console.log(document.body.clientWidth)
            document.querySelector('.admin-layout').classList.add('active')
            document.querySelector('.NavbarComponent').classList.add('active')
            document.querySelector('.nav-items').classList.add('active')
        }
    }, [])

    return (
        <>
            <div className='admin-layout'>
                <Header />
                <NavBar />
                <div className='admin-content px-3 '>
                    {children}
                </div>
            </div>
        </>
    );
}


