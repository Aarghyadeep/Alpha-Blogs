import { IF } from "../url";

export default function HomePosts({ p }) {
  return (
    <div className="w-full flex mt-8 space-x-4 rounded-lg text-white bg-gray-800 shadow-lg shadow-gray-400
    hover:shadow-2xl hover:shadow-gray-950 transition-all mb-8">
        {/* Left */}
        <div className="w-[35%] h-[300px] md:h-[230px] flex justify-center items-center">
        <img src={IF+p.photo}
         className="h-full w-full object-cover rounded-md"
        alt="" />
        </div>
        {/* Right */}
        <div className="flex flex-col w-[65%]">
           <p className="text-xl font-bold md:mb-2 mb-1 md:text-2xl">{p.title.slice(0,40)+"..."}</p>
           <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center gap-5 md:gap-10 md:mb-4">
              <p>@{p.username}</p>
              <div className="flex md:flex-row flex-col gap-2 text-sm mr-2">
                <p>{new Date(p.updatedAt).toString().slice(0,15)}</p>
                <p>{new Date(p.updatedAt).toString().slice(16,24)}</p>
              </div>
           </div>
           <p className="text-xs md:text-lg p-1">  
           {p.desc.slice(0,150)+" ...Read more"}</p>
        </div>
    </div>
  )
}
