import Head from "next/head";
import { useState } from "react";
import AdminLayout from '../../../layouts/AdminLayout'
import Loading from '../../../components/shared/Loading'
import BankCreditList from "../../../components/BankCredits/BankCreditList";
//Redux
import { useSelector } from 'react-redux';

const Catalogs = () => {
    const [currentPage, setcurrentPage] = useState("bankCredits")

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
                        <BankCreditList />
                    </div>
                </div>
            </AdminLayout>

        </div>
    )
}

export default Catalogs
