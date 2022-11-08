const key = 'pc-key';

const setToken = (token) => {
    return window.localStorage.setItem(key, token)
}

const getToken = (token) => {
    return window.localStorage.getItem(key);
}

const removeToken = (token) => {
    return window.localStorage.removeItem(key);
}

export {
    setToken,
    getToken,
    removeToken
}