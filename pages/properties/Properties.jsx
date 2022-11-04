import { useState } from "react";
import Head from "next/head";
import AdminLayout from '../../layouts/AdminLayout'
import PropertyList from '../../components/Property/PropertyList.jsx'
import PropertyHeader from '../../components/Property/PropertyHeader'
import { useRouter } from 'next/router'

const Properties = () => {
    const router = useRouter()
    const { type } = router.query
    const [options, setOptions] = useState(
        [
            { key: "Option 1", cat: "Group 1" },
            { key: "Option 2", cat: "Group 1" },
            { key: "Option 3", cat: "Group 1" },
            { key: "Option 4", cat: "Group 2" },
            { key: "Option 5", cat: "Group 2" },
            { key: "Option 6", cat: "Group 2" },
            { key: "Option 7", cat: "Group 2" }
        ])

    const [selectedOption, setSelectedOption] = useState();
    return (
        <div>
            <Head>
                <title>Propiedades - VIVE Sistemas Inmobiliarios</title>
            </Head>
            <AdminLayout>
                <div className='mt-4 d-flex flex-column'>
                    <div className='border-bottom'>
                        <PropertyHeader type={type} />
                    </div>
                    <div className='ms-1 mt-5'>
                        <PropertyList type={type} />
                    </div>
                </div>

            </AdminLayout>
        </div>
    )
}
export default Properties
