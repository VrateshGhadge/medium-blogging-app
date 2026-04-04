import { Link } from 'react-router-dom'
import { Avatar } from './BlogCard'

export const AppBar = () => {
  return (
    <div className="border-b flex justify-between items-center px-10 py-4">
      
      <Link to={'/blogs'} className="font-semibold text-lg cursor-pointer">
        Medium
      </Link>

      <div className="flex items-center gap-4">
        <Link to={`/publish`}>
            <button className="bg-green-600 hover:bg-green-700 active:scale-95 text-white px-6 py-2 rounded-full font-medium shadow-md transition-all duration-200">
            + New Blog
            </button>
        </Link>

        <Avatar size={"big"} name="Joe" />
      </div>

    </div>
  );
};