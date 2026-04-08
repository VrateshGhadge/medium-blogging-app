import { FullBlog } from "../components/FullBlog";
import { Spinner } from "../components/Spinner";
import { useBlog } from "../hooks"
import { useParams } from "react-router-dom";


export const Blog = ()=>{
    const { id } = useParams()
    const { loading, blog } = useBlog({
        id: id || ""
    });
    if(loading) {
        return <div>
            <Spinner/>ß
        </div>
    }
    if(!blog){
        return <div>
            Blog not found
        </div>
    }
    return <div>
        <FullBlog blog={blog} />
    </div>
}