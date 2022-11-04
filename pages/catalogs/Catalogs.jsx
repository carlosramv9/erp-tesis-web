import Head from "next/head";
import { useState } from "react";
import AdminLayout from '../../layouts/AdminLayout'
import Loading from '../../components/shared/Loading'
//Redux
import { useSelector } from 'react-redux';
import BuilderList from "../../components/Builders/BuilderList";
import DivisionList from "../../components/Divisions/DivisionList";
import CategoryList from "../../components/Categories/CategoryList";
import BuildModelList from "../../components/BuildModels/BuildModelList";

const Catalogs = () => {
    const [currentPage, setcurrentPage] = useState("builders")

    const changePage = (page) => {
        setcurrentPage(page)
    }

    var idxPages = () => {
        switch (currentPage) {
            case "builders":
                return <BuilderList />
            case "divisions":
                return <DivisionList />
            case "categoriesDocs":
                return <CategoryList />
            case "models":
                return <BuildModelList />
            default:
                break;
        }
    }

    return (
        <div>
            <Head>
                <title>Catalogos - VIVE Sistemas Inmobiliarios</title>
            </Head>

            <AdminLayout>
                <div className="row wrap">
                    <div className="col-md-12 col-lg-9 p-3">
                        {idxPages()}
                    </div>
                    <div className="col-md-12 col-lg-3 my-5 catalog">
                        <h3 className="mb-3">Directorio</h3>
                        <ul className="catalog_list">
                            <li className="catalog_item" onClick={() => changePage('divisions')}><i className="bi bi-journal-text"></i> Fraccionamientos</li>
                            <li className="catalog_item" onClick={() => changePage('builders')}><i className="bi bi-journal-text"></i> Constructoras</li>
                            <li className="catalog_item" onClick={() => changePage('models')}><i className="bi bi-journal-text"></i> Modelos</li>
                            <li className="catalog_item" onClick={() => changePage('categoriesDocs')}><i className="bi bi-journal-text"></i> Categorias Documentos</li>
                        </ul>
                    </div>
                </div>
            </AdminLayout>

        </div>
    )
}

export default Catalogs
