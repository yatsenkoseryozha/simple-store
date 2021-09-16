let initialState = {
    number: 0
}

const mainReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'INCREASE': {
            state.number = state.number + action.value

            return state
        }
        case 'DECREASE': {
            state.number = state.number - action.value

            return state
        } default: return state
    }
}

const increaseActionCreator = (value) => ({ type: 'INCREASE', value })
const decreaseActionCreator = (value) => ({ type: 'DECREASE', value })
