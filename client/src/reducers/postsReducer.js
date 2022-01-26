import {GET_ITEMS, GET_ITEM_FAILED, DELETE_POST, LIKE_POST, LIKE_POST_STARTING, ITEM_LOADING, UPDATING_POST_LIST, ADDING_TO_POST_LIST} from './../actions/actions'
const initialState = {
    posts: [],
    loading: false,
    liking: {
        id:"",
        on: false
    },
    error: false,
    errorMSG: ""
};

const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ITEMS:
            return {
                ...state,
                posts: action.payload,
                loading: false           
             };
        case GET_ITEM_FAILED:
            return {...state,
                error: true,
                errorMSG: action.payload.msg
            };
        case DELETE_POST:
            return {
            ...state,
            posts: state.posts.filter(post => post._id !== action.payload)
            }
        case LIKE_POST:
            return {
                ...state,
                posts: state.posts.map(post => {
                    if(post._id === action.payload) {
                        return {...post, likeCounter: post.likeCounter + 1};
                    }else return post;
                }),
                liking: {
                    id:"",
                    on: false
                }
            }
        case LIKE_POST_STARTING:
            return {
                ...state,
                liking: {
                   on: true,
                   id: action.payload 
                }
            }
        case ITEM_LOADING:
            return {
                ...state, 
                loading: true
            };
        case UPDATING_POST_LIST:
            return {
                ...state,
                posts: [ action.payload, ...state.posts.filter(val => val._id !== action.payload._id)],
                loading: false         
             };
        case ADDING_TO_POST_LIST:
            return {
                ...state,
                posts:[action.payload, ...state.posts]
            }
            default:
            return state;
    }
}




export default postsReducer;