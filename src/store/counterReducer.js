const initialState = {
    bascet: [],
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case "ADD_IN_BUSCET":
        return{...state, bascet: [...state.bascet, action.value]}
        case "SET_BUSCET":
        return{...state, bascet: action.value}

        default:
            return state 
    }

}

export default reducer;