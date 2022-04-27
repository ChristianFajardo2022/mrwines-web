import axios from 'axios'

//const urlMrWines = 'http://localhost:4000/'
const urlMrWines = 'https://mrwines.herokuapp.com/'

const userActions = {

    newAdmin: (userData) => {
        //el formulario debe tener los inputs de registro en una variable que se llame userData
        //chequeen el modelo para ver LOS CAMPOS REQUERIDOS
        //falta configurar la creacion de ADMIN
        console.log(userData)
        return async (dispatch, getState) => {
            const res = await axios.post(urlMrWines+'api/auth/newAdmin', {userData})
            console.log(res)
            dispatch({ //despacho al reductor
                type: 'message',
                payload: {
                    view: true,
                    message: res.data.message,
                    success: res.data.success
                }
            })
        }
    },

    signUpUser: (userData) => {
        //el formulario debe tener los inputs de registro en una variable que se llame userData
        //chequeen el modelo para ver LOS CAMPOS REQUERIDOS
        //falta configurar la creacion de ADMIN
        console.log(userData)
        return async (dispatch, getState) => {
            const res = await axios.post(urlMrWines+'api/auth/signUp', {userData})
            console.log(res)
            dispatch({ //despacho al reductor
                type: 'message',
                payload: {
                    view: true,
                    message: res.data.message,
                    success: res.data.success
                }
            })
        }
    },

    logInUser: (userLogin) => {
        //el formulario debe tener los inputs de registro en una variable que se llame userLogin
        //chequeen el modelo para ver LOS CAMPOS REQUERIDOS
        //falta configurar el cambio a ADMIN
        console.log(userLogin)
        return async (dispatch, getState) => {
            const res = await axios.post(urlMrWines+'api/auth/logIn', {userLogin})
            console.log(res)
            if(res.data.success) {
                localStorage.setItem('token',res.data.response.token)
                dispatch({
                    type: 'user',
                    payload: res.data.response.userData
                })
            } else {
                dispatch({
                    type: 'message',
                    payload: {
                        view: true,
                        message: res.data.message,
                        success: res.data.success
                    }
                })
            }
        } 
    },

    signOutUser: (closeData) => {
        //console.log(closeData)
        return async (dispatch, getState) => {
            const res = axios.post(urlMrWines+'api/auth/signOut',{closeData})
            //console.log(res) //es solo para chequear que el usuario se haya deslogueado
            localStorage.removeItem('token')
            dispatch({
                type: 'user',
                payload: null
            })
        }   
    },

    verifyToken: (token) => {
        return async (dispatch, getState) => {
            //console.log(token)
            const user = await axios.get(urlMrWines+'api/auth/loginToken', {headers: {'Authorization': 'Bearer '+token}} )
            //console.log(user)
            if (user.data.success) {
                dispatch({
                    type: 'user',
                    payload: user.data.response
                })
                dispatch({
                    type: 'message',
                    payload: {
                        view: true,
                        message: user.data.message,
                        success: user.data.success
                    }
                })
            } else {
                localStorage.removeItem('token')
            }
        }
    }
}

export default userActions