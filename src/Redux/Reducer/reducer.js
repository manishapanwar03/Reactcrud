import { get_api_data } from "../Action/Company_Action";
const initialState = {
    list: null
}

export const listReducer = (state = initialState, action) => {
    switch (action.type) {
        case get_api_data: return {
            ...state,
            list: action.apiData
        }
        default
            : return state
    }
}