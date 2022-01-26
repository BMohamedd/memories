import React from 'react'
import FormComponent from './components/form/Form';
import Posts from './components/posts/Posts';
import Nav from "./components/navigation/Nav"
import {Container} from "reactstrap";
import { getposts } from "./actions/posts";
import {useDispatch} from "react-redux";
import { useEffect } from 'react';
import "./app.css";


function App() {
const dispatch = useDispatch();
useEffect(() => {
    dispatch(getposts());
}, [dispatch]);

    return (
        <div id="main">
            <Nav />
            <Container>
                <div id="grid-container">
                    <Posts />
                    <FormComponent />
                </div>
            </Container>
        </div>
    )
}

export default App
