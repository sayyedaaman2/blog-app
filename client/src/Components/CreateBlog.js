import '../styles/CreateBlog.css'
import {useState}from 'react'
import axios from 'axios';

const CreateBlog = () => {
    const [name,setName] = useState("");
    const [userid,setUserId] = useState("");
    const [content,setContent] = useState("")
    const [tag,setTag] =useState("");
    const [hashTag,updateHashTag] = useState([]);

    async function PostData(){

      updateHashTag(tag);
      let blogData = {
        userid : userid,
        name : name,
        content : content,
        hashTag : hashTag
      }
      let url = `/blogapp/v1/blog/create`
      let response = await axios.post(url,blogData);
      console.log(response);
      if(response.status == 201){
        alert("Successfuly Created the Blog");
      }
      else{
        
        alert("Failed");
      }
  }
  function hashTagHandler(e){
    e.preventDefault();
    hashTag.push(tag);
    document.getElementById("hashtag").value = ""
    
  }
  return (
    <div id='createBlog'>
      <div id='createBlog-container'>
        <form className='createbox-form'>
            <div className='input-container'><label className='key'>userid</label> : <input  className="value" type="text" onChange={(e)=>setUserId(e.target.value)}/><br/></div>
            <div className='input-container'><label className='key'>name</label> : <input  className="value" type="text" onChange={(e)=>setName(e.target.value)}/><br/></div>

             <div className='input-container'><label className='key'>content</label> : <textarea type="text"  onChange={(e)=>setContent(e.target.value)} id='content' className="value"/><br/></div>
             <div className='input-container'><div id='hashtag-conatiner'>{hashTag.map((tag)=> <div className='tag'>{tag}</div>)}</div></div>
             <div className='input-container'><label className='key'>hashTag</label> : <input type="text" id="hashtag" className="value" onChange={(e)=>setTag(e.target.value)}/><br/></div>
             <button  id="add-button" className="button" onClick={(e)=> hashTagHandler(e)} >AddHashTag</button>
             <button  id="add-button" className="button" onClick={()=> PostData()} >Create</button>
            
        </form>
      </div>
    </div>
  )
}

export default CreateBlog
