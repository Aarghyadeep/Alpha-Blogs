import Footer from "../components/Footer";
import HomePosts from "../components/HomePosts";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Loader from './../components/Loader';
import { URL } from "../url";

export default function Home() {
  
  const {search} = useLocation()
  const [posts, setPosts] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [loader, setLoader] = useState(false);
  const {user}=useContext(UserContext);

  
  const fetchPosts = async()=>{
    setLoader(true)
    try{
      const res = await axios.get(URL+"/api/posts/"+search)
      // console.log(res.data)
      setPosts(res.data)
      if(res.data.length === 0){
        setNoResults(true)
      }
      else{
        setNoResults(false)
      }
      setLoader(false)
      
    }
    catch(err){
      console.log(err)
      setLoader(true)
    }
  }

  useEffect(()=>{
    fetchPosts()

  },[search]);



  return (
    <div className="bg-gradient-to-r from-red-200 to-sky-200">
      <Navbar />
      <div className="px-8 md:px-[200px] min-h-[80vh]">
      {loader?<div className="h-[40vh] flex justify-center items-center"><Loader /></div>:!noResults?
        posts.map((post)=>(
          <>
          <Link to={user?`/posts/post/${post._id}`:"/login"}>
          <HomePosts key={post._id} post={post}/>
          </Link>
          </>
          
        )):<h3 className="text-center font-sans text-2xl font-bold mt-16">No posts available</h3>}
      </div>
      <Footer />
    </div>
  )
}
