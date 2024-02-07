import { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import axios from "axios";
import { IF, URL } from "../url";
import { useNavigate, useParams, Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import ProfilePosts from "../components/ProfilePosts"; 
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function Profile() {

  const param = useParams().id;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const {user, setUser} = useContext(UserContext)
  const navigate = useNavigate()
  const [posts, setPosts] = useState([])

  const toastOptions = {
    position: "bottom-right",
    autoClose: 1500,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  };

  const fetchProfile = async ()=>{
    try{
       const res = await axios.get(URL+"/api/users/"+user._id)
       setUsername(res.data.username)
       setEmail(res.data.email)
       setPassword(res.data.password)
    }
    catch(err){
       console.log(err)
    }
  }

  const handleUserUpdate = async()=> {
    try{
      const res = await axios.put(URL+"/api/users/"+user._id,{username,email,password},{withCredentials:true})
      toast.success("User updated successfully!", toastOptions);
    }
    catch(err){
      console.log(err)
    }
  }

  const handleUserDelete = async()=> {
    try{
      const res = await axios.delete(URL+"/api/users/"+user._id,{withCredentials:true})
      setUser(null)
      navigate("/")
      // console.log(res.data)
  
    }
    catch(err){
      console.log(err)
    }
  }

  
  const fetchUserPosts=async ()=>{
    try{
      const res=await axios.get(URL+"/api/posts/user/"+user._id)
      // console.log(res.data)
      setPosts(res.data)
  
  
    }
    catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    fetchProfile()
  
  },[param])
  
  useEffect(()=>{
    fetchUserPosts()
  
  },[param])


  return (
    <div>
      <Navbar />
      <div className="min-h-[80vh] px-8 md:px-[200px] flex md:flex-row flex-col-reverse 
      md:items-start items-start bg-gradient-to-r from-red-200 to-sky-200">
         <div className="flex flex-col md:w-[70%] w-full mt-8 md:mt-4">
            <p className="text-xl font-bold mb-4">Your posts:</p>
            {posts?.map((p)=>(
            <ProfilePosts key={p._id} p={p}/>
          ))}
         </div>
                                 {/* profile */}
         <div className="md:sticky md:top-28 mt-5 flex justify-start md:justify-end 
         items-start md:w-[30%] w-full md:items-end ">
           <div className="flex flex-col space-y-4 items-start text-white bg-gray-800 p-5 rounded-md
           shadow-md shadow-red-400">
           <p className="text-xl font-bold mb-4">Profile</p>
           <input 
           onChange={(e)=>setUsername(e.target.value)}
           className="outline-none px-4 py-2 bg-transparent border border-solid border-red-400" 
           placeholder="Your username" type="text"/>
          <input 
          onChange={(e)=>setEmail(e.target.value)}
          className="outline-none px-4 py-2 bg-transparent border border-solid border-red-400" 
          placeholder="Your email" type="email"/>
          <div className="flex items-center space-x-4 mt-8">
            <button onClick={handleUserUpdate} 
            className="font-semibold border-2 border-solid border-red-400 hover:bg-red-400  p-2 rounded-lg hover:text-black">
              Update</button>
            <button onClick={handleUserDelete} 
            className="font-semibold border-2 border-solid border-red-400 hover:bg-red-400  p-2 rounded-lg hover:text-black"
            >Delete</button>
          </div>
            <ToastContainer />
           </div>

         </div>
      </div>
      <Footer />
    </div>
  )
}

