import { combineReducers } from "redux"
import postsReducer from "./postsReducer"
import formReducer from "./FormReducer"

const rootReducer = combineReducers({
    posts: postsReducer,
    form: formReducer
})





export default rootReducer