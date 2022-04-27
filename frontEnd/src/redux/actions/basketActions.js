import axios from 'axios'

//const urlMrWines = 'http://localhost:4000/'
const urlMrWines = 'https://mrwines.herokuapp.com/'

const basketActions = {

    getBuy: () => {
        const token = localStorage.getItem('token')
        return async(dispatch, getState) => {
            const answer = await axios.get(urlMrWines+`api/buyBasket`,{headers: {Authorization: "Bearer "+token}})
            dispatch({type:'GET_PRO', payload:answer.data.response.basket})
        }
    },

    getOld: () => {
        const token = localStorage.getItem('token')
        return async(dispatch, getState) => {
            const answer = await axios.get(urlMrWines+`api/oldBasket`,{headers: {Authorization: "Bearer "+token}})
            dispatch({type:'GET_PRO', payload:answer.data.response.basket})
        }
    },

    getUserBasket: () => {
        const token = localStorage.getItem('token')
        return async(dispatch, getState) => {
            const answer = await axios.get(urlMrWines+`api/basket`,{headers: {Authorization: "Bearer "+token}})
            dispatch({type:'GET_PRO', payload:answer.data.response.basket})
            //console.log(answer.data.response.basket)
            return answer.data.response.basket
        }
    },

    getProduct: (id) => {
        const token = localStorage.getItem('token')
        return async(dispatch, getState) => {
            const answer = await axios.get(urlMrWines+`api/basket/${id}`,{headers: {Authorization: "Bearer "+token}})
            dispatch({type:'GET_ONE', payload:answer.data.response.basket})
            console.log(answer.data.response.basket)
            return (answer.data.response.basket)
        }
    },

    addProduct: (idWine)=>{
        const token = localStorage.getItem('token')
        return async(dispatch,getState)=>{
            const answer = await axios.post(urlMrWines+`api/basket`,{idWine},{headers: {Authorization: "Bearer "+token}})
            dispatch({type: 'message', payload:{view: true, message: answer.data.message, success: answer.data.success}})
            console.log(answer.data.response)
            return answer.data.response
        }
    },

    deleteProduct: (id) => {
        const token = localStorage.getItem('token')
        return async(dispatch, getState) => {
            try {
                const answer = await axios.delete(urlMrWines+`api/basket/${id}`,{headers: {Authorization: "Bearer "+token}})
                dispatch({type: 'message', payload:{view: true, message: answer.data.message, success: answer.data.success}})
                return answer.data.response
            }catch (err) {
                console.log(err)
            }
        }
    },

    modifyProduct: (commentData) => {
        //console.log(commentData)
        const token = localStorage.getItem('token')
        return async (dispatch, getState) => {
            const answer = await axios.put(urlMrWines+`api/basket`,{...commentData},
            {headers: {Authorization: "Bearer "+token}})
        dispatch({type: 'message', payload: {view: true, message: answer.data.message, success: answer.data.success}})
        return answer.data.response
        }
    },

    modifyState: (commentData) => {
        //console.log(commentData)
        const token = localStorage.getItem('token')
        return async (dispatch, getState) => {
            const answer = await axios.put(urlMrWines+`api/buyBasket`,{...commentData},
            {headers: {Authorization: "Bearer "+token}})
        dispatch({type: 'message', payload: {view: true, message: answer.data.message, success: answer.data.success}})
        console.log(answer.data.response)
        return answer.data.response
        }
    }

}

export default basketActions