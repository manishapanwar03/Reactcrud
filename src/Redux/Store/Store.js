
import rootReducer from "../Reducer/rootreducer";
import thunk from "redux-thunk";
import { applyMiddleware, createStore} from 'redux';
// import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
// import { listReducer } from "./Reducer/ApiData";
const store=createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk)),
    );
 export default store