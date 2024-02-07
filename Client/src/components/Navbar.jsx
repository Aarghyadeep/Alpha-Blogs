import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { FaBars } from "react-icons/fa";
import { useContext, useState } from "react";
import Menu from "./Menu";
import { UserContext } from "../context/UserContext"; 


export default function Navbar() {
  
    const [menu, setMenu] = useState(false);
    const [prompt, setPrompt] = useState("");
    const navigate = useNavigate();

    const showMenu = ()=>{
      setMenu(!menu)
    }

    const {user}= useContext(UserContext);

  return (
    <div className="flex gap-3 md:gap-24 items-center bg-black text-white px-6 md:px-[200px] py-4">
                      {/* Left */}
      <p className="text-lg md:text-2xl font-extrabold hover:opacity-85"><Link to="/">Alpha <span className="text-red-400">Blogs</span></Link></p>
                       {/* Center */}
      <div className="flex justify-center items-center space-x-0">
        <div className="w-[200px] flex items-center h-full rounded-3xl md:w-[400px] border-2 border-solid
        border-gray-600 bg-[#121212]">
        <input type="text" placeholder="Search a post"
        onChange={(e)=>setPrompt(e.target.value)}
        className="p-3 w-[90%] h-full bg-transparent outline-none rounded-3xl" />
      <p 
      onClick={()=>navigate(prompt?"?search="+prompt:navigate("/"))}
      className="cursor-pointer"><IoIosSearch /></p>
        </div>      
      </div>
                        {/* Right */}
      <div className="hidden md:flex items-center text-red-400 justify-center md:space-x-4 space-x-8">
      {user? <button className="font-semibold border-2 border-solid border-red-400 p-2 rounded-lg hover:bg-red-400 hover:text-black "
      ><Link to="/create">Create</Link></button> : 
      <button className="font-semibold border-2 border-solid border-red-400 hover:bg-red-400  p-2 rounded-lg hover:text-black"
      ><Link to="/login">Login</Link></button>}
       {user? <div onClick={showMenu}>
        <p className="hover:opacity-85 cursor-pointer relative"><FaBars /></p>
        { menu && <Menu /> }
       </div> :    
           <button 
           className="font-semibold border-2 border-solid border-red-400 p-2 rounded-lg hover:bg-red-400 hover:text-black "
           ><Link to="/register">Register</Link></button>}
        </div> 
        <div onClick={showMenu}>
        <p className=" md:hidden hover:opacity-85 text-red-400 cursor-pointer relative"><FaBars /></p>
        { menu && <Menu /> }
       </div>                 
    </div>
  )
}
