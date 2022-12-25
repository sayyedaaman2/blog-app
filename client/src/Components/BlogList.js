import '../styles/BlogList.css'

import { Table } from 'react-bootstrap';
import axios from 'axios';

function BlogList({ blog ,editMode}) {

    const deleteBlog = async function() {
        try {
            console.log(blog._id)
            let url = `/blogapp/v1/blog`
            let response = await axios.delete(url,{
                params : { id : blog._id}
            });
            console.log(response);
            if(response.status !== 200 ){
                alert("Server Error");
            }else{
                alert("Successfully Deleted !");
            }

        } catch (err) {
            console.log(`Error while deleting the blog`)
        }
    }
    return (
        <div className="Blog-list">

            <Table border="2px">
                <tbody>
                    <tr className='row'>
                        <td className='cell'>
                            _id : {blog._id}
                        </td>
                        <td className='cell'>
                            name : {blog.name}
                        </td><td className='cell'>
                            content : {blog.content}
                        </td><td className='cell'>
                            hashTag :{
                                blog.hashTag.map(tag => {
                                    return <div className="hashtag">
                                        <h6 key={tag} className="tag">{tag}</h6>
                                    </div>
                                })
                            }
                        </td>
                    </tr>
                    <tr className='row'>
                        <td className='cell'>
                            <div className='options'>
                                <button className="button" onClick={() => editMode(blog._id)}>Edit</button>
                                <button className="button" onClick={() => deleteBlog() }>Delete </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}

export default BlogList;