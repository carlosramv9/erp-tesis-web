import Head from "next/head";
import { useState } from "react";
import AdminLayout from '../../../layouts/AdminLayout'
import Loading from '../../../components/shared/Loading'
//Redux
import { useSelector } from 'react-redux';
import DivisionList from "../../../components/Divisions/DivisionList";

const Catalogs = () => {
    const [currentPage, setcurrentPage] = useState("builders")

    const changePage = (page) => {
        setcurrentPage(page)
    }

    return (
        <div>
            <Head>
                <title>Catalogos - VIVE Sistemas Inmobiliarios</title>
            </Head>

            <AdminLayout>
                <div className="row wrap">
                    <div className="col-12 p-3">
                        <DivisionList />
                    </div>
                </div>
            </AdminLayout>

        </div>
    )
}

export default Catalogs
