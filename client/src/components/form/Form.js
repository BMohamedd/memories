import React, {Fragment, useState, useEffect} from 'react';
import './form.css';
import Filebase from "react-file-base64";
import {Form, FormGroup, Label, Input, FormText, ButtonGroup, Button, Spinner} from "reactstrap"
import {useDispatch} from "react-redux";
import {createNewPost, updatePost} from "../../actions/posts";
import {useSelector} from "react-redux"
import {EDITING_POST} from "./../../actions/actions";

function FormComponent() {
    const [postData, setPostData] = useState({
        creator: "", title: "", message: "", picture: ""
    })
    const dispatch = useDispatch();
    const loading = useSelector(state => state.form.loading);
    const id = useSelector(state => state.form.postId)
    const posts = useSelector(state => state.posts.posts)


    useEffect(() => {
        if(id) {
        const {creator: pc, title: pt, message: pm, picture: pp} = posts.find(post => post._id === id);
        setPostData({
            creator: pc, title: pt, message: pm, picture: pp
        })
    }
    }, [id, posts])

    const clear = () => {
        setPostData({...postData,
            creator: "",
            title: "",
            message: "",
            picture: ""
        });

        dispatch({type: EDITING_POST, payload: null});
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if(!id) {
            dispatch(createNewPost(postData))
        }else {
           dispatch(updatePost(id, postData)) 
        }
        clear();
    }
    return (
        <div id="form-main-container">
            <h2>{id ?"Editing the":"Create a"} memorie</h2>
            <Form onSubmit={submitHandler}>
                <FormGroup>
                    <Label for="Creator">
                        Post Creator:
                    </Label>
                    <Input id="Creator" type='text'  placeholder="What is your name?" onChange={(e) => setPostData({...postData, creator: e.target.value})} value={postData.creator} required="true"/>
                </FormGroup>        
                <FormGroup>
                    <Label for="title">
                        Post Title:
                    </Label>
                    <Input required="true" value={postData.title}  onChange={(e) => setPostData({...postData, title: e.target.value})} id="title" type='text' placeholder="What is your memorie's title?"/>
                </FormGroup>        
                <FormGroup>
                    <Label for="description">
                        Post description:
                    </Label>
                    <Input required="true" value={postData.message} onChange={(e) => setPostData({...postData, message: e.target.value})} id="body" type='textarea' placeholder="What is your memorie's description?"/>
                </FormGroup>        
                <FormGroup>
                    <Label for="picture">
                        Post picture:
                    </Label>
                    <div id="upload-file-container">
                        <Filebase type="file" multiple={false} onDone={(files) => {
                            setPostData({...postData, picture: files.base64});
                        }}></Filebase>
                    </div>
                    <FormText style={{"display":"block"}}>
                        The picture must be smaller then or equal to 2mb.
                    </FormText>
                </FormGroup>
                <div id="btn-spinner-holder">  
                    <ButtonGroup>
                        <Button color='primary' type='submit'>
                            Submit 
                        </Button>    
                        <Button color='danger' type='button' onClick={clear}>
                            Clear
                        </Button> 
                    </ButtonGroup>
                    <div id="form-loading-spinner"> 
                        {loading ? (<Spinner>Loading...</Spinner>): <Fragment></Fragment>}      
                    </div>
                </div>
            </Form> 
        </div>
    )
}

export default FormComponent;
