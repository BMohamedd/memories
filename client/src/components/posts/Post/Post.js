import React from 'react'
import './post.css'
import moment from "moment";
import {Button, Spinner} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {deletePost, AddLikeToPost} from "../../../actions/posts";

function Post({message, title, likecounter, picture ,date, creator, id}) {
    const dispatch = useDispatch();
    const like = useSelector(state => state.posts.liking)
    const editingPost = () => {
        dispatch({type: "EDITING_POST", payload: id});
    }

    return (
            <div id="post-container">
                <div id="user">
                    <div>
                        <h3><i className="fas fa-user"></i> {creator}</h3>
                        <p style={{"fontSize":"80%"}}>Posted {moment(date).fromNow()}</p>
                    </div>
                    <i onClick={() => {editingPost()}} className="fas fa-pen"></i>
                </div>
                <div id="post-img-container">
                <img id="post-img" src={picture} alt='post img'/>
                </div>
                <h2 id="post-header">{title}</h2>
                <p id="post-body">{message}</p>
                <div id="btn-flex-container">
                <Button color='secondary' outline id="post-likeCounter" disabled={(like.on && like.id === id)? true: false} onClick={() => dispatch(AddLikeToPost(id))}>{likecounter} &nbsp; {(like.on && like.id === id)? <Spinner color='success' size={"sm"}>Loading...</Spinner>:(<i className="far fa-heart"></i>)}</Button>
                <Button color='danger' outline id="post-deleteBTN" onClick={() => dispatch(deletePost(id))}>Delete &nbsp; <i className="fas fa-trash"></i></Button>
                </div>
            </div>
    )
}

export default Post
