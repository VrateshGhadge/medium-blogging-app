import { AppBar } from "../components/AppBar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton"
import { useBlogs } from "../hooks"
import { Link } from "react-router-dom"

export const Blogs = ()=>{
    const { loading, blogs } = useBlogs();

    if(loading){
        return <div>
            <BlogSkeleton/>
        </div>
    }

    return <div >
        <AppBar
        actionButton={
        <Link to="/publish">
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full font-medium">
                + New Blog
            </button>
        </Link>
        }
        />

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