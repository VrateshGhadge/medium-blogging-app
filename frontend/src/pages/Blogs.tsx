import { AppBar } from "../components/AppBar"
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks"

export const Blogs = ()=>{
    const { loading, blogs } = useBlogs();

    if(loading){
        return <div>
            loading...
        </div>
    }

    return <div >
        <AppBar />
        <div className="flex justify-center">
        <div className="">
            {blogs.map(blog => 
                <BlogCard
                id = {blog.id}
                authorName={blog.author.name || "Anonymous"}
                title={blog.title}
                content={blog.content}
                publishedDate={"3rd April 26"}
            />
            )}
            
        </div>
        </div>
    </div>
}