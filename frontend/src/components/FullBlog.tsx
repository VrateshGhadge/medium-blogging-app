import { Blog } from "../hooks"
import { AppBar } from "./AppBar"
import { Avatar } from "./BlogCard"

export const FullBlog = ({ blog } : { blog: Blog }) => {
    return <div>
        <AppBar/>
        <div className="grid grid-cols-12 px-10 w-full pt-12">
            <div className="col-span-8">
                <div className="text-3xl font-extrabold">
                    {blog.title}
                </div>
                <div className="text-slate-500 pt-2">
                    Posted on 3rd Apr 26
                </div>
                <div className="pt-4">
                    {blog.content}
                </div>
            </div>
            <div className="col-span-4">
                <div className="text-slate-600 text-lg font-medium pb-4">
                    Author
                </div>
                <div className="flex w-full">
                    {/* The Avatar Column */}
                    <div className="pr-4 flex flex-col justify-center">
                        <Avatar size="big" name={blog.author.name || "Anonymous"}/>
                    </div>
                    
                    {/* The Text Column */}
                    <div>
                        <div className="text-xl font-bold">
                            {blog.author.name || "Anonymous"}
                        </div>
                        <div className="pt-2 text-slate-500">
                            This is where author details comes where author will try to engage the user with the content 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}