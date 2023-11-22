import { listReducer } from "./Company_Reducer";

import {listReducer1} from './Employee_Reducer'
import {listReducer2} from './Complain_Reducer'


import { combineReducers } from "redux";

const rootReducer=combineReducers({
    listReducer,
    listReducer1,
    listReducer2
    

});
export default rootReducer;
