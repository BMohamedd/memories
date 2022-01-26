import axios from 'axios';

const url = "/server"

export const fetchposts = () => axios.get(url);
export const CreatePost = (newPost) => axios.post(`${url}/create`, newPost);
export const updatePostRequest = (id, updatedData) => axios.patch(`${url}/${id}`, updatedData);
export const deletePost = (id) => axios.delete(`${url}/delete/${id}`);
export const likePost = (id) => axios.patch(`${url}/like/${id}`);