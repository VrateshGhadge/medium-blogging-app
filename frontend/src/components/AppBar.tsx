import { Link } from 'react-router-dom'
import { Avatar } from './BlogCard'

export const AppBar = ({
  actionButton,
}: {
  actionButton?: React.ReactNode;
}) => {
  return (
    <div className="border-b flex justify-between items-center px-10 py-4">
      
      <Link to={'/blogs'} className="font-semibold text-lg cursor-pointer">
        Medium
      </Link>

      <div className="flex items-center gap-4">
        {actionButton}

        <Avatar size={"big"} name="Joe" />
      </div>
    </div>
  );
};