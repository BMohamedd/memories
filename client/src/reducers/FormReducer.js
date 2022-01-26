import {SAVING_SUCCESS, SAVING_ERROR, SAVING_NEW_POST, EDITING_POST, UPDATING} from "../actions/actions";
const initialState = {
    postId: null,
    loading: false,
    error: false,
    errorMSG: ""
};

const formReducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVING_SUCCESS:
            return {
                ...state,
                loading: false           
             };
        case SAVING_ERROR:
            return {...state,
                error: true,
                errorMSG: action.payload.msg
            };
        case SAVING_NEW_POST:
            return {
                ...state, 
                loading: true
            };
        case EDITING_POST:
            return {
                ...state,
                postId: action.payload
            }
        case UPDATING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}




export default formReducer;