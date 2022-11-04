import { useEffect, useState } from 'react';
import Modal from '../shared/Modal';
import Paginator from '../shared/Paginator'
import CategoryHeader from './CategoryHeader';
import Loading from '../shared/Loading';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { CategoryForm } from './CategoryForm';
import { getCategoriesAction } from '../../store/actions/categoryActions';

export default function CategoryList() {
    const dispatch = useDispatch();

    const isLoading = useSelector(state => state.builders.loading)
    const categoriesList = useSelector(state => state.categories.categories)
    const totalItems = useSelector(state => state.categories.total)
    
    const [show, setShow] = useState(false)
    const [categoriesArray, setcategoriesArray] = useState(categoriesList)
    const [category, setcategory] = useState({})
    const [page, setPage] = useState(1)

    const updateShow = (_show) => setShow(_show)
    const searchHandler = (e) => setcategoriesArray(categoriesList.filter(x => (x.name.toLowerCase()).includes(e.target.value.toLowerCase())))
    
    useEffect(() => {
        dispatch(getCategoriesAction(page));
        // eslint-disable-next-line 
    }, [page])


    return (
        <>
            <div className='mt-4 d-flex flex-column'>
                <div className='border-bottom'>
                    {isLoading ? <Loading /> : <CategoryHeader />}
                </div>
            </div>
            <div className="row m-3">
                <div className="col-md-4 col-xl-3 col-sm-12">
                    <input className="form-control border-end-0 border rounded-pill" type="text" placeholder="Buscar..." id="example-search-input" onChange={e => searchHandler(e)} />
                </div>
            </div>
            <div className='d-flex justify-content-end me-4'>
                <Paginator totalItems={totalItems} page={page} setPage={setPage} />
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th className='table-header'>Nombre</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        categoriesList?.map((data, index) => (
                            
                            <tr key={index} onClick={() => { setShow(!show); setcategory(data) }}>
                                <td>{data?.name}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <Modal title="Actualizar" show={show} setShow={setShow}>
                <CategoryForm show={updateShow} category={category} />
            </Modal>
        </>
    )
}
