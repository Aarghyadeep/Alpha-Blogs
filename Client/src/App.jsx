import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreatePost from "./pages/CreatePost";
import PostDetails from "./pages/PostDetails";
import EditPost from "./pages/EditPost";
import Profile from "./pages/Profile";
import { UserContextProvider } from "./context/UserContext"; 
import MyBlogs from "./pages/MyBlogs";
import Error from "./pages/Error";



export default function App() {

  
  
  return (
    <UserContextProvider>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/create" element={<CreatePost />} />
      <Route path="/posts/post/:id" element={<PostDetails />} />
      <Route path="/edit/:id" element={<EditPost />} />
      <Route path="/profile/:id" element={<Profile />} />
      <Route path="/myBlogs/:id" element={<MyBlogs />} />
      <Route path="*" element={<Error />} />
    </Routes>
    </UserContextProvider>
  )
}
