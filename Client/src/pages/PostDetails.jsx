import Comment from "../components/Comment";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { URL, IF } from "../url";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import Loader from './../components/Loader';


export default function PostDetails() {

  const postId = useParams().id;
  const [post, setPost] = useState({});
  const {user} = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  
  const fetchPost = async()=>{
    try{
      const res = await axios.get(URL+"/api/posts/"+postId)
      // console.log(res.data)
      setPost(res.data)
    }
    catch(err){
      console.log(err)
    }
  }
  

  useEffect(()=>{
    fetchPost()

  },[postId]);
  
  const handleDeletePost = async ()=>{

    try{
      const res = await axios.delete(URL+"/api/posts/"+postId,{withCredentials:true})
      console.log(res.data)
      navigate("/")

    }
    catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    fetchPostComments()

  },[postId]);


  const fetchPostComments = async()=>{
    setLoader(true)
    try{
      const res = await axios.get(URL+"/api/comments/post/"+postId)
      setComments(res.data)
      setLoader(false)

    }
    catch(err){
      setLoader(true)
      console.log(err)
    }
  }

 
  const postComment = async(e)=>{
    e.preventDefault()
    try{
      const res = await axios.post(URL+"/api/comments/create",
      {comment:comment,author:user.username,postId:postId,userId:user._id},
      {withCredentials:true})
      window.location.reload(true)
    }
    catch(err){
         console.log(err)
    }
  }




  return (
    <div>
      <Navbar />
      {loader? <div className="h-[80vh] flex justify-center items-center w-full"><Loader /></div>
        : <div className="px-8 md:px-[200px] mt-8">
        <div className="flex justify-between items-center">
        <p className="text-2xl font-bold text-black md:text-3xl">{post.title}</p>
        {user?._id===post?.userId && <div className="flex items-center justify-center space-x-2">
           <p onClick={()=>navigate("/edit/"+postId)} className="cursor-pointer"><FaEdit /></p>
           <p onClick={handleDeletePost} className="cursor-pointer"><MdDelete /></p>
        </div>}
        </div>
        <div className="flex items-center justify-between mt-2 md:mt-4">
           <p>@{post.username}</p>
           <div className="flex space-x-2">
             <p>{new Date(post.updatedAt).toString().slice(0,15)}</p>
             <p>{new Date(post.updatedAt).toString().slice(16,24)}</p>
           </div>
        </div>
         <img 
         className="w-full mx-auto mt-8 rounded-md max-h-[30rem]"
         src={IF+post.photo} 
         alt="" />
         <p className="mt-5 font-serif">{post.desc}</p>
         <div className="flex items-center mt-8 space-x-4 font-semibold">
            <p>Categories:</p>
            <div className="flex md:flex-row flex-col gap-2 justify-center items-center">
            {post.categories?.map((c,i)=>(
            <>
                <div key={i} className="bg-gray-300 rounded-lg px-3 py-1">{c}</div>
                </>
            ))}
            </div>
            </div>
           <div className="flex flex-col mt-4">
           <p className="mt-6 mb-4 font-semibold">Comments:</p>
           {comments?.map((c)=>(
          <Comment key={c._id} c={c} />
         ))}
            </div>
                                {/* Write comment     */}
               <div className="w-full flex flex-col mt-4 md:flex-row gap-2 mb-10">
               <input onChange={(e)=>setComment(e.target.value)} 
               type="text" placeholder="Write a comment" 
               className="md:w-[80%] outline-none border border-solid border-black py-2 px-4 mt-4 md:mt-0"/>
               <button 
               onClick={postComment}
               className="bg-black text-sm font-semibold text-white px-2 py-2 md:w-[20%] mt-4 md:mt-0 rounded-lg hover:bg-gray-700">
                Add Comment</button>
                </div>                 
      </div>}
      <Footer />
    </div>
  )
}
