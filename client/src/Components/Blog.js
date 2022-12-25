import "../styles/Blog.css"

import axios from 'axios';
import BlogList from "./BlogList";
import BlogEdit from './BlogEdit'
import {useState, useEffect}  from 'react'


function Blog(props){
    const [editBox, setEditBox] = useState(false);
    const [blogData,setBlogData] = useState({});
    function editMode(_id) {
        console.log('editMode');
        fetchSingleData(_id);
        setEditBox(true);
    }
    const [name, setName] = useState("");
    const [blogs, setBlogs] = useState([]);
    useEffect(()=>{
        fetchData()
    },[blogData])
    async function fetchSingleData(_id){
        let url = `/blogapp/v1/blog/:${_id}`
        let response = await axios.get(url);
        console.log(response);
        setBlogData(response.data.data);
    }
    async function fetchData(){
        let url = `/blogapp/v1/blogs`
        let response = await axios.get(url);
        console.log(response);
        setBlogs(response.data.data);
    }
    async function fetchSerachData(){
        let url = `/blogapp/v1/blog/:${name}`
        let response = await axios.get(url);
        console.log(response);
        setBlogs(response.data.data);
    }
    console.log("blogs",blogs);
    
    return(
        <div id="Blog-page">
            <div id="editMode">{editBox === true ? <BlogEdit blog={blogData} /> : null}</div>
            <div id="blog-menu">
                <input type="text" id="serach-box" onChange={(e)=>setName(e.target.value)} placeholder="Serach the Blog" />
                <button className="button" onClick={()=>{
                    fetchSerachData()
                }}>Search</button>
                <button className="button">Create</button>
            </div>
            <div id="blog-container">
                    {
                        // blogs.length === 0 ? <div className="create-blog" > create </div> : <BlogList blog={ {id:123,name: "aaman", content : "hello world", hashTag : ["one", "two"]}}/>

                        blogs.length === 0 ? <div className="create-blog" > create </div> : <ul className="unorder-list">
                            {blogs.map((blog,index)=> <li className="blog-list" key={index}><BlogList  key={index} blog={blog} editMode={editMode}/></li>)}
                        </ul>
                    }
            </div>
        </div>
    )
}

export default Blog;