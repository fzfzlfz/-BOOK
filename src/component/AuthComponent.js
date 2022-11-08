import { getToken } from '@/utils'
import { Navigate } from 'react-router-dom'

function AuthComponent ({ children }) {
    const isToken = getToken();
    //小心假token，需要后端检查！
    if(isToken) {
        return <>{children}</>
    } else {
        return <Navigate to='/login' replace />
    }
}

export {AuthComponent}