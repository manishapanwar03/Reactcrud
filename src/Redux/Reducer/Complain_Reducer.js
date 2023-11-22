
import { get_api_data2, postRes } from "../Action/Complain_Action";
const initialState = {
    list: null,
    postdata:null
}

export const listReducer2 = (state = initialState, action) => {
    switch (action.type) {
        case get_api_data2: return {
            ...state,
            list: action.apiData,

        }
        case "POSTRES":return{
            ...state,
            postdata:action.value
        }
        default
            : return state
    }
}


