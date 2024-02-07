import { Link } from "react-router-dom";

export default function Error() {
  return (
    <div className="h-screen bg-gradient-to-r from-black to-gray-800 text-white flex flex-col items-center justify-center gap-10">
      <p className="font-semibold text-2xl md:text-4xl">Oops! This page does not exist!</p>
      <p className="font-semibold text-3xl md:text-4xl"><Link to="/">← Go Back</Link></p>
    </div>
  )
}
