// import { get_employee_api_data } from "../Action/Employee_Action";
// const initialState = {
//     employee_list: null
// }

// export const employeeReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case get_employee_api_data: return {
//             ...state,
//             employee_list: action.employeeList
//         }
//         default
//             : return state
//     }
// }


import { get_api_data1 } from "../Action/Employee_Action";
const initialState = {
    list: null,
    postdataaa:null,
}

export const listReducer1 = (state = initialState, action) => {
    switch (action.type) {
        case get_api_data1: return {
            ...state,
            list: action.apiData
        }
        case "POSTEMP":return{
            ...state,
            postdataaa:action.value
        }
        default
            : return state
    }
}