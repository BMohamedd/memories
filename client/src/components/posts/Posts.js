import React from 'react';
import Post from "./Post/Post";
import {useSelector} from "react-redux";
import {Spinner} from "reactstrap";
import "./postes.css";

function Posts() {
    const postsState = useSelector(state => state.posts.posts);
    const loading = useSelector(state => state.posts.loading)
    if(loading ) {return <Spinner>Loading...</Spinner>}
    else {
        return (
        <div id="posts-grid-container">
            {postsState.map(val => {
                return (<Post key={val._id} id={val._id} creator={val.creator} message={val.message} title={val.title} likecounter={val.likeCounter} picture={val.picture} date={val.createdAt}/>)
            })}
        </div>
    )
    }
}

export default Posts
