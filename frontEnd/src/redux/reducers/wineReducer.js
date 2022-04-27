const initialState = {
    wines: [],
    types: [],
    filter: [],
    onlyWine: {},
    auxWine: []
}

const wineReducer = (state = initialState, action) => {
    //console.log(action)
    //console.log(state.filterWines)
    switch(action.type) {
        case 'GET_WINES':
            return {
                ...state,
                wines: action.payload
            }
        case 'GET_TYPES':
            return {
                ...state,
                types: action.payload
            }
        case 'ONE_WINE':
            return {
                ...state,
                onlyWine: action.payload
            }
        case 'UPD_WINE':
            let wines = [...state.wines]
            wines.push(action.payload)
            return{
                ...state,
                wines: action.payload,
                auxWines: [...wines]
            }
        case 'DEL_WINE':
            return {
                ...state,
                cities: action.payload
            }
        case 'FIL_WINES':
            return {
                ...state,
                filter: state.wines.filter(everyWine => everyWine.nameWine.toLowerCase().startsWith(action.payload.toLowerCase()))
            }
        default:
            return state
    }
}
export default wineReducer