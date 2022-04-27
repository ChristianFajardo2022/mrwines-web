import axios from 'axios'

//const urlMrWines = 'http://localhost:4000/'
const urlMrWines = 'https://mrwines.herokuapp.com/'

const wineActions = {

    getWines: () => {
        return async(dispatch, getState) => {
            const answer = await axios.get(urlMrWines+`api/wines`)
            dispatch({type:'GET_WINES', payload:answer.data.response.wines})
        }
    },

    getTypeWines: (id) => {
        return async(dispatch, getState) => {
            const answer = await axios.get(urlMrWines+`api/types/${id}`)
            dispatch({type:'GET_TYPES', payload:answer.data.response.wines})
        }
    },

    oneWine: (id) => {
        return async(dispatch, getState) => {
            try {
                const answer = await axios.get(urlMrWines+`api/wines/${id}`)
                dispatch({type:'ONE_WINE', payload:answer.data.response.wines})
            }catch (err) {
                console.log(err)
            }
        }
    },

    uploadWine: (nameWine,type,variety,country,harvest,smell,color,palate,food,photo,stock,stars,price)=>{
        return async(dispatch,getState)=>{
            const answer = await axios.post(urlMrWines+`api/wines`,{nameWine,type,variety,country,harvest,smell,color,palate,food,photo,stock,stars,price})
            dispatch({type:'UPD_WINE', payload:answer.data.response.wines})
        }
    },

    deleteWine: (id) => {
        return async(dispatch, getState) => {
            try {
                const answer = await axios.delete(urlMrWines+`api/wines/${id}`)
                dispatch({type:'DEL_WINE', payload:answer.data.response.wines})
            }catch (err) {
                console.log(err)
            }
        }
    },

    modifyInfoWine: (id,nameWine,type,variety,country,harvest,smell,color,palate,food,photo,price) => {
        const token = localStorage.getItem('token')
        return async (dispatch, getState) => {
            const answer = await axios.put(urlMrWines+`api/wines/${id}`,{nameWine,type,variety,country,harvest,smell,color,palate,food,photo,price},
            {headers: {Authorization: "Bearer "+token}}
        )
        dispatch({type: 'message', payload: {view: true, message: answer.data.message, success: answer.data.success}
        })
        return answer.data.response
        }
    },

    modifyStockWine: (id,stock) => {
        const token = localStorage.getItem('token')
        return async (dispatch, getState) => {
            const answer = await axios.put(urlMrWines+`api/wines/${id}`,{stock},
            {headers: {Authorization: "Bearer "+token}}
        )
        dispatch({type: 'message', payload: {view: true, message: answer.data.message, success: answer.data.success}
        })
        return answer.data.response
        }
    },

    filterWines: (search) => {
        return (dispatch,getState)=>{
            dispatch({type:'FIL_WINES', payload:search})
        }
    }

}

export default wineActions