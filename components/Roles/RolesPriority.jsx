import React,{useState,useEffect} from 'react'
//Redux
import {useSelector,useDispatch} from 'react-redux';
//actions
import {updateRolePriorityAction} from '../../store/actions/rolesAction'
//Imports
import {DragDropContext} from 'react-beautiful-dnd';
import DroppableItem from './DroppableItem';

const RolesPriority = () => {
    const dispatch = useDispatch();
    
    const [isLoading, setIsLoading] = useState(false);
    const isLoadingPriority = useSelector(state => state.roles.loadingPriority)
    const rolesList = useSelector(state => state.roles.completeRoles)

    const [rolesByPriority, setRolesByPriority] = useState({p1:[],p2:[],p3:[],p4:[], p5:[],p6:[],p7:[],p8:[],default:[]})
    useEffect(() => {
        rolesByPriorityProcess()
        // eslint-disable-next-line 
    }, [rolesList])

    const rolesByPriorityProcess = async () =>{
        setIsLoading(true);
        setRolesByPriority({p1:[],p2:[],p3:[],p4:[], p5:[],p6:[],p7:[],p8:[],default:[]});
        await rolesList?.forEach((role,index)=>{ 
            let currentArray =  rolesByPriority[role.priority];
            currentArray.push(role);
            setRolesByPriority({...rolesByPriority, [role.priority]:currentArray})
        })
        setIsLoading(false);
    }
    const updatePriority = async({destination, draggableId}) =>{
        const data = { 
            _id:draggableId,
            priority:destination.droppableId !== 'p0' ? destination.droppableId : 'default',
            index:destination.index
        }
        await dispatch(updateRolePriorityAction(data))
    }
    return (
        <div >
            <DragDropContext style={{ overflow: "scroll"}} className='drag-context' onDragEnd={(e)=>{updatePriority(e)}}>
                <DroppableItem items={rolesByPriority.p1} index={1}/>
                <DroppableItem items={rolesByPriority.p2} index={2}/>
                <DroppableItem items={rolesByPriority.p3} index={3}/>
                <DroppableItem items={rolesByPriority.p4} index={4}/>
                <DroppableItem items={rolesByPriority.p5} index={5}/>
                <DroppableItem items={rolesByPriority.p6} index={6}/>
                <DroppableItem items={rolesByPriority.p7} index={7}/>
                <DroppableItem items={rolesByPriority.p8} index={8}/>
                <DroppableItem items={rolesByPriority.default} index={0}/>
            </DragDropContext>
        </div>
    )
}

export default RolesPriority
