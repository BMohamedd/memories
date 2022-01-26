import * as api from "../api/index"
import {
    ITEM_LOADING, GET_ITEMS, GET_ITEM_FAILED, SAVING_NEW_POST,
    SAVING_SUCCESS, ADDING_TO_POST_LIST, SAVING_ERROR, UPDATING,
    UPDATING_POST_LIST,DELETE_POST, LIKE_POST_STARTING, LIKE_POST
} from "./actions";

export const getposts =  () => async (dispatch) => {
    dispatch({type: ITEM_LOADING})
    try {
       const {data} = await api.fetchposts(); 
       dispatch({type:GET_ITEMS, payload:data})
    } catch (error) {
        dispatch({type: GET_ITEM_FAILED, payload: {msg: "Could Not Load The Posts, try Reloading the page..."}})
    };
}
export const createNewPost = (postData) => async (dispatch) => {
    dispatch({type: SAVING_NEW_POST});
    try {
        const {data} = await api.CreatePost(postData);
        dispatch({type: SAVING_SUCCESS});
        dispatch({type: ADDING_TO_POST_LIST, payload: data});
    } catch (error) {
        dispatch({type: SAVING_ERROR, payload:{msg: "Could Not Load The Posts, please try again..."}});
    }
}
export const updatePost = (id, updatedPostData) => async (dispatch) => {
    dispatch({type: UPDATING})
    try {
        const {data} = await api.updatePostRequest(id, updatedPostData);
        dispatch({type: SAVING_SUCCESS});
        dispatch({type: UPDATING_POST_LIST, payload: data});
    } catch (error) {
        dispatch({type: SAVING_ERROR, payload:{msg: "Could Not Load The Posts, please try again..."}});
    }
}
export const  deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id)
        dispatch({type: DELETE_POST, payload: id});
    } catch (error) {
        console.log(error);
        // implement error handling
    }
}
export const AddLikeToPost = (id) => async (dispatch) => {
    dispatch({type: LIKE_POST_STARTING, payload: id})
    try {
        await api.likePost(id);
        dispatch({type: LIKE_POST, payload: id});
    } catch (error) {
        console.log(error);
        // implement error handling
    }
}