export const BlogSkeleton = () => {
  return (
    <div className="animate-pulse max-w-3xl mx-auto px-4 mt-10">
      
      {/* Repeat this block 3–5 times */}
      {[1, 2, 3, 4].map((_, i) => (
        <div key={i} className="py-6 border-b">
          
          {/* Top row */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            <div className="h-4 w-32 bg-gray-300 rounded"></div>
          </div>

          {/* Title */}
          <div className="mt-4 h-6 w-2/3 bg-gray-300 rounded"></div>

          {/* Content preview */}
          <div className="mt-2 space-y-2">
            <div className="h-4 w-full bg-gray-200 rounded"></div>
            <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
          </div>

          {/* Read time */}
          <div className="mt-3 h-3 w-20 bg-gray-200 rounded"></div>

        </div>
      ))}

    </div>
  );
};