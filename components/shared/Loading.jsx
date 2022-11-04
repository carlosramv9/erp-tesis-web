
import { TailSpin } from  'react-loader-spinner'
const Loading = ({loading}) => {
    return (
        <div className="d-flex justify-content-center mt-3">
            <TailSpin color='#d8ac34' height={250} width={250} visible={loading}/>
        </div>
    )
}

export default Loading
