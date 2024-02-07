import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import axios from "axios";
import { URL } from "../url";

export default function Register() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const toastOptions = {
    position: "bottom-right",
    autoClose: 1500,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  };
  
  
  const handleValidation = ()=> {
    if(password != confirmPassword){
      toast.error("Password and confirm password should be same!", toastOptions);
      return false;
    }
    else if(username.length < 3) {
      toast.error("Username should be greater than three characters!", toastOptions);
      return false;
    }
    else if(email === ""){
      toast.error("Email is required!", toastOptions);
      return false;
    }
    else if (password.length < 6) {
      toast.error("Password should be equal or greater than 6 characters.",toastOptions);
      return false;
    }
    return true;
  }

  const handleRegister = async ()=> {
    if(handleValidation()){
      try{
        const res = await axios.post(URL+"/api/auth/register",{username,email,password})
        setUsername(res.data.username)
        setEmail(res.data.email)
        setPassword(res.data.password)
        navigate("/login")
        
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
    ><Link to="/login">Login</Link></button>
    </div>

                           {/* Center */}
<div className="w-full flex justify-center items-center h-[80vh] bg-gradient-to-r from-red-200 to-sky-200">
       <div className="flex flex-col justify-center p-10 items-center space-y-4 w-[80%] md:w-[25%] bg-gray-800 text-white rounded-lg
        shadow-md shadow-black">
         <h1 className="text-xl font-bold text-left">Create an account</h1>
         <input 
         onChange={(e)=>setUsername(e.target.value)}
         className="w-full bg-transparent px-4 py-2 border border-red-400 outline-0" type="text" placeholder="Enter your username" />
         <input
         onChange={(e)=>setEmail(e.target.value)}
         className="w-full bg-transparent px-4 py-2 border border-red-400 outline-0" type="email" placeholder="Enter your email" />
         <input
         onChange={(e)=>setPassword(e.target.value)}
         className="w-full bg-transparent px-4 py-2 border border-red-400 outline-0" type="password" placeholder="Enter your password" />
         <input 
         onChange={(e)=>setConfirmPassword(e.target.value)}
         className="w-full bg-transparent px-4 py-2 border border-red-400 outline-0" type="password" placeholder="Enter your password again" />
         <button 
         onClick={handleRegister}
         className="w-full font-semibold text-xl border-2 border-solid border-red-400 hover:bg-red-400  p-2 rounded-lg hover:text-black">Register</button>
         <div className="flex justify-center items-center space-x-3">
          <p>Already have an account?</p>
          <p className="text-white hover:text-red-400"><Link to="/login">Log in</Link></p>
         </div>
       </div>
       <ToastContainer />
    </div>
    <Footer />
    </>
  )
}
