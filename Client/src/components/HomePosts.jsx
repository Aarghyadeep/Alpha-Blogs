import { IF } from "../url";

export default function HomePosts({ post }) {
  return (
    <div className="w-full flex mt-8 space-x-4 rounded-lg text-white bg-gray-800 shadow-lg shadow-gray-400
    hover:shadow-2xl hover:shadow-gray-950 transition-all mb-8">
        {/* Left */}
        <div className="w-[35%] h-[230px] md:h-[200px] flex justify-center items-center">
        <img src={IF+post.photo}
         className="h-full w-full object-cover rounded-md"
        alt="" />
        </div>
        {/* Right */}
        <div className="flex flex-col w-[65%]">
           <p className="text-xl font-bold md:mb-2 mb-1 md:text-2xl">{post.title.slice(0,40)+"..."}</p>
           <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4">
              <p>@{post.username}</p>
              <div className="flex md:flex-row flex-col gap-2 text-sm mr-2">
                <p>{new Date(post.updatedAt).toString().slice(0,15)}</p>
                <p>{new Date(post.updatedAt).toString().slice(16,24)}</p>
              </div>
           </div>
           <p className="text-xs md:text-lg p-1">  
           {post.desc.slice(0,150)+" ...Read more"}</p>
        </div>
    </div>
  )
}
