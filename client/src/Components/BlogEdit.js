function BlogEdit({blog}){
    return(
        <div className="edit-container">
            <div className="edit-form">
                <h4 className="key">_id</h4> : {blog._id}
                <h4 className="key">name</h4> : <input type="text"  value={blog.name}/>
                <h4 className="key">content</h4><textarea type="text" value={blog.content} />
                <h4 className="key">hashTag</h4> : {blog.hashTag}
            </div>
        </div>
    )
}

export default BlogEdit;