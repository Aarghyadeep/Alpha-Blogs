import { Link, useNavigate } from "react-router-dom"
import Footer from "../components/Footer"
import { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { URL } from "../url";
import { UserContext } from "../context/UserContext";


export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {setUser} = useContext(UserContext);
  const navigate = useNavigate();

  const toastOptions = {
    position: "bottom-right",
    autoClose: 1500,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  };

  const handleValidation = ()=> {
    if(email === "" || password === ""){
      toast.error("Username or password cannot be empty!", toastOptions);
      return false;
    }
    return true;
  }

  const handleLogin = async ()=> {
    if(handleValidation()){
      try{
        const res = await axios.post(URL+"/api/auth/login",{email,password},{withCredentials:true});
        setUser(res.data);
        navigate("/");
  
      }
      catch(err){
        toast.error("Something went wrong!", toastOptions);
        console.log(err)
      }
    }
  }


  return (
    <>
                         {/* Top */}
    <div className="flex flex-col gap-4 md:gap-0 md:flex-row items-center bg-black text-white justify-between px-6 md:px-[200px] py-[18px]">
    <h1 className="text-xl md:text-2xl font-extrabold hover:opacity-85">
      <Link to="/">Alpha <span className="text-red-400">Blogs</span></Link></h1>
    <button 
    className="font-semibold border-2 border-solid border-red-400 p-2 rounded-lg hover:bg-red-400 hover:text-black"
    ><Link to="/register">Register</Link></button>
    </div>

                           {/* Center */}
<div className="w-full flex justify-center text-white items-center h-[80vh] bg-gradient-to-r from-red-200 to-sky-200">
       <div className="flex flex-col justify-center p-10 items-center space-y-4 w-[80%] md:w-[25%] bg-gray-800 rounded-lg
        shadow-md shadow-black">
         <h1 className="text-xl font-bold text-left">Log in to your account</h1>
         <input
         onChange={(e)=>setEmail(e.target.value)}
         className="w-full bg-transparent px-4 py-2 border border-red-400 outline-0" type="text" placeholder="Enter your email" />
         <input
         onChange={(e)=>setPassword(e.target.value)}
         className="w-full bg-transparent px-4 py-2 border border-red-400 outline-0" type="password" placeholder="Enter your password" />
         <button
         onClick={handleLogin}
         className="w-full font-semibold text-xl border-2 border-solid border-red-400 hover:bg-red-400  p-2 rounded-lg hover:text-black">Log in</button>
         {/* {error && <h3 className="text-red-500 text-sm ">Something went wrong</h3>} */}
         <div className="flex justify-center items-center space-x-3">
          <p>New here?</p>
          <p className="text-white hover:text-red-400"><Link to="/register">Register</Link></p>
         </div>
       </div>
       <ToastContainer />
    </div>
    <Footer />
    </>
  )
}
