import { useForm } from "react-hook-form";
import { getToken } from '../../api/token';
import { toast } from "react-toastify";
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { addCategoriesAction, updateCategoriesAction, deleteCategoriesAction } from '../../store/actions/categoryActions';
import { useState } from "react";

export const CategoryForm = ({ show, category }) => {
    const dispatch = useDispatch();
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [newcategory, setnewcategory] = useState(category)

    const submitNewCategory = async (_category) => dispatch(addCategoriesAction(_category));
    const submitUpdateCategory = async (_category) => dispatch(updateCategoriesAction(category._id, _category));
    const submitDeleteCategory = async () => dispatch(deleteCategoriesAction(category._id));

    const processData = async (data, e) => {
        const token = getToken();
        if (token) {
            if (category) {
                const _data = {
                    name: data.name != "" ? data.name : category.name
                }
                await submitUpdateCategory(_data)
                show(false)
                toast.success('Updated Successful')
            }
            else {
                await submitNewCategory(data)
                show(false)
                toast.success('Uploaded Successful')
            }
        } else {
            toast.error("Information Failed")
        }
        e.target.reset();
    }

    const deleteHandler = async () => {
        const token = await getToken();
        if (token) {

            await submitDeleteCategory()
            show(false)
            toast.success('Deleted Successful')

        } else {
            toast.error("Information not found")
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit(processData)} method="post" className=''>
                <div className="row">
                    <div className="row m-auto">
                        <div className="mb-3 col-6">
                            <label htmlFor="" className="form-label">Name</label>
                            <input type="text" className="form-control" name='name'
                                defaultValue={category ? category.name : 'Name'}
                                {...register("name", category ? { required: { value: false } } : { required: { value: true, message: 'The Name is required' }, minLength: { value: 3, message: "Min lenght 3" } })} />
                            <span className='text-danger text-small d-block mb-2'>{errors?.name?.message}</span>
                        </div>
                    </div>

                    {category ?
                        (
                            <>
                                <input type="submit" value="Update" className='btn btn-block btn-action-primary p-5' />
                                <button type='button' onClick={() => deleteHandler()} className='btn btn-block btn-action-warning p-5 mt-3' >Delete</button>
                            </>
                        )
                        :
                        (
                            <input type="submit" value="Send" className='btn btn-block btn-action-primary p-5' />
                        )
                    }
                </div>
            </form>
        </div>
    )
}
