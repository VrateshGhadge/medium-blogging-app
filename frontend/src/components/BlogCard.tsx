
interface BlogCardProps {
    authorName: string
    title: string
    content: string
    publishedDate: string
}
export const BlogCard = ({
    authorName,
    title,
    content,
    publishedDate
}: BlogCardProps)=>{
    return <div className="p-4 border-b border-slate-200 pb-4">
        <div className="flex">
            <Avatar name={authorName} />
            <div className="font-extralight pl-2 text-sm flex justify-center flex-col">{authorName}</div>
           <div className="flex justify-center flex-col pl-2">
                < Circle/>
            </div>
            <div className="font-thin pl-2 text-slate-600 text-sm flex justify-center flex-col">
                {publishedDate}
            </div>
        </div>
            <div className="text-xl font-semibold pt-2">
                {title}
            </div>
            <div className="text-md font-thin">
                {content.slice(0, 100) + "..."}
            </div>
            <div className="text-slate-500 text-sm font-thin pt-4">
                {`${Math.ceil(content.length / 100)} min read`}
            </div>
    </div>
}

function Circle(){
    return <div className="h-1 w-1 rounded-full bg-slate-500">

    </div>
}

function Avatar ({ name }: { name: string }){
    return <div className="relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-gray-100 bg-neutral-tertiary rounded-full dark:bg-gray-600">
    <span className="text-xs font-extralight text-gray-600 dark:text-gray-300">{name[0]}</span>
</div>

}