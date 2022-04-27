const initialState = {
    topics: [],
    oneTopic: [],
    auxTopics: []
}

const topicReducer = (state = initialState, action) => {
    //console.log(action)
    //console.log(state)
    switch(action.type) {
        case 'GET_TOPICS':
            return {
                ...state,
                topics: action.payload
            }
        case 'GET_ONE':
            return {
                ...state,
                oneTopic: action.payload
            }
        case 'MOD_TOPIC':
            return {
                ...state,
                auxTopic: action.payload
            }
        case 'UPD_TOPIC':
            let topics = [...state.topics]
            topics.push(action.payload)
            return{
                ...state,
                topics: action.payload,
                auxTopics: [...topics]
            }
        case 'DEL_TOPIC':
            return {
                ...state,
                topics: action.payload
            }
        default:
            return state
    }
}
export default topicReducer