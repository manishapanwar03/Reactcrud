
import { get_api_data ,POSTCMP } from "../Action/Complain_Action";
const initialState = {
    list: null,
    postdataa:null,
}

export const listReducer = (state = initialState, action) => {
    switch (action.type) {
        case get_api_data: return {
            ...state,
            list: action.apiData
        }
        case "POSTCMP":return{
            ...state,
            postdataa:action.value
        }
        default
            : return state
    }
}


