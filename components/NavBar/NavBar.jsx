import React, { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import useAuth from "../../hooks/useAuth";
import { useRouter } from 'next/router'
import { useState } from 'react';


export default function NavBar() {
    const router = useRouter();

    const [showProperties, setShowProperties] = useState(false)

    useEffect(() => {
        const listElements = document.querySelectorAll('.list__button--click')
        listElements.forEach(listElement => {
            listElement.addEventListener('click', () => {

                listElement.classList.toggle('arrow');

                document.querySelectorAll('.list__show').forEach(x => x.style.height = `0px`)

                let height = 0;
                let menu = listElement.nextElementSibling;
                if (menu.clientHeight == "0") {
                    height = menu.scrollHeight;
                }

                menu.style.height = `${height}px`;

            })
        })
    }, [])

    const collapseNavBar = () => {
        var sidebar = document.querySelector("#sidebar")
        var container = document.querySelector('.admin-content')
        var items = document.querySelector('.toggler-menu')

        sidebar.classList.toggle("active-menu")
        container.classList.toggle("active-content")
        items.classList.toggle("active-toggler-menu")
    }
    const { logout, auth } = useAuth();
    return (
        <div className='NavbarComponent'>
            <nav className="navbar navbar-expand-md d-flex flex-column navbar-color" id="sidebar">
                <div className='d-flex flex-between flex-row min-navbar'> 
                    <div>
                        <Link href='/'>
                            <a className=''>
                                <div className='text-center'>
                                    <div className='position-image'>
                                        <Image className='logo-style' src="/app-logo.png" quality={100} height={40} width={40} objectFit='inherit' alt='logo' />
                                    </div>
                                    <span className="text-light mt-3 nuser">{auth?.role?.role}</span>
                                </div>
                            </a>
                        </Link>
                    </div>
                    <div className=''>
                        <button type='button' className='btn header-button' id="collapse-button" onClick={collapseNavBar}>
                            <i className="bi bi-list"></i>
                        </button>
                    </div>
                </div>
                <hr className="border w-100" />
                <div className='navbar-container mt-2 w-100'>
                    <ul className='navbar-nav d-flex flex-column toggler-menu'>
                        <NavItem text={'Dashboards'} route={'/'} icon={'bi bi-clipboard-data'} />
                        <NavItem text={'Procesos de Venta'} route={'/process'} icon={'bi bi-briefcase'} />
                        {auth?.role?.readPermissions.includes('processTemplates') || auth?.role?.role === "ADMIN_ROLE" ? <NavItem text={'Plantillas de Proceso'} route={'/template'} icon={'bi bi-briefcase'} /> : null}
                        {auth?.role?.readPermissions.includes('customers') || auth?.role?.role === "ADMIN_ROLE" ? <NavItem text={'Clientes'} route={'/customers'} icon={'bi bi-person-badge'} /> : null}
                        {auth?.role?.readPermissions.includes('users') || auth?.role?.role === "ADMIN_ROLE" ? <NavItem text={'Usuarios'} route={'/users'} icon={'bi bi-person'} /> : null}
                        {auth?.role?.readPermissions.includes('roles') || auth?.role?.role === "ADMIN_ROLE" ? <NavItem text={'Roles'} route={'/roles'} icon={'bi bi-person-lines-fill'} /> : null}
                        <li className='nav-item w-100 ' style={{ overflow: 'hidden' }}

                        >
                            <span className='nav-link text-light list__button--click item-option'>
                                <i className={`bi bi-building mx-3`}></i>
                                Propiedades <i className="bi bi-caret-right-fill ms-auto"></i>
                            </span>
                            <ul className="list__show">
                                {auth?.role?.readPermissions.includes('pDevelopment') || auth?.role?.role === "ADMIN_ROLE" ? <SubNavItem text={'Desarrollos'} route={'/properties'} query={'development'} icon={'bi bi-building'} /> : null}
                                <SubNavItem text={'Venta'} route={'/properties'} query={'sale'} icon={'bi bi-building'} />
                            </ul>
                        </li>
                        {/* <NavItem text={'Catalogos'} route={'/catalogs'} icon={'bi bi-journal-text'}/> */}
                        <li className='nav-item w-100 ' style={{ overflow: 'hidden' }}>
                            <span className='nav-link text-light list__button--click item-option'>
                                <i className={`bi bi-book-half mx-3`}></i>
                                Catalogos <i className="bi bi-caret-right-fill ms-auto"></i>
                            </span>
                            <ul className="list__show">
                                {auth?.role?.readPermissions.includes('pDevelopment') || auth?.role?.role === "ADMIN_ROLE" ?<SubNavItem text={'Constructoras'} route={'/catalogs/builders'} icon={'bi bi-book-half'} /> : null }
                                {auth?.role?.readPermissions.includes('pDevelopment') || auth?.role?.role === "ADMIN_ROLE" ? <SubNavItem text={'Fraccionamientos'} route={'/catalogs/subdivisions'} icon={'bi bi-book-half'} /> : null}
                                {auth?.role?.readPermissions.includes('pDevelopment') || auth?.role?.role === "ADMIN_ROLE" ? <SubNavItem text={'Modelos'} route={'/catalogs/models'} icon={'bi bi-book-half'} /> : null}
                                <SubNavItem text={'Categorias Documentos'} route={'/catalogs/documents'} icon={'bi bi-book-half'} />
                                <SubNavItem text={'Créditos Bancarios'} route={'/catalogs/bank-credits'} icon={'bi bi-book-half'} />
                            </ul>
                        </li>
                        <li className='nav-item w-100' onClick={() => logout()} style={{ cursor: 'pointer' }}>
                            <a className='nav-link text-light item-option'>
                                <i className="bi bi-box-arrow-left mx-3"></i>
                                Cerrar Sesión
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>

        </div>
    )
}

const NavItem = (props) => {
    const { text, route, query, icon, children } = props;
    return (
        <div>
            <li className='nav-item w-100' style={{ overflow: 'hidden' }}>
                <Link href={query ? { pathname: route, query: { type: query } } : { pathname: route }}>
                    <a className='nav-link text-light item-option'>
                        <i className={`${icon} mx-3`}></i>
                        {text}
                    </a>
                </Link>
                {children}
            </li>
        </div>
    )
}

const NavDropdown = (props) => {
    const { text, children, show, setShow } = props;

    return (
        <ul className={show ? 'navbar-subnav active' : 'navbar-subnav'}>
            <li className='nav-item w-100 mb-4 navbar-subnav-back pointer' style={{ overflow: 'hidden' }} onClick={() => setShow(false)}>
                <span className='nav-link text-white'><i className={`bi bi-arrow-return-left mx-3`}></i> Regresar</span>
            </li>
            {children}
        </ul>
    )
}

const SubNavItem = (props) => {
    const { text, route, icon, query = '' } = props;
    return (
        <li className='nav-item w-100' style={{ borderLeft: 'solid 2px white' }}>
            <Link href={query != '' ? { pathname: route, query: { type: query } } : { pathname: route }}>
                <a className='nav-link text-light'>
                    <i className={`${icon} mx-3`}></i>
                    {text}
                </a>
            </Link>
        </li>
    )
}