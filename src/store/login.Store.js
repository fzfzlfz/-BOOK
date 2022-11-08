import { makeAutoObservable } from 'mobx';
import { http, setToken, getToken } from '@/utils'
 
class LoginStore {
    token = getToken() || '';
    constructor() {
        makeAutoObservable(this);
    }
    getToken = async({email, password}) => {
        const res = await http.post('https://635e811e03d2d4d47af02b61.mockapi.io/api/v1/login', {
            email,
            password
        })
        this.token = res.data.token
        // store in localstorage
        setToken(this.token);
    }
}

export default LoginStore;