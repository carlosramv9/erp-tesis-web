import React from 'react';
import Image from 'next/image'
import useAuth from "../../hooks/useAuth";
import { getUserImage } from '../../api/users';
import Avatar from '../shared/Avatar'
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Header() {
    const { logout, auth } = useAuth();
    const router = useRouter();
    const Name = auth?.firstName + ' ' + auth?.lastName;
    const [show, setshow] = useState(false)

    const toggleClass = () => {
        const navbar = document.querySelector(".NavbarComponent");
        const background = document.querySelector(".admin-layout");
        const header = document.querySelector(".nav-items");

        navbar.classList.toggle("active")
        background.classList.toggle("active")
        header.classList.toggle("active")
    }
    return (
        <header className='nav-header bg-secondary'>
            <div className='mt-1 f-flex flex-between nav-items'>
                <div className='menu-list' onClick={toggleClass}>
                    <i className="bi bi-list"></i>
                </div>
                <div className='nav-header_avatar d-flex flex-between'>
                    <div className='mt-3'>
                        <p className='text-white user-name'>{Name}</p>
                    </div>
                    <div className='my-auto pointer' onClick={() => setshow(!show)}>
                        <Avatar getImage={getUserImage} param={auth ? auth.idUser : null} status={auth?.image ? true : false} width={'50px'} height={'50px'} />
                    </div>

                    <div className={show ? "menu-pop active bg-secondary" : "menu-pop bg-secondary"}>
                        <div className='d-flex justify-content-around pointer' onClick={() => { router.push(`/users/${auth.idUser}`) }}>
                            <div><Avatar getImage={getUserImage} param={auth ? auth.idUser : null} status={auth?.image ? true : false} width={'70px'} height={'70px'} /></div>
                            <span className='text-white my-auto flex-wrap p-2' >{Name}</span>
                        </div>
                        <hr className='text-white' />
                        <ul className='navbar-nav d-flex flex-column'>
                            <li className='nav-item w-100 pointer' onClick={() => logout()} >
                                <a className='nav-link nav-link-span text-light item-option'>
                                    <i className="bi bi-box-arrow-left mx-3"></i>
                                    Cerrar Sesión
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
}

