import { combineReducers  } from 'redux'

const theReducer = (state={ menuShow:true, }, action ) => {
    if(action.type === 'SHOW_MENU' ) {
        const updated = {
            ...state, menuShow:true
        }

        return updated
    } else if (action.type === 'HIDE_MENU') {
        const updated = {
            ...state, menuShow:false
        }

        return updated
    } else if(action.type === 'USER_INFO'){
        const updated = {
            ...state, user:action.payload
        }

        return updated
    }

    return state
}

const commenProprties = combineReducers ({
    reducer:theReducer
})

export default commenProprties
