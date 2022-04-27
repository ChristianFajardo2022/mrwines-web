import axios from 'axios'

//const urlMrWines = 'http://localhost:4000/'
const urlMrWines = 'https://mrwines.herokuapp.com/'

const topicActions = {

    getTopics: () => {
        return async(dispatch, getState) => {
            const answer = await axios.get(urlMrWines+`api/topics`)
            dispatch({type:'GET_TOPICS', payload:answer.data.response.topics})
            return answer.data.response.topics
        }
    },

    getOneTopic: (id) => {
        return async(dispatch, getState) => {
            try {
                const answer = await axios.get(urlMrWines+`api/topics/${id}`)
                //console.log(answer.data.response.topic)
                return answer.data.response.topic
            }catch (err) {
                console.log(err)
            }
        }
    },

    uploadTopic: (topic)=>{
        console.log(topic)
        const token = localStorage.getItem("token")
        return async(dispatch,getState) => {
            const answer = await axios.post(urlMrWines+"api/topics", {...topic} ,
                {headers:{ Authorization: `Bearer ${token}`}})
            dispatch({type:'UPD_TOPIC', payload:answer.data.response.newTopic})
            return answer.data.response.newTopic
        }
    },

    modifyTopic: (topic) => {
        const token = localStorage.getItem("token")
        return async (dispatch, getState) => {
            const answer = await axios.put(urlMrWines+"api/topics",{...topic},
                {headers: {Authorization: `Bearer ${token}`}})
            dispatch({type:'MOD_TOPIC', payload:answer.data.response})
            return answer.data.response
        }
    },

    deleteTopic: (id) => {
        const token = localStorage.getItem("token")
        return async(dispatch, getState) => {
            try {
                const answer = await axios.post(urlMrWines+`api/topics/${id}`,{},
                    {headers:{ Authorization: `Bearer ${token}`}})
                dispatch({type:'DEL_TOPIC', payload:answer.data.response})
            }catch (err) {
                console.log(err)
            }
        }
    },

    likeTopic: (id) => {
        const token = localStorage.getItem('token')
        return async() => {
            try {
                const answer = await axios.put(urlMrWines+`api/topics/likes/${id}`,{},
                    {headers: {Authorization: "Bearer "+token}})
                return answer.data.response
            }catch (err) {
                console.log(err)
            }
        }
    },

    addComment: (comment) => {
        const token = localStorage.getItem('token')
        return async (dispatch, getState) => {
            const answer = await axios.post(urlMrWines+`api/comments`,{...comment},
                    {headers: {'Authorization': "Bearer "+token}})
                dispatch({type: 'message', payload: {view: true, message: answer.data.message, success: answer.data.success}
                })
                console.log(answer.data.response)
                return answer.data.response
        }
    },

    modifyComment: (comment) => {
        const token = localStorage.getItem('token')
        return async (dispatch, getState) => {
            const answer = await axios.put(urlMrWines+`api/comments`,{...comment},
                {headers: {Authorization: "Bearer "+token}})
            dispatch({type: 'message', payload: {view: true, message: answer.data.message, success: answer.data.success}
            })
            return answer.data.response
        }
    },

    deleteComment: (id) => {
        const token = localStorage.getItem('token')
        return async (dispatch, getState) => {
            const answer = await axios.post(urlMrWines+`api/comments/${id}`,{},
                {headers: {Authorization: "Bearer "+token}})
            dispatch({type: 'message', payload: {view: true, message: answer.data.message, success: answer.data.success}
            })
        }
    }
}

export default topicActions;